// Apply the saved preference before paint to avoid a flash on page navigation.
(() => {
  let saved;
  try { saved = localStorage.getItem('meganathan-theme'); } catch (_) { /* Storage may be unavailable. */ }
  const theme = saved === 'light' || saved === 'dark' ? saved :
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-bs-theme', theme);
})();
