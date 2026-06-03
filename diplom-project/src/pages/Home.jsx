import React from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';

export default function Home() {
  const { theme } = useCountry();

  return (
    <div className={`transition-all duration-500 bg-gradient-to-br ${theme.gradient} py-16 lg:py-28 min-h-[calc(100vh-80px-70px)] flex items-center`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <span className={`inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-md ${theme.accentBg} ${theme.textColor} mb-4`}>
            Текущая локация ИС: {theme.flag} {theme.name}
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl transition-all duration-500">
            {theme.heroTitle}
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed text-slate-600 transition-all duration-500">
            {theme.heroDesc}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/menu" className={`${theme.primaryColor} ${theme.hoverColor} text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all duration-300 active:scale-95`}>
              Посмотреть меню {theme.flag}
            </Link>
            <Link to="/contact" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300">
              Связаться с рестораном
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}