'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Assuming you are using Next.js Image component
import WiseWalletImage from './Wise-Wallet.png'; // Correct this path if it's not accurate
import MonthlyData from '../dashboard/monthlydata';
import { createClient } from "@/utils/supabase/client";
import "./styles.css";
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
    <>
      <div className="py-6 font-bold bg-stone-400 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">About Our Budget Tracking App</h1>
      </div>
      <div className="main-container">
        <div className="text-container">
          <p className="greeting text-lg leading-relaxed text-gray-700">
            Dear User,
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            We are excited to introduce you to our Budget Tracking App, meticulously designed to empower you to take control of your finances and achieve your financial goals. Whether you're planning for a dream vacation, preparing for a secure retirement, or simply managing your monthly expenses, our app is here to assist you every step of the way.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Behind our app is a dedicated team of five development members, each bringing a unique blend of expertise and passion to create a user-friendly experience:
          </p>
          <ul className="text-lg leading-relaxed text-gray-700">
            <li>Brianna - Lead Design and developer, helped bring the vision to life.</li>
            <li>Chris - 3D Graphic designer and developer, helped bring functionality to the app. </li>
            <li>Paulo - Backend Support and developer, keeps operations running smoothly and on track.</li>
            <li>Jay - Frontend Developer, helped bring the user experience to life.</li>
            <li>Shafqat - Quality Assurance, guarantees a bug-free and smooth operation</li>
          </ul>
          <p> </p>
          <p className="text-lg leading-relaxed text-gray-700">
            With our intuitive interfaces and powerful features, you can effortlessly track your income, expenses, and savings. Set budgets for various categories, monitor your spending habits, and visualize your financial progress through insightful charts and graphs.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Say goodbye to financial stress and hello to financial freedom. Join us on this journey towards better financial management.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Thank you for choosing our app to help you achieve your financial goals!
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Warm regards,<br/>
            <span className="italic">- Walter the Wise Wallet</span>
          </p>
          <div className="image-container">
          <Image src={WiseWalletImage} alt="Wise Wallet Mascot" className="w-full" />
        </div>
        </div>
      </div>
    </>
  );
}
