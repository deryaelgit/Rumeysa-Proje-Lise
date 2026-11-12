# İstanbul Edebiyat Haritası v2: Örnek Verili, Yaratıcı Özellikli Rehber

Bu sürümde **veritabanı yok**. Tüm veri `mekanlar.js` dosyasında durur. Hazır gelen örnek veri 7 kitap ve 10 mekandan oluşur. Kendi kitaplarınıza geçerken sadece bu dosyayı değiştirirsiniz.

## Bu sürümde neler var?

| Özellik | Ne işe yarar? |
|---|---|
| Kitaba göre **renkli işaretçiler** | Her kitap kendi rengindedir, harita bir bakışta okunur |
| **Kesin / tahmini** konum gösterimi | Düz çerçeve = kesin, kesik çerçeve = tahmini (bilimsel dürüstlük) |
| **Kitap rotası** | Bir kitabı seçince mekanları sırayla çizgiyle bağlar (karakterin yolculuğu) |
| Arama + kitap + yazar filtresi | Gezinmeyi kolaylaştırır |
| **Rastgele mekan keşfet** düğmesi | Fuarda ziyaretçiyi oyuna çeker |
| **Eskiden / Bugün** notu | Mekanın değişimini anlatır |
| **İstatistik paneli** | Kitap, yazar, mekan sayısı, ilçe dağılımı, doğrulanma oranı |
| **Doğrulandı** işareti | Verinin kontrol edildiğini gösterir |
| "Google Maps'te aç" bağlantısı | Ziyaretçi mekana gidebilir |
| Ziyaretçi öneri formu alanı | Google Forms ile halktan veri toplama |

---

## ÖNEMLİ: Örnek verideki alıntılar neden boş?

Örnek kayıtlarda **`ozet`** (kendi cümlelerimizle sahne özeti) dolu, **`alinti`** ve **`sayfa`** alanları ise bilerek boş bırakıldı. Sebepleri:

1. Kitaptan birebir cümleyi hafızadan yazmak yanlış alıntı riski taşır. Bilimsel bir projede uydurma ya da hatalı alıntı en büyük kusurdur.
2. Telif hakkı gereği alıntı **kısa** (1 cümle, mümkünse 15 kelimeden az) olmalı ve sayfa numarası verilmeli.
3. Alıntıyı kitabı elinize alıp **siz** bulmanız, projenin "veri toplama ve doğrulama" bölümünü gerçek kılar.

**Yapmanız gereken:** Her kayıt için kitabı açın, mekanın geçtiği yeri bulun, kısa cümleyi ve sayfa numarasını yazın, sonra `dogrulandi: true` yapın. Örnek veride `ozet` alanları da taslaktır. Kitaptan kontrol edip düzeltin.

---

## 1. Klasör yapısı

```
edebiyat-haritasi/
├── index.html
├── style.css
├── script.js
├── mekanlar.js
└── fotograflar/     ← (isteğe bağlı) kendi çektiğiniz mekan fotoğrafları
```

VS Code'da **Live Server** eklentisini kurun, `index.html`'e sağ tıklayıp **Open with Live Server** deyin.

---

