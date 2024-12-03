import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {LoginPage} from './LoginPage'; // шлях до твоєї LoginPage компоненти

test('рендерить форму входу з усіма необхідними полями', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/Електронна пошта/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Запам'ятати мене/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Увійти/i })).toBeInTheDocument();
  expect(screen.getByText(/Увійти у свій акаунт/i)).toBeInTheDocument();
});


test('перевірка вводу email та паролю', () => {
  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/електронна пошта/i);
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/пароль/i);
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});

test('не показує помилку, якщо поля заповнені', () => {
  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/Електронна пошта/i);
  const passwordInput = screen.getByLabelText(/Пароль/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /Увійти/i }));
  expect(screen.queryByText(/Будь ласка, заповніть усі поля/i)).not.toBeInTheDocument();
});

test('дозволяє вибрати чекбокс "Запам\'ятати мене"', () => {
  render(<LoginPage />);
  const rememberMeCheckbox = screen.getByLabelText(/Запам'ятати мене/i);
  expect(rememberMeCheckbox).not.toBeChecked();
  fireEvent.click(rememberMeCheckbox);
  expect(rememberMeCheckbox).toBeChecked();
});

test('посилання на "Забули пароль?" та "Зареєструвати новий акаунт" присутні', () => {
  render(<LoginPage />);
  expect(screen.getByText(/Забули пароль?/i)).toHaveAttribute('href', '#');
  expect(screen.getByText(/Зареєструвати новий акаунт/i)).toHaveAttribute('href', '/signup');
});


test('перевірка обробки submit без помилок', () => {
  render(<LoginPage />);
  
  // Заповнюємо поля форми
  fireEvent.change(screen.getByLabelText(/Електронна пошта/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password123' } });

  // Мокування функції setError
  const mockSetError = jest.fn();
  jest.spyOn(React, 'useState').mockImplementation((init) => [init, mockSetError]);
  
  // Клікаємо на кнопку "Увійти"
  fireEvent.click(screen.getByRole('button', { name: /Увійти/i }));

  // Перевірка, чи викликається setError
  expect(mockSetError).not.toHaveBeenCalled();
});











