import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCountry } from '../context/CountryContext';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const DISHES_DATABASE = {
  it: [
    { id: 'it-soup-1', category: 'Супы', name: 'Минестроне с соусом песто', desc: 'Традиционный итальянский густой суп из сезонных овощей, фасоли и пасты, подается с ароматным базиликовым песто.', weight: '350г', info: '210 ккал', price: '380 ₽', img: "/images/dishes/minestrone.jpg" },
    { id: 'it-soup-2', category: 'Супы', name: 'Томатный суп с морепродуктами', desc: 'Пряный суп на основе протертых томатов Пелати с добавлением тигровых креветок, кальмаров, мидий и чесночных гренок.', weight: '400г', info: '340 ккал', price: '590 ₽', img: "" },
    { id: 'it-soup-3', category: 'Супы', name: 'Крем-суп из белых грибов', desc: 'Бархатистый суп-пюре из лесных белых грибов и шампиньонов на основе фермерских сливок с добавлением хрустящих сухариков.', weight: '300г', info: '290 ккал', price: '420 ₽', img: "" },
    { id: 'it-main-1', category: 'Горячее', name: 'Пицца Кватро Формаджи', desc: 'Тонкое хрустящее тесто, благородный дорблю, нежная моцарелла, ароматный пармезан и сливочный сыр гауда с прованскими травами.', weight: '420г', info: '610 ккал', price: '690 ₽', img: "" },
    { id: 'it-main-2', category: 'Горячее', name: 'Фетучини с белыми грибами', desc: 'Паста собственного приготовления в насыщенном соусе из свежих сливок, чеснока, белого вина и лесных грибов с трюфельным маслом.', weight: '320г', info: '480 ккал', price: '540 ₽', img: "" },
    { id: 'it-main-3', category: 'Горячее', name: 'Лазанья Болоньезе', desc: 'Слои пасты с мясным рагу из мраморной говядины, соусом Бешамель, томатами конкассе и запеченной золотистой корочкой из моцареллы.', weight: '350г', info: '520 ккал', price: '510 ₽', img: "" },
    { id: 'it-desc-1', category: 'Десерты', name: 'Классический Тирамису', desc: 'Воздушный десерт на основе печенья савоярди, пропитанного крепким свежесваренным эспрессо, и нежного крема из маскарпоне.', weight: '150г', info: '310 ккал', price: '390 ₽', img: "" },
    { id: 'it-desc-2', category: 'Десерты', name: 'Ванильная Панна-Котта', desc: 'Традиционный десерт из сливок высокой жирности и натуральной мадагаскарской ванили с яркой прослойкой из лесных ягод.', weight: '140г', info: '260 ккал', price: '320 ₽', img: "" },
    { id: 'it-desc-3', category: 'Десерты', name: 'Шоколадный Фондан', desc: 'Горячий кекс из горького бельгийского шоколада с жидкой сердцевиной, подается с шариком ванильного джелато.', weight: '130г', info: '410 ккал', price: '360 ₽', img: "" },
    { id: 'it-drink-1', category: 'Напитки', name: 'Домашний Лимонад Лимончелло', desc: 'Освежающий безалкогольный напиток на основе сока сицилийских лимонов, свежей мяты, сахарного сиропа и газированной воды.', weight: '400мл', info: '90 ккал', price: '250 ₽', img: "" },
    { id: 'it-drink-2', category: 'Напитки', name: 'Кофе Эспрессо Тоник', desc: 'Тонизирующий холодный микс из порции двойного эспрессо, горьковатого тоника, ледяных кубиков и дольки спелого лайма.', weight: '300мл', info: '60 ккал', price: '280 ₽', img: "" },
    { id: 'it-drink-3', category: 'Напитки', name: 'Чай Аранча Премиум', desc: 'Ароматный черный чай, заваренный на цедре красных сицилийских апельсинов с добавлением бутонов гвоздики.', weight: '500мл', info: '20 ккал', price: '310 ₽', img: "" }
  ],
  jp: [
    { id: 'jp-soup-1', category: 'Супы', name: 'Рамен Сио с уткой', desc: 'Пшеничная лапша в глубоком утином бульоне с добавлением соевого соуса, маринованного яйца адзитама, побегов бамбука и нори.', weight: '550г', info: '720 ккал', price: '650 ₽', img: "" },
    { id: 'jp-soup-2', category: 'Супы', name: 'Классический Мисо-суп', desc: 'Традиционный легкий японский суп на основе пасты мисо и бульона даси с кубиками сыра тофу, водорослями вакаме и зеленым луком.', weight: '300г', info: '90 ккал', price: '210 ₽', img: "" },
    { id: 'jp-soup-3', category: 'Супы', name: 'Острый Кимчи Тиге', desc: 'Пикантный и обжигающий суп с ферментированной капустой кимчи, слайсами свиной грудинки, древесными грибами и яйцом.', weight: '450г', info: '430 ккал', price: '480 ₽', img: "" },
    { id: 'jp-main-1', category: 'Горячее', name: 'Сет Премиум Нигири', desc: 'Классические японские суши со свежим тунцом блюфин, фарерским лососем, камчатским крабом и сладкой креветкой амаэби.', weight: '280г', info: '410 ккал', price: '1200 ₽', img: "" },
    { id: 'jp-main-2', category: 'Горячее', name: 'Тяхан с цыпленком', desc: 'Рис, обжаренный на раскаленном воке с сочным куриным бедром, отборной кукурузой, зеленым горошком и фирменным соусом.', weight: '350г', info: '540 ккал', price: '420 ₽', img: "" },
    { id: 'jp-main-3', category: 'Горячее', name: 'Лапша Удон с креветками', desc: 'Толстая пшеничная лапша удон с обжаренными тигровыми креветками, болгарским перцем, стручковой фасолью в соусе Терияки.', weight: '380г', info: '490 ккал', price: '560 ₽', img: "" },
    { id: 'jp-desc-1', category: 'Десерты', name: 'Матча Моти с клубникой', desc: 'Традиционное пирожное из клейкого рисового теста со сливочным кремом из японского чая матча и цельной спелой ягодой внутри.', weight: '90г', info: '180 ккал', price: '280 ₽', img: "" },
    { id: 'jp-desc-2', category: 'Десерты', name: 'Японский Чизкейк', desc: 'Знаменитый супер-воздушный, легкий и пористый десерт из превосходного сырного суфле, который буквально тает во рту.', weight: '120г', info: '290 ккал', price: '340 ₽', img: "" },
    { id: 'jp-desc-3', category: 'Десерты', name: 'Дораяки с пастой Анко', desc: 'Традиционные круглые бисквитные пирожные, соединенные между собой сладкой начинкой из вареных бобов адзуки.', weight: '100г', info: '240 ккал', price: '220 ₽', img: "" },
    { id: 'jp-drink-1', category: 'Напитки', name: 'Чай Сенча с обжаренным рисом', desc: 'Классический зеленый чай Генмайча с добавлением зерен обжаренного коричневого риса. Обладает плотным ореховым вкусом.', weight: '500мл', info: '0 ккал', price: '290 ₽', img: "" },
    { id: 'jp-drink-2', category: 'Напитки', name: 'Холодный Матча-Латте', desc: 'Тонизирующий напиток из японского церемониального зеленого чая матча, взбитого со свежим кокосовым молоком и льдом.', weight: '350мл', info: '140 ккал', price: '320 ₽', img: "" },
    { id: 'jp-drink-3', category: 'Напитки', name: 'Лимонад Юдзу-Имбирь', desc: 'Экзотический освежающий напиток на основе пюре редкого японского цитруса юдзу, выжимки корня имбиря и содовой.', weight: '400мл', info: '110 ккал', price: '290 ₽', img: "" }
  ],
  mx: [
    { id: 'mx-soup-1', category: 'Супы', name: 'Острый Чили Кон Карне', desc: 'Густой и наваристый мясной суп из рубленой мраморной говядины, красной фасоли, перетертых томатов, кукурузы и перца халапеньо.', weight: '400г', info: '460 ккал', price: '450 ₽', img: "" },
    { id: 'mx-soup-2', category: 'Супы', name: 'Традиционный суп Позоле', desc: 'Сытный аутентичный мексиканский бульон со свининой длительного томления, крупной белой кукурузой хомини, редисом и орегано.', weight: '380г', info: '390 ккал', price: '410 ₽', img: "" },
    { id: 'mx-soup-3', category: 'Супы', name: 'Суп Сопа де Тортилья', desc: 'Ароматный томатно-куриный суп с добавлением хрустящих полосок кукурузной тортильи, кубиков авокадо и нежного плавленого сыра.', weight: '350г', info: '310 ккал', price: '370 ₽', img: "" },
    { id: 'mx-main-1', category: 'Горячее', name: 'Тако с говядиной Биррия', desc: 'Три кукурузные тортильи с сочной говядиной длительного томления, маринованным луком, кинзой и насыщенным мясным бульоном консоме.', weight: '340г', info: '590 ккал', price: '580 ₽', img: "" },
    { id: 'mx-main-2', category: 'Горячее', name: 'Большой Буррито Эль Пасо', desc: 'Пшеничная лепешка с начинкой из обжаренного фарша, фасоли пинто, сладкой кукурузы, халапеньо и сыра Чеддер под соусом Сальса Роха.', weight: '450г', info: '830 ккал', price: '490 ₽', img: "" },
    { id: 'mx-main-3', category: 'Горячее', name: 'Кесадилья с цыпленком', desc: 'Сложенная пополам тортилья с начинкой из нежного обжаренного куриного филе, шампиньонов и двойной порции тянущегося сыра чеддер.', weight: '300г', info: '640 ккал', price: '440 ₽', img: "" },
    { id: 'mx-desc-1', category: 'Десерты', name: 'Чуррос с карамелью', desc: 'Традиционная мексиканская выпечка из заварного теста, обжаренная до золотистой корочки, густо обсыпанная коричной сахарной пудрой.', weight: '180г', info: '420 ккал', price: '320 ₽', img: "" },
    { id: 'mx-desc-2', category: 'Десерты', name: 'Трес Лечес (Три молока)', desc: 'Нежнейший влажный латиноамериканский бисквит, глубоко пропитанный тремя видами молока: сгущенным, концентрированным и цельными сливками.', weight: '160г', info: '380 ккал', price: '350 ₽', img: "" },
    { id: 'mx-desc-3', category: 'Десерты', name: 'Жареное мороженое', desc: 'Шарик ванильного пломбира в хрустящей панировке из кукурузных хлопьев и кокосовой стружки, быстро обжаренный во фритюре.', weight: '140г', info: '340 ккал', price: '380 ₽', img: "" },
    { id: 'mx-drink-1', category: 'Напитки', name: 'Традиционная Орчата', desc: 'Популярный прохладительный мексиканский напиток из рисового молока, измельченного миндаля, ванили и ароматной мелкомолотой корицы.', weight: '400мл', info: '150 ккал', price: '240 ₽', img: "" },
    { id: 'mx-drink-2', category: 'Напитки', name: 'Напиток Агуа де Хамайка', desc: 'Освежающий холодный настой из сушеных цветов гибискуса (каркаде) с добавлением тростникового сахара и сока свежего лайма.', weight: '400мл', info: '80 ккал', price: '210 ₽', img: "" },
    { id: 'mx-drink-3', category: 'Напитки', name: 'Острая Кола-Мичелада', desc: 'Уникальный безалкогольный коктейль на основе колы, сока лайма, капли соуса табаско, ворчестера и соляной каймы на бокале.', weight: '330мл', info: '130 ккал', price: '260 ₽', img: "" }
  ]
};