## 2. `index.html`

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>İstanbul'un Edebiyat Haritası</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>📚 İstanbul'un Edebiyat Haritası</h1>
    <p>Kitapların sayfalarından şehrin sokaklarına: edebiyatta İstanbul'u keşfedin.</p>
  </header>

  <section class="panel">
    <input type="search" id="aramaKutusu" placeholder="Mekan, kitap veya yazar ara...">

    <select id="kitapSecim">
      <option value="hepsi">Tüm kitaplar</option>
    </select>

    <select id="yazarSecim">
      <option value="hepsi">Tüm yazarlar</option>
    </select>

    <label class="rota-etiket">
      <input type="checkbox" id="rotaCheck" checked>
      Kitap rotasını çiz
    </label>

    <button id="rastgeleBtn">🎲 Rastgele mekan keşfet</button>
  </section>

  <section class="lejant-alan">
    <div id="lejant"></div>
    <div class="aciklama-satir">
      <span class="pin kesin mini"></span> Kesin konum
      <span class="pin tahmini mini"></span> Tahmini konum
      <span id="sayac"></span>
    </div>
  </section>

  <div id="harita"></div>

  <section class="istatistik">
    <h2>📊 Haritada neler var?</h2>
    <div class="kartlar">
      <div class="kart"><b id="sKitap">0</b><span>Kitap</span></div>
      <div class="kart"><b id="sYazar">0</b><span>Yazar</span></div>
      <div class="kart"><b id="sMekan">0</b><span>Mekan</span></div>
      <div class="kart"><b id="sDogru">0</b><span>Doğrulanan</span></div>
    </div>
    <h3>İlçelere göre mekan dağılımı</h3>
    <div id="ilceGrafik"></div>
  </section>

  <section class="katki">
    <h2>✍️ Siz de katkıda bulunun</h2>
    <p>Okuduğunuz bir kitapta İstanbul'dan bir mekan mı geçiyor? Bize bildirin!</p>
    <!-- Google Forms oluşturup bağlantısını aşağıdaki href kısmına yapıştırın -->
    <a class="buton" href="https://forms.google.com" target="_blank" rel="noopener">Mekan öner</a>
  </section>

  <section class="yontem">
    <h2>🔬 Yöntemimiz</h2>
    <ol>
      <li>Kitaplar ekip üyeleri tarafından okundu ve mekanlar sayfa numarasıyla kaydedildi.</li>
      <li>Her mekan için konum, en az iki bağımsız kaynakla (harita ve tarihî/kaynak bilgisi) kontrol edildi.</li>
      <li>Kitapta açık adı geçmeyen yerler "tahmini" olarak işaretlendi ve gerekçesi yazıldı.</li>
      <li>Alıntılar kısa tutuldu, yayınevi ve baskı bilgisi kaynakçada belirtildi.</li>
    </ol>
  </section>

  <footer>
    <p>TÜBİTAK 4006 Bilim Fuarı Projesi · Harita: © OpenStreetMap katkıcıları</p>
  </footer>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="mekanlar.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

---

## 3. `style.css`

```css
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  background: #faf7f2;
  color: #222;
}

header {
  padding: 18px 20px;
  background: linear-gradient(135deg, #2b2d42, #8d2f3c);
  color: white;
}
header h1 { margin: 0; font-size: 1.7rem; }
header p  { margin: 6px 0 0; opacity: .85; }

/* Filtre paneli */
.panel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 20px;
  background: #edf2f4;
}
.panel input[type="search"], .panel select {
  padding: 8px 10px;
  font-size: 1rem;
  border: 1px solid #bbb;
  border-radius: 6px;
  flex: 1 1 180px;
}
.rota-etiket { display: flex; align-items: center; gap: 6px; }
button, .buton {
  padding: 8px 14px;
  font-size: 1rem;
  background: #8d2f3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
button:hover, .buton:hover { background: #6d1f2c; }

/* Lejant */
.lejant-alan { padding: 10px 20px; }
#lejant { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.chip {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px;
  background: white;
  color: #222;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: .9rem;
}
.chip:hover { background: #f0e6e8; }
.nokta { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.aciklama-satir { font-size: .85rem; color: #555; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
#sayac { margin-left: auto; font-weight: bold; }

/* Harita ve işaretçiler */
#harita { height: 68vh; width: 100%; }

.pin {
  width: 22px; height: 22px;
  border-radius: 50%;
  box-shadow: 0 1px 5px rgba(0,0,0,.5);
}
.pin.kesin   { border: 3px solid #fff; }
.pin.tahmini { border: 3px dashed #222; }
.pin.mini    { width: 14px; height: 14px; background: #999; display: inline-block; }

/* Bilgi penceresi */
.popup-foto   { width: 100%; border-radius: 6px; margin-bottom: 6px; }
.popup-baslik { font-size: 1.15rem; font-weight: bold; margin-bottom: 2px; }
.popup-kitap  { color: #8d2f3c; font-style: italic; margin-bottom: 8px; }
.popup-alinti {
  margin: 8px 0; padding: 6px 10px;
  border-left: 4px solid #8d2f3c;
  background: #faf0f2;
  font-style: italic;
}
.popup-eski { margin-top: 8px; font-size: .9rem; }
.popup-not  { font-size: .8rem; color: #666; margin: 8px 0 4px; }

/* İstatistik */
section.istatistik, section.katki, section.yontem { padding: 20px; max-width: 900px; margin: 0 auto; }
.kartlar { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
.kart {
  background: white; border-radius: 10px; padding: 14px; text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,.12);
}
.kart b { display: block; font-size: 2rem; color: #8d2f3c; }
.cubuk-satir { display: grid; grid-template-columns: 110px 1fr 30px; gap: 8px; align-items: center; margin: 6px 0; }
.cubuk { height: 14px; background: #2b2d42; border-radius: 7px; }

footer { padding: 14px 20px; text-align: center; background: #2b2d42; color: white; font-size: .85rem; }
footer p { margin: 0; }
```

