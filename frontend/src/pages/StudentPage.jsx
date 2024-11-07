import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BlockMenuStudent } from "../components/BlockMenuStudent/BlockMenuStudent";
import "../styles/StudentPage.css";

export const StudentPage = () => {
  const chartsData = [
    [
      { id: 0, value: 16, color: "#FF6384" }, // Призначення кольору для кожного сектору
      { id: 1, value: 84, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 25, color: "#FF9F40" },
      { id: 1, value: 75, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 30, color: "#3C8DBC" },
      { id: 1, value: 70, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 40, color: "#4DFF00" },
      { id: 1, value: 60, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 50, color: "#FF4F00" },
      { id: 1, value: 50, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 60, color: "#9C27B0" },
      { id: 1, value: 40, color: "#E6E6E6" },
    ],
    [
      { id: 0, value: 70, color: "#8BC34A" },
      { id: 1, value: 30, color: "#E6E6E6" },
    ],
  ];

  const subjects = [
    "ТЕХНОЛОГІЇ DEVOPS",
    "АСИНХРОННЕ ПРОГРАМУВАННЯ",
    "ОСНОВИ ІНТЕРНЕТУ РЕЧЕЙ ",
    "ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ МЕРЕЖ ПЕРЕДАЧІ ДАНИХ",
    "ОСНОВИ РОЗРОБКИ ТРАНСЛЯТОРІВ",
    "ПРАКТИЧНИЙ КУРС ІНОЗЕМНОЇ МОВИ",
    "КОМПОНЕНТИ ПРОГРАМНОЇ ІНЖЕНЕРІЇ",
  ];

  return (
    <div className="main" style={{ display: "flex" }}>
      <BlockMenuStudent />
      <div className="centralBlock">
        <p className="welcomeText">Вітаємо,</p>
        <div className="subjectsPieCharts">

          {chartsData.map((data, index) => (
            <div key={index} className="pieChartContainer">
              <PieChart
                series={[
                  {
                    data: data,
                    innerRadius: 45,
                  },
                ]}
                width={400}
                height={200}
              />
              <div className="chartValue">{data[0].value}</div>
              <div className="chartLabel">{subjects[index]}</div>{" "}
              {/* Додаємо підписи до діаграм */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
