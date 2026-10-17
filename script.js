document.addEventListener('DOMContentLoaded', function(){
  const buttons = document.querySelectorAll('.filters button');
  const products = document.querySelectorAll('.product');

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
});
