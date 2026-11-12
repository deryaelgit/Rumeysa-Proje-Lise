/* Tüm içerik mekanlar.js dosyasından gelir; sunucu/veritabanı gerekmez. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const E = window.Edebiyat;
  const esc = E.escape;
  const books = [...new Set(mekanlar.map(m => m.kitap))];
  const colors = Object.fromEntries(books.map((book, i) => [book, E.palette[i % E.palette.length]]));
  const ui = { search: $('aramaKutusu'), book: $('kitapSecim'), author: $('yazarSecim'), route: $('rotaCheck') };
  let map, markersLayer, routeLayer, activeId = null, visible = [], previousRandom = null;
  const markers = new Map();
  const dataErrors = E.validate(mekanlar);
  if (dataErrors.length) {
    $('haritaDurum').textContent = `Veri hatası: ${dataErrors.join('; ')}`;
    $('haritaDurum').hidden = false;
    console.error('Mekân verisi geçersiz:', dataErrors);
    return;
  }
  function mapStatus(message) {
    $('haritaDurum').textContent = message;
    $('haritaDurum').hidden = !message;
  }
  if (typeof L !== 'undefined') {
    map = L.map('harita', { scrollWheelZoom: false }).setView([41.015, 28.979], 11);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
    const osmCredit = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıcıları';
    const esriCredit = 'Tiles &copy; Esri &mdash; Sources: Esri, Maxar, Earthstar Geographics, and the GIS User Community';
    const street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:osmCredit, maxZoom:20, maxNativeZoom:19 });
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution:esriCredit, maxZoom:20, maxNativeZoom:19 });
    const gray = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution:'Tiles &copy; Esri, HERE, Garmin, OpenStreetMap contributors', maxZoom:20, maxNativeZoom:16 });
    const labels = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { attribution:'Labels &copy; Esri', maxZoom:20, maxNativeZoom:19, pane:'overlayPane' });
    const hybrid = L.layerGroup([satellite,labels]);
    const bases = { sokak:street, uydu:hybrid, atlas:gray };
    street.addTo(map);
    let activeBase = 'sokak';
    let failedTiles = 0;
    for (const layer of [street,satellite,gray]) {
      layer.on('tileerror',()=>{ if (!map.hasLayer(layer)) return; failedTiles++; mapStatus('Bu harita görünümü yüklenemedi. İnternetinizi kontrol edin veya başka harita seçin. Mekân listesi ve işaretçiler kullanılabilir.'); });
      layer.on('loading',()=>{failedTiles=0;});
      layer.on('load',()=>{if(!failedTiles && map.hasLayer(layer))mapStatus('');});
    }
    document.querySelectorAll('[data-map-style]').forEach(button=>button.addEventListener('click',()=>{
      map.removeLayer(bases[activeBase]);
      activeBase=button.dataset.mapStyle;
      bases[activeBase].addTo(map);
      $('harita').dataset.style=activeBase;
      mapStatus('');
      document.querySelectorAll('[data-map-style]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    }));
    $('binaDetay').addEventListener('click',()=>{
      const place=visible.find(m=>m.id===activeId)||visible[0];
      if(place)map.setView([place.enlem,place.boylam],18);
      else map.setZoom(18);
    });
    markersLayer = L.layerGroup().addTo(map);
    routeLayer = L.layerGroup().addTo(map);
    if (L.Control.Zoom) {
      const container = map.zoomControl.getContainer();
      container.querySelector('.leaflet-control-zoom-in').setAttribute('aria-label', 'Haritayı yakınlaştır');
      container.querySelector('.leaflet-control-zoom-out').setAttribute('aria-label', 'Haritayı uzaklaştır');
    }
  } else {
    mapStatus('Harita kütüphanesi yüklenemedi. npm install ve npm run build komutlarını çalıştırın. Mekânları aşağıdaki listeden inceleyebilirsiniz.');
  }
  books.forEach(book => ui.book.add(new Option(book, book)));
  [...new Set(mekanlar.map(m => m.yazar))].sort((a,b) => a.localeCompare(b,'tr')).forEach(author => ui.author.add(new Option(author, author)));
  books.forEach(book => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.style.setProperty('--book-color', colors[book]);
    button.innerHTML = `<span class="book-dot" aria-hidden="true"></span>${esc(book)}`;
    button.dataset.book = book;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      ui.book.value = ui.book.value === book ? 'hepsi' : book;
      ui.author.value = 'hepsi';
      render();
    });
    $('lejant').append(button);
  });
  books.forEach(book=>{
    const m=mekanlar.find(m=>m.kitap===book);
    const button=document.createElement('button');button.type='button';button.className='book-card';
    button.innerHTML=`<img src="${esc(m.kitapGorsel)}" alt="${esc(book)} için özgün proje görseli" loading="lazy"><span>${esc(book)}</span><small>${esc(m.yazar)}</small>`;
    button.addEventListener('click',()=>{ui.book.value=book;ui.author.value='hepsi';ui.search.value='';render();$('kesfet').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
    $('kitaplik').append(button);
  });
  function photo(m) {
    // Fotoğraflar yalnızca proje içindeki fotograflar/ klasöründen yüklenir.
    if (!m.foto || !/^fotograflar\/[\w/ .-]+\.(jpg|jpeg|png|webp|gif|avif)$/i.test(m.foto) || m.foto.includes('..')) return '';
    return `<img class="popup-foto" src="${esc(m.foto)}" alt="${esc(m.fotoAciklama || m.mekan)}" loading="lazy">`;
  }
  function popup(m) {
    const locationLabel = m.kesinlik === 'kesin' ? 'Kesin konum' : 'Tahmini konum';
    const evidence = [m.baski ? `<p><b>Baskı</b> ${esc(m.baski)}</p>` : '', m.kaynaklar?.length ? `<p><b>Konum kaynakları</b> ${m.kaynaklar.map(esc).join(' · ')}</p>` : ''].join('');
    return `<article class="place-detail" style="--book-color:${colors[m.kitap]}">
      <div class="detail-hero">${photo(m)}<span class="detail-district"><span aria-hidden="true">⌖</span> ${esc(m.ilce)}</span><span class="detail-photo-caption">${esc(m.fotoAciklama || m.mekan)}</span></div>
      <div class="detail-body"><div class="detail-eyebrow">İSTANBUL'UN EDEBÎ DURAKLARI</div><h3 class="popup-baslik">${esc(m.mekan)}</h3>
      <div class="detail-badges"><span class="detail-badge ${m.kesinlik}"><span aria-hidden="true">${m.kesinlik === 'kesin' ? '◉' : '◌'}</span> ${locationLabel}</span><span class="detail-badge ${m.dogrulandi ? 'verified' : 'pending'}">${m.dogrulandi ? '✓ Doğrulandı' : '◷ Doğrulama bekliyor'}</span></div>
      <div class="detail-book"><img src="${esc(m.kitapGorsel)}" alt="${esc(m.kitap)} için özgün proje görseli"><div><span class="detail-book-label">BU MEKÂNIN KİTABI</span><b>${esc(m.kitap)}</b><span>${esc(m.yazar)} <i>·</i> ${esc(m.yil)}</span></div><span class="detail-book-icon" aria-hidden="true">▤</span></div>
      ${m.alinti ? `<blockquote class="detail-quote">“${esc(m.alinti)}”<cite>${esc(m.sayfa)}${m.baski ? ` · ${esc(m.baski)}` : ''}</cite></blockquote>` : ''}
      <section class="detail-section"><h4><span aria-hidden="true">✎</span> Hikâyedeki yeri</h4><p>${esc(m.ozet)}</p>${!m.alinti ? '<span class="detail-disclaimer">Taslak sahne özeti · birebir alıntı değildir.</span>' : ''}</section>
      <section class="detail-section detail-history"><h4><span aria-hidden="true">◴</span> Eskiden / Bugün</h4><p>${m.eskiBugun ? esc(m.eskiBugun) : 'Bu mekân için karşılaştırma notu henüz eklenmedi.'}</p></section>
      ${m.konumGerekcesi ? `<p class="detail-disclaimer">${esc(m.konumGerekcesi)}</p>` : ''}${m.id === 'oe1' ? '<p class="detail-warning">Yazarla ilişkili mekân; romandaki otelle karıştırılmamalıdır.</p>' : ''}
      <details class="detail-sources"><summary>Fotoğraf ve kaynak bilgisi <span aria-hidden="true">＋</span></summary><p>Fotoğraf: ${esc(m.fotoYazar)} · ${esc(m.fotoLisans)}. <a href="${esc(m.fotoKaynak)}" target="_blank" rel="noopener noreferrer">Kaynağı incele ↗</a>${m.fotoLisansUrl ? ` · <a href="${esc(m.fotoLisansUrl)}" target="_blank" rel="noopener noreferrer">Lisans koşulları</a>` : ''}</p><p>Fotoğraf ölçeklenip çerçeveye sığdırılarak gösterilir. Görselin çekim tarihi bugünü temsil etmeyebilir.</p>${evidence}${!m.alinti ? '<p>Kitap alıntısı ve sayfa bilgisi henüz eklenmedi.</p>' : ''}</details>
      <a class="detail-maps" href="https://www.google.com/maps?q=${m.enlem},${m.boylam}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌖</span> Google Maps’te aç <span aria-hidden="true">↗</span></a>
      </div></article>`;
  }

  function fit() {
    if (map && visible.length) map.fitBounds(L.latLngBounds(visible.map(m => [m.enlem,m.boylam])), { padding: [40,40], maxZoom: 14 });
  }
  function selectPlace(id, pan = true) {
    activeId = id;
    document.querySelectorAll('.place-card').forEach(card => {
      const selected = card.dataset.id === id;
      card.classList.toggle('active', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
    markers.forEach((marker, markerId) => marker.getElement()?.querySelector('.map-marker')?.classList.toggle('selected', markerId === id));
    const marker = markers.get(id);
    if (marker && pan) map.setView(marker.getLatLng(),15,{animate:!window.matchMedia('(prefers-reduced-motion: reduce)').matches});
    const place=visible.find(m=>m.id===id);
    if (!place) return;
    const content=$('mekanDialogIcerik');
    content.innerHTML=popup(place);
    content.querySelector('.popup-baslik').id='mekanDetayBaslik';
    content.scrollTop=0;
    const position=visible.findIndex(m=>m.id===id);
    $('mekanDialogSayac').textContent=`${position+1} / ${visible.length} durak`;
    $('oncekiMekan').disabled=visible.length<2;
    $('sonrakiMekan').disabled=visible.length<2;
    if (!$('mekanDialog').open) $('mekanDialog').showModal();
  }
  $('mekanDialog').querySelector('.place-dialog-close').addEventListener('click',()=>$('mekanDialog').close());
  $('mekanDialog').addEventListener('click',event=>{if(event.target===$('mekanDialog')){const rect=$('mekanDialog').getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)$('mekanDialog').close();}});
  $('mekanDialog').addEventListener('close',()=>{document.body.classList.remove('detail-open');});
  function adjacent(step) {const index=visible.findIndex(m=>m.id===activeId);const place=visible[(index+step+visible.length)%visible.length];if(place)selectPlace(place.id,false);}
  $('oncekiMekan').addEventListener('click',()=>adjacent(-1));
  $('sonrakiMekan').addEventListener('click',()=>adjacent(1));

  function render() {
    visible = E.filter(mekanlar, { search: ui.search.value, book: ui.book.value, author: ui.author.value });
    activeId = null;
    markers.clear();
    markersLayer?.clearLayers();
    routeLayer?.clearLayers();
    const list = $('mekanListesi');
    list.replaceChildren();
    $('sayac').textContent = `${visible.length} / ${mekanlar.length} mekân`;
    $('rastgeleBtn').disabled = !visible.length;
    $('haritayiSigdir').disabled = !visible.length || !map;
    if (!visible.length) list.innerHTML = '<div class="empty-state"><strong>Bu sayfada bir durak yok.</strong>Aramayı kısaltın veya filtreleri temizleyerek başka bir hikâyeye geçin.</div>';
    visible.forEach(m => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'place-card';
      card.dataset.id = m.id;
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', `${m.mekan}, ${m.kitap}. Ayrıntıları aç`);
      card.style.setProperty('--book-color',colors[m.kitap]);
      card.innerHTML = `${m.foto ? `<img class="place-photo" src="${esc(m.foto)}" alt="" loading="lazy">` : ''}<span class="place-meta"><span>${esc(m.ilce)}</span><span>${m.dogrulandi ? '✓ Doğrulandı' : 'Doğrulanacak'}</span></span><h4>${esc(m.mekan)}</h4><span class="place-book"><span class="book-dot" aria-hidden="true"></span>${esc(m.kitap)}</span><span class="place-author">${esc(m.yazar)} · ${esc(m.yil)}</span><span class="card-arrow" aria-hidden="true">↗</span>`;
      card.addEventListener('click', () => selectPlace(m.id));
      list.append(card);
      if (map) {
        const marker = L.marker([m.enlem,m.boylam], {
          icon: L.divIcon({ className:'', html:`<div class="map-marker ${m.kesinlik}" style="--book-color:${colors[m.kitap]}">${m.sira}</div>`, iconSize:[27,27], iconAnchor:[13.5,13.5], popupAnchor:[0,-16] }),
          title: `${m.mekan} · ${m.kitap}`,
          alt: `${m.mekan} konum işaretçisi`,
          keyboard: true
        }).addTo(markersLayer);
        marker.bindTooltip(`<div class="hover-photo">${photo(m)}<div><b>${esc(m.mekan)}</b><span>${esc(m.kitap)}</span><small>${esc(m.fotoAciklama || 'Mekân görseli')}</small><small>${esc(m.fotoYazar)} · ${esc(m.fotoLisans)}</small></div></div>`, {direction:'top',offset:[0,-19],className:'photo-tooltip',opacity:1});
        const el=marker.getElement(); el?.addEventListener('focus',()=>marker.openTooltip()); el?.addEventListener('blur',()=>marker.closeTooltip());
        marker.on('click', () => selectPlace(m.id, false));
        markers.set(m.id, marker);
      }
    });
    const stops = E.route(visible, ui.book.value);
    if (ui.book.value === 'hepsi') $('rotaBilgi').textContent = 'Rota için bir kitap seçin.';
    else if (!ui.route.checked) $('rotaBilgi').textContent = 'Kitap rotası gizli.';
    else if (stops.length < 2) $('rotaBilgi').textContent = 'Rota için en az 2 görünür durak gerekir.';
    else {
      $('rotaBilgi').textContent = `${stops.length} durak · Örnek kayıt sırası; yürüyüş rotası değildir.`;
      if (map) L.polyline(stops.map(m => [m.enlem,m.boylam]), { color: colors[ui.book.value], weight:3, dashArray:'7 8' }).addTo(routeLayer);
    }
    document.querySelectorAll('.chip').forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.book === ui.book.value)));
    fit();
  }
  ui.search.addEventListener('input', render);
  ui.book.addEventListener('change', render);
  ui.author.addEventListener('change', render);
  ui.route.addEventListener('change', render);
  $('sifirlaBtn').addEventListener('click', () => { ui.search.value = ''; ui.book.value = ui.author.value = 'hepsi'; render(); });
  $('haritayiSigdir').addEventListener('click', fit);
  $('rastgeleBtn').addEventListener('click', () => {
    // Rastgele keşif, ziyaretçinin filtrelediği kayıtlar arasından seçim yapar.
    const choices = visible.length > 1 ? visible.filter(m => m.id !== previousRandom) : visible;
    if (!choices.length) return;
    const m = choices[Math.floor(Math.random() * choices.length)];
    previousRandom = m.id;
    selectPlace(m.id);
    const card = [...document.querySelectorAll('.place-card')].find(c => c.dataset.id === m.id);
    if (card) { const sidebar = card.closest('.place-sidebar'); sidebar.scrollTop = card.offsetTop - sidebar.offsetTop - 55; }
  });
  const s = E.stats(mekanlar);
  $('sKitap').textContent = s.books;
  $('sYazar').textContent = s.authors;
  $('sMekan').textContent = s.places;
  $('sDogru').textContent = `%${s.verified}`;
  const max = Math.max(1, ...Object.values(s.districts));
  Object.entries(s.districts).sort((a,b) => b[1]-a[1]).forEach(([district,count]) => {
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `<span>${esc(district)}</span><div class="bar-track" aria-hidden="true"><div class="bar" style="width:${count/max*100}%"></div></div><b>${count}</b>`;
    $('ilceGrafik').append(row);
  });
  books.forEach(book => {
    const m = mekanlar.find(m => m.kitap === book);
    const article = document.createElement('article');
    article.innerHTML = `<h3>${esc(book)}</h3><p>${esc(m.yazar)} · İlk yayın yılı (rehber verisi): ${esc(m.yil)}</p><p>${m.baski ? `Baskı: ${esc(m.baski)}` : 'Kullanılan baskı, yayınevi, sayfa ve konum kaynakları: eklenecek.'}</p>`;
    $('kaynakcaListesi').append(article);
  });
  const photoCredits=document.createElement('article');
  photoCredits.innerHTML='<h3>Fotoğraf kaynakları</h3>'+mekanlar.map(m=>`<p>${esc(m.mekan)}: ${esc(m.fotoYazar)} · ${esc(m.fotoLisans)} · <a href="${esc(m.fotoKaynak)}" target="_blank" rel="noopener noreferrer">Wikimedia kaynağı</a>${m.fotoLisansUrl ? ` · <a href="${esc(m.fotoLisansUrl)}" target="_blank" rel="noopener noreferrer">Lisans</a>` : ''}</p>`).join('');
  $('kaynakcaListesi').append(photoCredits);
  function openDialog(id) { $(id).showModal(); }
  $('kaynakcaBtn').addEventListener('click', () => openDialog('kaynakcaDialog'));
  $('lisansBtn').addEventListener('click',()=>openDialog('kaynakcaDialog'));
  document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  const sessionSuggestions = [];
  const downloadMode = window.ATLAS_CONFIG?.suggestions === 'download';
  if (downloadMode) {
    $('oneriDialog').querySelector('h2 + p').textContent = 'Bu canlı sürümde öneriniz JSON dosyası olarak indirilir. Siteye otomatik gönderilmez. Dosyayı proje ekibine ayrıca iletin.';
    $('oneriForm').querySelector('[type=submit]').textContent = 'Öneriyi JSON dosyası olarak indir';
  }
  function updateSuggestions() {
    $('oneriAdet').textContent = `${sessionSuggestions.length} öneri bu oturumda ${downloadMode ? 'hazırlandı' : 'kaydedildi'}`;
    $('oneriIndir').disabled = !sessionSuggestions.length;
  }
  $('oneriAc').addEventListener('click', () => { updateSuggestions(); openDialog('oneriDialog'); });
  $('oneriForm').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Lütfen bu alanı doldurun.');
      if (!field.reportValidity()) return;
    }
    const entry = Object.fromEntries([...new FormData(form)].map(([key,value]) => [key,String(value).trim()]));
    const submit = form.querySelector('[type=submit]');
    if (downloadMode) {
      const record={...entry,id:crypto.randomUUID(),tarih:new Date().toISOString(),dogrulandi:false};
      sessionSuggestions.push(record);
      const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json;charset=utf-8'}));
      const link=document.createElement('a');link.href=url;link.download='mekan-onerisi.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      $('oneriDurum').textContent='Öneriniz JSON dosyası olarak indirildi. Henüz ekibe gönderilmedi; dosyayı proje ekibine iletin.';
      form.reset();updateSuggestions();return;
    }
    submit.disabled = true;
    $('oneriDurum').textContent = 'Öneriniz dosyaya kaydediliyor…';
    try {
      const response = await fetch(new URL('api/oneriler',document.baseURI), { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(entry), signal:AbortSignal.timeout(15000) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Kayıt sunucusuna ulaşılamadı. Projeyi npm start ile çalıştırın.');
      sessionSuggestions.push({...entry,id:result.id,tarih:result.tarih,dogrulandi:false});
      $('oneriDurum').textContent = 'Öneriniz sunucudaki oneriler.json dosyasına kaydedildi. İncelendikten sonra haritaya eklenebilir.';
      form.reset();
      updateSuggestions();
    } catch (error) {
      $('oneriDurum').textContent = `Kayıt tamamlanamadı. ${error.name === 'TimeoutError' ? 'Sunucu zamanında yanıt vermedi; tekrar göndermeden önce oneriler.json dosyasını kontrol edin.' : error.message} Girdiğiniz bilgiler formda korunuyor.`;
    } finally { submit.disabled = false; }
  });
  $('oneriForm').addEventListener('input', event => event.target.setCustomValidity?.(''));
  $('oneriIndir').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({proje:'İstanbul Edebiyat Haritası',oneriler:sessionSuggestions},null,2)],{type:'application/json;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'edebiyat-haritasi-oneriler.json';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  updateSuggestions();

  render();
})();
