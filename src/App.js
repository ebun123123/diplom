import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CountryProvider } from './context/CountryContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import CookieBanner from './components/CookieBanner';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default function App() {
  return (
    <CountryProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* ОТКРЫТЫЕ СТРАНИЦЫ (Доступны всем без регистрации) */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* ЗАЩИЩЕННЫЕ СТРАНИЦЫ (Только для зарегистрированных) */}
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              {/* Если бронирование столов — это отдельная страница, добавьте её сюда: */}
              {/* <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} /> */}
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </Router>
    </CountryProvider>
  );
}