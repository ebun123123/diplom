import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CountryProvider } from './context/CountryContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import CookieBanner from './components/CookieBanner';

// Импортируем наш защищенный роут из папки компонентов
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <CountryProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Обертываем Checkout в импортированный компонент ProtectedRoute */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </Router>
    </CountryProvider>
  );
}