---

## 4. `mekanlar.js` (ÖRNEK TEST VERİSİ)

> Tüm koordinatlar yaklaşıktır. Her birini Google Maps'te kontrol edin.
> Alanlar: `sira` rota sırasını, `kesinlik` ("kesin" veya "tahmini"), `dogrulandi` kitaptan kontrol edildi mi onu belirtir.

```js
const mekanlar = [

  // ---------- Peyami Safa: Fatih-Harbiye ----------
  {
    id: "fh1",
    kitap: "Fatih-Harbiye",
    yazar: "Peyami Safa",
    yil: 1931,
    mekan: "Fatih (Neriman'ın mahallesi)",
    ilce: "Fatih",
    enlem: 41.0196,
    boylam: 28.9497,
    sira: 1,
    ozet: "Neriman'ın ailesiyle yaşadığı Fatih, romanda geleneksel yaşamın ve Doğu'nun simgesi olarak çizilir.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Eskiden ahşap evlerin sık olduğu bir semt; bugün yoğun, kalabalık ve dönüşen bir merkez.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },
  {
    id: "fh2",
    kitap: "Fatih-Harbiye",
    yazar: "Peyami Safa",
    yil: 1931,
    mekan: "Harbiye",
    ilce: "Şişli",
    enlem: 41.0468,
    boylam: 28.9890,
    sira: 2,
    ozet: "Neriman'ın gittiği Harbiye, romanda Batılı eğlence hayatını temsil eder. Roman, iki semt arasındaki gidiş gelişle Doğu-Batı gerilimini anlatır.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Eğlence ve kültür mekânlarıyla bilinen bölge bugün de konser ve gösteri merkezlerine ev sahipliği yapar.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Orhan Pamuk: Masumiyet Müzesi ----------
  {
    id: "mm1",
    kitap: "Masumiyet Müzesi",
    yazar: "Orhan Pamuk",
    yil: 2008,
    mekan: "Nişantaşı / Teşvikiye çevresi",
    ilce: "Şişli",
    enlem: 41.0480,
    boylam: 28.9935,
    sira: 1,
    ozet: "Kemal'in ailesinin ve nişanlısının yer aldığı varlıklı, Batılılaşmış çevre Nişantaşı'dır. Romanın zıt dünyalarından biri burasıdır.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Romanın geçtiği yıllarda sakin bir mahalle; bugün lüks mağazaların ve kafelerin merkezi.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },
  {
    id: "mm2",
    kitap: "Masumiyet Müzesi",
    yazar: "Orhan Pamuk",
    yil: 2008,
    mekan: "Masumiyet Müzesi (Çukurcuma)",
    ilce: "Beyoğlu",
    enlem: 41.0319,
    boylam: 28.9813,
    sira: 2,
    ozet: "Kemal'in sevdiği kadınla ilgili eşyaları biriktirdiği Çukurcuma, romanın duygusal merkezidir. Pamuk, kitapla birlikte gerçek bir müze de kurmuştur.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Kurgudaki mekân bugün gerçek bir müze olarak ziyaret edilebilir (2012).",
    kesinlik: "kesin",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Ahmet Hamdi Tanpınar: Huzur ----------
  {
    id: "hz1",
    kitap: "Huzur",
    yazar: "Ahmet Hamdi Tanpınar",
    yil: 1949,
    mekan: "Süleymaniye Camii",
    ilce: "Fatih",
    enlem: 41.0162,
    boylam: 28.9640,
    sira: 1,
    ozet: "Romanda İstanbul'un geçmişi, mimarisi ve musikisi karakterlerin iç dünyasında önemli yer tutar. Süleymaniye bu kültürel hafızanın simgelerinden biridir.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Bugün de ibadete ve ziyarete açık, Süleymaniye Külliyesi'nin merkezi.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Sait Faik Abasıyanık: Semaver ----------
  {
    id: "sf1",
    kitap: "Semaver",
    yazar: "Sait Faik Abasıyanık",
    yil: 1936,
    mekan: "Burgazada",
    ilce: "Adalar",
    enlem: 40.8790,
    boylam: 29.0690,
    sira: 1,
    ozet: "Yazarın yaşadığı ve öykülerine sık sık konu ettiği ada. Balıkçılar ve sıradan insanlar öykülerinin dünyasını kurar.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Yazarın evi bugün Sait Faik Müzesi olarak ziyaret edilebilir.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Halide Edib Adıvar: Sinekli Bakkal ----------
  {
    id: "sb1",
    kitap: "Sinekli Bakkal",
    yazar: "Halide Edib Adıvar",
    yil: 1936,
    mekan: "Sinekli Bakkal mahallesi (Sultanahmet-Çemberlitaş çevresi)",
    ilce: "Fatih",
    enlem: 41.0087,
    boylam: 28.9714,
    sira: 1,
    ozet: "Roman, eski İstanbul mahalle hayatını, bakkalı ve çevresindeki insanları anlatır. Romandaki mahallenin tam adresi belirsiz; konum yaklaşık kabul edildi.",
    alinti: "",
    sayfa: "",
    eskiBugun: "",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Mario Levi: İstanbul Bir Masaldı ----------
  {
    id: "ib1",
    kitap: "İstanbul Bir Masaldı",
    yazar: "Mario Levi",
    yil: 1999,
    mekan: "Galata çevresi",
    ilce: "Beyoğlu",
    enlem: 41.0256,
    boylam: 28.9744,
    sira: 1,
    ozet: "Romanda Galata ve çevresi, İstanbul'un çok kültürlü, özellikle Yahudi cemaatinin yaşamıyla birlikte hatırlanan mahallelerinden biri olarak geçer.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Galata Kulesi çevresi bugün turizmin ve sanatın merkezi.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },

  // ---------- Agatha Christie: Doğu Ekspresinde Cinayet ----------
  {
    id: "oe1",
    kitap: "Doğu Ekspresinde Cinayet",
    yazar: "Agatha Christie",
    yil: 1934,
    mekan: "Pera Palace Oteli",
    ilce: "Beyoğlu",
    enlem: 41.0289,
    boylam: 28.9741,
    sira: 1,
    ozet: "Christie'nin İstanbul'da konakladığı otel olarak bilinir. Kitapta ise Poirot'nun kaldığı otel olarak başka bir İstanbul oteli geçer; bu ayrım kaynaktan doğrulanmalı.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Otel 2010 civarında yenilenerek yeniden açıldı ve bugün hâlâ hizmet veriyor.",
    kesinlik: "tahmini",
    dogrulandi: false,
    foto: ""
  },
  {
    id: "oe2",
    kitap: "Doğu Ekspresinde Cinayet",
    yazar: "Agatha Christie",
    yil: 1934,
    mekan: "Sirkeci Garı",
    ilce: "Fatih",
    enlem: 41.0155,
    boylam: 28.9770,
    sira: 2,
    ozet: "Orient Express'in İstanbul'daki durağı. Roman, Poirot'nun İstanbul'dan trene binmesiyle ilerler.",
    alinti: "",
    sayfa: "",
    eskiBugun: "Bugün Marmaray bağlantılı bir durak ve Demiryolu Müzesi ile hizmet veriyor.",
    kesinlik: "kesin",
    dogrulandi: false,
    foto: ""
  }

];
```

