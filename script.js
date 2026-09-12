(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const cursor=$('.cursor-glow');
  if(cursor && matchMedia('(pointer:fine)').matches){window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'})}
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  $$('.side-nav a').forEach(a=>{const href=a.getAttribute('href').split('/').pop().split('#')[0].toLowerCase()||'index.html'; if(href===current || (current===''&&href==='index.html'))a.classList.add('active')});
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  $$('.reveal').forEach(el=>io.observe(el));
  // hover tilt on desktop cards
  if(matchMedia('(pointer:fine)').matches){
    $$('.project,.mini-card,.contact-link').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-5px)`});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }
  // subtle page transition
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||a.target==='_blank'||a.origin!==location.origin||a.getAttribute('href')?.startsWith('#'))return;e.preventDefault();document.body.style.opacity='.45';document.body.style.transition='opacity .18s';setTimeout(()=>location.href=a.href,150)});
})();
