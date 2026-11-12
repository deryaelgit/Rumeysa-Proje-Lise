# Fuar standı ve QR kod

1. Sunucuyu çalıştırın: `npm start`.
2. Telefonla kullanılacaksa bilgisayar ile telefonları aynı Wi-Fi ağına bağlayın; README'deki HOST ayarını uygulayın.
3. `/stand.html` sayfasını açın, bilgisayarın ağ adresini veya yayın adresini girin.
4. QR kod oluşturun. Bir telefonla tarayıp haritanın ve öneri kaydının çalıştığını kontrol edin.
5. QR kodu SVG indirin veya “Stand afişini yazdır” ile afişi basın. localhost QR kodu başka telefonlarda çalışmaz.
6. Ön test uygulayın; sonra “Rastgele keşfet” ile bir mekân bulun. Bir kitap seçip örnek duraklarını inceleyin.
7. Son test uygulayın. İsim yerine katılımcı koduyla eşleştirin.
8. Ziyaretçiden bir kitap/mekân önerisi isteyin. Başarılı kayıt mesajını ve `oneriler.json` dosyasını kontrol edin.
9. Gün sonunda önerileri ve anketleri yedekleyin. Onaylanmamış önerileri doğrudan haritaya aktarmayın.

## Hazırlık kontrolü

- [ ] Kitap ve konum doğrulama belgeleri tamamlandı.
- [ ] Örnek veriler ile doğrulanmış kayıtlar ayrıldı.
- [ ] İnternet ve yerel ağ ziyaretçi telefonu ile denendi.
- [ ] QR kod okunuyor ve doğru adrese gidiyor.
- [ ] Dosyaya öneri kaydı ve yedekleme denendi.
- [ ] Basılı ön/son test ve rastgele katılımcı kodları hazır.
- [ ] Kaynakça, araştırma sorusu ve veri sınırlılıkları afişte belirtildi.

Harita altlığı internet ister. İnternet kesilirse liste ve işaretçiler kullanılabilir; daha önce yüklenmemiş harita kareleri görüntülenmeyebilir. QR üretimi harici servise veri göndermez.

## Canlı statik sürüm

Canlı stand sayfası: https://deryaelgit.github.io/Rumeysa-Proje-Lise/stand.html

Bu sayfa açılınca haritanın canlı adresini içeren QR kod otomatik oluşur. Telefon kamerasıyla tarayan ziyaretçi haritaya gider. “Bir mekân önerin” bağlantısı Google Form'u açar; önerileri form sahibinin Google hesabındaki **Yanıtlar** sekmesinden inceleyin. Canlı öneriler `oneriler.json` dosyasına yazılmaz.

QR kod yalnızca bir bağlantı içerir; siteyi veya önerileri içinde saklamaz. Ziyaretçilerin internet bağlantısı gerekir. Site adresi değişmediği sürece içerik güncellense de basılı QR kod kullanılabilir. “QR kodu SVG indir” kodu afiş tasarımına eklemek içindir; “Stand afişini yazdır” ise başlık, QR kod ve etkinlik yönergelerini yazdırır.
