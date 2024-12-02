import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {LoginPage} from './LoginPage'; // шлях до твоєї LoginPage компоненти

test('перевірка вводу email та паролю', () => {
  render(<LoginPage />);
  
  // Перевіряємо, чи є інпут для email
  const emailInput = screen.getByLabelText(/електронна пошта/i);
  expect(emailInput).toBeInTheDocument();
  
  // Перевіряємо, чи є інпут для паролю
  const passwordInput = screen.getByLabelText(/пароль/i);
  expect(passwordInput).toBeInTheDocument();
  
  // Вводимо текст у поля
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  // Перевіряємо, чи значення змінилося
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});


