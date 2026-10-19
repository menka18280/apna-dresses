document.addEventListener('DOMContentLoaded', async function(){
  const whatsappNumber = '919708952009'; // update as needed
  const productsContainer = document.getElementById('products');
  const filtersContainer = document.querySelector('.filters');

  // Determine current page filename
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Load products.json
  let data = [];
  try {
    const res = await fetch('products.json');
    data = await res.json();
  } catch (e) {
    console.error('Failed to load products.json', e);
  }

  // Filter products for this page
  const pageProducts = data.filter(p => p.page === page);

  // Build set of categories (subcategories) for filters
  const categories = Array.from(new Set(pageProducts.map(p => p.category)));

  function renderFilters(){
    // Clear existing filter buttons except a placeholder
    filtersContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.textContent = 'All'; allBtn.dataset.filter = 'all'; allBtn.className = 'active';
    filtersContainer.appendChild(allBtn);
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.dataset.filter = cat;
      filtersContainer.appendChild(btn);
    });

    filtersContainer.addEventListener('click', (e)=>{
      if(e.target.tagName !== 'BUTTON') return;
      Array.from(filtersContainer.querySelectorAll('button')).forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      renderProducts(filter);
    });
  }

  function renderProducts(filter='all'){
    productsContainer.innerHTML = '';
    const list = pageProducts.filter(p => filter==='all' || p.category===filter);
    list.forEach(p => {
      const art = document.createElement('article');
      art.className = 'product';
      art.dataset.category = p.category;

      const img = document.createElement('img');
      img.className = 'product-img';
      img.src = (p.images && p.images[0]) || '';
      img.alt = p.name;

      const h3 = document.createElement('h3'); h3.textContent = p.name;
      const desc = document.createElement('p'); desc.textContent = p.description || '';
      const price = document.createElement('p'); price.className = 'price'; price.textContent = '₹' + p.price;
      const call = document.createElement('p'); call.innerHTML = `Call: <a href="tel:+91${whatsappNumber}">+91 ${whatsappNumber.slice(2,7)} ${whatsappNumber.slice(7)}</a>`;
      const wa = document.createElement('p'); wa.innerHTML = `<a class="btn whatsapp" data-name="${p.name}" href="#">WhatsApp</a>`;

      art.appendChild(img); art.appendChild(h3); art.appendChild(desc); art.appendChild(price); art.appendChild(call); art.appendChild(wa);
      productsContainer.appendChild(art);
    });

    // Wire WA links after render
    document.querySelectorAll('.whatsapp').forEach(a=>{
      const name = a.dataset.name || 'product';
      const text = `Hello, I want to order: ${name}`;
      a.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      a.target = '_blank'; a.rel = 'noopener';
    });
  }

  // Render floating WA button
  (function addFloat(){
    const float = document.createElement('a');
    float.className = 'wa-float';
    float.href = `https://wa.me/${whatsappNumber}`;
    float.target = '_blank'; float.rel = 'noopener';
    float.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.132 1.6 5.92L0 24l6.317-1.6A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.246-6.188-3.48-8.52z" fill="#25D366"/><path d="M17.2 14.02c-.3-.15-1.77-.87-2.04-.97-.3-.12-.52-.18-.74.18-.22.36-.85.97-1.04 1.17-.19.2-.37.23-.68.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.74-1.78-1.02-2.44-.27-.63-.55-.54-.75-.55-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.37-.3.29-1.12 1.09-1.12 2.64 0 1.54 1.15 3.03 1.31 3.24.17.21 2.27 3.64 5.5 4.96 3.23 1.31 3.23.87 3.82.82.6-.05 1.94-.79 2.22-1.55.28-.76.28-1.42.2-1.55-.07-.13-.26-.2-.56-.35z" fill="#fff"/></svg>';
    document.body.appendChild(float);
  })();

  // Kickoff
  renderFilters();
  renderProducts('all');
});
