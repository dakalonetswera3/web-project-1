
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = 'var(--cream)';
      link.style.borderBottom = '2px solid var(--terracotta)';
    }
  });

 var typed = new Typed('#kitchen-heading', {
    strings: ['The <span class="orange-text">Heart</span> Of Your Kitchen.'],
    typeSpeed: 60,      
    backSpeed: 40,      
    backDelay: 2000,    
    startDelay: 500,    
    loop: true,         
    showCursor: true,   
    cursorChar: '|',
    contentType: 'html' 
});

  /*  2. Scroll-reveal (IntersectionObserver)  */
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(revealStyle);

  const revealTargets = document.querySelectorAll(
    '.product-card, .value-card, .content-block, .promo-banner, .about-intro, table, .map-section'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));

  /* 3. Lightbox  */
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    #lb-overlay {
      display: none; position: fixed; inset: 0; z-index: 9999;
      background: rgba(20,14,8,0.92); align-items: center; justify-content: center;
      cursor: zoom-out;
    }
    #lb-overlay.open { display: flex; animation: lbIn 0.25s ease; }
    @keyframes lbIn { from { opacity:0; } to { opacity:1; } }
    #lb-overlay img {
      max-width: 88vw; max-height: 82vh; border-radius: 12px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      cursor: default; animation: lbPop 0.28s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes lbPop { from { transform: scale(0.82); } to { transform: scale(1); } }
    #lb-close {
      position: absolute; top: 1.2rem; right: 1.4rem;
      background: none; border: none; color: #FDF6EC; font-size: 2rem;
      cursor: pointer; line-height: 1; opacity: 0.8; transition: opacity 0.2s;
    }
    #lb-close:hover { opacity: 1; }
    #lb-caption {
      position: absolute; bottom: 1.8rem; left: 50%; transform: translateX(-50%);
      color: #C8B89A; font-size: 0.9rem; letter-spacing: 0.06em;
      text-transform: uppercase; text-align: center;
    }
    .lb-trigger { cursor: zoom-in; }
  `;
  document.head.appendChild(lbStyle);

  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `<button id="lb-close" aria-label="Close">&#x2715;</button>
    <img id="lb-img" src="" alt="">
    <p id="lb-caption"></p>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('#lb-img');
  const lbCaption = overlay.querySelector('#lb-caption');

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  overlay.querySelector('#lb-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Attach lightbox to all product/content images
  document.querySelectorAll('.product-card img, .content-block img, .hero-img-wrap img, .promo-banner img').forEach(img => {
    img.classList.add('lb-trigger');
    img.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(img.src, img.alt || 'Dakalo Pots');
    });
  });

  /*  4. Hero Carousel with 3-second auto-advance  */
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots   = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let current  = 0;
    let autoTimer = null;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 3000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    // Arrow buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    }

    // Dot buttons
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index, 10));
        resetAuto();
      });
    });

    // Pause on hover, resume on mouse leave
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', startAuto);

    // Start auto-play
    startAuto();
  }

  /* ── 5. Find Us — Leaflet Map ── */
