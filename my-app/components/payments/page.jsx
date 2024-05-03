'use client';
import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createClient } from '@/utils/supabase/client';
import { getPaymentData, getProfile_id } from '../../lib/dbfunctions';

// Custom styles for the month picker button
const customDatePickerStyles = {
  backgroundColor: '#ff00ea',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s, box-shadow 0.2s',
};

export default function PaymentPage() {
  const [customer_id, setCustomer_id] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentData, setPaymentData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentendDate, setCurrentEndDate] = useState(new Date());
  const [paymentMaps, setPaymentMaps] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [labeledDataWithPercentage, setLabeledDataWithPercentage] = useState([]);

  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const profileId = await getProfile_id(supabase, user);
        setCustomer_id(profileId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCustomerData();
  }, [user]);

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
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentCategories();
  }, [customer_id]);

  useEffect(() => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentEndDate(nextMonthDate);
  }, [currentDate]);

  useEffect(() => {
    const calculatePaymentsMaps = () => {
      const newPaymentMaps = [];
      paymentData.forEach((payment) => {
        console.log("Processing payment: ", payment);
        const newPaymentMap = new Map();
        const { price, started_at, end_at, time, category } = payment;
        const startDate = new Date(started_at);
        console.log("Start Date: ", startDate)

        //const endDate = new Date(end_at);
        const endDate = end_at === 'Never' ? 'Never' : new Date(end_at);
        console.log("End Date: ", endDate);
        console.log("TIME: ", time);

        

        if(time.includes('Every') && time.includes('days') && endDate == 'Never') {
            const interval = parseInt(time.split(' ')[1]);
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 1st: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + interval);
              console.log("For Days: ",paymentDate);
              if (paymentDate >= currentDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
              
              
            }
    
          }
          else if(time.includes('Every') && time.includes('weeks') && endDate == 'Never') {
            const interval = parseInt(time.split(' ')[1]);
            const total = interval*7 
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 2nd: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + total);
              console.log("For weeks: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=currentendDate){
              newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
    
          }
          else if(time.includes('Every') && time.includes('months') && endDate == 'Never') {
            const interval = parseInt(time.split(' ')[1]);
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 3rd: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setMonth(paymentDate.getMonth() + interval);
    
              if (paymentDate >= currentDate && paymentDate<=currentendDate){
              newPaymentMap.set(paymentDate.toDateString(), price);
              
              }
            }
    
          }
    
          else if (time.includes('Every') && time.includes('days') && endDate.toString().includes('After') ) {
            const interval = parseInt(time.split(' ')[1]);
            const endinterval= parseInt(endDate.split(' ')[1]);
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 4th: ", paymentDate);
    
            for (let i = 0; i < endinterval; i++) {
    
              while (paymentDate <= currentendDate) {
                paymentDate.setDate(paymentDate.getDate() + interval);
    
              if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
                  newPaymentMap.set(paymentDate.toDateString(), price);
                  
              } 
            }
            }
          }
    
    
          else if (time.includes('Every') && time.includes('weeks') && endDate.toString().includes('After') ) {
            const interval = parseInt(time.split(' ')[1]);
            const total = interval*7;
            const endinterval= parseInt(endDate.split(' ')[1]);
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 4th: ", paymentDate);
    
            for (let i = 0; i < endinterval; i++) {
    
              while (paymentDate <= currentendDate) {
                paymentDate.setDate(paymentDate.getDate() + total);
    
              if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
                  newPaymentMap.set(paymentDate.toDateString(), price);
                  
              } 
            }
            }
          }
    
          else if (time.includes('Every') && time.includes('months') && endDate.toString().includes('After') ) {
            const interval = parseInt(time.split(' ')[1]);
            
            const endinterval= parseInt(endDate.split(' ')[1]);
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 4th: ", paymentDate);
    
            for (let i = 0; i < endinterval; i++) {
    
              while (paymentDate <= currentendDate) {
                paymentDate.setDate(paymentDate.getMonth() + interval);
    
              if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
                  newPaymentMap.set(paymentDate.toDateString(), price);
                  
              } 
            }
            }
          }
    
          else if(time.includes('Every') && time.includes('days') && !endDate.toString().includes('After') && !endDate=='Never') {
            const interval = parseInt(time.split(' ')[1]);
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 5th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + interval);
              console.log("For Days: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=endDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
    
          else if(time.includes('Every') && time.includes('weeks') && !endDate.toString().includes('After') && !endDate=='Never') {
            const interval = parseInt(time.split(' ')[1]);
            const total = interval*7
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 6th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + total);
              console.log("For weeks with endDate: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=endDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
    
          else if(time.includes('Every') && time.includes('months') && !endDate.toString().includes('After') && !endDate=='Never') {
            const interval = parseInt(time.split(' ')[1]);
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 7th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getMonth() + interval);
              console.log("For months with endDate: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=endDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
    
          //Does Not Repeat 
          else if(time.includes('Does')) {
            
            console.log("HAHAHAHHAHHA");
            let paymentDate = new Date(startDate);
            if (paymentDate<=currentendDate && paymentDate>=currentDate){
              paymentDate.setDate(paymentDate.getDate()+1);
              newPaymentMap.set(paymentDate.toDateString(), price);
            }
          }
          //Daily 
          else if(time.includes('Daily') && endDate=='Never') {
            
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 9th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + 1);
              console.log("For Daily: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=currentendDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
          //WeeklyOn
          else if(time.includes('Weekly') && endDate=='Never') {
            
            const total = 7
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 6th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              newPaymentMap.set(paymentDate.toDateString(), price);
              paymentDate.setDate(paymentDate.getDate() + total);
              
              console.log("For weeks with endDate: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=currentendDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
          //MonthlyOn
          else if(time.includes('Monthly') && endDate=='Never') {
            const total = 28;
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 7th: ", paymentDate);
    
            while (paymentDate <= currentendDate) {
              paymentDate.setDate(paymentDate.getDate() + total);
              console.log("For months with endDate: ",paymentDate);
              if (paymentDate >= currentDate && paymentDate<=currentendDate){
                newPaymentMap.set(paymentDate.toDateString(), price);
              }
            }
          }
          //AnnuallyOn
          else if(time.includes('Annually') && endDate=='Never') {
            const total = 365;
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            console.log("START DATE for 7th: ", paymentDate);
    
            while (paymentDate <= currentendDate && paymentDate>=currentDate) {
              if (paymentDate<currentDate){
                paymentDate.setDate(paymentDate.getDate() + total);
              }
              newPaymentMap.set(paymentDate.toDateString(), price);
              paymentDate.setDate(paymentDate.getDate() + total); 
            }
          }
          //EveryWeekday
          else if(time.includes('weekday') && endDate=='Never') {
            
            
            let paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + 1);
            if (paymentDate.getDay() === 6) { // Saturday
              paymentDate.setDate(paymentDate.getDate() + 2); // Move to Monday
          } else if (paymentDate.getDay() === 0) { // Sunday
              paymentDate.setDate(paymentDate.getDate() + 1); // Move to Monday
          }
            console.log("START DATE for 7th: ", paymentDate);
    
            while (paymentDate <= currentendDate && paymentDate >= currentDate) {
              if (paymentDate < currentDate) {
                  paymentDate.setDate(paymentDate.getDate() + 1);
              }
              newPaymentMap.set(paymentDate.toDateString(), price);
              paymentDate.setDate(paymentDate.getDate() + 1);
      
              // Skip weekends (Saturday and Sunday)
              if (paymentDate.getDay() === 6) { // Saturday
                  paymentDate.setDate(paymentDate.getDate() + 2); // Move to Monday
              } else if (paymentDate.getDay() === 0) { // Sunday
                  paymentDate.setDate(paymentDate.getDate() + 1); // Move to Monday
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
  }, [paymentData, currentDate, currentendDate]);

  useEffect(() => {
    const formattedData = paymentMaps.map(({ category, paymentMap }) => {
      const totalValue = Array.from(paymentMap.values()).reduce((acc, curr) => acc + curr, 0);
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

      return {
        id: category,
        label: category,
        value: totalValue,
        color: randomColor
      };
    }).filter(({ value }) => value !== 0);

    setFormattedData(formattedData);
    const totalMonthlyExpense = formattedData.reduce((total, item) => total + item.value, 0);
    setTotalMonthlyExpense(totalMonthlyExpense);
    const labeledDataWithPercentage = formattedData.map(item => ({
      ...item,
      percentage: ((item.value / totalMonthlyExpense) * 100).toFixed(2) + '%'
    }));
    setLabeledDataWithPercentage(labeledDataWithPercentage);
  }, [paymentMaps, totalMonthlyExpense]);

  // Filter payments based on selected month
  const filteredPayments = paymentData.filter((payment) => {
    const paymentDate = new Date(payment.started_at);
    return (
      paymentDate.getMonth() === selectedMonth.getMonth() &&
      paymentDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  // Sort filtered payments by date in ascending order
  const sortedFilteredPayments = filteredPayments.sort((a, b) => new Date(a.started_at) - new Date(b.started_at));

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  // Custom button component for the month picker
  const CustomMonthButton = ({ value, onClick }) => (
    <button style={customDatePickerStyles} onClick={onClick}>
      {value}
    </button>
  );

  return (
    <div>
      <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '0.5rem' }}>Select Month: </label>
        <ReactDatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          customInput={<CustomMonthButton />}
        />
      </div>
  
      {/* Display repeated payments schedule */}
      <div className="mt-10">
        {paymentMaps.map(({ category, paymentMap }) => {
          const paymentsForMonth = Array.from(paymentMap.entries()).some(([date]) => {
            const paymentDate = new Date(date);
            return paymentDate.getMonth() === selectedMonth.getMonth() && paymentDate.getFullYear() === selectedMonth.getFullYear();
          });
          if (paymentsForMonth) {
            return (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">{category}</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-black">
                    {Array.from(paymentMap.entries()).map(([date, price]) => {
                      const paymentDate = new Date(date);
                      if (paymentDate.getMonth() === selectedMonth.getMonth() && paymentDate.getFullYear() === selectedMonth.getFullYear()) {
                        return (
                          <tr key={date}>
                            <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${price}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );  
}
