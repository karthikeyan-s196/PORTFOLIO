const designProjects = [
  { title: 'Neon Pulse Poster', category: 'Posters', img: 'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?auto=format&fit=crop&w=700&q=80' },
  { title: 'Tech Launch Thumbnail', category: 'Thumbnails', img: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=700&q=80' },
  { title: 'Luma Brand Identity', category: 'Branding', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80' },
  { title: 'Retail Social Campaign', category: 'Social Media', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80' },
  { title: 'Music Fest Poster', category: 'Posters', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80' },
  { title: 'Creator Thumbnail Pack', category: 'Thumbnails', img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=700&q=80' }
];

const webProjects = [
  { title: 'SaaS Landing Page', desc: 'Conversion-focused product landing page with premium motion.', stack: ['React', 'Tailwind', 'GSAP'] },
  { title: 'Agency Business Site', desc: 'Multi-page responsive website with CMS-ready structure.', stack: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Creative Portfolio', desc: 'Minimal portfolio with dark aesthetic and case-study flow.', stack: ['Next.js', 'Framer Motion'] },
  { title: 'UI Component Kit', desc: 'Reusable component system and interactive playground.', stack: ['React', 'Storybook', 'TypeScript'] }
];

const categories = ['All', 'Posters', 'Thumbnails', 'Branding', 'Social Media'];
const tabs = document.getElementById('design-tabs');
const grid = document.getElementById('design-grid');
const webGrid = document.getElementById('web-grid');

function renderDesign(selected = 'All') {
  grid.innerHTML = '';
  designProjects
    .filter((p) => selected === 'All' || p.category === selected)
    .forEach((p) => {
      const item = document.createElement('article');
      item.className = 'design-item reveal';
      item.innerHTML = `<img src="${p.img}" alt="${p.title}" loading="lazy" /><div class="overlay"><strong>${p.title}</strong><br/><small>${p.category}</small></div>`;
      item.addEventListener('click', () => openLightbox(p.img, p.title));
      grid.append(item);
    });
  reveal();
}

categories.forEach((c, idx) => {
  const b = document.createElement('button');
  b.textContent = c;
  if (idx === 0) b.classList.add('active');
  b.onclick = () => {
    document.querySelectorAll('.tabs button').forEach((el) => el.classList.remove('active'));
    b.classList.add('active');
    renderDesign(c);
  };
  tabs.append(b);
});

webProjects.forEach((p, idx) => {
  const card = document.createElement('article');
  card.className = 'card reveal';
  card.innerHTML = `<h4>${idx === 0 ? '⭐ Featured: ' : ''}${p.title}</h4><p>${p.desc}</p><p>${p.stack.map((s) => `<span class="tag">${s}</span>`).join(' ')}</p><a class="btn btn-ghost" href="#">GitHub</a>`;
  webGrid.append(card);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

function reveal() {
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

const dialog = document.getElementById('lightbox');
const dialogImg = document.getElementById('lightbox-image');
function openLightbox(src, alt) {
  dialogImg.src = src;
  dialogImg.alt = alt;
  dialog.showModal();
}
document.getElementById('close-lightbox').onclick = () => dialog.close();
dialog.addEventListener('click', (e) => {
  const rect = dialogImg.getBoundingClientRect();
  const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inside) dialog.close();
});

renderDesign();
reveal();
