'use client';
import React from 'react';
import Pie from '@/components/dashboard/pie';
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from 'react'
import { getProfile_id,getPaymentData} from '../../lib/dbfunctions'



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
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  setCurrentEndDate(nextMonthDate);
}, [currentDate]);


useEffect(() => {
  const fetchPaymentCategories = async () => {
    try {
      const paymentData = await getPaymentData(supabase, customer_id);
      setPaymentData(paymentData);
    } catch (error) {
      console.error('Error fetching payment categories:', error);
    }
  };

  if (customer_id) {
    fetchPaymentCategories();
  }
}, [customer_id]);
console.log("ALL PAYMENTS: ",paymentData);
console.log("Total :", totalPrice);
console.log(currentDate.toDateString());



console.log(currentendDate.toDateString());

useEffect(() => {
  const calculatePaymentsMaps = () => {
    const newPaymentMaps = [];

    paymentData.forEach((payment) => {
      console.log("Processing payment: ", payment);
      const newPaymentMap = new Map();
      const { price, started_at, end_at, time, category } = payment;
      const startDate = new Date(started_at);
      console.log("Start Date: ",startDate)
      //const endDate = new Date(end_at);
      const endDate = end_at === 'Never' 
          ? 'Never' 
          : end_at.includes('After') 
          ? end_at 
          : new Date(end_at);
      console.log("End Date: ", endDate);
      console.log("TIME: ",time);

      if(time.includes('Every') && time.includes('days') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);

        while (paymentDate <= currentendDate) {
          newPaymentMap.set(paymentDate.toDateString(), price);
          paymentDate.setDate(paymentDate.getDate() + interval);
        }

      }
      else if(time.includes('Every') && time.includes('weeks') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);

        while (paymentDate <= currentendDate) {
          newPaymentMap.set(paymentDate.toDateString(), price);
          paymentDate.setDate(paymentDate.getDate() + (interval*7));
        }

      }
      else if(time.includes('Every') && time.includes('months') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);

        while (paymentDate <= currentendDate) {
          newPaymentMap.set(paymentDate.toDateString(), price);
          paymentDate.setMonth(paymentDate.getMonth() + interval);
        }

      }

      else if (endDate.toString().includes('After') && time.includes('Every')) {
        const interval = parseInt(time.split(' ')[1]);
        const endinterval= parseInt(endDate.split(' ')[1]);
        let paymentDate = new Date(startDate);

        for (let i = 0; i < endinterval; i++) {
          if (paymentDate <= currentendDate) {
              newPaymentMap.set(paymentDate.toDateString(), price);
              paymentDate.setDate(paymentDate.getDate() + interval);
          } else {
              break; // Exit the loop if paymentDate exceeds currentendDate or current date
          }
        }
      }
      else if(time.includes('Every') && time.includes('days')) {
        const interval = parseInt(time.split(' ')[1]);
        console.log("HAHAHAHHAHHA");
        let paymentDate = new Date(startDate);
        if (endDate<=currentendDate){

        
        while (paymentDate <= currentendDate) {
          newPaymentMap.set(paymentDate.toDateString(), price);
          paymentDate.setDate(paymentDate.getDate() + interval);
        }
        }
      }

      
      console.log(`Generated map :`, newPaymentMap);
      newPaymentMaps.push({ category, paymentMap: newPaymentMap });
    });
    console.log('Final payment maps:', newPaymentMaps);
    setPaymentMaps(newPaymentMaps);
  };

  calculatePaymentsMaps();
}, [paymentData]);

console.log("MAP: ", paymentMaps)

const formattedData = paymentMaps.map(({ category, paymentMap }) => {
  // Calculate the total value by summing all values in the paymentMap
  const totalValue = Array.from(paymentMap.values()).reduce((acc, curr) => acc + curr, 0);
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return {
    id: category, // Use category as id
    label: category, // Use category as label
    value: totalValue,
    color: randomColor// You may need to define this function to get color based on category
  };
}).filter(({ value }) => value !== 0);
console.log("DATAAAAA: ",formattedData);

  return (
    <div className="dashboard-container">
        {/* All below is Dashboard */}
        <header className="header" style={{ height: '400px' }}>
            <h1 className='text-center'>Income</h1>
            <Pie data={formattedData} /> {/* Render the Pie component here */}
        </header>
        {/* Other components and sections */}
    </div>
);
}

export default Dashboard;