---

## 5. `script.js`

```js
// ---------- 1. Kitap renkleri ----------
const renkPaleti = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#8338ec", "#6a994e", "#d4a373", "#ff006e"];
const kitapRenk = {};
[...new Set(mekanlar.map(m => m.kitap))].forEach((kitap, i) => {
  kitapRenk[kitap] = renkPaleti[i % renkPaleti.length];
});

// ---------- 2. Haritayı kur ----------
const harita = L.map('harita').setView([41.015, 28.979], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap katkıcıları',
  maxZoom: 19
}).addTo(harita);

const katman = L.layerGroup().addTo(harita);
const rotaKatmani = L.layerGroup().addTo(harita);
const isaretciler = {};

// ---------- 3. HTML elemanları ----------
const aramaKutusu = document.getElementById('aramaKutusu');
const kitapSecim = document.getElementById('kitapSecim');
const yazarSecim = document.getElementById('yazarSecim');
const rotaCheck = document.getElementById('rotaCheck');
const rastgeleBtn = document.getElementById('rastgeleBtn');
const sayac = document.getElementById('sayac');
const lejant = document.getElementById('lejant');

// ---------- 4. Menüleri doldur ----------
function menuleriDoldur() {
  [...new Set(mekanlar.map(m => m.kitap))].forEach(k => {
    kitapSecim.add(new Option(k, k));
  });
  [...new Set(mekanlar.map(m => m.yazar))].forEach(y => {
    yazarSecim.add(new Option(y, y));
  });
}

function lejantiOlustur() {
  Object.entries(kitapRenk).forEach(([kitap, renk]) => {
    const dugme = document.createElement('button');
    dugme.className = 'chip';
    dugme.innerHTML = `<span class="nokta" style="background:${renk}"></span>${kitap}`;
    dugme.addEventListener('click', () => {
      kitapSecim.value = kitap;
      ciz();
    });
    lejant.appendChild(dugme);
  });
}

// ---------- 5. İşaretçi ikonu ----------
function ikonOlustur(m) {
  return L.divIcon({
    className: "",
    html: `<div class="pin ${m.kesinlik}" style="background:${kitapRenk[m.kitap]}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
  });
}

