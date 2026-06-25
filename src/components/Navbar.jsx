import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCountry, countryThemes } from '../context/CountryContext';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const { currentCountry, setCurrentCountry, theme, cart, removeFromCart, cartTotal, cartCount, clearCart, user } = useCountry();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
      <img src="/images/logo.jpg" alt="Логотип" className="w-20 h-20" />
      <span className="text-xl font-bold">Кухни Мира</span>
        
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          <Link to="/" className={isActive('/') ? theme.textColor : 'text-slate-600 hover:text-slate-900'}>Главная</Link>
          <Link to="/menu" className={isActive('/menu') ? theme.textColor : 'text-slate-600 hover:text-slate-900'}>Меню ({theme.name})</Link>
          <Link to="/contact" className={isActive('/contact') ? theme.textColor : 'text-slate-600 hover:text-slate-900'}>Бронирование</Link>
        </nav>
        
        <div className="flex items-center space-x-4 relative">
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {Object.values(countryThemes).map((c) => (
              <button
                key={c.id}
                onClick={() => setCurrentCountry(c.id)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  currentCountry === c.id ? 'bg-slate-900 text-white shadow-sm scale-105' : 'text-slate-600 hover:bg-white'
                }`}
              >
                <span>{c.flag}</span>
                <span className="hidden sm:inline">{c.name}</span>
              </button>
            ))}
          </div>

     
          <Link to="/auth" className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-xs font-bold text-slate-700 max-w-[120px] truncate transition-colors">
            {user ? `👤 ${user.name || 'Профиль'}` : '👤 Войти'}
          </Link>

         
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl shrink-0 transition-colors">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>

          {isCartOpen && (
            <div className="absolute right-0 top-14 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50">
              <h4 className="text-sm font-black text-slate-900 border-b pb-2 mb-3 flex justify-between items-center">
                <span>Ваш заказ:</span>
                {cart.length > 0 && <button onClick={clearCart} className="text-[10px] text-red-500 font-normal hover:underline">Очистить</button>}
              </h4>
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Корзина пуста.</p>
              ) : (
                <>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs">
                        <div className="max-w-[70%]">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.price} × {item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 font-bold px-1">✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 text-xs">
                    <div className="flex justify-between font-black text-slate-900 mb-3 text-sm">
                      <span>Итого:</span>
                      <span>{cartTotal} ₽</span>
                    </div>
                    <button onClick={() => navigate('/checkout')} className={`w-full text-center text-white font-bold py-2.5 rounded-xl text-xs ${theme.primaryColor} ${theme.hoverColor}`}>
                      Оформить заказ
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}