export default function Menu() {
  const { currentCountry, theme, addToCart } = useCountry();
  const [activeCategory, setActiveCategory] = useState('Все');
  const navigate = useNavigate(); 
  
  const allDishes = DISHES_DATABASE[currentCountry] || [];
  
  useEffect(() => {
    setActiveCategory('Все');
  }, [currentCountry]);

  const categories = ['Все', 'Супы', 'Горячее', 'Десерты', 'Напитки'];

  const filteredDishes = activeCategory === 'Все' 
    ? allDishes 
    : allDishes.filter(dish => dish.category === activeCategory);

  const handleImgError = (e) => {
    e.target.onerror = null; 
    e.target.src = PLACEHOLDER_IMAGE;
  };

  const handleAddToCartClick = (dish) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
      alert('Для добавления блюд в корзину необходимо авторизоваться в системе!');
      navigate('/auth'); 
    } else {
      addToCart(dish); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Аутентичное меню: {theme.name}</h1>
          <p className="text-xs text-slate-400 mt-1">Используйте фильтры ИС для выбора категорий блюд.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isSelected ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <p className="text-xs text-slate-400 py-12 text-center">В этой категории пока нет позиций.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-full">
              
              <div className="flex flex-col flex-grow">
                <div className="h-44 bg-slate-100 overflow-hidden relative shrink-0">
                  <img 
                    src={dish.img || PLACEHOLDER_IMAGE} 
                    alt={dish.name} 
                    onError={handleImgError} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {dish.weight}
                  </span>
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                    {dish.category}
                  </span>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${theme.textColor}`}>{dish.info}</p>
                  <h3 className="text-base font-black text-slate-900 mt-1 min-h-[3rem] line-clamp-2">
                    {dish.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed flex-grow">
                    {dish.desc}
                  </p>
                </div>
              </div>
              
              <div className="p-4 pt-0 shrink-0">
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="text-lg font-black text-slate-900">{dish.price}</span>
                  <button 
                    onClick={() => handleAddToCartClick(dish)}
                    className={`text-xs font-bold text-white px-3 py-2 rounded-lg transition-colors ${theme.primaryColor} ${theme.hoverColor}`}
                  >
                    + В корзину
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}