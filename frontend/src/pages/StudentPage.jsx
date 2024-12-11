import React, { useEffect } from "react";
import { BlockMenuStudent } from "../components/BlockMenuStudent/BlockMenuStudent";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import "../styles/StudentPage.css";
import calendar from '../images/calendar.jpg';

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

  //Це оголошення змінної currentUser, яка буде містити результат виклику useSelector.
  // У цьому випадку — об'єкт користувача, взятий із глобального стану Redux.

  const currentUser = useSelector((state) => state.auth?.userInfo);


  const chartsData = [
    [{ id: 0, value: 16, color: "#FF6384" }, { id: 1, value: 84, color: "#E6E6E6" }],
    [{ id: 0, value: 25, color: "#FF9F40" }, { id: 1, value: 75, color: "#E6E6E6" }],
    [{ id: 0, value: 30, color: "#3C8DBC" }, { id: 1, value: 70, color: "#E6E6E6" }],
    [{ id: 0, value: 40, color: "#4DFF00" }, { id: 1, value: 60, color: "#E6E6E6" }],
    [{ id: 0, value: 50, color: "#FF4F00" }, { id: 1, value: 50, color: "#E6E6E6" }],
    [{ id: 0, value: 60, color: "#9C27B0" }, { id: 1, value: 40, color: "#E6E6E6" }],
    [{ id: 0, value: 70, color: "#8BC34A" }, { id: 1, value: 30, color: "#E6E6E6" }],
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

  useEffect(() => {
    // Initialize knobs when the component mounts
    $(".knob").knob();
  }, []);

  return (
    <div className="main" style={{ display: "flex" }}>
      <BlockMenuStudent />
      <div className="centralBlock">
        <p className="welcomeText">Вітаємо, {currentUser.Name}</p>

        {/* Knob Charts for Subjects */}
        <div className="subjectsKnobCharts">
          {chartsData.map((data, index) => (
            <div key={index} className="knobChartContainer">
              <div className="knob-wrapper">
                <input
                  type="text"
                  className="knob"
                  value={data[0].value}
                  data-width="90"
                  data-height="90"
                  data-fgcolor={data[0].color}
                  style={{
                    position: "relative",
                    marginTop: "30px",
                    marginLeft: "-69px",
                  }}
                />
                <div className="knob-label">{subjects[index]}</div>
              </div>
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
      </div>
    </div>
  );
};
