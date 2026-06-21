import React, { useState } from 'react';
import { useCountry } from '../context/CountryContext';

export default function Contact() {
  const { theme } = useCountry();
  const [formData, setFormData] = useState({ name: '', email: '', date: '', guests: '1' }); 
  const [ticket, setTicket] = useState(null);

  const handleBooking = (e) => {
    e.preventDefault();
    setTicket({
      ...formData,
      countryName: theme.name,
      id: Math.floor(1000 + Math.random() * 9000)
    });
    setFormData({ name: '', email: '', date: '', guests: '3' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        <div>
          <h1 className="text-2xl font-black text-slate-900">Бронирование столов</h1>
          <p className="text-xs text-slate-400 mt-1">
            Текущая выбранная зона обслуживания кухни: <span className={`font-bold ${theme.textColor}`}>{theme.name}</span>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ваше имя</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Иван"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</label>
              <input 
                type="email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@mail.ru"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Дата визита</label>
                <input 
                  type="date" required value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Количество мест</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 bg-white"
                >
                  <option value="1">1 персона</option>
                  <option value="2">2 персоны</option>
                  <option value="3">3 персоны</option> 
                  <option value="4">4 персоны</option>
                  <option value="6">6+ персон</option>
                </select>
              </div>
            </div>

            <button type="submit" className={`w-full text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-all ${theme.primaryColor} ${theme.hoverColor}`}>
              Забронировать в филиале ({theme.name})
            </button>
          </form>

          {ticket && (
            <div className="mt-4 p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              <p className="font-bold text-slate-900 mb-1">🎫 Бронь успешно зафиксирована!</p>
              <p>Номер талона: <strong>№{ticket.id}</strong></p>
              <p>Мест: {ticket.guests} персоны</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}