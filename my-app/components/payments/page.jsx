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
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <label style={{ marginCenter: '1rem' }}>Select Month: </label>
        <ReactDatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          customInput={<CustomMonthButton />}
        />
      </div>

      {/* Table displaying added categories */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-10 ml-12 text-black">Upcoming Payments</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ends on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {sortedFilteredPayments.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.started_at}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.end_at}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}