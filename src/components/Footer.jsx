import React, { useState } from 'react';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs relative z-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div className="space-y-2">
          <h4 className="text-white font-black uppercase tracking-wider text-[11px]">ИС «Кухни мира»</h4>
          <p className="text-slate-500 leading-relaxed">
            Разработка информационно-технического обеспечения веб-сайта сети ресторанов. Проект выполнен в рамках выпускной квалификационной работы.
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
              <a href="tel:+74232000000" className="hover:text-white transition-colors">+7 (423) 200-00-00</a>
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
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-slate-300 underline transition-colors bg-transparent border-none cursor-pointer p-0 text-[11px]"
          >
            Политика конфиденциальности (ФЗ-152)
          </button>
        </div>
      </div>

      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white text-slate-800 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Политика конфиденциальности ИС «Кухни мира»
              </h3>
              <div className="text-slate-600 text-xs space-y-3 leading-relaxed pr-1">
                <p>Настоящая Политика разработана в соответствии с ФЗ-152 «О персональных данных» и определяет порядок обработки персональных данных пользователей информационной системы сети ресторанов «Кухни мира».</p>
                <p><strong>1. Сбор данных:</strong> Система собирает и обрабатывает только те данные, которые пользователь указывает при регистрации (Имя, номер телефона, адрес электронной почты).</p>
                <p><strong>2. Цель обработки:</strong> Персональные данные используются исключительно для идентификации пользователя в системе, предоставления доступа к функционалу корзины, оформления заказов и обеспечения обратной связи.</p>
                <p><strong>3. Защита данных:</strong> Администрация ИС принимает необходимые технические и организационные меры для защиты персональной информации от несанкционированного доступа, изменения или удаления.</p>
                <p><strong>4. Права пользователя:</strong> Пользователь имеет право в любой момент запросить информацию касаемо его сохраненных данных или потребовать их удаления из базы данных ИС.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPrivacyOpen(false)}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              Я ознакомлен(а)
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}