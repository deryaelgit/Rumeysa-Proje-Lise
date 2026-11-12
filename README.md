# İstanbul'un Edebî Hafızası: Kitapların İzinde Dijital Şehir Atlası

İki rehberin v2 sürümü temel alınarak hazırlanmış, veritabanı gerektirmeyen çalışan proje. Rehberlerin asılları korunmuştur. Türkçe arayüz, mobil görünüm, yerel Leaflet, Node.js ile dosyaya öneri kaydı ve stand için QR kod aracı içerir.

## Hemen çalıştır

Node.js 22 veya daha yenisi kurulu olmalıdır. Proje klasöründe:

```powershell
npm install
npm start
```

Tarayıcı: **http://127.0.0.1:3000**
Stand / QR kod: **http://127.0.0.1:3000/stand.html**

Durdurmak için terminalde Ctrl+C. Kaynak dosyaları değiştirdiğinizde sunucuyu yeniden başlatın; başlangıçta dist/ yeniden hazırlanır. Bu sürümde otomatik yenileme yoktur.

Port doluysa:

```powershell
$env:PORT = 3001
npm start
```

## Neler çalışır?

- Her kitap için ayrı renkte işaretçiler ve tıklanabilir renk açıklamaları.
- Kesin konumlarda düz, tahmini konumlarda kesik çerçeve.
- Kitap ve yazar filtresi; Türkçe karakterlerle ve karakter kullanmadan arama.
- Tek kitap seçildiğinde görünür durakları `sira` alanıyla bağlayan rota; aç/kapat düğmesi.
- Mevcut filtreler içinden rastgele keşif; birden fazla sonuç varsa art arda aynı mekân seçilmez.
- Harita ile eşleşen mekân listesi; özet, Eskiden / Bugün, konum ve doğrulama durumu, Google Maps bağlantısı. Boş karşılaştırma notunda eksik bilgi açıkça belirtilir.
- Tüm veri kümesi için kitap/yazar/mekân sayıları, doğrulanma yüzdesi ve ilçe dağılımı.
- Araştırma yöntemi, kaynakça durumu ve örnek veri uyarıları.
- GitHub Pages üzerinden Google Forms ile öneri toplama; yerel Node.js sürümünde `oneriler.json` dosyasına kalıcı kayıt. Ayrı veritabanı kurulumu gerekmez.
- Stand afişi, cihazda QR kod üretme, SVG indirme, yazdırma.

## Dosyalar

| Dosya | İçerik |
| --- | --- |
| `index.html`, `style.css` | Sayfa ve mobil tasarım |
| `mekanlar.js` | Haritada yayımlanan kayıtlar; düzenlenecek ana veri dosyası |
| `core.js`, `script.js` | Veri kontrolü, filtreler, istatistikler ve harita |
| `oneriler.json` | Ziyaretçilerin formdan gönderdiği, henüz doğrulanmamış öneriler |
| `tools/server.cjs` | HTTP sunucusu ve dosyaya yazan öneri API'si |
| `tools/build.cjs` | Dağıtım dosyalarını dist/ içine toplar |
| `stand.html`, `stand.js` | Afiş ve QR kod aracı |
| `fotograflar/` | Kendi çektiğiniz mekân fotoğrafları |
| `docs/` | Veri yönetimi, araştırma, anket, stand belgeleri |

## Öneriler nasıl saklanır?

Form `POST /api/oneriler` adresine gider. Sunucu alanları kontrol eder, kayıtları sırayla ve geçici dosya üzerinden `oneriler.json` dosyasına yazar. Kaydetme başarılı olmadan başarı mesajı gösterilmez. Başarısızlıkta form temizlenmez. Öneriler sunucu yeniden başlatıldığında korunur. Bu dosya web üzerinden okunamaz; klasörden açılır. Aynı veri dosyasına tek sunucu işlemi yazmalıdır.

Tarayıcıdaki indirme düğmesi yalnızca o sayfa oturumunda başarıyla kaydedilen önerilerin bir kopyasını verir; tüm arşiv `oneriler.json` içindedir. Sayfa yenilendiğinde oturum sayacı sıfırlanır, sunucudaki dosya korunur. İnceleyip doğruladığınız öneriyi `mekanlar.js` dosyasına elle aktarın: [veri yönetimi](docs/veri-yonetimi.md).

