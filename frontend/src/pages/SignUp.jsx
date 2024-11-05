import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function RegistrationPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Далі можна зробити запит на сервер, наприклад, через fetch або axios
    console.log('Submitted:', form);
  };

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
          <Typography component="h1" variant="h5">
            Реєстрація
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Ім'я користувача"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email адреса"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Підтвердіть пароль"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зареєструватися
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationPage;