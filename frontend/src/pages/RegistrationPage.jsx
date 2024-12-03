// // Сторінка реєстрації
// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { Person, Email, Lock } from '@mui/icons-material';

// export const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     lastName: '',
//     firstName: '',
//     middleName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     group: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!formData.lastName || !formData.firstName || !formData.middleName || !formData.email || !formData.password || !formData.confirmPassword || !formData.group) {
//       setError('Будь ласка, заповніть усі поля');
//     } else if (formData.password !== formData.confirmPassword) {
//       setError('Паролі не співпадають');
//     } else {
//       setSuccess('Реєстрація пройшла успішно!');
//       setFormData({ lastName: '', firstName: '', middleName: '', email: '', password: '', confirmPassword: '', group: '' });
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Зареєструвати новий акаунт
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="lastName"
//             label="Прізвище"
//             name="lastName"
//             autoComplete="family-name"
//             autoFocus
//             value={formData.lastName}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="firstName"
//             label="Ім'я"
//             name="firstName"
//             autoComplete="given-name"
//             value={formData.firstName}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="middleName"
//             label="По-батькові"
//             name="middleName"
//             autoComplete="additional-name"
//             value={formData.middleName}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Електронна пошта"
//             name="email"
//             autoComplete="email"
//             value={formData.email}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Email sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Пароль"
//             type="password"
//             id="password1"
//             autoComplete="new-password"
//             value={formData.password}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Lock sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Підтвердьте"
//             type="password"
//             id="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: <Lock sx={{ fontSize: 20, color: 'gray' }} />,
//             }}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="group-label">Оберіть вашу групу</InputLabel>
//             <Select
//               labelId="group-label"
//               id="group"
//               name="group"
//               value={formData.group}
//               onChange={handleChange}
//               label="Оберіть вашу групу"
//             >
//               <MenuItem value="Група 1">Група 1</MenuItem>
//               <MenuItem value="Група 2">Група 2</MenuItem>
//               <MenuItem value="Група 3">Група 3</MenuItem>
//             </Select>
//           </FormControl>
//           {error && <Typography color="error">{error}</Typography>}
//           {success && <Typography color="primary">{success}</Typography>}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Зареєструватися
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default RegistrationPage;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Person, Email, Lock } from '@mui/icons-material';
import HeaderStandart from "../components/HeaderStandart/HeaderStandart"; // Импорт хедера

export const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.lastName || !formData.firstName || !formData.middleName || !formData.email || !formData.password || !formData.confirmPassword || !formData.group) {
      setError('Будь ласка, заповніть усі поля');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають');
    } else {
      setSuccess('Реєстрація пройшла успішно!');
      setFormData({ lastName: '', firstName: '', middleName: '', email: '', password: '', confirmPassword: '', group: '' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Хедер */}
      <HeaderStandart />

      {/* Основной контент */}
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Зареєструвати новий акаунт
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Прізвище"
              name="lastName"
              autoComplete="family-name"
              autoFocus
              value={formData.lastName}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Ім'я"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="middleName"
              label="По-батькові"
              name="middleName"
              autoComplete="additional-name"
              value={formData.middleName}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Person sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Електронна пошта"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Email sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password1"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Lock sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Підтвердьте"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Lock sx={{ fontSize: 20, color: 'gray' }} />,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="group-label">Оберіть вашу групу</InputLabel>
              <Select
                labelId="group-label"
                id="group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                label="Оберіть вашу групу"
              >
                <MenuItem value="Група 1">Група 1</MenuItem>
                <MenuItem value="Група 2">Група 2</MenuItem>
                <MenuItem value="Група 3">Група 3</MenuItem>
              </Select>
            </FormControl>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Зареєструватися
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Футер (если нужен, опционально) */}
      <footer style={{ backgroundColor: "#f5f5f5", padding: "10px 20px", textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 KpiDash
        </Typography>
      </footer>
    </div>
  );
};

export default RegistrationPage;
