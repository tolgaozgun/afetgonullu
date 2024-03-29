import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import * as React from 'react';
// import LockIcon from '@mui/icons-material/Lock';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { renderEditSingleSelectCell } from '@mui/x-data-grid';
import { redirect } from "react-router-dom";
import ErrorAlert from '../components/ErrorAlert';
import { useState } from 'react';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Afet Gönüllü
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // const token = localStorage.getItem('token');
    
    // // Check if token is valid by sending a request to the backend
    // // If token is valid, redirect user to admin panel
    // // If not, delete token from localStorage and let user login again
    // const response = await axios.post('/api/auth/verify/', {
    //     token
    // });

    // if (token) {
    //     redirect('/panel');
    // }

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    handleLogin(data.get('email'), data.get('password'))
  };

  const handleLogin = async (email, password) => {
    try {
        const response = await axios.post('/api/auth/login/', {
            email,
            password
        });

        const token = response.data.token;
        const error = response.data.error;
        if (token) {
            // Save the token in local storage or somewhere else to use it for further API requests
            localStorage.setItem('token', token);

            // Redirect user to admin panel /api/panel using redirect library
            redirect('/panel');
            return true;
        }else if (error) {
          setErrorMessage(error);
        }else{
          setErrorMessage("Eposta veya şifre hatalı");
        }
        return false;
    } catch (error) {
        console.error(error);
        setErrorMessage("Lütfen bağlantınızı kontrol edin.");
        return false;
    }
  }
  return (
    <ThemeProvider theme={theme}>
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
            {/* <LockIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ErrorAlert errorMessage={errorMessage}/>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni hatırla"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Şifremi Unuttum
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Kaydol"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}