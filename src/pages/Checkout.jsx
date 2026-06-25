import React, { useState } from 'react';
import { useCountry } from '../context/CountryContext';

export default function Checkout() {
  const { cart, theme, clearCart } = useCountry();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isOrdered, setIsOrdered] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const cartTotal = cart.reduce((sum, item) => {
    const qty = Number(item.quantity || 1);
    return sum + (parsePrice(item.price) * qty);
  }, 0);

  const deliveryPrice = deliveryMethod === 'delivery' && cartTotal < 1500 ? 250 : 0;
  const finalTotal = cartTotal + deliveryPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900">Заказ успешно принят!</h2>
        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
          Спасибо за заказ. Наш manager свяжется с вами по номеру <span className="font-bold text-slate-800">{formData.phone}</span>.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className={`mt-8 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${theme.primaryColor} ${theme.hoverColor}`}
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-black text-slate-900">Ваша корзина пуста</h2>
        <button 
          onClick={() => window.location.href = '/'}
          className={`mt-6 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${theme.primaryColor} ${theme.hoverColor}`}
        >
          Перейти к меню
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-slate-900 mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">1. Контактные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ваше имя *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Телефон *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition-colors" 
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">2. Способ доставки</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  deliveryMethod === 'delivery' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-black text-slate-800">Курьерская доставка</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  deliveryMethod === 'pickup' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-black text-slate-800">Самовывоз (-10%)</span>
              </button>
            </div>

            {deliveryMethod === 'delivery' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Город *</label>
                  <input 
                    type="text" 
                    name="city"
                    required={deliveryMethod === 'delivery'}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Улица *</label>
                    <input 
                      type="text" 
                      name="street"
                      required={deliveryMethod === 'delivery'}
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Дом *</label>
                    <input 
                      type="text" 
                      name="house"
                      required={deliveryMethod === 'delivery'}
                      value={formData.house}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 transition-colors" 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">3. Способ оплаты</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 text-slate-900" 
                />
                <span className="text-xs font-bold text-slate-800">Онлайн-оплата картой / СБП</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="w-4 h-4 text-slate-900" 
                />
                <span className="text-xs font-bold text-slate-800">При получении</span>
              </label>
            </div>
          </div>
        </form>

        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Ваш заказ</h3>
          
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-200/60 pr-2">
            {cart.map((item, idx) => {
              const qty = Number(item.quantity || 1);
              const itemTotal = parsePrice(item.price) * qty;

              return (
                <div key={idx} className="py-3 flex justify-between gap-4 text-xs">
                  <div>
                    <p className="font-black text-slate-800">
                      {item.name} <span className="text-slate-400 font-bold ml-1">x{qty}</span>
                    </p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{item.weight}</p>
                  </div>
                  <span className="font-bold text-slate-900">{itemTotal} ₽</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 mt-4 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Сумма блюд:</span>
              <span className="font-bold text-slate-800">{cartTotal} ₽</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Доставка:</span>
              <span className="font-bold text-slate-800">
                {deliveryMethod === 'pickup' ? '0 ₽' : deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 mt-4 pt-4">
              <span>Итого:</span>
              <span>{deliveryMethod === 'pickup' ? Math.round(cartTotal * 0.9) : finalTotal} ₽</span>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              const form = document.querySelector('form');
              if (form && form.reportValidity()) {
                handleSubmit(e);
              }
            }}
            className={`w-full mt-6 py-3 rounded-xl text-xs font-bold text-white transition-colors ${theme.primaryColor} ${theme.hoverColor}`}
          >
            {paymentMethod === 'card' ? 'Оплатить онлайн' : 'Подтвердить заказ'}
          </button>
        </div>
      </div>
    </div>
  );
}