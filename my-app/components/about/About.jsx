'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Assuming you are using Next.js Image component
import WiseWalletImage from './Wise-Wallet.png'; // Correct this path if it's not accurate
import MonthlyData from '../dashboard/monthlydata';
import { createClient } from "@/utils/supabase/client";

export default function Aboutmepage() {
  const supabase = createClient();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user.id); // Make sure this path is correct based on the data returned
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  console.log("USER:", user);

  const monthlyData = MonthlyData({ user });
  console.log("MONTHLY DATA: ", monthlyData);

  return (
    <div>
      <div className="py-6 font-bold bg-stone-400 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">About Our Budget Tracking App</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
        <div className="text-center lg:w-1/2 lg:pr-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Our budget tracking app is designed to help you take control of your finances and achieve your financial goals.
            Whether you're saving for a vacation, planning for retirement, or just trying to stay on top of your monthly expenses,
            our app provides the tools you need to succeed.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            With our intuitive interfaces and powerful features, you can easily track your income, expenses, and savings.
            Set budgets for different categories, monitor your spending habits, and visualize your financial progress with
            insightful charts and graphs.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Say goodbye to financial stress and hello to financial freedom with our budget tracking app.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Join us on this journey towards better financial management.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Thank you for choosing our app to help you achieve your financial goals!
          </p>
        </div>
        <div className="lg:w-1/2">
          <Image src={WiseWalletImage} alt="Wise Wallet Mascot" className="w-full" />
        </div>
      </div>
    </div>
  );
}
