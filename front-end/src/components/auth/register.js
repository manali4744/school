import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

const defaultTheme = createTheme();

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false, // Added state for password visibility
    password2: '',
    showpassword2: false, // Added state for confirm password visibility
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
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

  const handleClickShowpassword2 = () => {
    setFormData((prevData) => ({
      ...prevData,
      showpassword2: !prevData.showpassword2,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickLogin = () => {
    navigate('/login')
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.name.trim() === '') {
      errors.name = 'First Name is required';
      valid = false;
    }

    if (formData.email.trim() === '') {
      errors.email = 'Email is required';
      valid = false;
    }

    if (formData.password.trim() === '') {
      errors.password = 'Password is required';
      valid = false;
    }

    if (formData.password2.trim() === '') {
      errors.password2 = 'Confirm Password is required';
      valid = false;
    }

    if (formData.password !== formData.password2) {
      errors.password2 = 'Passwords do not match';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const sendFormDataToAPI = async () => {
    const filteredFormData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        password2: formData.password2,
      };

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', filteredFormData);
    //   console.log('API Response:', response.data);

      if (response.data.status === 201) {
        // Redirect to the login page
        navigate('/login');
      }
      if (response.data.status === 400){
        console.log(response.data)
      }
    } catch (error) {
      console.error('API Error:', error.response.data.email);
      alert(error.response.data.email)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form Data:', formData);
      sendFormDataToAPI();
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                    helperText={formErrors.name}
                    FormHelperTextProps={{ sx: { color: 'red' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    helperText={formErrors.email}
                    FormHelperTextProps={{ sx: { color: 'red' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={formData.showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    helperText={formErrors.password ? formErrors.password : ''}
                    FormHelperTextProps={{ sx: { color: 'red' } }}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type={formData.showpassword2 ? "text" : "password"}
                    id="password2"
                    autoComplete="new-password2"
                    value={formData.password2}
                    onChange={handleChange}
                    helperText={formErrors.password2 ? formErrors.password2 : ''}
                    FormHelperTextProps={{ sx: { color: 'red' } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowpassword2}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formData.showpassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2" onClick = {handleClickLogin}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Register;
