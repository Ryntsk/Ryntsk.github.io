    // Инициализация графика
const ctx = document.getElementById('growthChart').getContext('2d');
let chart;

// Основная функция расчета
function calculate() {
    // Получение значений из полей ввода с ограничениями
    let P = Math.min(parseFloat(document.getElementById('initial').value) || 0, 100000000);
    let r = Math.min(parseFloat(document.getElementById('rate').value) / 100 || 0, 0.5);
    let years = Math.min(parseFloat(document.getElementById('years').value) || 1, 20);
    let PMT = Math.min(parseFloat(document.getElementById('monthly').value) || 0, 10000000);
    const n = parseInt(document.getElementById('compound').value);

    // Расчеты
    const totalMonths = Math.round(years * 12);
    const totalInvested = P + PMT * totalMonths;

    // Расчет конечной стоимости с учетом сложного процента
    let finalValue = P * Math.pow(1 + r / n, n * years);
    
    // Учет ежемесячных пополнений
    if (PMT > 0) {
        const mr = r / 12;
        if (r > 0) {
            finalValue += PMT * ((Math.pow(1 + mr, totalMonths) - 1) / mr);
        } else {
            finalValue += PMT * totalMonths;
        }
    }

    // Расчет показателей
    const profit = finalValue - totalInvested;
    const totalReturn = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
    const cagr = P > 0 ? (Math.pow(finalValue / P, 1 / years) - 1) * 100 : 0;

    // Форматирование и отображение результатов
    const fmt = new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 0});
    document.getElementById('final').textContent = fmt.format(finalValue.toFixed(0)) + ' ₽';
    document.getElementById('profit').textContent = fmt.format(profit.toFixed(0)) + ' ₽';
    document.getElementById('totalInvested').textContent = fmt.format(totalInvested) + ' ₽';
    document.getElementById('totalReturn').textContent = totalReturn.toFixed(1) + '%';
    document.getElementById('cagr').textContent = cagr.toFixed(2) + '%';

    // Подготовка данных для графика
    updateChart(P, r, years, PMT, n, totalMonths);
}

// Функция обновления графика
function updateChart(P, r, years, PMT, n, totalMonths) {
    const labels = [];
    const data = [];
    const steps = 40;
    
    for (let m = 0; m <= totalMonths; m += Math.max(1, Math.floor(totalMonths / steps))) {
        const t = m / 12;
        let val = P * Math.pow(1 + r / n, n * t);
        
        if (PMT > 0 && m > 0 && r > 0) {
            val += PMT * ((Math.pow(1 + r/12, m) - 1) / (r/12));
        } else if (PMT > 0 && m > 0) {
            val += PMT * m;
        }
        
        labels.push(t % 1 === 0 ? `Год ${t}` : `${t.toFixed(1)}`);
        data.push(Math.round(val));
    }

    // Уничтожение предыдущего графика, если он существует
    if (chart) chart.destroy();
    
    // Создание нового графика
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Рост капитала',
                data,
                borderColor: '#0f9',
                backgroundColor: 'rgba(0,255,150,0.08)',
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 9,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: context => `${context.formattedValue.toLocaleString('ru-RU')} ₽`
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#888'
                    },
                    grid: {
                        color: '#222'
                    }
                },
                x: {
                    ticks: {
                        color: '#888'
                    },
                    grid: {
                        color: '#222'
                    }
                }
            }
        }
    });
}

// Инициализация обработчиков событий
function initCalculator() {
    // Привязка обработчиков к полям ввода
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', calculate);
    });
    
    // Выполнение расчета при загрузке страницы
    window.addEventListener('load', calculate);
}

// Экспорт функций для использования в других файлах (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculate, initCalculator };
}
////////////
