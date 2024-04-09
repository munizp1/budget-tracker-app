import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ transactions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (transactions.length > 0 && chartRef.current) {
      const labels = transactions.map(transaction => transaction.description);
      const data = transactions.map(transaction => transaction.amount);

      const ctx = chartRef.current.getContext('2d');
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'My Savings Goal(s)',
            data: data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
          ],

            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgb(255, 99, 132, 1)'
            ],

            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [transactions]);

  return <canvas ref={chartRef} />;
};

export default Graph;



