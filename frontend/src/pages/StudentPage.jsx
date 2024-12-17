import React, {useEffect} from "react";
import {BarChart} from '@mui/x-charts/BarChart';
import {PieChart} from '@mui/x-charts/PieChart';
import {BlockMenuStudent} from "../components/BlockMenuStudent/BlockMenuStudent";
import {useSelector} from "react-redux";
import {Bar} from "react-chartjs-2";
import "../styles/StudentPage.css";

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
        legend: {position: "top"},
        title: {display: true, text: "Chart.js Bar Chart"},
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
        [{id: 0, value: 16, color: "#FF6384"}, {id: 1, value: 84, color: "#E6E6E6"}],
        [{id: 0, value: 25, color: "#FF9F40"}, {id: 1, value: 75, color: "#E6E6E6"}],
        [{id: 0, value: 30, color: "#3C8DBC"}, {id: 1, value: 70, color: "#E6E6E6"}],
        [{id: 0, value: 40, color: "#4DFF00"}, {id: 1, value: 60, color: "#E6E6E6"}],
        [{id: 0, value: 50, color: "#FF4F00"}, {id: 1, value: 50, color: "#E6E6E6"}],
        [{id: 0, value: 60, color: "#9C27B0"}, {id: 1, value: 40, color: "#E6E6E6"}],
        [{id: 0, value: 70, color: "#8BC34A"}, {id: 1, value: 30, color: "#E6E6E6"}],
    ];

    const subjectsForMenu = [
        "ВСІ ПРЕДМЕТИ",
        "ТЕХНОЛОГІЇ DEVOPS",
        "АСИНХРОННЕ ПРОГРАМУВАННЯ",
        "ОСНОВИ ІНТЕРНЕТУ РЕЧЕЙ ",
        "ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ МЕРЕЖ ПЕРЕДАЧІ ДАНИХ",
        "ОСНОВИ РОЗРОБКИ ТРАНСЛЯТОРІВ",
        "ПРАКТИЧНИЙ КУРС ІНОЗЕМНОЇ МОВИ",
        "КОМПОНЕНТИ ПРОГРАМНОЇ ІНЖЕНЕРІЇ",
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
    const dataAttendance = [
        {date: '04.09', attendance: 10},
        {date: '10.09', attendance: 7},
        {date: '16.09', attendance: 4},
        {date: '22.09', attendance: 12},
        {date: '28.09', attendance: 18},
        {date: '30.09', attendance: 8},
    ];

    const seriesAttendance = [
        {
            label: 'Відвідуваність',
            data: dataAttendance.map(item => item.attendance),
        },
    ];
    const dataAttendanceTWB21 = [
        {date: '04.09', attendance: 10},
        {date: '10.09', attendance: 7},
        {date: '16.09', attendance: 12},
        {date: '22.09', attendance: 15},
        {date: '28.09', attendance: 18},
    ];
    const seriesAttendanceTWB21 = [
        {
            label: 'Відвідуваність (ТВ-21)',
            data: dataAttendanceTWB21.map(item => item.attendance),
        },
    ];

    const categoriesAttendanceTWB21 = dataAttendanceTWB21.map(item => item.date);


    const categoriesAttendance = dataAttendance.map(item => item.date);
    return (
        <div className="main">
            <BlockMenuStudent menuItems={subjectsForMenu}/>
            <div className="centralBlock">
              <p className="welcomeText">Вітаємо, {currentUser.Name}</p>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            Оцінки з усіх предметів
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="knob-container">
                            {chartsData.map((data, index) => (
                                <div key={index} className="knob-item">
                                    <input
                                        type="text"
                                        className="knob"
                                        value={data[0].value}
                                        data-width="90"
                                        data-height="90"
                                        data-fgColor={data[0].color}
                                        readOnly
                                    />
                                    <div className="knob-label">{subjects[index]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="main-block__chart_student main-block__chart_main_student">
                    <BarChart
                        className="custom-bar-chart_student"
                        series={seriesAttendance}
                        yAxis={[
                            {
                                label: 'Кількість студентів',
                            },
                        ]}
                        xAxis={[{data: subjects, scaleType: 'band'}]}
                        margin={{top: 50, bottom: 30, left: 40, right: 10}}
                        colors={["#027BFF"]} // Цвет для посещаемости
                        sx={{
                            '& .MuiChartsLegend-root': {
                                display: 'none', // Вимикає легенду
                            },
                        }}
                    />
                </div>
                <h3 className="title_subject">Технології DevOps</h3>
                {/* Row with the Bar chart and image */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                </div>
            </div>
        </div>
    )
        ;
};
