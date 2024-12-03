import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegistrationPage } from "../pages/RegistrationPage"; // шлях до твоєї RegistrationPage компоненти
import { Select, MenuItem } from "@mui/material";
import { MemoryRouter } from 'react-router-dom';

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

  
/*test('тестування форми реєстрації з помилками і успіхом', async () => {
  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  // Мок даних для форми
  const formData = {
    lastName: 'Іванов',
    firstName: 'Іван',
    middleName: 'Іванович',
    email: 'ivan@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
    group: 'Група 1',
  };

  // Заповнення полів форми
  fireEvent.change(screen.getByLabelText(/Прізвище/i), { target: { value: formData.lastName } });
  fireEvent.change(screen.getByLabelText(/Ім'я/i), { target: { value: formData.firstName } });
  fireEvent.change(screen.getByLabelText(/По-батькові/i), { target: { value: formData.middleName } });
  fireEvent.change(screen.getByLabelText(/Електронна пошта/i), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: formData.password } });
  fireEvent.change(screen.getByLabelText(/Підтвердьте/i), { target: { value: formData.confirmPassword } });
  fireEvent.select(screen.getByLabelText(/Оберіть вашу групу/i), { target: { value: formData.group } });

  // Перевірка, чи форма успішно відправляється
  fireEvent.click(screen.getByRole('button', { name: /Зареєструватися/i }));

  // Перевірка на успішне повідомлення
  await waitFor(() => expect(screen.getByText(/Реєстрація пройшла успішно!/i)).toBeInTheDocument());
});

test('тестування форми реєстрації з помилками', async () => {
  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  // Заповнення форми без всіх полів
  fireEvent.click(screen.getByRole('button', { name: /Зареєструватися/i }));

  // Перевірка, що з'явиться повідомлення про помилку (заповнення всіх полів обов'язкове)
  await waitFor(() => expect(screen.getByText(/Будь ласка, заповніть усі поля/i)).toBeInTheDocument());
});

test('тестування непідтвердженого паролю', async () => {
  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  // Заповнення форми з не співпадаючими паролями
  fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'Password123' } });
  fireEvent.change(screen.getByLabelText(/Підтвердьте/i), { target: { value: 'Password321' } });

  fireEvent.click(screen.getByRole('button', { name: /Зареєструватися/i }));

  // Перевірка на помилку про невідповідність паролів
  await waitFor(() => expect(screen.getByText(/Паролі не співпадають/i)).toBeInTheDocument());
});
  
  */

