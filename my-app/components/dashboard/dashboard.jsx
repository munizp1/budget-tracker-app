import React from 'react';

import Pie from '@/components/dashboard/pie';
const data = [
    {
      "id": "elixir",
      "label": "elixir",
      "value": 532,
      "color": "hsl(333, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 81,
      "color": "hsl(317, 70%, 50%)"
    },
    {
      "id": "stylus",
      "label": "stylus",
      "value": 292,
      "color": "hsl(233, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 75,
      "color": "hsl(140, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 15,
      "color": "hsl(249, 70%, 50%)"
    }
  ];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        {/* All below is Dashboard */}
        <header className="header" style={{ height: '400px' }}>
            <h1 className='text-center'>Income</h1>
            <Pie data={data} /> {/* Render the Pie component here */}
        </header>
        {/* Other components and sections */}
    </div>
);
}

export default Dashboard;
