''
import React from "react";
import Image from 'next/image';
import { createClient } from "@/utils/supabase/server";
import AuthButton from "./AuthButton";
import SignUpButton from "./SignUpButton";
import Admin from "./AdminLink";
import logou from './Wise-Wallet.png'; // Import the image as a module
import "./twheader.css";

export default function TWHeader() {
    const canInitSupabaseClient = () => {
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <div className="tw-brand">
                        {/* Use the Image component from next/image */}
                        <Image src={logou} alt="Logo" className="logo" width={50} height={50} />
                        <h1>Wise Wallet</h1>
                    </div>
                    <ul className="tw-nav-links">
                        <li><a href="/Dashboard">Home</a></li>
                        <li><a href="/ManageExpensesPage">Manage Expenses</a></li>
                        <li><a href="/SavingsGoals">Saving Goals</a></li>
                        <li><a href="/UpcomingPayments">Upcoming Payments</a></li>
                        <li><a href="/About">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        {isSupabaseConnected && <SignUpButton />}
                        {isSupabaseConnected && <AuthButton />}
                        {isSupabaseConnected && <Admin />}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
