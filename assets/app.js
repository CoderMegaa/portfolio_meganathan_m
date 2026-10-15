'use strict';

(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const updateThemeLabel = () => {
    const dark = root.getAttribute('data-bs-theme') === 'dark';
    toggle?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    toggle?.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101d25' : '#f7f8f2');
  };
  updateThemeLabel();
  toggle?.addEventListener('click', () => {
    const theme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', theme);
    try { localStorage.setItem('meganathan-theme', theme); } catch (_) { /* Keep session theme. */ }
    updateThemeLabel();
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('meganathan-theme'); } catch (_) {}
    if (saved !== 'light' && saved !== 'dark') {
      root.setAttribute('data-bs-theme', event.matches ? 'dark' : 'light');
      updateThemeLabel();
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menu.hidden = open;
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu && !menu.hidden) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (menu && !menu.hidden && !event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => {
        item.classList.toggle('selected', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      let count = 0;
      document.querySelectorAll('.project-card[data-category]').forEach(card => {
        const visible = filter === 'All projects' || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) count++;
      });
      document.querySelector('.project-count').textContent = `${count} project${count === 1 ? '' : 's'}`;
    });
  });

  const dialog = document.querySelector('.gallery-dialog');
  const galleryData = document.querySelector('#gallery-data');
  if (dialog && galleryData) {
    const images = JSON.parse(galleryData.textContent);
    let index = 0;
    let trigger;
    const showImage = next => {
      index = (next + images.length) % images.length;
      const image = dialog.querySelector('.dialog-image');
      image.src = images[index].src;
      image.alt = images[index].caption;
      dialog.querySelector('.dialog-counter').textContent = `${index + 1} / ${images.length}`;
      dialog.querySelector('.dialog-caption').textContent = images[index].caption;
    };
    document.querySelectorAll('.gallery-trigger').forEach(button => {
      button.addEventListener('click', () => {
        trigger = button;
        showImage(Number(button.dataset.galleryIndex));
        dialog.showModal();
        document.body.classList.add('dialog-open');
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.gallery-prev').addEventListener('click', () => showImage(index - 1));
    dialog.querySelector('.gallery-next').addEventListener('click', () => showImage(index + 1));
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(index - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showImage(index + 1); }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      trigger?.focus();
    });
  }

  document.querySelector('.copy-email')?.addEventListener('click', async event => {
    const email = event.currentTarget.dataset.email;
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = 'Email address copied.';
    } catch (_) {
      status.textContent = `Copy this address: ${email}`;
    }
  });
  document.querySelector('#contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;
    const url = `mailto:meganathanmadesh1999@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(message)}`;
    document.querySelector('.form-status').textContent = 'Your email draft is ready to open. If no email app opens, use the email address shown on this page.';
    window.location.href = url;
  });
  document.querySelector('.print-resume')?.addEventListener('click', () => window.print());
})();
