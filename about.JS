

document.addEventListener('DOMContentLoaded', () => {

  const statsRow = document.getElementById('stats-row');
  if (!statsRow) return;

  const counters = statsRow.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400; // ms
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the count slows down near the end
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => animateCounter(counter));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statsObserver.observe(statsRow);

});