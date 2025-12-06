// Дожидаемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const sideNav = document.querySelector('.side-nav');
    const sideLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('.asset-section');
    const backToTopButton = document.getElementById('backToTop');

    // Изначально скрываем кнопку
    if (backToTopButton) {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.transition = 'opacity 0.3s, visibility 0.3s';

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Единый обработчик прокрутки
    window.addEventListener('scroll', function () {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        // --- 1. Подсветка активного пункта боковой навигации ---
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Если почти достигли конца страницы — подсвечиваем "Валюты"
        if (!currentSectionId && scrollPos + window.innerHeight >= document.body.offsetHeight - 100) {
            currentSectionId = 'currencies';
        }

        // Обновляем активный класс
        sideLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // --- 2. Показ/скрытие боковой панели ---
        if (scrollPos > window.innerHeight - 100) {
            sideNav?.classList.add('visible');
        } else {
            sideNav?.classList.remove('visible');
        }

        // --- 3. Показ/скрытие кнопки "Наверх" ---
        if (backToTopButton) {
            if (scrollPos > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        }
    });
});