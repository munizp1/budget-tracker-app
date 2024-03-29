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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="tw-brand">
          <h1>Budget Tracker</h1>
        </div>
          <li><a href="/protected">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="/contact2">Contact</a></li>
          {isSupabaseConnected && <SignUpButton />}
          {isSupabaseConnected && <AuthButton />}
         
          </div>
            </nav>
        </div>
    );
}
