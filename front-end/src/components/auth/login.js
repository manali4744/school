import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import axios from 'axios';

const defaultTheme = createTheme();

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false, // Added state for password visibility
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Set the error message for this field to an empty string
    }));
  };

  const handleClickShowPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickRegister = () => {
    navigate('/register')
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.email.trim() === '') {
      errors.email = 'Email is required';
      valid = false;
    }

    if (formData.password.trim() === '') {
      errors.password = 'Password is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const sendFormDataToAPI = async () => {
    const filteredFormData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', filteredFormData);
      console.log('Response Status:', response.data.status);
      // console.log('Response auth:', response.data.auth_access); // Log the entire response
  
      if (response.data.auth_access) {
        console.log('Login successful');
        console.log(response.data.id);
        const idToStore = response.data.id;
        localStorage.setItem('userId', idToStore);
        localStorage.setItem('jwt_token', response.data.auth_access)
        if (response.data.collected_info){
          navigate('/information')
        }
        else{
          navigate('/getinfo')
        }
      } else {
        if (response.data.status === 400){
          alert(response.data.msg)
        }
      }
    } catch (error) {
      alert("User Not found")
      navigate('/register')
      // console.error('API Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      sendFormDataToAPI();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(http://127.0.0.1:3000/img/vector_login.avif)',
            backgroundRepeat: 'no-repeat',
            // backgroundColor: 'white',
            backgroundSize: '50% 50%',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                helperText={formErrors.email}
                error={!!formErrors.email} // Add error prop to highlight the input field
              />
              <TextField
                margin="normal"
                required
                  fullWidth
                  name="password"
                  label="Password"
                  type={formData.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  helperText={formErrors.password}
                  error={!!formErrors.password} // Add error prop to highlight the input field
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2"  onClick={handleClickRegister}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
