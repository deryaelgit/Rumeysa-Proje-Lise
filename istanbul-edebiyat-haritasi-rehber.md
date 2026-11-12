# İstanbul Edebiyat Haritası: Veritabanı Olmadan Web Sitesi Rehberi

Bu rehberde VS Code ile, **veritabanı kullanmadan**, kitaplarda geçen İstanbul mekanlarını haritada gösteren bir site yapacağız.

**Mantık çok basit:** Mekanları bir liste dosyasında (`mekanlar.js`) tutarız. Site bu listeyi okuyup haritaya işaretçi koyar. Yeni mekan eklemek = listeye yeni bir satır yazmak.

---

## 1. Hazırlık

1. VS Code'u açın.
2. Sol menüde **Extensions** (Eklentiler, kare simgesi) bölümüne girin.
3. Şu eklentiyi kurun: **Live Server** (Ritwick Dey). Dosyayı kaydettiğinizde tarayıcı otomatik yenilenir.
4. Masaüstünde `edebiyat-haritasi` adında bir klasör oluşturun.
5. VS Code'da **File > Open Folder** ile bu klasörü açın.

## 2. Klasör yapısı

Klasörün içinde 4 dosya oluşturun (VS Code'da sol üstteki "New File" simgesiyle):

```
edebiyat-haritasi/
├── index.html      ← sayfanın iskeleti
├── style.css       ← görünüm
├── script.js       ← haritayı çalıştıran kod
└── mekanlar.js     ← VERİLER (veritabanı yerine geçen dosya)
```

---

## 3. Dosyaların içerikleri

### 3.1 `index.html`

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
    <h1>İstanbul'un Edebiyat Haritası</h1>
    <p>Kitaplarda geçen mekanları keşfedin.</p>
  </header>

  <div class="filtre">
    <label for="kitapSecim">Kitap seç:</label>
    <select id="kitapSecim">
      <option value="hepsi">Tüm kitaplar</option>
    </select>
  </div>

  <div id="harita"></div>

  <footer>
    <p>TÜBİTAK 4006 Bilim Fuarı Projesi · Harita verisi © OpenStreetMap katkıcıları</p>
  </footer>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="mekanlar.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

> **Önemli:** `mekanlar.js` her zaman `script.js`'ten **önce** yüklenmeli (yukarıdaki sıra doğru).

### 3.2 `style.css`

```css
body {
  margin: 0;
  font-family: Georgia, serif;
  background: #faf7f2;
  color: #222;
}

header {
  padding: 16px 20px;
  background: #2b2d42;
  color: white;
}

header h1 { margin: 0; font-size: 1.6rem; }
header p  { margin: 4px 0 0; opacity: 0.8; }

.filtre {
  padding: 12px 20px;
  background: #edf2f4;
}

.filtre select {
  padding: 6px 10px;
  font-size: 1rem;
  margin-left: 8px;
}

#harita {
  height: 70vh;
  width: 100%;
}

footer {
  padding: 12px 20px;
  text-align: center;
  font-size: 0.85rem;
  background: #2b2d42;
  color: white;
}

footer p { margin: 0; }

/* Harita üzerindeki bilgi penceresi */
.popup-baslik { font-size: 1.1rem; font-weight: bold; margin-bottom: 4px; }
.popup-kitap  { color: #8d2f3c; font-style: italic; margin-bottom: 6px; }
.popup-not    { font-size: 0.8rem; color: #666; margin-top: 6px; }
```

### 3.3 `mekanlar.js` (veritabanı yerine geçen dosya)

Her mekan, küme parantezli bir bloktur. Bloklar arasında **virgül** olmalı.

```js
const mekanlar = [
  {
    kitap: "Örnek Kitap 1",
    yazar: "Örnek Yazar 1",
    mekan: "Galata Kulesi",
    enlem: 41.0256,
    boylam: 28.9744,
    sayfa: "s. 45",
    aciklama: "Karakterlerin buluştuğu yer olarak geçer.",
    kesinlik: "kesin"
  },
  {
    kitap: "Örnek Kitap 1",
    yazar: "Örnek Yazar 1",
    mekan: "Kadıköy İskelesi",
    enlem: 40.9919,
    boylam: 29.0233,
    sayfa: "s. 112",
    aciklama: "Ana karakter buradan vapura biner.",
    kesinlik: "kesin"
  },
  {
    kitap: "Örnek Kitap 2",
    yazar: "Örnek Yazar 2",
    mekan: "Boğaz kıyısında bir yalı",
    enlem: 41.0850,
    boylam: 29.0570,
    sayfa: "s. 20",
    aciklama: "Kitapta tam yeri belirtilmez, Bebek civarı olarak tahmin edildi.",
    kesinlik: "tahmini"
  }
];
```

**Alanların anlamı:**

| Alan | Ne yazılır? |
|---|---|
| `kitap` | Kitabın adı (aynı kitap için hep aynı yazılmalı) |
| `yazar` | Yazarın adı |
| `mekan` | Mekanın adı |
| `enlem`, `boylam` | Koordinatlar (aşağıda nasıl bulunacağı var) |
| `sayfa` | Mekanın geçtiği sayfa |
| `aciklama` | **Kendi cümlelerinizle** kısa açıklama |
| `kesinlik` | `"kesin"` veya `"tahmini"` |

### 3.4 `script.js`

```js
// 1. Haritayı oluştur (İstanbul merkezli)
const harita = L.map('harita').setView([41.015, 28.979], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap katkıcıları',
  maxZoom: 19
}).addTo(harita);

// 2. İşaretçilerin tutulacağı katman (filtrelemede temizlemek için)
const katman = L.layerGroup().addTo(harita);

// 3. Açılır menüyü kitap isimleriyle doldur
const kitapSecim = document.getElementById('kitapSecim');

function menuyuDoldur() {
  const kitaplar = [...new Set(mekanlar.map(m => m.kitap))];
  kitaplar.forEach(kitap => {
    const secenek = document.createElement('option');
    secenek.value = kitap;
    secenek.textContent = kitap;
    kitapSecim.appendChild(secenek);
  });
}

// 4. Seçilen kitaba göre işaretçileri çiz
function isaretleriCiz(secilenKitap) {
  katman.clearLayers();

  const liste = mekanlar.filter(m =>
    secilenKitap === 'hepsi' || m.kitap === secilenKitap
  );

  liste.forEach(m => {
    const icerik = `
      <div class="popup-baslik">${m.mekan}</div>
      <div class="popup-kitap">${m.kitap} · ${m.yazar}</div>
      <div>${m.aciklama}</div>
      <div class="popup-not">${m.sayfa} · Konum: ${m.kesinlik}</div>
    `;
    L.marker([m.enlem, m.boylam]).addTo(katman).bindPopup(icerik);
  });

  // Haritayı işaretçilere göre ortala
  if (liste.length > 0) {
    const sinirlar = L.latLngBounds(liste.map(m => [m.enlem, m.boylam]));
    harita.fitBounds(sinirlar, { padding: [40, 40], maxZoom: 14 });
  }
}

// 5. Başlat
menuyuDoldur();
isaretleriCiz('hepsi');

kitapSecim.addEventListener('change', () => {
  isaretleriCiz(kitapSecim.value);
});
```

---

## 4. Siteyi çalıştırma

1. `index.html` dosyasını VS Code'da açın.
2. Sağ tıklayıp **Open with Live Server** seçin (ya da sağ alttaki **Go Live** düğmesine basın).
3. Tarayıcıda site açılır. Dosyaları her kaydettiğinizde otomatik yenilenir.

---

## 5. Koordinatları nasıl bulursunuz?

1. [Google Maps](https://www.google.com/maps) açın ve mekanı aratın.
2. Haritada mekanın üzerine **sağ tıklayın**.
3. En üstte çıkan sayıya tıklayın, kopyalanır. Örnek: `41.0256, 28.9744`
4. İlk sayı `enlem`, ikinci sayı `boylam` olur.

> Ondalık ayırıcı **nokta** olmalı (41.0256), virgül değil. Virgül, iki sayıyı ayırmak içindir.

---

## 6. Sık yapılan hatalar

| Sorun | Çözüm |
|---|---|
| Harita boş/gri görünüyor | `style.css` bağlı mı? `#harita` için `height` yazılı mı? |
| "mekanlar is not defined" hatası | `index.html` içinde `mekanlar.js`, `script.js`'ten önce mi? |
| Hiçbir işaretçi çıkmıyor | `mekanlar.js` içinde virgül veya tırnak eksik olabilir |
| Bir mekan yanlış yerde | Enlem ve boylam yer değiştirmiş olabilir (önce enlem!) |
| Türkçe karakterler bozuk | Dosyalar UTF-8 kaydedilmiş mi? (VS Code sağ altta yazar) |
| Hata ayıklamak istiyorum | Tarayıcıda **F12 > Console** sekmesinde hata mesajı görünür |

---

## 7. Veri girerken kurallar (projenin bilimsel kalitesi için)

- **Alıntı yapacaksanız** 1-2 cümleyi geçmeyin, sayfa numarası yazın. Gerisini kendi cümlelerinizle anlatın.
- **Kitabın hangi baskısını** kullandığınızı kaydedin (yayınevi, yıl).
- **Konumu kesin olmayan** mekanları `"tahmini"` olarak işaretleyin ve nasıl tahmin ettiğinizi açıklamada yazın.
- Ekip olarak aynı kitap adını **her seferinde aynı yazın** (aksi halde filtre menüsünde iki ayrı kitap gibi görünür).

---

## 8. Yayına alma (ücretsiz)

### Seçenek A: Netlify (en kolay)
1. [netlify.com](https://www.netlify.com) adresinde ücretsiz hesap açın.
2. **Add new site > Deploy manually** seçin.
3. `edebiyat-haritasi` klasörünü sürükleyip bırakın.
4. Size bir internet adresi verir. Güncelleme yapınca klasörü yeniden yükleyin.

### Seçenek B: GitHub Pages
1. [github.com](https://github.com) hesabı açın, yeni bir repository oluşturun.
2. Dosyaları yükleyin.
3. **Settings > Pages** bölümünden yayını açın.

---

## 9. Sonraki adımlar (geliştirme fikirleri)

Temel site çalıştıktan sonra sırayla ekleyebilirsiniz:

1. **Yazara göre filtre:** Kitap menüsünün yanına bir tane daha
2. **Kitaba göre farklı renkli işaretçiler**
3. **Kitap kapağı veya mekan fotoğrafı:** Telif haklarına dikkat edin, kendi çektiğiniz fotoğrafları tercih edin
4. **"Eskiden / Bugün" notu:** Her mekan için kısa bir not alanı
5. **Hakkında sayfası:** Projenin amacı, yöntemi, ekip, kaynakça
6. **Arama kutusu:** Mekan adına göre arama

Takıldığınız her adımda kodu ve (varsa) F12 konsolundaki hata mesajını bana yapıştırın, birlikte çözeriz.

Başarılar!
