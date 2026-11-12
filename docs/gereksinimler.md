# Rehberlerden gereksinim takibi

| Gereksinim | Uygulama |
| --- | --- |
| Veritabanı olmadan veri | `mekanlar.js`; öneriler için `oneriler.json` |
| 7 kitap / 10 örnek kayıt | v2 rehberinden alınan veriler |
| Kitaba göre renkli işaretçi | Leaflet divIcon ve kitap renk açıklamaları |
| Kesin / tahmini | Düz / kesik çerçeve, ayrıntıda durum metni |
| Kitap rotası | Tek kitap filtresi, sıra alanı ve aç/kapat |
| Arama, kitap, yazar | Birlikte çalışan filtreler, temizleme, sonuç sayacı |
| Rastgele keşif | Görünür sonuçlardan seçim |
| Eskiden / Bugün | Her ayrıntıda bölüm; eksikse açık eksik bilgi mesajı |
| İstatistik | Kitap/yazar/kayıt sayısı, doğrulama yüzdesi, ilçe çubukları |
| Google Maps | Her mekânda koordinata giden bağlantı |
| Doğrulandı işareti | Kart ve ayrıntıda durum, belgeler için veri denetimi |
| Ziyaretçi önerisi | Kullanıcı isteğiyle Google Forms yerine Node.js üzerinden dosya kaydı |
| Yöntem ve kaynakça | Ana sayfa, kaynakça penceresi, veri yönetimi belgesi |
| Araştırma sorusu | Ana sayfa ve araştırma planı |
| Ön / son test | Basılabilir `docs/anketler.md` |
| QR ve stand etkinliği | `stand.html`, SVG indirme, afiş yazdırma ve stand belgesi |
| Yeni veri ekleme | README ve veri yönetimi şeması |
| Yerel çalıştırma | npm start; otomatik dist hazırlama |

Rehberde “zamanınız kalırsa” olarak ayrılan İngilizce dil, zaman kaydırıcısı, yürüyüş güzergâhı ve gerçek mekân fotoğrafları bu temel sürümün kapsamına dahil değildir. Mevcut rota yürüyüş navigasyonu değildir. Fotoğraf alanı kendi görsellerinizi eklemek için hazırdır.

Bilimsel veri doğrulaması yazılım tamamlanmasından ayrıdır: örnek kayıtların sayfa, baskı ve konum kanıtları halen ekip tarafından tamamlanmalıdır.

Son tasarımda harita genişletildi, yan boşluklar azaltıldı. Sokak / uydu / sade atlas seçenekleri, bina ayrıntısı yakınlaştırması ve 10 kayıt için fotoğraflı hover önizlemesi eklendi. Fotoğraf kaynakları ve lisansları fotograflar/README.md içindedir. Uydu görünümü 2B görüntüdür.

GitHub Pages sürümünde öneri dosyası ziyaretçiye indirilir; Node.js sürümünde sunucudaki oneriler.json dosyasına yazılır. Yönetici paneli kapsam dışıdır; öneriler kontrol sonrası elle yayımlanır.

## Galeri ve gezinme güncellemesi

Tüm mekânlarda en az iki, toplam 28 kaynak ve lisans bilgili görsel bulunur. Tam ekran büyütme, klavye ile fotoğraf geçişi, yakınlaştırma ve koyu tema desteklenir. Haritada fare tekerleği ile yakınlaştırma açıktır. Google Street View yeni sekmede resmî Google bağlantısıyla açılır; gömülü 3B model değildir. Google görüntüleri projeye kopyalanmaz.
