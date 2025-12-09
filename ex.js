// Скрипт для страницы бирж

// Определение бирж с их параметрами
const exchanges = [
    {
        name: "Eurex",
        logo: "Pics/Eurex-Logo.png",
        open: 1, close: 22, tz: 1, // Время в UTC
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6, // Выходные: Вс, Сб
        modal: {
            title: "Eurex",
            link: "https://www.eurex.com  ",
            content: `
                <p><strong>Местоположение:</strong> Франкфурт-на-Майне / Цюрих</p>
                <p><strong>Основана:</strong> 1998 год — первая полностью электронная биржа деривативов в Европе</p>
                <p><strong>Оборот:</strong> Крупнейшая в мире площадка по торговле фьючерсами и опционами на европейские активы</p>
                <p><strong>Чем торгует:</strong> Фьючерсы и опционы на индексы (EURO STOXX 50), акции, облигации, волатильность, погодные деривативы</p>
                <p><strong>Ключевые особенности:</strong> Высочайшая ликвидность, надёжность, хаб для хеджирования европейских рисков</p>
                <p style="margin-top:20px"><a href="https://www.eurex.com  " target="_blank" style="color:#0f9; font-weight:bold;">eurex.com →</a></p>
            `
        }
    },
    {
        name: "ICE",
        logo: "Pics/ICE.png",
        open: 8, close: 16.5, tz: -5,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "ICE – Intercontinental Exchange",
            link: "https://www.theice.com  ",
            content: `
                <p><strong>Местоположение:</strong> Атланта, США (глобальная сеть)</p>
                <p><strong>Основана:</strong> 2000 год как электронная платформа энергетических фьючерсов</p>
                <p><strong>Оборот:</strong> Один из крупнейших операторов товарных и финансовых рынков мира</p>
                <p><strong>Чем торгует:</strong> Нефть Brent, газ, электроэнергия, сельхозтовары, NYSE (акции), индексные деривативы</p>
                <p><strong>Ключевые особенности:</strong> Владелец NYSE, эталонный контракт Brent, вертикальная интеграция</p>
                <p style="margin-top:20px"><a href="https://www.theice.com  " target="_blank" style="color:#0f9; font-weight:bold;">theice.com →</a></p>
            `
        }
    },
    {
        name: "LME",
        logo: "Pics/London_Metal_Exchange_logo.svg.png",
        open: 1, close: 19, tz: 0,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "London Metal Exchange (LME)",
            link: "https://www.lme.com  ",
            content: `
                <p><strong>Местоположение:</strong> Лондон, Великобритания</p>
                <p><strong>Основана:</strong> 1877 год</p>
                <p><strong>Оборот:</strong> Глобальный эталон ценообразования на цветные металлы</p>
                <p><strong>Чем торгует:</strong> Медь, алюминий, никель, цинк, олово, свинец, литий, кобальт, сталь</p>
                <p><strong>Ключевые особенности:</strong> Уникальное «кольцо» + электронная торговля, физическая поставка, склады по миру</p>
                <p style="margin-top:20px"><a href="https://www.lme.com  " target="_blank" style="color:#0f9; font-weight:bold;">lme.com →</a></p>
            `
        }
    },
    {
        name: "MOEX",
        logo: "Pics/MOEX.png",
        open: 7, close: 18.666, tz: 3,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "Московская биржа (MOEX)",
            link: "https://www.moex.com  ",
            content: `
                <p><strong>Местоположение:</strong> Москва, Россия</p>
                <p><strong>Основана:</strong> 2011 год (слияние ММВБ и РТС)</p>
                <p><strong>Оборот:</strong> Крупнейшая универсальная площадка России и Восточной Европы</p>
                <p><strong>Чем торгует:</strong> Акции, облигации, валюта, деривативы, драгметаллы, зерно</p>
                <p><strong>Ключевые особенности:</strong> Единственная универсальная биржа в РФ, высокая ликвидность рублёвых активов</p>
                <p style="margin-top:20px"><a href="https://www.moex.com  " target="_blank" style="color:#0f9; font-weight:bold;">moex.com →</a></p>
            `
        }
    },
    {
        name: "NASDAQ",
        logo: "Pics/NASDAQ_Logo.svg.png",
        open: 14.5, close: 21, tz: -5,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "NASDAQ",
            link: "https://www.nasdaq.com  ",
            content: `
                <p><strong>Местоположение:</strong> Нью-Йорк, США — полностью электронная биржа</p>
                <p><strong>Основана:</strong> 1971 год — первая в мире электронная фондовая биржа</p>
                <p><strong>Оборот:</strong> ≈ $25 трлн рыночной капитализации (2-е место в мире)</p>
                <p><strong>Чем торгует:</strong> Технологические гиганты (Apple, Microsoft, Amazon, Tesla), ETF, опционы, крипто-активы</p>
                <p><strong>Ключевые особенности:</strong> Символ инноваций, лидер по IPO tech-компаний, индексы NASDAQ-100 и Composite</p>
                <p style="margin-top:20px"><a href="https://www.nasdaq.com  " target="_blank" style="color:#0f9; font-weight:bold;">nasdaq.com →</a></p>
            `
        }
    },
    {
        name: "NYSE",
        logo: "Pics/NYSE.png",
        open: 14.5, close: 21, tz: -5,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "NYSE – New York Stock Exchange",
            link: "https://www.nyse.com  ",
            content: `
                <p><strong>Местоположение:</strong> Уолл-стрит, Нью-Йорк</p>
                <p><strong>Основана:</strong> 1792 год («Соглашение под платаном»)</p>
                <p><strong>Оборот:</strong> ≈ $30 трлн — крупнейшая биржа мира по капитализации</p>
                <p><strong>Чем торгует:</strong> «Голубые фишки» (Coca-Cola, Walmart, JPMorgan), ETF, облигации</p>
                <p><strong>Ключевые особенности:</strong> Престиж, гибридная модель, индекс Dow Jones</p>
                <p style="margin-top:20px"><a href="https://www.nyse.com  " target="_blank" style="color:#0f9; font-weight:bold;">nyse.com →</a></p>
            `
        }
    },
    {
        name: "SSE",
        logo: "Pics/Shanghai_Stock_Exchange_logo.svg.png",
        open: 1.5, close: 7, tz: 8,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "Shanghai Stock Exchange (SSE)",
            link: "https://english.sse.com.cn  ",
            content: `
                <p><strong>Местоположение:</strong> Шанхай, Китай</p>
                <p><strong>Основана:</strong> 1990 год</p>
                <p><strong>Оборот:</strong> Одна из крупнейших бирж Азии</p>
                <p><strong>Чем торгует:</strong> A-shares, B-shares, облигации, фонды</p>
                <p><strong>Ключевые особенности:</strong> Главный канал иностранных инвестиций в Китай через Stock Connect, индекс SSE Composite</p>
                <p style="margin-top:20px"><a href="https://english.sse.com.cn  " target="_blank" style="color:#0f9; font-weight:bold;">sse.com.cn →</a></p>
            `
        }
    },
    {
        name: "JPX",
        logo: "Pics/Japan_Exchange_Group_logo.svg.png",
        open: 0, close: 6.416, tz: 9,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "Japan Exchange Group (JPX / Токийская биржа)",
            link: "https://www.jpx.co.jp/english/  ",
            content: `
                <p><strong>Местоположение:</strong> Токио, Япония</p>
                <p><strong>Основана:</strong> 1878 год (современная форма — 2013)</p>
                <p><strong>Оборот:</strong> Третья по величине биржа мира</p>
                <p><strong>Чем торгует:</strong> Акции, ETF, фьючерсы на Nikkei 225, TOPIX</p>
                <p><strong>Ключевые особенности:</strong> Индекс Nikkei 225 — главный барометр японской экономики</p>
                <p style="margin-top:20px"><a href="https://www.jpx.co.jp/english/  " target="_blank" style="color:#0f9; font-weight:bold;">jpx.co.jp →</a></p>
            `
        }
    },
    {
        name: "BSE",
        logo: "Pics/BSE.NS.png",
        open: 3.75, close: 10.05, tz: 5.5,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "Bombay Stock Exchange (BSE)",
            link: "https://www.bseindia.com  ",
            content: `
                <p><strong>Местоположение:</strong> Мумбаи, Индия</p>
                <p><strong>Основана:</strong> 1875 год — старейшая биржа Азии</p>
                <p><strong>Оборот:</strong> ≈ $4.5 трлн капитализации</p>
                <p><strong>Чем торгует:</strong> Акции, деривативы, долговые бумаги, ETF</p>
                <p><strong>Ключевые особенности:</strong> Индекс SENSEX-30, одна из самых быстрых платформ в мире</p>
                <p style="margin-top:20px"><a href="https://www.bseindia.com  " target="_blank" style="color:#0f9; font-weight:bold;">bseindia.com →</a></p>
            `
        }
    },
    {
        name: "HKEX",
        logo: "Pics/HK_BIG.png",
        open: 1.5, close: 8, tz: 8,
        isHoliday: (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6,
        modal: {
            title: "HKEX – Hong Kong Exchanges and Clearing",
            link: "https://www.hkex.com.hk  ",
            content: `
                <p><strong>Местоположение:</strong> Гонконг</p>
                <p><strong>Основана:</strong> 2000 год (слияние)</p>
                <p><strong>Оборот:</strong> Лидер по объёму IPO в мире многие годы</p>
                <p><strong>Чем торгует:</strong> H-акции китайских компаний, Hang Seng Index, деривативы, LME металлы</p>
                <p><strong>Ключевые особенности:</strong> Главные ворота в Китай (Stock Connect), индекс Hang Seng</p>
                <p style="margin-top:20px"><a href="https://www.hkex.com.hk  " target="_blank" style="color:#0f9; font-weight:bold;">hkex.com.hk →</a></p>
            `
        }
    }
];

