import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import PeopleIcon from '@mui/icons-material/People';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid2 container spacing={4}>
        {/* Основна статистика */}
        <Grid2 xs={12} md={4}>
          <StudentStats />
        </Grid2>

        {/* Діаграми */}
        <Grid2 xs={12} md={8}>
          <AttestationChart />
        </Grid2>

        {/* Викладачі */}
        <Grid2 xs={12} md={6}>
          <TeachersTable />
        </Grid2>

        {/* Рейтинг викладачів */}
        <Grid2 xs={12} md={6}>
          <TeachersRating />
        </Grid2>
      </Grid2>
    </Container>
  );
}

// Компонент статистики студентів
function StudentStats() {
  const stats = [
    { label: '300 студентів', icon: <PeopleIcon fontSize="large" />, color: '#1976d2' },
    { label: '35 викладачів', icon: <PeopleIcon fontSize="large" />, color: '#9c27b0' },
    { label: '21 група', icon: <PeopleIcon fontSize="large" />, color: '#2e7d32' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Основна статистика</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              color="white"
              bgcolor={stat.color}
              borderRadius={2}
              p={2}
            >
              <Box display="flex" alignItems="center">
                {stat.icon}
                <Typography variant="body1" ml={2}>{stat.label}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// Компонент діаграми атестації
function AttestationChart() {
  const dataBar = {
    labels: ['1 курс', '2 курс', '3 курс'],
    datasets: [
      {
        label: 'Неатестація',
        data: [15, 20, 25],
        backgroundColor: 'rgba(255,99,132,0.8)',
      },
      {
        label: 'Атестація',
        data: [30, 25, 35],
        backgroundColor: 'rgba(54,162,235,0.8)',
      },
    ],
  };

  const dataPie = {
    labels: ['Атестація', 'Неатестація'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Атестація</Typography>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            <Typography variant="body1" gutterBottom>Гістограма</Typography>
            <Box height={200}>
              <Bar data={dataBar} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Typography variant="body1" gutterBottom>Пай-чарт</Typography>
            <Box height={200}>
              <Pie data={dataPie} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}

// Таблица викладачів
function TeachersTable() {
  const teachers = [
    {
      pib: 'Варава Іван Андрійович',
      predmet: 'КПІ',
      credits: 20,
      groups: 'ТВ-21, ТВ-22',
    },
    {
      pib: 'Гусєва Ірина Ігорівна',
      predmet: 'Програмне забезпечення мереж передачі даних',
      credits: 15,
      groups: 'ТВ-21',
    },
    {
      pib: 'Стативка Юрій Іванович',
      predmet: 'Основи розробки трансляторів',
      credits: 10,
      groups: 'ІПЗ-12',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Викладачі</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ПІБ</TableCell>
              <TableCell>Предмет</TableCell>
              <TableCell>К-ть кредитів</TableCell>
              <TableCell>Групи</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={index}>
                <TableCell>{teacher.pib}</TableCell>
                <TableCell>{teacher.predmet}</TableCell>
                <TableCell>{teacher.credits}</TableCell>
                <TableCell>{teacher.groups}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Рейтинг викладачів
function TeachersRating() {
  const ratings = [
    {
      subject: 'Практичний курс іноземної мови професійного спрямування',
      teacher: 'Семигінівська Тетяна Григорівна',
      rating: 85,
    },
    {
      subject: 'Основи розробки трансляторів',
      teacher: 'Стативка Юрій Іванович',
      rating: 70,
    },
    {
      subject: 'Технології DevOps',
      teacher: 'Колумбет Вадим Петрович',
      rating: 20,
    },
    {
      subject: 'Паралельне програмування',
      teacher: 'Варава Іван Андрійович',
      rating: 100,
    },
    {
      subject: 'Асинхронне програмування',
      teacher: 'Олєнєва Ксенія Миколаївна',
      rating: 80,
    },
  ];

  const getColor = (rating) => {
    if (rating >= 80) return 'green'; // Высокий рейтинг
    if (rating >= 60) return 'orange'; // Средний рейтинг
    return 'red'; // Низкий рейтинг
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Рейтинг викладачів</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Дисципліна</TableCell>
              <TableCell>Викладач</TableCell>
              <TableCell align="center">Рейтинг (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((rating, index) => (
              <TableRow key={index}>
                <TableCell>{rating.subject}</TableCell>
                <TableCell>{rating.teacher}</TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Typography variant="body2" color={getColor(rating.rating)}>
                      {rating.rating}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={rating.rating}
                      sx={{
                        height: 10,
                        flexGrow: 1,
                        backgroundColor: '#f5f5f5',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getColor(rating.rating),
                        },
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
