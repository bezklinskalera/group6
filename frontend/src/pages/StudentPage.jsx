import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Doughnut } from "react-chartjs-2"; // Для кольцевой диаграммы
import { BlockMenuStudent } from "../components/BlockMenuStudent/BlockMenuStudent";
import { Bar } from "react-chartjs-2"; // Импорт компонента Bar
import "../styles/StudentPage.css";
import calendar from '../images/calendar.jpg'

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 30, 40, 50],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Chart.js Bar Chart" },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

export const StudentPage = () => {
  const chartsData = [
    [
      { id: 0, value: 16, color: "#FF6384" },
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

  // Data for the PieChart and DoughnutChart
  const pieChartData = [
    { id: 0, value: 60, color: "#FF6384" }, // Присутствие
    { id: 1, value: 40, color: "#36A2EB" }, // Отсутствие
  ];

  const doughnutData = {
    labels: ["Баллы"],
    datasets: [
      {
        data: [70], // Баллы
        backgroundColor: ["#FF6384"], // Single color for Doughnut
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Отключение легенды
    },
  };

  return (
    <div className="main" style={{ display: "flex" }}>
      <BlockMenuStudent />
      <div className="centralBlock">
        <p className="welcomeText">Вітаємо, NINA</p>

        {/* PieCharts for Subjects */}
        <div className="subjectsPieCharts">
          {chartsData.map((data, index) => (
            <div key={index} className="pieChartContainer">
              <PieChart
                series={[{
                  data: data,
                  innerRadius: 45,
                }]}
                width={400}
                height={200}
              />
              <div className="chartValue">{data[0].value}</div>
              <div className="chartLabel">{subjects[index]}</div>
            </div>
          ))}
        </div>

        {/* Row with the Bar chart and image */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {/* Bar chart */}
          <div style={{ flex: 1, marginRight: "20px" }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Image */}
          <div style={{ flex: 1, textAlign: "center" }}>
            <img
              src={calendar}
              alt="Calendar"
              style={{
                width: "600px",
                height: "350px",
              }}
            />
          </div>
        </div>

        {/* Additional PieChart and Doughnut chart */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* PieChart */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              height: "300px", // Ensure uniform height for both charts
              position: "relative",
            }}
          >
            {/* Label for Присутність / Відсутність above PieChart */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "14px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Присутність / Відсутність
            </div>

            <PieChart
              series={[{
                data: pieChartData,
                innerRadius: 0, // Full pie chart
              }]}
              width={300}
              height={300}
            />

            {/* Color Legend for PieChart */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#FF6384",
                    marginRight: "5px",
                  }}
                />
                <span>Присутній</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#36A2EB",
                    marginRight: "5px",
                  }}
                />
                <span>Відсутній</span>
              </div>
            </div>
          </div>

          {/* Doughnut Chart */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              height: "300px", // Ensure uniform height for both charts
            }}
          >
            {/* Label for Поточний бал above Doughnut chart */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#333",
              }}
            >
              Поточний бал
            </div>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div style={{ marginTop: "10px", fontSize: "18px", color: "#333" }}>
              Поточний бал: <span style={{ fontSize: "24px", color: "#FF6384" }}>70</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
