'use server';

import styles from './passwordcheck.module.css';
import React, { useState } from "react";

const PasswordCheckPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [strength, setStrength] = useState("");
  const [gifUrl, setGifUrl] = useState("");

  const crackTime = (password: string) => {
    var length = password.length;
    var possibilities = 0;
    
    for (var i = 1; i <= length; i++) {
      possibilities += Math.pow(95, i); 
    
    var seconds = possibilities / 1000000000; 
    return seconds;
  };
}

  const checkPasswordStrength = (password: string) => {
    var strength = 0;
  
    if (password.length >= 8) {
      strength += 1;
    }
  
    if (/[a-z]/.test(password)) {
      strength += 1;
    }
  
    if (/[A-Z]/.test(password)) {
      strength += 1;
    }
  
    if (/\d/.test(password)) {
      strength += 1;
    }
  
    if (/[^a-zA-Z0-9]/.test(password)) {
      strength += 1;
    }
  
    return strength;
  };

  const checkPassword = () => {
    var password = document.getElementById("password").value;
    var resultDiv = document.getElementById("result");
    var strengthDiv = document.getElementById("strength");
    var gifContainer = document.getElementById("gifContainer");
  
    // Reset previous results and GIF
    resultDiv.textContent = "";
    strengthDiv.textContent = "";
    gifContainer.innerHTML = "";
  
    var strength = checkPasswordStrength(password);
    var strengthMessage;
  
    switch(strength) {
      case 0:
      case 1:
        strengthMessage = "Weak";
        break;
      case 2:
        strengthMessage = "Less Weak";
        break;
      case 3:
      case 4:
        strengthMessage = "Strong";
        break;
      case 5:
        strengthMessage = "Very Strong";
        break;
      default:
        strengthMessage = "Unknown";
    }
  
    resultDiv.textContent = "Password strength: " + strengthMessage;
  
    // Display GIF based on strength
    var gifUrls = [
      "./Passwordcheck/gif1.gif",
      "./Passwordcheck/gif2.gif",
      "./Passwordcheck/gif3.gif",
      "./Passwordcheck/gif4.gif",
      "./Passwordcheck/gif5.gif"
    ];
  
    var gifIndex = Math.min(strength, gifUrls.length) - 1; // Limit to the number of GIFs available
    var gifUrl = gifUrls[gifIndex];
    var img = document.createElement("img");
    img.src = gifUrl;
    gifContainer.appendChild(img);
  };

  const testRules = () => {
    var password = document.getElementById("password").value;
    var resultDiv = document.getElementById("result");
  
    // Reset previous results
    resultDiv.textContent = "";
  
    // Check if the password meets each individual rule
    if (password.length < 8) {
      resultDiv.textContent += "Password should be at least 8 characters long.\n";
    }
  
    if (!/[a-z]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one lowercase letter.\n";
    }
  
    if (!/[A-Z]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one uppercase letter.\n";
    }
  
    if (!/\d/.test(password)) {
      resultDiv.textContent += "Password should contain at least one digit.\n";
    }
  
    if (!/[^a-zA-Z0-9]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one special character.\n";
    }
  
    if (resultDiv.textContent === "") {
      resultDiv.textContent = "Password meets all the rules!";
    }
  };

  return (
    <div className="password-check-container">
      <h1>Let The Cat Check your Password Strength!!!</h1>
      <label htmlFor="password">Enter a password:</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={checkPassword}>Check Strength</button>
      <button onClick={testRules}>Cat powerup hints</button>
      <div id="result">{result}</div>
      <div id="strength">{strength}</div>
      <div id="gifContainer">
        {gifUrl && <img src={gifUrl} alt="Password strength GIF" />}
      </div>
    </div>
  );
};

export default PasswordCheckPage;
