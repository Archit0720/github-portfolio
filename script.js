const pages = [...document.querySelectorAll('[data-page-content]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const sidebar = document.getElementById('sidebar');
const contactToggle = document.getElementById('contactToggle');

function showPage(name){
  pages.forEach(page => page.classList.toggle('active', page.dataset.pageContent === name));
  navLinks.forEach(link => {
    const active = link.dataset.page === name;
    link.classList.toggle('active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

navLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));
document.querySelectorAll('[data-page-jump]').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.pageJump)));

contactToggle?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  contactToggle.setAttribute('aria-expanded', String(open));
  contactToggle.querySelector('.material-symbols-outlined').textContent = open ? 'expand_less' : 'expand_more';
});

// Small hover effect for project cards without adding unnecessary motion.
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-5px) rotateX(${(-y*1.2).toFixed(2)}deg) rotateY(${(x*1.2).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Experience slider on the About page.
const expTrack = document.querySelector('.experience-track');
const expDots = [...document.querySelectorAll('#expDots button')];
let expIndex = 0;
function setExperienceSlide(index){
  if(!expTrack) return;
  expIndex = (index + 3) % 3;
  expTrack.style.transform = `translateX(-${expIndex * 100}%)`;
  expDots.forEach((dot,i)=>dot.classList.toggle('active',i===expIndex));
}
document.getElementById('expPrev')?.addEventListener('click',()=>setExperienceSlide(expIndex-1));
document.getElementById('expNext')?.addEventListener('click',()=>setExperienceSlide(expIndex+1));
expDots.forEach(dot=>dot.addEventListener('click',()=>setExperienceSlide(Number(dot.dataset.slide))));

// Theme preference, persisted locally.
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('archit-theme');
if(savedTheme === 'dark'){ document.body.classList.add('dark'); document.documentElement.classList.add('dark'); }
function updateThemeIcon(){
  const icon = themeToggle?.querySelector('.material-symbols-outlined');
  if(icon) icon.textContent = document.body.classList.contains('dark') ? 'light_mode' : 'dark_mode';
}
updateThemeIcon();
themeToggle?.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  document.documentElement.classList.toggle('dark', document.body.classList.contains('dark'));
  localStorage.setItem('archit-theme',document.body.classList.contains('dark')?'dark':'light');
  updateThemeIcon();
});