// Для тестирования времени можно использовать fakeNow
let fakeNow = null;

function getNow() {
    return fakeNow ? new Date(fakeNow) : new Date();
}

// Проверка, открыта ли биржа в данный момент
function isOpen(exchange, now) {
    if (exchange.isHoliday(now)) return false;
    const h = now.getUTCHours() + now.getUTCMinutes() / 60;
    // Простой случай: open < close (например, 9:00 - 17:00)
    if (exchange.open < exchange.close) {
        return h >= exchange.open && h < exchange.close;
    }
    // Сложный случай: open > close (например, 17:00 - 2:00 следующего дня)
    // Тогда она открыта, если h >= open ИЛИ h < close
    return h >= exchange.open || h < exchange.close;
}

// Вычисление времени до открытия биржи
function timeToOpenStr(exchange, now) {
    let target = new Date(now);
    // Найти следующий рабочий день
    do {
        target.setUTCDate(target.getUTCDate() + 1);
    } while (exchange.isHoliday(target));

    // Установить время открытия на этот день
    const [oh, om] = [Math.floor(exchange.open), Math.round((exchange.open % 1) * 60)];
    target.setUTCHours(oh, om, 0, 0);

    // Если время открытия уже прошло сегодня, ищем следующий рабочий день
    if (target < now) {
        do {
            target.setUTCDate(target.getUTCDate() + 1);
        } while (exchange.isHoliday(target));
        target.setUTCHours(oh, om, 0, 0);
    }

    // Рассчитать разницу
    let diff = target - now;
    if (diff <= 0) return "Открыта"; // На случай, если что-то пошло не так

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Создание карточки биржи
function createCard(exchange) {
    const card = document.createElement('div');
    card.className = 'exchange-card';
    card.innerHTML = `
        <div class="logo-container">
            <img src="${exchange.logo}" alt="${exchange.name}">
        </div>
        <div class="timer" style="display:none"></div>
    `;
    card.onclick = () => openModal(exchange);
    return card;
}

// Открытие модального окна с информацией о бирже
function openModal(exchange) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    const content = document.querySelector('.modal-content');

    body.innerHTML = exchange.modal
        ? `<h2 style="color:#0f9; font-size:2.2rem; margin-bottom:20px;">${exchange.modal.title}</h2>${exchange.modal.content}`
        : `<h2>${exchange.name}</h2><p>Инфо скоро...</p>`;

    // Если в modal есть background, можно установить его как фон
    // content.style.background = exchange.modal?.background
    //     ? `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('Pics/${exchange.modal.background}') center/cover no-repeat`
    //     : '#000';

    modal.style.display = 'block';
}

