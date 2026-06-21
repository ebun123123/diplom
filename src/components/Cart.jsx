import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';

export default function Cart() {
  const { cart, theme, removeFromCart, createOrder } = useCountry();
  const navigate = useNavigate();

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const total = cart.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  const handleCheckoutClick = () => {
    const success = createOrder();
    if (success) {
      alert('Заказ успешно оформлен!');
      navigate('/profile'); 
    } else {
      alert('Не удалось оформить заказ.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-xs text-slate-400">Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-black text-slate-900 mb-4">Ваша корзина</h2>
      
      <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto mb-4">
        {cart.map((item) => (
          <div key={item.id} className="py-3 flex items-center justify-between gap-4">
            <div className="flex-grow">
              <h4 className="text-xs font-bold text-slate-800">
                {item.name} <span className="text-slate-400 font-normal">x{item.quantity || 1}</span>
              </h4>
              <p className="text-[10px] text-slate-400">{item.weight}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-900">
                {parsePrice(item.price) * (item.quantity || 1)} ₽
              </span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-slate-400 hover:text-rose-500 transition-colors text-sm font-bold px-1"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-4">
        <div className="flex justify-between text-xs mb-4">
          <span className="text-slate-500">Сумма заказа:</span>
          <span className="font-black text-slate-900">{total} ₽</span>
        </div>

        <button 
          onClick={handleCheckoutClick}
          className={`w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${theme.primaryColor} ${theme.hoverColor}`}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}