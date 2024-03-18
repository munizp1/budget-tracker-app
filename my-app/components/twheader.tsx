import React from "react";
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import AuthButton from "./AuthButton";
import SignUpButton from "./SignUpButton";
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
        <div className="tw-header">
            <nav className="tw-navbar">
                <div className="tw-brand">
                    <h1>Budget Tracker</h1>
                </div>
                <ul className="tw-nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    {isSupabaseConnected && <li><SignUpButton /></li>}
                    {isSupabaseConnected && <li><AuthButton /></li>}
                </ul>
            </nav>
        </div>
    );
}
