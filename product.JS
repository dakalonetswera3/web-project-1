/* 
   products.js — Dynamic product search & filter
   */

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  /* Product data mirrors the HTML cards */
  const products = [
    {
      id: 1,
      name: 'Non-stick Frying Pan',
      desc: 'Perfect for everyday cooking.',
      price: 299,
      image: 'pot1.jpeg',
      category: 'frying',
      tag: 'bestseller'
    },
    {
      id: 2,
      name: 'Saucepan Set',
      desc: 'Even heat distribution.',
      price: 499,
      image: 'pot2.jpeg',
      category: 'saucepan',
      tag: 'popular'
    },
    {
      id: 3,
      name: 'Wok',
      desc: 'Ideal for stir-fries.',
      price: 399,
      image: 'Pot3.jpeg',
      category: 'wok',
      tag: 'new'
    }
  ];

  /*  Inject search bar & filter controls above grid  */
  const container = grid.closest('.page-container');
  const searchBar = document.createElement('div');
  searchBar.id = 'product-controls';
  searchBar.style.cssText = `
    display:flex; gap:1rem; flex-wrap:wrap; align-items:center;
    margin-bottom:1.5rem; padding:1.2rem 1.4rem;
    background:var(--cream); border:1px solid var(--light-border);
    border-radius:var(--radius-md); box-shadow:var(--shadow-soft);
  `;
  searchBar.innerHTML = `
    <input id="prod-search" type="text" placeholder="🔍  Search products..."
      style="flex:1; min-width:180px; padding:0.65rem 1rem;
             font-family:var(--font-body); font-size:0.95rem;
             border:1px solid var(--light-border); border-radius:var(--radius-sm);
             outline:none; background:var(--warm-white); color:var(--text-body);">
    <select id="prod-sort"
      style="padding:0.65rem 1rem; font-family:var(--font-body); font-size:0.92rem;
             border:1px solid var(--light-border); border-radius:var(--radius-sm);
             background:var(--warm-white); color:var(--text-body); cursor:pointer; outline:none;">
      <option value="default">Sort: Default</option>
      <option value="asc">Price: Low → High</option>
      <option value="desc">Price: High → Low</option>
    </select>
    <span id="prod-count"
      style="font-size:0.82rem; color:var(--warm-grey); white-space:nowrap;">
      3 products
    </span>
  `;

  grid.before(searchBar);

  const searchInput = document.getElementById('prod-search');
  const sortSelect  = document.getElementById('prod-sort');
  const countLabel  = document.getElementById('prod-count');

  /* Focus highlight matching the site's terracotta style */
  searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = 'var(--terracotta)';
    searchInput.style.boxShadow = '0 0 0 3px rgba(193,96,58,0.12)';
  });
  searchInput.addEventListener('blur', () => {
    searchInput.style.borderColor = 'var(--light-border)';
    searchInput.style.boxShadow = 'none';
  });

  /*Render cards dynamically */
  function renderProducts(list) {
    grid.innerHTML = '';

    if (list.length === 0) {
      grid.innerHTML = `<p style="color:var(--warm-grey); font-size:0.95rem; grid-column:1/-1;">
        No products match your search. Try a different keyword.
      </p>`;
      countLabel.textContent = '0 products';
      return;
    }

    countLabel.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;

    list.forEach(p => {
      const tagColors = {
        bestseller: { bg: '#C1603A', text: '#fff' },
        popular:    { bg: '#C9973A', text: '#fff' },
        new:        { bg: '#2C2318', text: '#FDF6EC' }
      };
      const tc = tagColors[p.tag] || tagColors.new;

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="enquiry.html">
          <img src="${p.image}" alt="${p.name}"
               style="width:100%;height:220px;object-fit:cover;border-radius:0;cursor:zoom-in;">
        </a>
        <div class="product-card-body">
          <span style="display:inline-block;padding:0.18rem 0.65rem;border-radius:20px;
                        font-size:0.7rem;font-weight:600;letter-spacing:0.08em;
                        text-transform:uppercase;background:${tc.bg};color:${tc.text};
                        margin-bottom:0.5rem;">${p.tag}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <span class="product-price">R${p.price}</span><br><br>
          <a href="enquiry.html" class="btn-enquire">Enquire Now</a>
        </div>
      `;

      // Lightbox on image click
      const img = card.querySelector('img');
      img.addEventListener('click', e => {
        e.preventDefault();
        if (typeof openLightbox === 'function') openLightbox(img.src, p.name);
      });

      grid.appendChild(card);
    });
  }

  /* Filter + Sort logic */
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const sort  = sortSelect.value;

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    if (sort === 'asc')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'desc') filtered.sort((a, b) => b.price - a.price);

    renderProducts(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  sortSelect.addEventListener('change', applyFilters);

  // Initial render
  renderProducts(products);
});