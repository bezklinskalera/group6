import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { TextField, Button, Box, Typography, Container, Checkbox, FormControlLabel, Link } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import HeaderStandart from "../components/HeaderStandart/HeaderStandart"; // Импортируем хедер
import { useLoginMutation } from "../slices/userApiSlice";  // Імпортуємо хук для login
import { setCredetials } from "../slices/authSlice";  // Імпортуємо action для збереження даних в Redux
import { useDispatch } from "react-redux";  // Імпортуємо dispatch для відправки action

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();  // Використовуємо хук для login
  const dispatch = useDispatch();  // Використовуємо dispatch для збереження в Redux
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Будь ласка, заповніть усі поля");
    } else {
      try {
        const response = await login({
          Email: formData.email,
          password: formData.password,
        }).unwrap();

        if (response.success) {
          dispatch(setCredetials(response.data));  // Зберігаємо дані користувача в Redux

          // Перенаправлення в залежності від типу користувача
          if (response.userType === "student") {
            navigate("/student");
          } else if (response.userType === "teacher") {
            navigate("/teacher");
          } else if (response.userType === "administrator") {
            navigate("/admin");
          }
        } else {
          setError(response.message || "Щось пішло не так.");
        }
      } catch (err) {
        setError(err.message || "Помилка сервера");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center" }}>
      {/* Хедер */}
      <HeaderStandart />

      {/* Основний контент */}
      <Container component="main" maxWidth="xs" sx={{ flex: "1 0 auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", padding: 3 }}>
          <Typography component="h1" variant="h5">
            Увійти у свій акаунт
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Електронна пошта"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Email sx={{ fontSize: 20, color: "gray" }} />,
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
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Lock sx={{ fontSize: 20, color: "gray" }} />,
              }}
            />
            <FormControlLabel
              control={<Checkbox name="rememberMe" color="primary" checked={formData.rememberMe} onChange={handleChange} />}
              label="Запам'ятати мене"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}  // Вимкнення кнопки при завантаженні
            >
              {isLoading ? "Завантаження..." : "Увійти"}
            </Button>
            <Box display="flex" justifyContent="space-between">
              <Link href="#" variant="body2">Забули пароль?</Link>
              <Link href="/signup" variant="body2">Зареєструвати новий акаунт</Link>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Футер (опціонально) */}
      <footer style={{ backgroundColor: "#f5f5f5", padding: "10px 20px", textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 KpiDash
        </Typography>
      </footer>
    </div>
  );
};

export default LoginPage;
