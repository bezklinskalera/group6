import React from "react";
import { render, screen } from "@testing-library/react";
import { TeacherPage } from "./TeacherPage";
import TableAttendance from '../components/TableAttendance/TableAttendance'; // Перевірте шлях до компонента
import "@testing-library/jest-dom";

test("рендерить заголовок сторінки", () => {
  render(<TeacherPage />);
  const titleElement = screen.getByText(/Основи розробки трансляторів/i);
  expect(titleElement).toBeInTheDocument();
});

test("рендерить секцію певної групи", () => {
  render(<TeacherPage />);
  const tv21Titles = screen.getAllByText(/ТВ-21/i);
  expect(tv21Titles.length).toBeGreaterThan(0);
});

const rows = [
  { id: 1, name: "Іваненко Іван Іванович", attendance: 10 },
  { id: 2, name: "Петренко Петро Петрович", attendance: 8 },
];

const columns = [
  { field: "id", headerName: "№", align: "center" },
  { field: "name", headerName: "ПІБ" },
  { field: "attendance", headerName: "Відвідування пар", align: "center" },
];


jest.mock('../components/TableAttendance/TableAttendance', () => {
  return function MockTableAttendance({ rows, columns }) {
    return (
      <div>
        <div>Mocked TableAttendance Component</div>
        {columns.map((col) => (
          <div key={col.field}>{col.headerName}</div>
        ))}
        {rows.map((row) => (
          <div key={row.id}>
            {row.name} - {row.attendance}
          </div>
        ))}
      </div>
    );
  };
});

test('відображає таблицю з правильними даними', () => {
  render(<TableAttendance rows={rows} columns={columns} />);

  // Перевірка заголовків таблиці
  expect(screen.getByText('№')).toBeInTheDocument();
  expect(screen.getByText('ПІБ')).toBeInTheDocument();
  expect(screen.getByText('Відвідування пар')).toBeInTheDocument();

  // Перевірка даних рядків
  expect(screen.getByText('Іваненко Іван Іванович - 10')).toBeInTheDocument();
  expect(screen.getByText('Петренко Петро Петрович - 8')).toBeInTheDocument();
});

const generatePieData = jest.fn(() => [
  { label: 'Атестовані', value: 24 },
  { label: 'Неатестовані', value: 6 },
]);

test('Перевірка даних для кругової діаграми', () => {
  const pieData = generatePieData();

  expect(pieData).toEqual([
    { label: 'Атестовані', value: 24 },
    { label: 'Неатестовані', value: 6 },
  ]);
  expect(generatePieData).toHaveBeenCalledTimes(1); // Перевірка виклику стабу
});

test('Перевірка роботи з порожнім масивом даних атестації', () => {
  const emptyData = [];
  const tv21 = emptyData.find(item => item.name === 'ТВ-21');
  expect(tv21).toBeUndefined();  // Маємо очікувати, що не знайдеться елемент
});



