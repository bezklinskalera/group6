import React from "react";
import { render, screen } from "@testing-library/react";
import { TeacherPage } from "./TeacherPage";
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
