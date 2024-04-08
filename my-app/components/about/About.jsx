'use client';
import { useState,useEffect } from 'react'
import {deleteCustomCategory,getCustomCategory,AddCustomCategory,getProfile_Income, deleteCategory, getProfile_id, AddIncome, AddPayment, getPaymentData} from '../../lib/dbfunctions'
import { createClient } from "@/utils/supabase/client";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles


export default function Aboutmepage() {
    return (
    
    
        <div className="text-center py-20 lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
        
          
            ABOUT ME PAGE 
          
        
      </div>
    );
    
  
  
  

  }