'use client';
import MonthlyData from '../dashboard/monthlydata';
import React, { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
export default function Aboutmepage() {

  const supabase = createClient();
  const [user, setUser] = useState(null); 
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

console.log("USER:", user);

const monthlyData = MonthlyData({ user });
console.log("MONTHLY DATA: ",monthlyData);




    return (
      <div>
      <div className="py-6 font-bold bg-stone-400 text-center"></div>
    
        <div className="text-center py-20 lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
        
          
            ABOUT ME PAGE 
          
        
      </div>
      </div>
    );
    
  
  
  

  }