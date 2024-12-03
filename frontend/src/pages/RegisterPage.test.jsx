import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegistrationPage } from "../pages/RegistrationPage"; // шлях до твоєї RegistrationPage компоненти
import { Select, MenuItem } from "@mui/material";

test("рендерить форму реєстрації з усіма необхідними полями", () => {
  render(<RegistrationPage />);

  expect(screen.getByLabelText(/Прізвище/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Ім'я/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/По-батькові/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Електронна пошта/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Підтвердьте/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Оберіть вашу групу/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Зареєструватися/i })
  ).toBeInTheDocument();
});

test("перевірка введеної електронної пошти", () => {
    render(<RegistrationPage />);
    fireEvent.change(screen.getByLabelText(/Електронна пошта/i), {
      target: { value: "test@example.com" },
    });
    expect(screen.getByLabelText(/Електронна пошта/i).value).toBe("test@example.com");
  });
  
  

