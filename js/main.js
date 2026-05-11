document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      if (nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.background = '#fff';
        nav.style.width = '100%';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      }
    });
  }

  // Плавающая форма
  const floatingBtn = document.getElementById('floatingButton');
  const floatingForm = document.getElementById('floatingForm');
  if (floatingBtn && floatingForm) {
    floatingBtn.addEventListener('click', function() {
      floatingForm.classList.toggle('show');
    });
    document.querySelector('.close-form').addEventListener('click', function() {
      floatingForm.classList.remove('show');
    });
  }

  // Галерея недавних съёмок (только если есть контейнер)
  const recentGrid = document.getElementById('recentGrid');
  if (recentGrid) {
    const recentImages = [
      { src: 'images/gallery/studio-1.jpg', alt: 'Портрет', category: 'portrait' },
      { src: 'images/gallery/studio-2.jpg', alt: 'Предметка', category: 'product' },
      { src: 'images/gallery/studio-3.jpg', alt: 'Семейная', category: 'family' },
      { src: 'images/gallery/studio-4.jpg', alt: 'Портрет', category: 'portrait' },
      { src: 'images/gallery/studio-5.jpg', alt: 'Предметка', category: 'product' },
      { src: 'images/gallery/studio-6.jpg', alt: 'Семья', category: 'family' }
    ];
    function renderGallery(filter = 'all') {
      recentGrid.innerHTML = '';
      const filtered = filter === 'all' ? recentImages : recentImages.filter(img => img.category === filter);
      filtered.forEach(img => {
        const div = document.createElement('div');
        div.className = 'recent-item';
        div.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
        div.addEventListener('click', () => {
          const lb = document.createElement('div');
          lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;';
          lb.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:12px;">`;
          lb.addEventListener('click', () => lb.remove());
          document.body.appendChild(lb);
        });
        recentGrid.appendChild(div);
      });
    }
    renderGallery();
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderGallery(this.dataset.filter);
      });
    });
  }
});
