# Veri yönetimi ve doğrulama

## Yeni mekân ekleme

`mekanlar.js` içindeki bir kaydı kopyalayın. `id` benzersiz, kitap/yazar yazımı tutarlı, koordinatlar sayısal, `sira` pozitif tam sayı olmalıdır. `kesinlik` yalnızca `kesin` veya `tahmini` olabilir. `npm test` ve `npm run build` ile kontrol edin.

```js
{
  id: "yeni1",
  kitap: "Kitabın adı",
  yazar: "Yazarın adı",
  yil: 1950, // Gerçek ilk yayın yılını kaynakla kontrol edin.
  mekan: "Mekân adı",
  ilce: "Fatih",
  enlem: 41.0162,
  boylam: 28.9640,
  sira: 1,
  ozet: "Kendi cümlelerinizle, kitaptan kontrol edilmiş sahne özeti.",
  alinti: "",
  sayfa: "",
  eskiBugun: "Kaynaklarını karşılaştırarak hazırladığınız not.",
  kesinlik: "tahmini",
  konumGerekcesi: "Konum neden yaklaşık? Hangi ipuçları kullanıldı?",
  dogrulandi: false,
  foto: "",
  baski: "",
  kaynaklar: [],
  kontrolEden: "",
  kontrolTarihi: ""
}
```

Fotoğraf için `foto: "fotograflar/galata.jpg"` gibi proje içindeki yolu yazın. Dosyayı ilgili klasöre koyun. Fotoğrafın kullanım iznini kaydedin; kişilerin göründüğü kareler için uygun izinleri alın.

## Doğrulama protokolü

1. Kitabın adını, yazarını, yayınevini, baskısını ve yılını kaydedin.
2. Sahneyi kitaptan okuyun. İsterseniz kısa alıntı ekleyin ve mutlaka sayfa verin; hatırlayarak alıntı yazmayın.
3. Konum için en az iki bağımsız kaynak kaydedin. Yalnızca iki farklı harita bağlantısı aynı bilginin bağımsız doğrulanması sayılmaz.
4. Belirsizliği `konumGerekcesi` alanında açıklayın. Gerçek adresi bilinen bir yapının kitaptaki sahneyle ilişkisi ayrıca doğrulanmalıdır.
5. Rota sırasını metinden kontrol edin. Çizgiler yürünebilir yol bilgisi içermez.
6. `baski`, `sayfa`, `kaynaklar` (en az iki farklı kaynak), `kontrolEden`, `kontrolTarihi` tamamlanınca `dogrulandi: true` yapın. Yazılım bu alanların varlığını denetler, doğruluklarını insan kontrol eder.

| id | Kontrol eden | Baskı ve sayfa | Konum kaynağı 1 | Konum kaynağı 2 | Kesin/Tahmini | Gerekçe | Tarih |
| --- | --- | --- | --- | --- | --- | --- | --- |
| fh1 | eklenecek | eklenecek | eklenecek | eklenecek | tahmini | eklenecek | eklenecek |

## Ziyaretçi önerileri

`oneriler.json` veri tabanı değil, JSON liste dosyasıdır. Sunucu kimlik ve tarih ekler, `dogrulandi: false` olarak saklar. Formda kişisel bilgi istenmez. Önerilerin ham hali haritada yayımlanmaz.

Aktarma: dosyayı yedekleyin → öneriyi inceleyin → kitabı ve konumu doğrulayın → `mekanlar.js` şemasına çevirin → testleri çalıştırın → sunucuyu yeniden başlatın. Öneri dosyasını düzenlerken sunucuyu durdurun. Dosya bozulursa sunucu eski içeriği silmez, kayıt hatası bildirir; geçerli yedeği geri koyun.

Bu sürüm tek Node.js sunucusu içindir. Birden fazla sunucu işleminin aynı dosyaya yazması desteklenmez. Çok kullanıcılı, büyük ölçekli kalıcı yayın gerekirse depolama tasarımı ayrıca ele alınmalıdır.
