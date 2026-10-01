
const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav-links');

function updateNavIndicator(link){
 if(!nav || !link) return;
 const nr=nav.getBoundingClientRect(), lr=link.getBoundingClientRect();
 nav.style.setProperty('--nav-line-left',`${lr.left-nr.left}px`);
 nav.style.setProperty('--nav-line-width',`${lr.width}px`);
}

function setActiveNav(){
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 let active=null;
 document.querySelectorAll('.nav-links a').forEach(a=>{
   const href=(a.getAttribute('href')||'').split('/').pop().toLowerCase();
   const isActive=href===current || (current==='' && href==='index.html');
   a.classList.toggle('active',isActive);
   if(isActive) active=a;
 });
 if(active) updateNavIndicator(active);
}

if(menu){
 menu.addEventListener('click',()=>{
   const open=nav.classList.toggle('open');
   menu.classList.toggle('is-open',open);
   menu.setAttribute('aria-expanded',String(open));
 });
}
document.querySelectorAll('.nav-links a').forEach(a=>{
 a.addEventListener('mouseenter',()=>updateNavIndicator(a));
 a.addEventListener('focus',()=>updateNavIndicator(a));
 a.addEventListener('click',()=>{
   document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
   a.classList.add('active');
   updateNavIndicator(a);
   nav?.classList.remove('open');
   menu?.classList.remove('is-open');
 });
});
nav?.addEventListener('mouseleave',()=>setActiveNav());
setActiveNav();

const revealItems=[...document.querySelectorAll('.reveal')];
revealItems.forEach((el,i)=>{
  if(el.classList.contains('feature-copy')||el.classList.contains('from-right')) el.classList.add('from-right');
  else if(el.classList.contains('feature-img')||el.classList.contains('from-left')) el.classList.add('from-left');
  else if(i%3===0) el.classList.add('from-left');
  else if(i%3===1) el.classList.add('from-right');
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach((entry)=>{
   if(entry.isIntersecting){
     entry.target.style.transitionDelay=`${Math.min((revealItems.indexOf(entry.target)%5)*70,280)}ms`;
     entry.target.classList.add('visible');
     observer.unobserve(entry.target);
   }
 });
},{threshold:.12});
revealItems.forEach(el=>observer.observe(el));

document.querySelectorAll('img').forEach(img=>{
 img.addEventListener('error',()=>{
   img.style.background='linear-gradient(135deg,#111631,#132f35)';
   img.style.minHeight='180px';
 });
});

document.querySelectorAll('form[data-demo-form]').forEach(form=>{
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const notice=form.parentElement.querySelector('.notice');
  if(notice){notice.style.display='block';notice.textContent='Message received — the NEXA team will get back to you shortly.'}
  form.reset();
 });
});

const hero=document.querySelector('.hero-art');
if(hero && window.matchMedia('(pointer:fine)').matches){
 hero.addEventListener('pointermove',e=>{
  const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  const photo=hero.querySelector('.hero-main-img');
  if(photo) photo.style.transform=`rotate(${2+x*3}deg) translate3d(${x*9}px,${y*9}px,0) scale(1.015)`;
 });
 hero.addEventListener('pointerleave',()=>{
  const p=hero.querySelector('.hero-main-img');if(p)p.style.transform='rotate(2deg)';
 });
}

document.querySelectorAll('.card,.service-card,.stat').forEach(card=>{
 if(!window.matchMedia('(pointer:fine)').matches)return;
 card.addEventListener('pointermove',e=>{
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(700px) rotateX(${-y*2}deg) rotateY(${x*2}deg) translateY(-5px)`;
 });
 card.addEventListener('pointerleave',()=>card.style.transform='');
});
