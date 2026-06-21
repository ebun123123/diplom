import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div className="space-y-2">
          <h4 className="text-white font-black uppercase tracking-wider text-[11px]">ИС «Кухни мира»</h4>
          <p className="text-slate-500 leading-relaxed">
            Разработка информационно-технического обеспечения веб-сайта сети ресторанов. 
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-black uppercase tracking-wider text-[11px]">Контакты</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <span>📍</span>
              <span>г. Владивосток, ул. Светланская, д. 45</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <span>📞</span>
              <a href="tel:+74232000000" className="hover:text-white transition-colors">+7 (423) 200-01-01</a>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <span>✉️</span>
              <a href="mailto:support@worldcuisines.ru" className="hover:text-white transition-colors">support@worldcuisines.ru</a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-black uppercase tracking-wider text-[11px]">Режим работы</h4>
          <p className="text-slate-400">
            Ежедневно: с 09:00 до 22:00 <br />
            <span className="text-[10px] text-slate-500">Прием заказов на доставку до 21:30</span>
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <p>© 2026 Все права защищены. ИС сети ресторанов «Кухни мира».</p>
        <div className="flex space-x-4">
          <a 
            href="/auth" 
            className="hover:text-slate-300 underline transition-colors"
          >
            Политика конфиденциальности (ФЗ-152)
          </a>
        </div>
      </div>
    </footer>
  );
}