import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'; // Import the Button component



import axios from 'axios';

const defaultTheme = createTheme();

function Info() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: 'Female',
    division: '',
    Standards: '',
  });

  const handleFieldChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };
  const handlePrintValues = () => {
    console.log('Selected Gender:', formData.gender);
    console.log('Selected Division:', formData.division); // Corrected log message
  };

  const sendFormDataToAPI = async () => {
    try {
      const storedId = localStorage.getItem('userId');
      console.log(storedId);
      const response = await axios.put(`http://127.0.0.1:8000/getinformation/${storedId}/`, formData); // Check the API endpoint URL
      if (response.data.status === 200){
        navigate('/information')
      }
  
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormDataToAPI();
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
            backgroundImage: 'url(http://127.0.0.1:3000/img/students.avif)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <InfoIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Get Information
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <FormLabel id="demo-row-radio-buttons-group-label" style={{ display: 'flex', fontSize: '20px' }}>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formData.gender}
                  onChange={handleFieldChange('gender')}
                >
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Standard</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.Standards}
                  label="Standards"
                  onChange={handleFieldChange('Standards')}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Division</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.division}
                  label="division"
                  onChange={handleFieldChange('division')}
                >
                  <MenuItem value={'A'}>A</MenuItem>
                  <MenuItem value={'B'}>B</MenuItem>
                  <MenuItem value={'C'}>C</MenuItem>
                  <MenuItem value={'D'}>D</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePrintValues}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Info;
