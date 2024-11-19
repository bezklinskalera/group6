// import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// import { useState } from 'react';


export const TeacherPage = () => {
    // Дані для першої діаграми (Атестація)
    const dataAttestation = [
        { name: 'ТВ-21', hasAttestation: 29, noAttestation: 1 },
        { name: 'ТВ-22', hasAttestation: 20, noAttestation: 10 },
        { name: 'ТВ-23', hasAttestation: 25, noAttestation: 5 },
    ];

    const seriesAttestation = [
        {
            label: 'Атестовані',
            data: dataAttestation.map(item => item.hasAttestation),
        },
        {
            label: 'Неатестовані',
            data: dataAttestation.map(item => item.noAttestation),
        },
    ];

    const categoriesAttestation = dataAttestation.map(item => item.name);
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
            data: dataAttendance.map(item => item.attendance),
        },
    ];

    const categoriesAttendance = dataAttendance.map(item => item.date);
    const colors = [
        "#3C8DBC",
        "#D2D6DE", // Напівпрозорий блакитний
         // Темний блакитний
    ];
    return (
        <>
            <div>
                <BarChart
                    series={seriesAttestation}
                    height={350}
                    width={500}
                    xAxis={[{data: categoriesAttestation, scaleType: 'band'}]}
                    margin={{top: 50, bottom: 30, left: 40, right: 10}}
                    colors={colors}
                />
                <div>Атестація</div>
            </div>
            <div>
                <BarChart
                    series={seriesAttendance}
                    height={350}
                    width={500}
                    xAxis={[{ data: categoriesAttendance, scaleType: 'band' }]}
                    margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
                    colors={colors}
                />

                <div>Відвідуваність пар</div>
            </div>
        </>
    );
}