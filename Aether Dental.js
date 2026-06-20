// Scroll reveal with stagger index
const revealEls = document.querySelectorAll('[data-reveal]');
revealEls.forEach((el, i) => {
  const siblings = el.parentElement.querySelectorAll('[data-reveal]');
  const idx = Array.prototype.indexOf.call(siblings, el);
  el.style.setProperty('--i', idx);
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// Scan cursor follow (desktop only)
const cursor = document.querySelector('.scan-cursor');
if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });

  document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '36px';
      cursor.style.height = '36px';
      cursor.style.borderColor = 'rgba(44,95,112,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.borderColor = '#2C5F70';
    });
  });
}

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

// CTA form (demo submission, no backend)
const form = document.getElementById('ctaForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    note.textContent = `Спасибо, ${name || 'мы'}! Администратор свяжется с вами в течение 15 минут.`;
    form.reset();
  });
}

// Sticky header background intensifies on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = '0 1px 0 rgba(27,32,36,0.06)';
  } else {
    header.style.boxShadow = 'none';
  }
});