// ---------- 6. Bilgi penceresi ----------
function popupIcerik(m) {
  return `
    ${m.foto ? `<img class="popup-foto" src="${m.foto}" alt="${m.mekan}">` : ""}
    <div class="popup-baslik">${m.mekan}</div>
    <div class="popup-kitap">${m.kitap} (${m.yil}) · ${m.yazar}</div>
    ${m.alinti ? `<blockquote class="popup-alinti">“${m.alinti}” <small>(${m.sayfa})</small></blockquote>` : ""}
    <div>${m.ozet}</div>
    ${m.eskiBugun ? `<div class="popup-eski"><b>Eskiden / Bugün:</b> ${m.eskiBugun}</div>` : ""}
    <div class="popup-not">Konum: ${m.kesinlik} · ${m.dogrulandi ? "✔ doğrulandı" : "⏳ doğrulanacak"}</div>
    <a href="https://www.google.com/maps?q=${m.enlem},${m.boylam}" target="_blank" rel="noopener">Google Maps'te aç</a>
  `;
}

// ---------- 7. Filtreleme ----------
function filtrele() {
  const aranan = aramaKutusu.value.toLocaleLowerCase('tr').trim();
  return mekanlar.filter(m => {
    const kitapUygun = kitapSecim.value === 'hepsi' || m.kitap === kitapSecim.value;
    const yazarUygun = yazarSecim.value === 'hepsi' || m.yazar === yazarSecim.value;
    const metin = (m.mekan + " " + m.kitap + " " + m.yazar + " " + m.ilce + " " + m.ozet).toLocaleLowerCase('tr');
    const aramaUygun = aranan === "" || metin.includes(aranan);
    return kitapUygun && yazarUygun && aramaUygun;
  });
}

