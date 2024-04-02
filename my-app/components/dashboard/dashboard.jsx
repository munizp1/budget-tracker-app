import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Budget Tracking App</h1>
            </header>
            <div className="overview">
                <div className="balance">
                    <h2>Balance</h2>
                    <p>$5000</p>
                </div>
                <div className="expenses">
                    <h2>Expenses</h2>
                    <p>$2000</p>
                </div>
                <div className="income">
                    <h2>Income</h2>
                    <p>$7000</p>
                </div>
            </div>
            <div className="transactions">
                <h2>Recent Transactions</h2>
                <ul>
                    <li>Transaction 1 - $100</li>
                    <li>Transaction 2 - $200</li>
                    <li>Transaction 3 - $50</li>
                    <li>Transaction 4 - $300</li>
                    <li>Transaction 5 - $150</li>
                </ul>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Budget Tracking App. All rights reserved.</p>
            </footer>
            
        </div>
    );
}

export default Dashboard;
