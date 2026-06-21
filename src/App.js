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
              <Route path="/auth" element={<Auth />} />
              
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
          
          <CookieBanner />
        </div>
      </Router>
    </CountryProvider>
  );
}