import React from 'react';
import { Line } from 'react-chartjs-2';

function ExpenseChart() {
  // Dados de exemplo para o gráfico
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Valor Gasto',
        data: [100, 200, 150, 300, 250, 400],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Opções de personalização do gráfico
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default ExpenseChart;
