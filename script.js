document.addEventListener('DOMContentLoaded', function(){
  const buttons = document.querySelectorAll('.filters button');
  const products = document.querySelectorAll('.product');
  const whatsappNumber = '919708952009'; // international without +

  function setActive(btn){
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }

  function filter(category){
    products.forEach(p=>{
      if(category==='all' || p.dataset.category===category){
        p.style.display='block';
      } else {
        p.style.display='none';
      }
    });
  }

  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setActive(btn);
      filter(btn.dataset.filter);
    });
  });

  // Wire WhatsApp buttons: use data-name or product title
  document.querySelectorAll('.whatsapp').forEach(a=>{
    const name = a.dataset.name || (a.closest('.product') && a.closest('.product').querySelector('h3')?.textContent) || 'product';
    const text = `Hello, I want to order: ${name}`;
    a.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Floating WhatsApp button (bottom-right)
  const float = document.createElement('a');
  float.className = 'wa-float';
  float.href = `https://wa.me/${whatsappNumber}`;
  float.target = '_blank';
  float.rel = 'noopener';
  float.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.132 1.6 5.92L0 24l6.317-1.6A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.246-6.188-3.48-8.52z" fill="#25D366"/><path d="M17.2 14.02c-.3-.15-1.77-.87-2.04-.97-.3-.12-.52-.18-.74.18-.22.36-.85.97-1.04 1.17-.19.2-.37.23-.68.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.74-1.78-1.02-2.44-.27-.63-.55-.54-.75-.55-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.37-.3.29-1.12 1.09-1.12 2.64 0 1.54 1.15 3.03 1.31 3.24.17.21 2.27 3.64 5.5 4.96 3.23 1.31 3.23.87 3.82.82.6-.05 1.94-.79 2.22-1.55.28-.76.28-1.42.2-1.55-.07-.13-.26-.2-.56-.35z" fill="#fff"/></svg>';
  document.body.appendChild(float);
});