## Kontrol ve dağıtım

```powershell
npm test
npm run test:browser
npm run build
```

Tarayıcı testi için bir kez `npx playwright install chromium` gerekebilir. Testler gerçek öneri dosyasını değiştirmeden geçici dosya kullanır.

`dist/` yalnızca statik çıktıdır. Live Server veya statik hosting ile harita çalışır; dosyaya öneri kaydı **çalışmaz**. Tam işlev için Node.js sürecini ve yazılabilir, kalıcı diski destekleyen ortamda `npm start` kullanın. Geçici sunucu diskleri kayıtları korumaz. `oneriler.json` dosyasını düzenli yedekleyin. Harita kütüphanesi yereldir, OpenStreetMap altlığı için internet gerekir.

Aynı Wi-Fi ağında telefonla fuar kullanımı için:

```powershell
$env:HOST = '0.0.0.0'
npm start
```

`ipconfig` ile bilgisayarın IPv4 adresini bulun. Telefonlarda `http://BILGISAYAR-IP:3000` kullanın ve bu adresle stand sayfasında QR üretin. Güvenlik duvarında yerel ağ erişiminin açık olması gerekir. `localhost` telefonun kendisini ifade eder. Bu ayar internette yayın yapmaz.

## Bilimsel tamamlanma durumu

Yazılım hazır örnek veriyle çalışır. 7 kitap, 7 yazar ve 10 kayıt rehberden aynen alınmıştır; doğrulama oranı %0'dır. Alıntı, sayfa ve baskı bilgileri uydurulmamıştır. Harita ve rota, doğrulanmış edebiyat araştırması veya yürüyüş navigasyonu olarak sunulmaz. Pera Palace yazarla ilişkili bir örnektir; romandaki otel olduğu varsayılmaz. Jüriye sunulacak veriler için [doğrulama protokolünü](docs/veri-yonetimi.md) tamamlayın.

Araştırma planı: [docs/arastirma-plani.md](docs/arastirma-plani.md)
Ön/son test: [docs/anketler.md](docs/anketler.md)
Stand: [docs/fuar-standi.md](docs/fuar-standi.md)
Gereksinim takibi: [docs/gereksinimler.md](docs/gereksinimler.md)

## GitHub Pages canlı yayını

Adres: https://deryaelgit.github.io/Rumeysa-Proje-Lise/

Canlı sitedeki “Bir mekân önerin” bağlantısı Google Form'u yeni sekmede açar. Öneriler Google Forms'ta toplanır; bilgisayardaki veya GitHub'daki `oneriler.json` dosyasına yazılmaz. Form sahibi, formu kendi Google hesabıyla düzenlemeye açıp **Yanıtlar** sekmesinden bütün önerileri görebilir ve isterse Google E-Tablolar'a bağlayabilir. Ziyaretçilere düzenleme bağlantısı yerine yanıtlayan bağlantısı verilir. Formun yayınlanmış ve hedef ziyaretçilerin erişimine açık olması gerekir.

Form bağlantısı: https://docs.google.com/forms/d/e/1FAIpQLSdulWBurif7l4TCnujkntKR_rEZ3Ng2lkPhamHIgIOFUxL8Ug/viewform

Yerel `npm start` sürümünde mevcut form ve `oneriler.json` kaydı devam eder. Canlı sitedeki Google Form bağlantısı JavaScript kapalıyken de çalışır.

Yayın için `node tools/publish-pages.cjs`; durum kontrolü için `node tools/publish-pages.cjs --status`. Kayıtlı GitHub Git oturumu ve depoda Pages yönetim yetkisi gerekir. Kimlik bilgileri dosyaya yazılmaz. Kaynak kod main, statik çıktı gh-pages dalındadır. Kaynak değişikliklerini main'e gönderdikten sonra yayın komutunu çalıştırın.

