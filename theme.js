/* Tema, ilk çizimden önce uygulanır. Tercih yoksa cihaz ayarı izlenir. */
(() => {
  const key = 'edebiyat-atlasi-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { const stored = localStorage.getItem(key); if (['light','dark'].includes(stored)) preference = stored; } catch {}
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const button = document.getElementById('temaDegistir');
    if (button) {
      button.setAttribute('aria-pressed',String(theme === 'dark'));
      button.setAttribute('aria-label',theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
      button.title = theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç';
      button.innerHTML = theme === 'dark' ? '<span aria-hidden="true">☀</span><span class="theme-label">Açık tema</span>' : '<span aria-hidden="true">☾</span><span class="theme-label">Koyu tema</span>';
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme === 'dark' ? '#101a19' : '#f6f8f4');
  }
  apply(preference || (media.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded',() => {
    apply(document.documentElement.dataset.theme);
    document.getElementById('temaDegistir')?.addEventListener('click',() => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key,preference); } catch {}
      apply(preference);
    });
  });
  media.addEventListener('change',event => { if (!preference) apply(event.matches ? 'dark' : 'light'); });
})();
