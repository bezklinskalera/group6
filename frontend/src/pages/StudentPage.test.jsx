import React from "react";
import { render, screen } from "@testing-library/react";
import { StudentPage } from "./StudentPage"; // Імпортуємо компонент
import { PieChart } from "@mui/x-charts/PieChart"; // Імпортуємо PieChart для мокінгу
import { Doughnut } from "react-chartjs-2"; // Імпортуємо Doughnut для мокінгу
import "@testing-library/jest-dom";


test("renders subject labels correctly", () => {
    render(<StudentPage />);

    const subjects = [
        "ТЕХНОЛОГІЇ DEVOPS",
        "АСИНХРОННЕ ПРОГРАМУВАННЯ",
        "ОСНОВИ ІНТЕРНЕТУ РЕЧЕЙ",
        "ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ МЕРЕЖ ПЕРЕДАЧІ ДАНИХ",
        "ОСНОВИ РОЗРОБКИ ТРАНСЛЯТОРІВ",
        "ПРАКТИЧНИЙ КУРС ІНОЗЕМНОЇ МОВИ",
        "КОМПОНЕНТИ ПРОГРАМНОЇ ІНЖЕНЕРІЇ",
    ];

    subjects.forEach((subject) => {
        expect(screen.getByText(subject)).toBeInTheDocument();
    });

    // Перевірка, чи мок компоненти відображаються на сторінці
    expect(screen.getByText("PieChart Mock")).toBeInTheDocument();
    expect(screen.getByText("Doughnut Mock")).toBeInTheDocument();
});

