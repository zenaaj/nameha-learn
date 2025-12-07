# 📈 NAMEHA Learn — React Trading Simulation Platform

NAMEHA Learn is a simplified trading simulation web application built with React.js.  
It allows users to learn how stock trading works by viewing live market data, simulating trades, and tracking a virtual portfolio.  
This project was developed as part of the CPIT405 Web Development course.

---

## 🚀 Live Demo
🔗 **https://YOUR-DEPLOYED-SITE.netlify.app**  
(Replace with your actual deployment link)

---

## 📌 Features

### 🔐 **User Authentication**
- User registration and login  
- Secure password handling  
- Logout functionality  
- Session persistence with localStorage  
- Protected pages that require login  

### 📊 **Dashboard — Live Market Data**
- Shows multiple popular stock symbols (AAPL, TSLA, AMZN, MSFT, GOOGL, NVDA)  
- Fetches **real-time prices** using the AlphaVantage API  
- Loading indicators  
- Error handling for API limits and invalid responses  
- Clean grid layout that resembles real trading platforms  

### 💰 **Trading Simulator**
- Search for any stock symbol  
- Fetch the latest live price  
- Simulate buying the stock  
- Loading and error states implemented  
- Input validation  

### 📂 **Portfolio Tracking**
- Stores purchased assets in localStorage  
- Displays symbol, price, and date purchased  
- Data persists even after refreshing the page  

### 👤 **User Profile**
- Displays basic user information  
- Allows future expansion (photo, preferences, etc.)

### 🔒 **Protected Routing**
- Certain pages are only accessible after login  
- Unauthorized users are redirected to the login page  

---

## 🧩 **Tech Stack**

### **Frontend**
- React.js (Latest version)
- React Router DOM  
- CSS3 (Custom styling)  

### **API**
- **AlphaVantage Stock Market API** (Live market data)

### **Tools**
- Git & GitHub  
- Netlify (or Vercel) for deployment  

---

## 🗂️ Project Structure

