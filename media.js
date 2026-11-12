/* Yerel lisanslı fotoğraf galerisi. Google görüntüleri indirilmez veya kopyalanmaz. */
(() => {
  'use strict';
  const E=window.Edebiyat;
  const esc=E.escape;
  const safeImage=path=>typeof path==='string'&&/^fotograflar\/[\w/ .-]+\.(jpg|jpeg|png|webp|gif|avif)$/i.test(path)&&!path.includes('..');
  function photos(place){
    const list=Array.isArray(place.fotograflar)?place.fotograflar:[];
    const fallback={src:place.foto,baslik:place.fotoAciklama||place.mekan,yazar:place.fotoYazar,lisans:place.fotoLisans,lisansUrl:place.fotoLisansUrl,kaynak:place.fotoKaynak};
    return (list.length?list:[fallback]).filter(p=>safeImage(p.src));
  }
  function sourceLink(url,text){
    try{const u=new URL(url);if(!['https:','http:'].includes(u.protocol))return '';return `<a href="${esc(u.href)}" target="_blank" rel="noopener noreferrer">${esc(text)} ↗</a>`;}catch{return '';}
  }
  function credit(photo){return `<span>${esc(photo.yazar)} · ${esc(photo.lisans)}</span> ${sourceLink(photo.kaynak,'Kaynak')} ${sourceLink(photo.lisansUrl,'Lisans')}`;}
  function panoramaUrl(place){const u=new URL('https://www.google.com/maps/@');Object.entries({api:'1',map_action:'pano',viewpoint:`${place.enlem},${place.boylam}`}).forEach(([k,v])=>u.searchParams.set(k,v));return u.href;}
  function gallery(place){
    const list=photos(place),first=list[0];
    if(!first)return '';
    return `<section class="media-gallery" aria-label="${esc(place.mekan)} fotoğraf galerisi"><div class="detail-hero"><button type="button" class="media-main" data-photo-open="0" aria-label="Fotoğrafı büyüt: ${esc(first.baslik)}"><img class="popup-foto" src="${esc(first.src)}" alt="${esc(first.baslik)}"><span class="media-expand" aria-hidden="true">⤢ Büyüt</span></button><span class="detail-district"><span aria-hidden="true">⌖</span> ${esc(place.ilce)}</span><span class="media-count">1 / ${list.length}</span></div><div class="media-gallery-bottom"><div class="media-thumbs" role="group" aria-label="Fotoğraf seç">${list.map((p,i)=>`<button type="button" data-photo-select="${i}" aria-label="${i+1}. görsel: ${esc(p.baslik)}" aria-pressed="${i===0}"><img src="${esc(p.src)}" alt="" loading="lazy"></button>`).join('')}</div><p class="media-caption">${esc(first.baslik)}</p><p class="media-credit">${credit(first)}</p></div></section>`;
  }
  function streetView(place){
    return `<section class="streetview-card" aria-labelledby="streetviewTitle"><div class="streetview-icon" aria-hidden="true">360°</div><div><h4 id="streetviewTitle">Sokağın içinde gezinin</h4><p>Google Street View'da çevreye bakın ve mevcut sokak görüntüleri arasında ilerleyin.</p></div><a class="streetview-link" href="${esc(panoramaUrl(place))}" target="_blank" rel="noopener noreferrer">Google’da 360° gez ↗</a><p class="streetview-note">Yeni sekmede açılır. Kapsama varsa en yakın panorama gösterilir; konum tahmini olabilir. Bu görünüm tarihî sahneyi veya bugünün koşullarını doğrulamaz.</p></section>`;
  }
  let dialog=null,list=[],current=0,placeName='',zoomed=false,touchStart=null;
  function init(){
    if(dialog)return;
    dialog=document.createElement('dialog');dialog.id='fotografDialog';dialog.className='photo-viewer';dialog.setAttribute('aria-labelledby','fotografBaslik');
    dialog.innerHTML=`<header class="photo-viewer-top"><div><span class="photo-viewer-label">MEKÂN GALERİSİ</span><h2 id="fotografBaslik"></h2></div><div class="photo-viewer-actions"><button type="button" id="fotoZoom" aria-label="Fotoğrafı yakınlaştır" aria-pressed="false">＋</button><button type="button" id="fotoKapat" aria-label="Fotoğraf galerisini kapat">×</button></div></header><div class="photo-viewer-middle"><button type="button" class="photo-arrow previous" id="fotoOnceki" aria-label="Önceki fotoğraf">‹</button><div id="fotoSahne" class="photo-stage" tabindex="0" aria-label="Büyük fotoğraf"><img id="buyukFotograf" alt=""></div><button type="button" class="photo-arrow next" id="fotoSonraki" aria-label="Sonraki fotoğraf">›</button></div><footer class="photo-viewer-bottom"><div class="photo-viewer-info"><p id="fotoAciklama"></p><p id="fotoLisans"></p></div><span id="fotoSayac" role="status" aria-live="polite"></span></footer>`;
    document.body.append(dialog);
    document.getElementById('fotoKapat').addEventListener('click',()=>dialog.close());
    document.getElementById('fotoOnceki').addEventListener('click',()=>show(current-1));
    document.getElementById('fotoSonraki').addEventListener('click',()=>show(current+1));
    document.getElementById('fotoZoom').addEventListener('click',()=>{
      const image=document.getElementById('buyukFotograf');const box=image.getBoundingClientRect();zoomed=!zoomed;
      document.getElementById('fotoSahne').dataset.zoom=String(zoomed);
      image.style.width=zoomed?`${box.width*2}px`:'';image.style.height=zoomed?`${box.height*2}px`:'';
      const button=document.getElementById('fotoZoom');button.setAttribute('aria-pressed',String(zoomed));button.setAttribute('aria-label',zoomed?'Fotoğrafı normal boyuta getir':'Fotoğrafı yakınlaştır');button.textContent=zoomed?'−':'＋';
    });
    dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}});
    const stage=document.getElementById('fotoSahne');
    stage.addEventListener('pointerdown',event=>{touchStart={x:event.clientX,y:event.clientY};});
    stage.addEventListener('pointerup',event=>{if(!touchStart||zoomed)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)show(current+(dx<0?1:-1));});
    dialog.addEventListener('close',()=>{document.getElementById('buyukFotograf').removeAttribute('src');touchStart=null;});
  }
  function show(index){
    if(!list.length)return;
    current=(index+list.length)%list.length;const photo=list[current];zoomed=false;
    const image=document.getElementById('buyukFotograf');image.style.width='';image.style.height='';image.src=photo.src;image.alt=photo.baslik;
    const stage=document.getElementById('fotoSahne');stage.dataset.zoom='false';stage.scrollTop=stage.scrollLeft=0;
    const button=document.getElementById('fotoZoom');button.disabled=!image.complete||!image.naturalWidth;image.onload=()=>{button.disabled=false;};button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','Fotoğrafı yakınlaştır');button.textContent='＋';
    document.getElementById('fotografBaslik').textContent=placeName;
    document.getElementById('fotoAciklama').textContent=photo.baslik;
    document.getElementById('fotoLisans').innerHTML=credit(photo);
    document.getElementById('fotoSayac').textContent=`${current+1} / ${list.length}`;
    document.getElementById('fotoOnceki').disabled=document.getElementById('fotoSonraki').disabled=list.length<2;
  }
  function open(place,index){init();list=photos(place);placeName=place.mekan;show(index);if(!dialog.open)dialog.showModal();}
  function mount(place,container){
    const items=photos(place),hero=container.querySelector('.media-gallery');if(!hero)return;
    let selected=0;
    hero.querySelector('.media-main').addEventListener('click',()=>open(place,selected));
    hero.querySelectorAll('[data-photo-select]').forEach(button=>button.addEventListener('click',()=>{
      selected=Number(button.dataset.photoSelect);const item=items[selected];
      const image=hero.querySelector('.media-main img');image.src=item.src;image.alt=item.baslik;
      hero.querySelector('.media-main').setAttribute('aria-label',`Fotoğrafı büyüt: ${item.baslik}`);
      hero.querySelector('.media-caption').textContent=item.baslik;
      hero.querySelector('.media-credit').innerHTML=credit(item);
      hero.querySelector('.media-count').textContent=`${selected+1} / ${items.length}`;
      hero.querySelectorAll('[data-photo-select]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    }));
  }
  window.AtlasMedia={photos,gallery,streetView,mount,credit,panoramaUrl};
})();