// Обновление всего интерфейса
function updateAll() {
    const now = getNow();
    document.getElementById('utc-time').textContent = now.toISOString().substring(11, 19);

    const activeGrid = document.getElementById('active-grid');
    const sleepingGrid = document.getElementById('sleeping-grid');
    activeGrid.innerHTML = '';
    sleepingGrid.innerHTML = '';

    exchanges.forEach(exchange => {
        const card = createCard(exchange);
        const timer = card.querySelector('.timer');

        if (isOpen(exchange, now)) {
            timer.style.display = 'none'; // Скрыть таймер, если открыта
            activeGrid.appendChild(card);
        } else {
            timer.style.display = 'block'; // Показать таймер, если закрыта
            timer.textContent = `Открывается через ${timeToOpenStr(exchange, now)}`;
            sleepingGrid.appendChild(card);
        }
    });
}

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', () => {
    // Закрытие по кнопке
    document.querySelector('.close').onclick = () => {
        document.getElementById('modal').style.display = 'none';
    };

    // Закрытие по клику вне окна
    window.onclick = (event) => {
        if (event.target.id === 'modal') {
            document.getElementById('modal').style.display = 'none';
        }
    };

    // Первый запуск и установка интервала
    updateAll();
    setInterval(updateAll, 1000);
});
