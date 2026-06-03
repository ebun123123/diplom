import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <span className="text-5xl">🚫</span>
      <h1 className="text-2xl font-black text-slate-900 mt-4">Ошибка 404</h1>
      <p className="text-sm text-slate-500 mt-2">Запрошенная страница веб-ресурса ИС не найдена.</p>
      <Link to="/" className="inline-block mt-6 text-sm font-bold text-orange-500 hover:underline">
        Вернуться на главную →
      </Link>
    </div>
  );
}