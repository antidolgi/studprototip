// Бургер-меню
const burger = document.getElementById('burgerBtn');
const nav = document.getElementById('mainNav');
burger?.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Попап
const requestBtn = document.getElementById('requestBtn');
const popup = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');
requestBtn?.addEventListener('click', () => popup.classList.add('active'));
closePopup?.addEventListener('click', () => popup.classList.remove('active'));
window.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('active');
});

// Форма: меняем action в зависимости от выбранного направления
const mainForm = document.getElementById('mainForm');
if (mainForm) {
    mainForm.addEventListener('submit', function(e) {
        const service = this.querySelector('select[name="service"]').value;
        if (service === 'studio') {
            this.action = 'https://formspree.io/f/xdaydekl';
        } else if (service === 'banan') {
            this.action = 'https://formspree.io/f/meevzaow';
        }
    });
}

// Фильтрация галереи и портфолио (универсальная)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        const container = this.closest('.gallery__filters, .portfolio__filters').nextElementSibling;
        const items = container.querySelectorAll('[data-category]');
        // активная кнопка
        this.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Простой лайтбокс для галереи (data-lightbox)
document.addEventListener('click', function(e) {
    if (e.target.closest('[data-lightbox]')) {
        e.preventDefault();
        const imgSrc = e.target.closest('[data-lightbox]').getAttribute('href');
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.inset = '0';
        lightbox.style.background = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '999';
        lightbox.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:16px;">`;
        lightbox.addEventListener('click', () => lightbox.remove());
        document.body.appendChild(lightbox);
    }
});

// Swiper для отзывов на главной
if (typeof Swiper !== 'undefined' && document.querySelector('.reviews__slider')) {
    new Swiper('.reviews__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 }
        }
    });
}
