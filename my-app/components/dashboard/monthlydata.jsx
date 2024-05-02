import { useEffect, useState } from 'react';
import { getProfile_Balance, getProfile_id, getProfile_Income, getPaymentData } from '../../lib/dbfunctions';
import { createClient } from "@/utils/supabase/client";

const MonthlyData = ({ user }) => {
    const supabase = createClient();
    const [customer_id, setCustomer_id] = useState(null);
    const [paymentData, setPaymentData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentendDate, setCurrentEndDate] = useState(new Date());
    const [paymentMaps, setPaymentMaps] = useState([]);
    const [balance, setBalance] = useState(null);
    const [income, setIncome] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
    const [labeledDataWithPercentage, setLabeledDataWithPercentage] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const profileId = await getProfile_id(supabase, user);
              setCustomer_id(profileId);

              

              const paymentData = await getPaymentData(supabase, profileId);
              setPaymentData(paymentData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
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
                console.error('Error fetching payment categories:', error);
            }
        };

        if (customer_id) {
            fetchPaymentCategories();
        }
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

    return {
        
        totalMonthlyExpense,
        labeledDataWithPercentage,
        formattedData,
        paymentData,
        currentDate,
        currentendDate,
    };
};

export default MonthlyData;
