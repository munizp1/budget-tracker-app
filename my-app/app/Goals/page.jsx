'use client'
import React, { useState } from 'react';
import './App.css'; 
import Graph from './Graph';

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Vacation Fund', amount: 10000 },
    { id: 2, description: 'Emergency Fund Goal', amount: 5000 },
  ]);

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-3xl py-6 mb-10 bg-teal-400 text-white rounded">Savings Goals</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <Graph transactions={transactions} />
        </div>
      </div> 
    </div>
  );
}

export default App;

