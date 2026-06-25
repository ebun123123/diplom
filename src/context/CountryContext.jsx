import React, { createContext, useState, useContext, useEffect } from 'react';

const CountryContext = createContext();

export const countryThemes = {
  it: {
    id: 'it', name: 'Италия', flag: '🇮🇹',
    primaryColor: 'bg-emerald-600', hoverColor: 'hover:bg-emerald-700', textColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50', gradient: 'from-emerald-50 via-white to-red-50',
    heroTitle: 'Изысканные вкусы солнечной Тосканы',
    heroDesc: 'Погрузитесь в культуру итальянского гостеприимства. Настоящая паста ручной работы, хрустящая пицца из дровяной печи.'
  },
  jp: {
    id: 'jp', name: 'Япония', flag: '🇯🇵',
    primaryColor: 'bg-red-600', hoverColor: 'hover:bg-red-700', textColor: 'text-red-600',
    accentBg: 'bg-red-50', gradient: 'from-slate-50 via-white to-red-50/30',
    heroTitle: 'Философия баланса и свежести востока',
    heroDesc: 'Тонкое искусство японской кулинарии. Свежайшие морепродукты, традиционный рамен и гармония в каждой детали.'
  },
  mx: {
    id: 'mx', name: 'Мексика', flag: '🇲🇽',
    primaryColor: 'bg-amber-500', hoverColor: 'hover:bg-amber-600', textColor: 'text-amber-600',
    accentBg: 'bg-amber-50', gradient: 'from-amber-50/50 via-white to-emerald-50/30',
    heroTitle: 'Взрывной темперамент и калейдоскоп специй',
    heroDesc: 'Попробуйте Мексику на вкус! Пикантные тако, сочные буррито со свежим гуакамоле.'
  }
};

export function CountryProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState('it');
  const [cart, setCart] = useState([]);
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('diplom_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('diplom_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('diplom_orders', JSON.stringify(orders));
  }, [orders]);

  const theme = countryThemes[currentCountry];

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const priceStr = item.price ? String(item.price) : '0';
    const numericPrice = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
    return sum + (numericPrice * (item.quantity || 1));
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const registerUser = (userData) => {
    localStorage.setItem('diplom_registered_user', JSON.stringify(userData));
    localStorage.setItem('diplom_user', JSON.stringify(userData));
    setUser(userData);
  };

  const loginUser = (email, password) => {
    const registered = localStorage.getItem('diplom_registered_user');
    if (!registered) return { success: false, message: 'Пользователь не найден в ИС!' };
    
    const parsed = JSON.parse(registered);
    if (parsed.email === email && parsed.password === password) {
      localStorage.setItem('diplom_user', JSON.stringify(parsed));
      setUser(parsed);
      return { success: true };
    }
    return { success: false, message: 'Неверный пароль или email!' };
  };

  const logoutUser = () => {
    localStorage.removeItem('diplom_user');
    setUser(null);
    setCart([]);
  };

  const createOrder = () => {
    if (cart.length === 0) return false;
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      total: cartTotal,
      userEmail: user ? user.email : 'guest'
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return true;
  };

  const userOrders = orders.filter(order => order.userEmail === (user ? user.email : ''));

  return (
    <CountryContext.Provider value={{ 
      currentCountry, setCurrentCountry, theme, cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount,
      user, registerUser, loginUser, logoutUser, createOrder, userOrders
    }}>
      {children}
    </CountryContext.Provider>
  );
}

export const useCountry = () => useContext(CountryContext);