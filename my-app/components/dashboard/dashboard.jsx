'use client';
import React from 'react';
import Pie from '@/components/dashboard/pie';
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from 'react'
import { getProfile_Income,getProfile_Balance,getProfile_id,getPaymentData} from '../../lib/dbfunctions'
import MonthlyData from './monthlydata';


const data = [
    {
      "id": "elixir",
      "label": "elixir",
      "value": 1000,
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


const supabase = createClient();
const [user, setUser] = useState(null); 
const [customer_id, setCustomer_id] = useState(null);
const [paymentData, setPaymentData] = useState([]);
const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
const [currentDate, setCurrentDate] = useState(new Date()); // State to hold the current date
const [currentendDate, setCurrentEndDate] = useState(new Date()); // State to hold the current date
const [paymentMaps, setPaymentMaps] = useState([]);
const [balance, setBalance] = useState(" ");
const [income, setIncome] = useState(" ");
const [formattedData, setFormattedData] = useState([]);
const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
const [labeledDataWithPercentage,setLabeledDataWithPercentage]=useState([]);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data.user.id); // Update user state with fetched user data
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserData();
}, []);

console.log("USER:", user)

useEffect(() => {
  const fetchCustomerData = async () => {
    try {
      
      const profileId = await getProfile_id(supabase, user);
      
      console.log("Profile:", profileId);
      setCustomer_id(profileId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchCustomerData();
}, [user]);
console.log("customerID:", customer_id);

useEffect(() => {
  const fetchIncomeData = async () => {
    try {
      
      const profileBalance = await getProfile_Balance(supabase, user);
      const profileIncome = await getProfile_Income(supabase, user);
      console.log("Profile Balance:",profileBalance[0].balance);
      setBalance(profileBalance[0].balance);
      setIncome(profileIncome[0].income);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchIncomeData();
}, [user]);

useEffect(() => {
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  setCurrentEndDate(nextMonthDate);
}, [currentDate]);



const monthlyData = MonthlyData({ user });
console.log("MONTHLY DATA24: ",monthlyData);

  return (
    
    <div className="dashboard-container">
        {/* SHOW Current Blance And Income */}
        <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
        {/* Current Balance */}
        <div className="bg-gray-200 p-4 rounded-md">
          <p className="text-lg text-center font-semibold text-black">Current Balance:</p>
          <p className="text-xl text-center text-indigo-600">{balance ? `$${balance}` : 'Not available'}</p>
        </div>
    
        {/* Current Income */}
        <div className="bg-gray-200 p-4 rounded-md">
          <p className="text-lg text-center font-semibold text-black">Current Income:</p>
          <p className="text-xl text-center text-indigo-600">{income ? `$${income}` : 'Not available'}</p>
        </div>
      </div>
    </div>




    <div className="bg-gray-200 p-4 rounded-md">
          <p className="text-lg text-center font-semibold text-black">Total Monthly Expense:</p>
          <p className="text-xl text-center text-indigo-600">{monthlyData.totalMonthlyExpense ? `$${monthlyData.totalMonthlyExpense}` : 'Not available'}</p>
        </div>

<header className="header" style={{ height: '600px', display: 'flex', flexDirection: 'row' }}>
    
    {/* Left column */}
    <div className="flex-1 w-32">
        <Pie data={monthlyData.formattedData} /> {/* Render the Pie component here */}
    </div>

    {/* Right column */}    
    <div className="flex-1  w-64 mr-10">
        <h1 className='text-center mb-4 text-lg font-bold'>Monthly Spendings</h1>
        <div className="overflow-auto text-center border border-gray-300 rounded-md ">
            <table className="w-full table-fixed ">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Expense Type</th>
                        <th className="px-4 py-2">Monthly Budget</th>
                        <th className="px-4 py-2">Budget %</th>
                    </tr>
                </thead>
                <tbody>
                {monthlyData.labeledDataWithPercentage.map((item, index) => (
                  
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="px-4 py-2">{item.label}</td>
                    <td className="px-4 py-2">${item.value}</td>
                    <td className="px-4 py-2">{item.percentage}</td>
                    {/* Add more columns if needed */}
                </tr>
                ))}
                    
                    
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    </div>


</header>
    </div>
);
}

export default Dashboard;