Harita görünümleri: OpenStreetMap sokak haritası, Esri uydu + yer adları, Esri sade atlas. “Bina detayı” seçili veya ilk görünür mekâna yakınlaşır. Uydu görüntüsü 2B'dir; 3B bina modeli içermez. Sağlayıcıların görüntü çözünürlüğü ve kapsamı değişebilir. Hover ve klavye odağında fotoğraf önizlemesi, dokunmada ayrıntı penceresi açılır. Lisanslar `fotograflar/README.md` dosyasındadır.

Kitap görselleri `kitaplar/` klasöründe projeye özel SVG tasarımlarıdır; üçüncü taraf yayınevi kapakları değildir. Kitaplardan birebir alıntı eklenmemiştir: kullanılan baskı ve sayfa kaynağı sağlanana kadar mevcut sahne özetleri açıkça taslak olarak gösterilir. Fotoğraflar farklı tarihlerde çekilmiştir; canlı görüntü veya bugünün kesin belgesi olarak değerlendirilmemelidir.

## Tema ve mekân ayrıntıları

Başlıktaki ay/güneş düğmesi açık ve koyu temayı değiştirir; tercih bu tarayıcıda saklanır. Tercih yoksa cihazın tema ayarı kullanılır. Mekân ayrıntıları harita içinde kesilmeyen native dialog panelinde açılır. Masaüstünde sağ panel, telefonda alttan açılan pencere kullanılır; başlık/kapatma ve durak geçişleri sabit, içerik kaydırılabilirdir. Escape ile kapatılabilir. Fotoğraflı hover önizlemesi devam eder.

`npm run test:theme`: tema kalıcılığı, sistem tercihi, mobil formlar ve farklı ekranlarda pencere altı/kapatma erişimi kontrol edilir.

## Çoklu fotoğraf ve 360° gezinme

1922 haritasıyla zaman kaydırıcısı, Huzur yaya rehberi (mesafe, süre, GPX), editoryal duygu renkleri ve isteğe bağlı sentetik şehir atmosferi eklendi. Kullanım, kaynaklar ve sınırlar: [yaratıcı özellikler](docs/yaratici-ozellikler.md).

Her mekânda en az iki görsel, toplam 28 kaynaklı görsel vardır. `mekanlar.js` içindeki `fotograflar` dizisi `src`, `baslik`, `yazar`, `lisans`, `lisansUrl`, `kaynak` alanlarını tutar. Fotoğrafın altındaki küçük görsellerle seçim yapılır; büyük görsele tıklanınca ekran üstünde büyük galeri açılır. Önceki/sonraki düğmeleri, klavye yön tuşları, telefonda yatay sürükleme ve yakınlaştırma düğmesi desteklenir. Escape yalnızca en üstteki fotoğraf penceresini kapatır; mekân dosyası açık kalır. Galeriler açık ve koyu temaya uyumludur.

Fare tekerleği haritada yakınlaştırma/uzaklaştırma yapar. Açık modalda tekerlek içerideki kaydırmayı kontrol eder.

“Google’da 360° gez” resmî Google Maps URL şemasını kullanır ve yeni sekmede Street View açar. Bu, sitenin içinde çalışan bir 3B model veya gömülü Google panorama değildir. Görüntü ve kapsama Google tarafından sağlanır; tahmini konumlar doğru edebî sahneyi veya tam adresi kanıtlamaz. Google görüntüleri indirilmez ve yeniden yayımlanmaz. Site içinde Maps Embed API ile Street View kullanımı ayrıca Google Cloud projesi ve alan adına kısıtlı API anahtarı gerektirir.

Kaynaklar: [Google kullanım rehberi](https://about.google/brand-resource-center/products-and-services/geo-guidelines/), [Street View bağlantı şeması](https://developers.google.com/maps/documentation/urls/guide#street-view-action), [Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map). Açıklamalar, üçüncü taraf lisans koşullarının yerine geçmez ve sıfır telif riski garantisi değildir.

`npm run test:gallery`: çoklu görsel seçimi, büyütme, klavye, 360° bağlantısı, fareyle harita yakınlaştırma ve farklı ekranlarda koyu tema kontrolü.
