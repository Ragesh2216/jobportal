// ===== Splash Screen =====
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 700);
  }, 1500);
});

// ===== Navbar Scroll =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== Hamburger / Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// ===== Scroll To Top Button =====
const scrollBtn = document.getElementById('scroll-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Reveal on Scroll =====
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
}

// ===== Hero Particles =====
const particleContainer = document.querySelector('.hero-particles');
if (particleContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.opacity = Math.random() * 0.5 + 0.2;
    particleContainer.appendChild(p);
  }
}

// ===== Counter Animation =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
  }, 16);
}
const statNums = document.querySelectorAll('[data-count]');
if (statNums.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
        cObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => cObs.observe(el));
}

// ===== Auth Tabs (Login Page) =====
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form-panel');
if (authTabs.length && authForms.length) {
  authTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.style.display = 'none');
      tab.classList.add('active');
      authForms[i].style.display = 'flex';
    });
  });
}

// ===== Job Save Button Toggle =====
document.querySelectorAll('.job-save-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (btn.textContent.trim() === '🔖') {
      btn.textContent = '🔖';
      btn.style.color = '#f59e0b';
      btn.style.borderColor = '#f59e0b';
    } else {
      btn.textContent = '🔖';
    }
  });
});

// ===== Filter Toggle on Mobile =====
const filterToggle = document.getElementById('filter-toggle');
const filterSidebar = document.querySelector('.filter-sidebar');
if (filterToggle && filterSidebar) {
  filterToggle.addEventListener('click', () => {
    filterSidebar.classList.toggle('show');
  });
}

// ===== Active Nav Link =====
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});

// ===== Tooltip for skills =====
document.querySelectorAll('.skill-badge').forEach(badge => {
  badge.title = badge.textContent.trim();
});

// ===== Form prevent default & redirect to 404 =====
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '404.html';
  });
});

// ===== All buttons with data-link=404 =====
document.querySelectorAll('[data-link="404"], .btn-apply, .btn-full, .btn-search').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.tagName === 'BUTTON' && el.closest('form')) return;
    window.location.href = '404.html';
  });
});

console.log('%cJobSpark Portal Loaded!', 'color:#4f46e5;font-weight:bold;font-size:1rem;');
