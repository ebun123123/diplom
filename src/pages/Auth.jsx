import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';

export default function Auth() {
  const { theme, registerUser, loginUser, user, logoutUser } = useCountry();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false); // Стейт для согласия на обработку ПД
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  
  const [touched, setTouched] = useState({ name: false, email: false, password: false, phone: false });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: 'bg-slate-200' });

  useEffect(() => {
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (isRegister && formData.name && formData.name.length < 2) {
      newErrors.name = 'Имя должно быть не короче 2-х символов';
    }

    if (isRegister && formData.phone && formData.phone.replace(/\D/g, '').length < 11) {
      newErrors.phone = 'Введите номер полностью';
    }

    setErrors(newErrors);

    if (isRegister && formData.password) {
      const pass = formData.password;
      let score = 0;
      if (pass.length >= 6) score++;
      if (/[A-Z]/.test(pass) || /[А-Я]/.test(pass)) score++; 
      if (/[0-9]/.test(pass)) score++; 
      if (/[!@#$%^&*]/.test(pass)) score++; 

      if (pass.length < 4) {
        setPasswordStrength({ score: 1, text: 'Слишком короткий', color: 'bg-red-500 w-1/4' });
      } else if (score <= 1) {
        setPasswordStrength({ score: 1, text: 'Слабый пароль', color: 'bg-orange-500 w-2/4' });
      } else if (score === 2 || score === 3) {
        setPasswordStrength({ score: 2, text: 'Хороший пароль', color: 'bg-amber-500 w-3/4' });
      } else {
        setPasswordStrength({ score: 3, text: 'Отличный пароль!', color: 'bg-emerald-500 w-full' });
      }
    } else {
      setPasswordStrength({ score: 0, text: '', color: 'bg-slate-200 w-0' });
    }

  }, [formData, isRegister]);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); 
    if (input.startsWith('7') || input.startsWith('8')) input = input.substring(1);
    
    let formatted = '';
    if (input.length > 0) formatted += '+7 (' + input.substring(0, 3);
    if (input.length >= 4) formatted += ') ' + input.substring(3, 6);
    if (input.length >= 7) formatted += '-' + input.substring(6, 8);
    if (input.length >= 9) formatted += '-' + input.substring(8, 10);
    
    setFormData({ ...formData, phone: formatted || input });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (Object.keys(errors).length > 0) {
      setError('Пожалуйста, исправьте ошибки в форме перед отправкой.');
      return;
    }

    if (isRegister) {
      if (!agreed) {
        setError('Необходимо дать согласие на обработку персональных данных.');
        return;
      }
      if (formData.password.length < 4) {
        setError('Пароль слишком короткий!');
        return;
      }
      registerUser(formData);
      localStorage.setItem('token', 'true');
      alert('Регистрация успешна! Данные сохранены в системе.');
      navigate('/');
    } else {
      const res = loginUser(formData.email, formData.password);
      if (res && res.success) {
        localStorage.setItem('token', 'true');
        alert('Успешный вход в ИС!');
        navigate('/');
      } else {
        setError(res ? res.message : 'Ошибка авторизации');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logoutUser();
    navigate('/auth');
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
        <span className="text-4xl block mb-2">👤</span>
        <h2 className="text-xl font-black text-slate-900">Личный кабинет</h2>
        <p className="text-xs text-slate-400 mt-1">Информационная система авторизации</p>
        
        <div className="bg-slate-50 p-4 rounded-lg my-6 text-left text-xs space-y-2">
          <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.phone && <p><strong>Телефон:</strong> {user.phone}</p>}
          <p><strong>Токен сессии:</strong> active_local_storage_session</p>
        </div>

        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
          Выйти из аккаунта
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-black text-slate-900">{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
      </div>

      {error && (
        <div className="mb-4 p-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-xs font-bold animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ваше имя</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onBlur={() => handleBlur('name')}
                placeholder="Константин"
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                  touched.name && errors.name ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
              {touched.name && errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ {errors.name}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Телефон</label>
              <input 
                type="text" required
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur('phone')}
                placeholder="+7 (999) 000-00-00"
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
                  touched.phone && errors.phone ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
              {touched.phone && errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ {errors.phone}</p>}
            </div>
          </>
        )}

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</label>
          <input 
            type="email" required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onBlur={() => handleBlur('email')}
            placeholder="user@example.com"
            className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${
              touched.email && errors.email ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-slate-400'
                }`}
          />
          {touched.email && errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">⚠️ {errors.email}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Пароль</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 pr-10"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-2 text-sm text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
          
          {isRegister && formData.password && (
            <div className="mt-2">
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${passwordStrength.color}`}></div>
              </div>
              <p className="text-[9px] text-slate-400 mt-1 flex justify-between">
                <span>Сложность: <strong>{passwordStrength.text}</strong></span>
                <span className="text-[8px]">A-z, 0-9, !@#</span>
              </p>
            </div>
          )}
        </div>

        {/* ЧЕКБОКС СОГЛАСИЯ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ */}
        {isRegister && (
          <div className="flex items-start space-x-2 pt-1">
            <input 
              type="checkbox" 
              id="privacy"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 text-slate-950 border-slate-300 rounded focus:ring-0 accent-slate-900 cursor-pointer"
            />
            <label htmlFor="privacy" className="text-[10px] text-slate-500 leading-tight cursor-pointer select-none">
              Я даю согласие на <span className="underline font-medium text-slate-700">обработку персональных данных</span> в соответствии с Политикой конфиденциальности.
            </label>
          </div>
        )}

        <button 
          type="submit" 
          disabled={(isRegister && Object.keys(errors).length > 0) || (isRegister && !agreed)}
          className={`w-full text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-all ${
            (isRegister && Object.keys(errors).length > 0) || (isRegister && !agreed)
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : `${theme.primaryColor} ${theme.hoverColor}`
          }`}
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t text-xs">
        <button onClick={() => { setIsRegister(!isRegister); setError(''); setTouched({}); setAgreed(false); }} className="text-slate-500 hover:underline">
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>
      </div>
    </div>
  );
}