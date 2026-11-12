/* Veri işlevleri hem tarayıcıda hem Node testlerinde kullanılabilir. */
(function (root) {
  'use strict';
  const palette = ['#b96651', '#c4974a', '#4f8c7b', '#5c829b', '#8a70a0', '#81934c', '#a37d61', '#b86388'];
  const normalize = value => String(value ?? '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function filter(data, { search = '', book = 'hepsi', author = 'hepsi' } = {}) {
    const words = normalize(search).trim().split(/\s+/).filter(Boolean);
    return data.filter(m => (book === 'hepsi' || m.kitap === book) && (author === 'hepsi' || m.yazar === author) && words.every(word => normalize([m.mekan, m.kitap, m.yazar, m.ilce, m.ozet].join(' ')).includes(word)));
  }
  function stats(data) {
    return {
      books: new Set(data.map(m => m.kitap)).size,
      authors: new Set(data.map(m => m.yazar)).size,
      places: data.length,
      verified: data.length ? Math.round(data.filter(m => m.dogrulandi).length / data.length * 100) : 0,
      districts: data.reduce((acc, m) => { acc[m.ilce] = (acc[m.ilce] || 0) + 1; return acc; }, {})
    };
  }
  function route(data, book) {
    if (book === 'hepsi') return [];
    return data.filter(m => m.kitap === book && Number.isFinite(m.sira)).sort((a,b) => a.sira - b.sira);
  }
  function validate(data) {
    const ids = new Set();
    const errors = [];
    data.forEach((m, i) => {
      for (const key of ['id', 'kitap', 'yazar', 'mekan', 'ilce', 'ozet']) if (typeof m[key] !== 'string' || !m[key].trim()) errors.push(`${i + 1}: ${key} eksik`);
      if (ids.has(m.id)) errors.push(`${m.id}: id tekrar ediyor`);
      ids.add(m.id);
      if (!Number.isFinite(m.enlem) || m.enlem < -90 || m.enlem > 90 || !Number.isFinite(m.boylam) || m.boylam < -180 || m.boylam > 180) errors.push(`${m.id}: koordinat geçersiz`);
      if (!['kesin','tahmini'].includes(m.kesinlik)) errors.push(`${m.id}: kesinlik geçersiz`);
      if (typeof m.dogrulandi !== 'boolean') errors.push(`${m.id}: doğrulama durumu geçersiz`);
      if (!Number.isInteger(m.sira) || m.sira < 1) errors.push(`${m.id}: sıra geçersiz`);
      if (m.alinti && !m.sayfa) errors.push(`${m.id}: alıntının sayfası eksik`);
      if (m.dogrulandi && (!m.sayfa || !m.baski || !m.kontrolEden || !m.kontrolTarihi || !Array.isArray(m.kaynaklar) || new Set(m.kaynaklar.filter(s => typeof s === 'string' && s.trim())).size < 2)) errors.push(`${m.id}: doğrulama belgeleri eksik`);
    });
    return errors;
  }
  const api = { palette, normalize, escape, filter, stats, route, validate };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Edebiyat = api;
})(typeof window !== 'undefined' ? window : globalThis);
