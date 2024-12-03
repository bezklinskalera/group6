import React from "react";
import { render, screen } from "@testing-library/react";
import { StudentPage } from "./StudentPage";
import { PieChart } from "@mui/x-charts/PieChart";
import { Doughnut, Bar } from "react-chartjs-2";
import "@testing-library/jest-dom";

// Mocking the components
jest.mock("@mui/x-charts/PieChart", () => {
  return function MockPieChart({ series }) {
    return (
      <div>
        <div>Mocked PieChart Component</div>
        {series.map((s, index) => (
          <div key={index}>{s.data.map(d => d.value).join(", ")}</div>
        ))}
      </div>
    );
  };
});

jest.mock("react-chartjs-2", () => ({
  Doughnut: function MockDoughnut({ data }) {
    return (
      <div>
        <div>Mocked Doughnut Component</div>
        {data.datasets.map((d, index) => (
          <div key={index}>{d.data.join(", ")}</div>
        ))}
      </div>
    );
  },
  Bar: function MockBar({ data }) {
    return (
      <div>
        <div>Mocked Bar Component</div>
        {data.datasets.map((d, index) => (
          <div key={index}>{d.data.join(", ")}</div>
        ))}
      </div>
    );
  },
}));

test("рендерит приветственный текст", () => {
  render(<StudentPage />);
  const welcomeText = screen.getByText(/Вітаємо, NINA/i);
  expect(welcomeText).toBeInTheDocument();
});

test("рендерит PieChart для каждого предмета", () => {
  render(<StudentPage />);
  const pieCharts = screen.getAllByText(/Mocked PieChart Component/i);
  expect(pieCharts.length).toBe(7); // Убедитесь, что рендерятся все 7 диаграмм
});

test("рендерит Bar диаграмму", () => {
  render(<StudentPage />);
  const barChart = screen.getByText(/Mocked Bar Component/i);
  expect(barChart).toBeInTheDocument();
});

test("рендерит изображение календаря", () => {
  render(<StudentPage />);
  const calendarImage = screen.getByAltText(/Calendar/i);
  expect(calendarImage).toBeInTheDocument();
});

test("рендерит PieChart для присутствия/отсутствия", () => {
  render(<StudentPage />);
  const presencePieChart = screen.getByText(/Mocked PieChart Component/i);
  expect(presencePieChart).toBeInTheDocument();
});

test("рендерит Doughnut диаграмму для текущего балла", () => {
  render(<StudentPage />);
  const doughnutChart = screen.getByText(/Mocked Doughnut Component/i);
  expect(doughnutChart).toBeInTheDocument();
});
