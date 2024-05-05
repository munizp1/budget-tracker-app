'use client';
// App.js
import React, { useState } from 'react';
import './App.css'; // Your CSS file
import Image from 'next/image';
import gifUrl1 from './gif1.gif';
import gifUrl2 from './gif2.gif';
import gifUrl3 from './gif3.gif';
import gifUrl4 from './gif4.gif';
import gifUrl5 from './gif5.gif';
import gifbg from './bg.gif';


function App() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [strength, setStrength] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  const crackTime = (password) => {
    let length = password.length;
    let possibilities = 0;

    for (let i = 1; i <= length; i++) {
      possibilities += Math.pow(95, i); // 95 printable ASCII characters
    }

    let seconds = possibilities / 1000000000; // Assume 1 billion guesses per second
    return seconds;
  }

  const checkPasswordStrength = (password) => {
    let strength = 0;

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
  }

  const checkPassword = () => {
    setResult('');
    setStrength('');

    let strength = checkPasswordStrength(password);
    let strengthMessage;

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

    setResult("Password strength: " + strengthMessage);

    // Display GIF based on strength
    let gifUrls = [
      gifUrl1,gifUrl2,gifUrl3,gifUrl4,gifUrl5
     
    ];

    let gifIndex = Math.min(strength, gifUrls.length) - 1;
    let gifUrl = gifUrls[gifIndex];
    setGifUrl(gifUrl);
  }

  const testRules = () => {
    setResult('');

    if (password.length < 8) {
      setResult(prevResult => prevResult + "Password should be at least 8 characters long.\n");
    }

    if (!/[a-z]/.test(password)) {
      setResult(prevResult => prevResult + "Password should contain at least one lowercase letter.\n");
    }

    if (!/[A-Z]/.test(password)) {
      setResult(prevResult => prevResult + "Password should contain at least one uppercase letter.\n");
    }

    if (!/\d/.test(password)) {
      setResult(prevResult => prevResult + "Password should contain at least one digit.\n");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      setResult(prevResult => prevResult + "Password should contain at least one special character.\n");
    }

    if (result === "") {
      setResult("Password meets all the rules!");
    }
  }

  return (
    <div className="container" style={{backgroundImage: `url(${gifbg})`, backgroundSize: 'cover'}}>
      <h1><b>Let The Cat Check your Password Strength!!!</b></h1><br /><br />
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
        {gifUrl && <Image src={gifUrl} alt="GIF" width={300} height={200} />} {/* Adjust width and height as needed */}
      </div>
    </div>
  );
}

export default App;
