(() => {
  const $ = id => document.getElementById(id);
  let svg = '';
  $('siteUrl').value = new URL('index.html',location.href).href;
  function generate() {
    try {
      const url = new URL($('siteUrl').value);
      if (!['http:','https:'].includes(url.protocol)) throw new Error('HTTP veya HTTPS adresi girin.');
      if (url.username || url.password) throw new Error('Adres kullanıcı adı veya parola içermemelidir.');
      const qr = qrcode(0,'M');
      qr.addData(url.href);
      qr.make();
      svg = qr.createSvgTag({cellSize:5,margin:20,scalable:true});
      $('qrKod').innerHTML = svg;
      $('qrAdres').textContent = url.href;
      $('qrIndir').disabled = false;
      $('qrDurum').textContent = ['localhost','127.0.0.1','[::1]'].includes(url.hostname) ? 'Bu adres yalnızca bu bilgisayarda açılır. Telefonlar için ağ veya yayın adresini girin.' : 'QR kod hazır. Afişi basmadan önce ziyaretçi telefonuyla bağlantıyı deneyin.';
    } catch(error) { svg = ''; $('qrKod').replaceChildren(); $('qrAdres').textContent = ''; $('qrIndir').disabled = true; $('qrDurum').textContent = `QR oluşturulamadı: ${error.message}`; }
  }
  $('qrForm').addEventListener('submit',event => {event.preventDefault();generate();});
  $('qrIndir').addEventListener('click',() => {
    if (!svg) return;
    const url = URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    const a = document.createElement('a'); a.href=url; a.download='istanbul-edebiyat-haritasi-qr.svg'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  $('yazdir').addEventListener('click',()=>window.print());
  generate();
})();
