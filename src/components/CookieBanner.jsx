import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md p-4 bg-white border border-slate-200 rounded-xl shadow-lg z-50 transition-all duration-300">
      <div className="flex flex-col space-y-3">
        <div className="flex items-start space-x-2">
          <span className="text-xl">🍪</span>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Мы собираем файлы Cookie</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Этот сайт использует файлы cookie для обеспечения работоспособности ИС, персонализации сервисов и улучшения пользовательского опыта.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={handleAccept}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}