// ---------- 8. Haritayı çiz ----------
function ciz() {
  katman.clearLayers();
  rotaKatmani.clearLayers();

  const liste = filtrele();

  liste.forEach(m => {
    isaretciler[m.id] = L.marker([m.enlem, m.boylam], { icon: ikonOlustur(m) })
      .addTo(katman)
      .bindPopup(popupIcerik(m), { maxWidth: 300 });
  });

  // Kitap rotası: tek bir kitap seçiliyse mekanları sırayla bağla
  if (rotaCheck.checked && kitapSecim.value !== 'hepsi') {
    const noktalar = liste
      .filter(m => m.sira)
      .sort((a, b) => a.sira - b.sira)
      .map(m => [m.enlem, m.boylam]);

    if (noktalar.length > 1) {
      L.polyline(noktalar, {
        color: kitapRenk[kitapSecim.value],
        weight: 4,
        dashArray: "8 8"
      }).addTo(rotaKatmani);
    }
  }

  sayac.textContent = `${liste.length} mekan gösteriliyor`;

  if (liste.length > 0) {
    const sinirlar = L.latLngBounds(liste.map(m => [m.enlem, m.boylam]));
    harita.fitBounds(sinirlar, { padding: [50, 50], maxZoom: 14 });
  }
}

// ---------- 9. İstatistikler ----------
function istatistikleriYaz() {
  document.getElementById('sKitap').textContent = Object.keys(kitapRenk).length;
  document.getElementById('sYazar').textContent = new Set(mekanlar.map(m => m.yazar)).size;
  document.getElementById('sMekan').textContent = mekanlar.length;

  const dogrulanan = mekanlar.filter(m => m.dogrulandi).length;
  document.getElementById('sDogru').textContent = "%" + Math.round(dogrulanan / mekanlar.length * 100);

  const ilceler = {};
  mekanlar.forEach(m => { ilceler[m.ilce] = (ilceler[m.ilce] || 0) + 1; });
  const enCok = Math.max(...Object.values(ilceler));
  const kutu = document.getElementById('ilceGrafik');

  Object.entries(ilceler)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ilce, adet]) => {
      kutu.innerHTML += `
        <div class="cubuk-satir">
          <span>${ilce}</span>
          <div class="cubuk" style="width:${adet / enCok * 100}%"></div>
          <b>${adet}</b>
        </div>`;
    });
}

// ---------- 10. Olaylar ----------
aramaKutusu.addEventListener('input', ciz);
kitapSecim.addEventListener('change', ciz);
yazarSecim.addEventListener('change', ciz);
rotaCheck.addEventListener('change', ciz);

rastgeleBtn.addEventListener('click', () => {
  const m = mekanlar[Math.floor(Math.random() * mekanlar.length)];
  aramaKutusu.value = "";
  kitapSecim.value = "hepsi";
  yazarSecim.value = "hepsi";
  ciz();
  harita.setView([m.enlem, m.boylam], 15);
  isaretciler[m.id].openPopup();
});

