import React from "react";
import { redirect } from "next/navigation"; // Import redirect from next/navigation
import "./twheader.css";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "./AuthButton";
import SignUpButton from "./SignUpButton";

export default function TWHeader() {

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
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
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          {isSupabaseConnected && <SignUpButton />}
          {isSupabaseConnected && <AuthButton />}
         
        </div>
      </nav>
    </div>
  );
}
