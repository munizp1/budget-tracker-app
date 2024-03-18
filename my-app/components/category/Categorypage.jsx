'use client';
import { useState,useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import {Model} from "../modeldata.js"
import { Canvas,useLoader } from "@react-three/fiber";
import {Suspense} from 'react'
import * as THREE from "three";
import {OrbitControls} from '@react-three/drei'
import {deleteCategory, getProfile_id, AddIncome, AddPayment, getPaymentData} from '../../lib/dbfunctions'
import { createClient } from "@/utils/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';


const categories = [
  { id: 1, name: 'Food', unavailable: false },
  { id: 2, name: 'Housing', unavailable: false },
  { id: 3, name: 'Entertainment', unavailable: false },
  { id: 4, name: 'Clothing/Accessories', unavailable: false },
  { id: 5, name: 'Education', unavailable: false },
]

const times = [
  { id: 1, name: 'Daily', unavailable: false },
  { id: 2, name: 'Weekly', unavailable: false },
  { id: 3, name: 'Every 2 Weeks', unavailable: false },
  { id: 4, name: 'Monthly', unavailable: false },
  { id: 5, name: 'Yearly', unavailable: false },
]



const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Categorypage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [customer_id, setCustomer_id] = useState(null);
  const [user, setUser] = useState(null); 
  const [income, setIncome] = useState('');
  const supabase = createClient();
  const [showCategoryInput, setShowCategoryInput] = useState(false); // State to manage the visibility of the category input field
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category
  const [price, setnewprice] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [addedCategories, setAddedCategories] = useState([]);
  const [paymentData, setPaymentData] = useState([]);


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


  console.log("REALCustomer:", customer_id)
  console.log(user)

 

  

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };
  const handleSubmitIncome = async (e) => {
    e.preventDefault();
    try {
        // Call the AddIncome function to update the income value in the user's profile
        const updatedProfile = await AddIncome(supabase, customer_id, income);
        console.log('Profile updated with income:', updatedProfile);
    } catch (error) {
        console.error('Error updating income:', error);
    }
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  // Add your logic to handle category selection here
};
const handleAddCategory = async () => {
  try {
  // Add your logic to handle adding the new category here
  console.log('Selected category:', selectedCategory);
  
  console.log('Selected Time:', selectedTime);
  console.log('Price:', price);
  await AddPayment(supabase, customer_id, selectedCategory, selectedTime, price);
    console.log('New category added successfully!');


  // Reset the input fields and hide the category input section
    setSelectedCategory('');
    setSelectedTime('');
    setPrice('');
    setShowCategoryInput(false);
  } catch (error) {
    console.error('Error adding new category:', error.message);
  }
};


useEffect(() => {
  const fetchPaymentData = async () => {
    try {
      // Fetch payment data from the database
      const data = await getPaymentData(supabase, customer_id);
      setPaymentData(data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  fetchPaymentData();
}, [customer_id]);

console.log("USER PAYEMENT DATA",paymentData)
  
const handleDeleteCategory = async (categoryId) => {
  try {
    console.log("categoryId", categoryId);
    // Call the function to delete the category from the database
    await deleteCategory(supabase,categoryId);
    
    // If deletion is successful, update the UI by removing the deleted category from the state
    setPaymentData((prevData) => prevData.filter((item) => item.id !== categoryId));
    
    console.log('Category deleted successfully!');
  } catch (error) {
    console.error('Error deleting category:', error.message);
  }
};

  

  return (    
    <div className="bg-white">
    <div className="pt-6">
      {/* INCOME */}
      <div className="flex justify-center mb-8"> {/* Added margin-bottom for spacing */}
        <form onSubmit={handleSubmitIncome} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="income" className="block text-sm font-medium text-gray-900">Income</label>
            <input
              type="text"
              id="income"
              name="income"
              value={income}
              onChange={handleIncomeChange}
              className="mt-1 px-4 py-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-black"
              placeholder="Enter your income"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
          </div>
        </form>
      </div>
  
      {/* Category */}
      {/* Category Dropdown */}
      <div className="flex items-center justify-center space-x-4">
        {/* Button to toggle the visibility of the category input field */}
        <button
          type="button"
          className="inline-flex justify-center items-center w-28 h-8 rounded-md border border-gray-300 shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setShowCategoryInput(true)}
        >
          Add Category
        </button>
        {showCategoryInput && (
          <div className="flex items-center">
            {/* Dropdown to select a category from the predefined list */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
  
            {/* Dropdown to select a Time from the predefined list */}
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            >
              <option value="">Select a Time</option>
              {times.map((times) => (
                <option key={times.id} value={times.name}>
                  {times.name}
                </option>
              ))}
            </select>
            {/* Input field to enter PRICE */}
            <input
              type="text"
              value={price}
              onChange={(e) => setnewprice(e.target.value)}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Enter Price"
            />
            {/* Button to add the selected category or custom category */}
  
            <button
              type="button"
              onClick={handleAddCategory}
              className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        )}
      </div>
  
      {/* Table displaying added categories */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4 text-black">Added Categories</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {paymentData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteCategory(item.id)} // Pass the item id to the delete handler
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )}
  