// ---------- 11. Başlat ----------
menuleriDoldur();
lejantiOlustur();
istatistikleriYaz();
ciz();
```

---

## 6. Kendi verinizi nasıl eklersiniz?

`mekanlar.js` içinde bir bloğu kopyalayıp şunları değiştirin:

1. `id`: her kayıtta **farklı** olmalı (örn. `kk1`, `kk2`)
2. `kitap`: aynı kitap için **hep aynı yazım** (yoksa iki ayrı kitap sayılır)
3. `sira`: rota için 1, 2, 3… (kitaptaki olay sırasına göre)
4. `enlem`, `boylam`: Google Maps'te mekana **sağ tıklayıp** sayıları kopyalayın (nokta kullanın)
5. `alinti` ve `sayfa`: kitaptan kısa cümle ve sayfa numarası
6. Bloklar arasında **virgül** olmalı, son bloktan sonra olmamalı

---

## 7. Veri doğrulama protokolü (projenin bilimsel kalbi)

Her mekan için şu kontrol tablosunu (Google Sheets) tutun:

| id | Kitaptan kontrol eden | Sayfa | Konum kaynağı 1 | Konum kaynağı 2 | Kesin/Tahmini | Tarih |
|---|---|---|---|---|---|---|

Tüm sütunlar dolunca `dogrulandi: true` yapın. İstatistik panelindeki **doğrulanma oranı** otomatik yükselir. Jüriye sayısal ilerleme göstermek için güzel bir kanıttır.

---

## 8. TÜBİTAK 4006 için öneriler

Başvuru ölçütleri her yıl yayımlanan **çağrı rehberinde** belirtilir. Rehberi mutlaka okuyun. Bilimsel fuar odaklı bu programda siteyi tek başına bir ürün olarak değil, **fuarın bir bileşeni** olarak kurgulamanız faydalı olur:

1. **Araştırma sorusu yazın.** Örnek: "İstanbul'un hangi ilçeleri edebiyatta daha çok yer alıyor, hangileri görünmez kalıyor?"
2. **Veriyi analiz edin.** İstatistik panelindeki ilçe dağılımı bunun başlangıcı. "Beyoğlu ve Fatih öne çıkıyor, peki neden?" gibi yorumlar ekleyin.
3. **Ön test / son test anketi yapın.** Fuar ziyaretçilerine haritayı kullanmadan ve kullandıktan sonra kısa bir anket verin. Etkiyi ölçmek, projeyi sıradan bir tanıtım olmaktan çıkarır.
4. **Fuar standı etkinliği kurun.** QR kodla siteye yönlendirin, "Rastgele mekan keşfet" ile mini bir yarışma yapın (örn. "bu mekan hangi kitaptan?").
5. **Katılımcı sayısı ve erişim:** Google Forms önerileriyle halkın katkısını ölçülebilir hale getirin.
6. **Sürdürülebilirlik:** Sitenin fuardan sonra da yaşayacağını ve verinin büyüyebileceğini anlatın.
7. **Kaynakça ve etik:** Telif, alıntı sınırı ve kişisel veri (fotoğraflarda yüz) konusuna dikkat ettiğinizi belirtin.
8. **Çıktılar:** Poster, broşür (QR kodlu), kısa tanıtım videosu, basılı "edebiyat rotası" haritası.

---

## 9. Yayına alma ve QR kod

1. **Netlify Drop** (netlify.com): klasörü sürükle-bırak, ücretsiz bağlantı alırsınız.
2. Bağlantıyı bir QR kod oluşturucuya (örn. qr-code-generator sitelerinden biri) yapıştırıp afişe/standa koyun.

---

## 10. Sık hatalar

| Sorun | Çözüm |
|---|---|
| "mekanlar is not defined" | `index.html`'de `mekanlar.js`, `script.js`'ten önce mi? |
| Harita boş | `style.css` bağlı mı? `#harita` yüksekliği yazılı mı? |
| İşaretçi çıkmıyor | `mekanlar.js`'te virgül/tırnak eksik olabilir (F12 > Console'a bakın) |
| Rota çizilmiyor | Önce tek bir kitap seçin; `sira` alanları dolu olmalı |
| Aynı kitap iki ayrı görünüyor | Kitap adı farklı yazılmış (boşluk, büyük/küçük harf) |
| Türkçe karakterler bozuk | Dosyalar UTF-8 olmalı (VS Code sağ altta görünür) |

---

## 11. Sonraki fikirler (zamanınız kalırsa)

- Yayın yılına göre **zaman kaydırıcısı** (1930'lardan günümüze)
- **Yürüyüş rotası:** Tek bir semtte (örn. Galata) 5 kitabın mekanlarını bir gezi planında birleştirin
- **Mekan fotoğrafları:** Kendi çektiğiniz karelerle "Eskiden / Bugün" karşılaştırması
- **İngilizce dil seçeneği:** Yabancı ziyaretçiler için

Takıldığınız yerde kodu ve F12 konsolundaki hata mesajını bana yapıştırın. Başarılar!


## Uygulanan yaratıcı özellikler — 12 Kasım 2026

1922 arşiv haritası kaydırıcısı, beş duraklı Huzur yaya rehberi (mesafe, süre, GPX), editoryal duygu renkleri ve isteğe bağlı sentetik ses atmosferi eklendi. Kaynaklar, kullanım ve sınırlar: [Yaratıcı özellikler](docs/yaratici-ozellikler.md).
