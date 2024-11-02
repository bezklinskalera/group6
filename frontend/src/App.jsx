import { useState } from 'react'
import './App.css'
import { BarChart } from '@mui/x-charts/BarChart';

function App() {
  const [count, setCount] = useState(0)
  const data = [
    { name: 'ТВ-21', атестовані: 25, неАтестовані: 5 },
    { name: 'ТВ-22', атестовані: 27, неАтестовані: 3 },
    { name: 'ТВ-23', атестовані: 15, неАтестовані: 12 },
  ];
  
  const series = [
    {
      label: 'Атестовані',
      data: data.map(item => item.атестовані),
    },
    {
      label: 'Неатестовані',
      data: data.map(item => item.неАтестовані),
    },
  ];
  
  const categories = data.map(item => item.name);

  return (
    
    
    <BarChart
      series={series}
      height={360}
      xAxis={[{ data: categories, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  )
}

export default App
