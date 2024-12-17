// import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
// import { desktopOS, valueFormatter } from './webUsageStats';
import HeaderTeacher from "../components/HeaderTeacher/HeaderTeacher";
import TableAttendance from "../components/TableAttendance/TableAttendance";
import React from "react";
import "../styles/TeacherPage.css";
import "../styles/reset.css";
import iconboxInfo from "../images/iconboxInfo.svg"; // Імпорт логотипа

export const TeacherPage = () => {
    // Данные для первой диаграммы (Аттестация)
    const dataAttestation = [
        { name: 'ТВ-21', hasAttestation: 24, noAttestation: 6 },
        { name: 'ТВ-22', hasAttestation: 20, noAttestation: 10 },
        { name: 'ТВ-23', hasAttestation: 25, noAttestation: 5 },
    ];
    // Фільтруємо дані для групи ТВ-21
    const dataForTWB21 = dataAttestation.find(item => item.name === 'ТВ-21');
    // Фільтруємо дані для групи ТВ-21
    const dataForTWB22 = dataAttestation.find(item => item.name === 'ТВ-22');
    // Фільтруємо дані для групи ТВ-21
    const dataForTWB23 = dataAttestation.find(item => item.name === 'ТВ-23');

    // Дані для кругової діаграми (атестація для ТВ-21)
    const pieDataFor21 = [
        { label: 'Атестовані', value: dataForTWB21.hasAttestation },
        { label: 'Неатестовані', value: dataForTWB21.noAttestation },
    ];
    const pieDataFor22 = [
        { label: 'Атестовані', value: dataForTWB22.hasAttestation },
        { label: 'Неатестовані', value: dataForTWB22.noAttestation },
    ];
    const pieDataFor23 = [
        { label: 'Атестовані', value: dataForTWB22.hasAttestation },
        { label: 'Неатестовані', value: dataForTWB22.noAttestation },
    ];

    const seriesAttestation = [
        {
            label: 'Атестовані',
            data: dataAttestation.map(item => item.hasAttestation),
            stack: 'attestation', // Указываем группу для накопления
        },
        {
            label: 'Неатестовані',
            data: dataAttestation.map(item => item.noAttestation),
            stack: 'attestation', // Должно совпадать для объединения в один столбик
        },
    ];

    const categoriesAttestation = dataAttestation.map(item => item.name);

    // Данные для второй диаграммы (Посещаемость)
    const dataAttendance = [
        { date: '04.09', attendance: 10 },
        { date: '10.09', attendance: 7 },
        { date: '16.09', attendance: 4 },
        { date: '22.09', attendance: 12 },
        { date: '28.09', attendance: 18 },
        { date: '30.09', attendance: 8 },
    ];

    const seriesAttendance = [
        {
            label: 'Відвідуваність',
            data: dataAttendance.map(item => item.attendance),
        },
    ];
    const dataAttendanceTWB21 = [
        { date: '04.09', attendance: 10 },
        { date: '10.09', attendance: 7 },
        { date: '16.09', attendance: 12 },
        { date: '22.09', attendance: 15 },
        { date: '28.09', attendance: 18 },
    ];
    const seriesAttendanceTWB21 = [
        {
            label: 'Відвідуваність (ТВ-21)',
            data: dataAttendanceTWB21.map(item => item.attendance),
        },
    ];

    const categoriesAttendanceTWB21 = dataAttendanceTWB21.map(item => item.date);


    const categoriesAttendance = dataAttendance.map(item => item.date);
    // for table
    const rows = [
        { id: 1, name: "Іваненко Іван Іванович", attendance: 10 },
        { id: 2, name: "Петренко Петро Петрович", attendance: 8 },
        { id: 3, name: "Сидоренко Сидір Сидорович", attendance: 9 },
        { id: 4, name: "Коваленко Ольга Михайлівна", attendance: 11 },
        { id: 5, name: "Шевченко Тарас Григорович", attendance: 7 },
        { id: 6, name: "Гончаренко Юлія Василівна", attendance: 12 },
        { id: 7, name: "Мельник Анатолій Ігорович", attendance: 10 },
        { id: 8, name: "Ткаченко Олена Олександрівна", attendance: 6 },
        { id: 9, name: "Даниленко Марія Василівна", attendance: 9 },
        { id: 10, name: "Лисенко Олег Васильович", attendance: 8 },
        { id: 11, name: "Бойко Ірина Олександрівна", attendance: 11 },
        { id: 12, name: "Кравченко Андрій Миколайович", attendance: 10 },
        { id: 13, name: "Сергієнко Наталія Юріївна", attendance: 9 },
        { id: 14, name: "Козак Віталій Олексійович", attendance: 8 },
        { id: 15, name: "Лебідь Оксана Анатоліївна", attendance: 7 },
        { id: 16, name: "Романенко Вадим Валерійович", attendance: 12 },
        { id: 17, name: "Семенюк Галина Вікторівна", attendance: 6 },
        { id: 18, name: "Мороз Дмитро Сергійович", attendance: 10 },
        { id: 19, name: "Онищенко Катерина Павлівна", attendance: 8 },
        { id: 20, name: "Юрченко Артем Володимирович", attendance: 9 },
    ];


    const columns = [
        { field: "id", headerName: "№", align: "center" },
        { field: "name", headerName: "ПІБ" },
        { field: "attendance", headerName: "Відвідування пар", align: "center" },
    ];

    const colors = [
        "#027BFF", // Синий для аттестованных
        "#D2D6DE", // Светло-серый для неаттестованных
    ];

    return (
        <>
            <div className="wrapper">
                <HeaderTeacher />
                <main className="page">
                    <div className="page__main-block main-block">
                        <div className="main-block__container _container">
                            <h1 id="all-groups" className="main-block__title">Основи розробки трансляторів</h1>
                            <div className="main-block__charts">
                                <div className="main-block__chart main-block__chart_main">
                                    <BarChart
                                        className="custom-bar-chart"
                                        series={seriesAttestation}
                                        yAxis={[
                                            {
                                                label: 'Кількість студентів',
                                            },
                                        ]}
                                        xAxis={[{data: categoriesAttestation, scaleType: 'band'}]}
                                        margin={{top: 70, bottom: 30, left: 40, right: 10}}
                                        colors={colors}
                                        stacked
                                    />
                                    <div className="chart-label">Атестація</div>
                                </div>
                                <div className="main-block__chart main-block__chart_main">
                                    <BarChart
                                        className="custom-bar-chart"
                                        series={seriesAttendance}
                                        yAxis={[
                                            {
                                                label: 'Кількість студентів',
                                            },
                                        ]}
                                        xAxis={[{data: categoriesAttendance, scaleType: 'band'}]}
                                        margin={{top: 50, bottom: 30, left: 40, right: 10}}
                                        colors={["#027BFF"]} // Цвет для посещаемости
                                        sx={{
                                            '& .MuiChartsLegend-root': {
                                                display: 'none', // Вимикає легенду
                                            },
                                        }}
                                    />
                                    <div className="chart-label">Відвідуваність пар</div>
                                </div>
                            </div>
                            <h1 id="tv-21" className="main-block__title">ТВ-21</h1>
                            {/* Кругова діаграма для атестації */}
                            <div className="main-block__charts chartsGroup">
                                <div className="main-block__chart_group">
                                    <div className="containerForPieChart">
                                        <PieChart
                                            className="custom-pie-chart"
                                            margin={{top: 50, bottom: 30, left: 0, right: 10}}
                                            series={[
                                                {
                                                    arcLabel: (item) => `${item.value}`,
                                                    arcLabelMinAngle: 35,
                                                    arcLabelRadius: '60%',
                                                    data: pieDataFor21,
                                                },
                                            ]}
                                            colors={colors}
                                            legend={{
                                                position: {
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                },
                                                direction: 'row', // Розташування елементів легенди в ряд
                                            }}


                                        />
                                        <div className="chart-label">Атестація</div>
                                    </div>

                                </div>
                                <div className="main-block__boxInfo">
                                    <div className="main-block__text">
                                        <span className="main-block__number">30</span>
                                        <span className="main-block__caption">студентів</span>
                                    </div>
                                    <div className="main-block__iconboxInfo">
                                        <img src={iconboxInfo} alt="iconboxInfo"/>
                                    </div>
                                </div>
                                <div className="main-block__chart main-block__chart_group">
                                    <div className="containerForBarChart">
                                        <BarChart
                                            className="custom-bar-chart"
                                            series={seriesAttendanceTWB21}
                                            yAxis={[
                                                {
                                                    label: 'Кількість студентів',
                                                },
                                            ]}
                                            xAxis={[{data: categoriesAttendanceTWB21, scaleType: 'band'}]}
                                            margin={{top: 50, bottom: 30, left: 40, right: 10}}
                                            colors={["#027BFF"]}
                                            legend={{
                                                display: "none", // Вимикає легенду
                                            }}
                                            sx={{
                                                '& .MuiChartsLegend-root': {
                                                    display: 'none', // Вимикає легенду
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="chart-label">Відвідуваність пар</div>
                                </div>
                            </div>
                            <div>
                                <TableAttendance rows={rows} columns={columns} title="Відвідуваність студентів"
                                                 className="table-container"/>
                            </div>
                            <h1 id="tv-22" className="main-block__title">ТВ-22</h1>
                            {/* Кругова діаграма для атестації */}
                            <div className="main-block__charts chartsGroup">
                                <div className="main-block__chart_group">
                                    <div className="containerForPieChart">
                                        <PieChart
                                            className="custom-pie-chart"
                                            margin={{top: 50, bottom: 30, left: 0, right: 10}}
                                            series={[
                                                {
                                                    arcLabel: (item) => `${item.value}`,
                                                    arcLabelMinAngle: 35,
                                                    arcLabelRadius: '60%',
                                                    data: pieDataFor22,
                                                },
                                            ]}
                                            colors={colors}
                                            legend={{
                                                position: {
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                },
                                                direction: 'row', // Розташування елементів легенди в ряд
                                            }}


                                        />
                                        <div className="chart-label">Атестація</div>
                                    </div>

                                </div>
                                <div className="main-block__boxInfo">
                                    <div className="main-block__text">
                                        <span className="main-block__number">27</span>
                                        <span className="main-block__caption">студентів</span>
                                    </div>
                                    <div className="main-block__iconboxInfo">
                                        <img src={iconboxInfo} alt="iconboxInfo"/>
                                    </div>
                                </div>
                                <div className="main-block__chart main-block__chart_group">
                                    <div className="containerForBarChart">
                                        <BarChart
                                            className="custom-bar-chart"
                                            series={seriesAttendanceTWB21}
                                            yAxis={[
                                                {
                                                    label: 'Кількість студентів',
                                                },
                                            ]}
                                            xAxis={[{data: categoriesAttendanceTWB21, scaleType: 'band'}]}
                                            margin={{top: 50, bottom: 30, left: 40, right: 10}}
                                            colors={["#027BFF"]}
                                            legend={{
                                                display: "none", // Вимикає легенду
                                            }}
                                            sx={{
                                                '& .MuiChartsLegend-root': {
                                                    display: 'none', // Вимикає легенду
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="chart-label">Відвідуваність пар</div>
                                </div>
                            </div>
                            <div>
                                <TableAttendance rows={rows} columns={columns} title="Відвідуваність студентів"
                                                 className="table-container"/>
                            </div>
                            <h1 id="tv-23" className="main-block__title">ТВ-23</h1>
                            {/* Кругова діаграма для атестації */}
                            <div className="main-block__charts chartsGroup">
                                <div className="main-block__chart_group">
                                    <div className="containerForPieChart">
                                        <PieChart
                                            className="custom-pie-chart"
                                            margin={{top: 50, bottom: 30, left: 0, right: 10}}
                                            series={[
                                                {
                                                    arcLabel: (item) => `${item.value}`,
                                                    arcLabelMinAngle: 35,
                                                    arcLabelRadius: '60%',
                                                    data: pieDataFor23,
                                                },
                                            ]}
                                            colors={colors}
                                            legend={{
                                                position: {
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                },
                                                direction: 'row', // Розташування елементів легенди в ряд
                                            }}


                                        />
                                        <div className="chart-label">Атестація</div>
                                    </div>

                                </div>
                                <div className="main-block__boxInfo">
                                    <div className="main-block__text">
                                        <span className="main-block__number">28</span>
                                        <span className="main-block__caption">студентів</span>
                                    </div>
                                    <div className="main-block__iconboxInfo">
                                        <img src={iconboxInfo} alt="iconboxInfo"/>
                                    </div>
                                </div>
                                <div className="main-block__chart main-block__chart_group">
                                    <div className="containerForBarChart">
                                        <BarChart
                                            className="custom-bar-chart"
                                            series={seriesAttendanceTWB21}
                                            yAxis={[
                                                {
                                                    label: 'Кількість студентів',
                                                },
                                            ]}
                                            xAxis={[{data: categoriesAttendanceTWB21, scaleType: 'band'}]}
                                            margin={{top: 50, bottom: 30, left: 40, right: 10}}
                                            colors={["#027BFF"]}
                                            legend={{
                                                display: "none", // Вимикає легенду
                                            }}
                                            sx={{
                                                '& .MuiChartsLegend-root': {
                                                    display: 'none', // Вимикає легенду
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="chart-label">Відвідуваність пар</div>
                                </div>
                            </div>
                            <div>
                                <TableAttendance rows={rows} columns={columns} title="Відвідуваність студентів"
                                                 className="table-container"/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

