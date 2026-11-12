# Yaratıcı atlas özellikleri

## Zaman katmanlı harita

**Tarihî haritayı göster** seçeneği, gerçek 1922 İstanbul haritasını günümüz haritasına bindirir. Kaydırıcı opaklığı %0–100 arasında değiştirir. Kitap seçilince ilk yayın yılı ile harita yılı arasındaki fark görünür. İlk yayın yılı yazım veya olay tarihi sayılmaz. Bütün kitaplarda aynı 1922 katmanı kullanılır; her kitaba özel dönem paftası ve Pervititch paftası henüz yoktur.

Yerleştirme yaklaşık sınırlara dayanır; hassas jeoreferanslama yapılmamıştır. Sokak veya parsel ölçümü için kullanılmaz. Sonraki araştırma adımı, dönem paftalarını kontrol noktalarıyla hizalamaktır.

Kaynak: Société anonyme ottomane d’études et d’entreprises urbaines, *Plan Rouge / Plan d’ensemble de la ville de Constantinople*, 1922, Princeton University Library.

- [Princeton katalog kaydı](https://maps.princeton.edu/catalog/princeton-3b591b14j): G7434.I8.1922.S6; No Known Copyright.
- [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Istanbul_PU889.jpg): Public Domain Mark 1.0; yerel dosya `haritalar/istanbul-1922-original.jpg`.

## Edebî rota ve yürüyüş rehberi

**Mümtaz’ın İstanbul’u**: Beyazıt, Sahaflar, Kapalıçarşı, Nuruosmaniye çevresi ve Eminönü. Beş durağın okuma notları, haritada yakınlaşması, toplam yaya mesafesi ve tahmini süresi gösterilir. Google Maps yürüyüş bağlantısı ve GPX indirme vardır.

MSGSÜ Tanpınar Merkezi, Mümtaz’ın Beyazıt’tan Eminönü’ne yürüyüşünü açıklar. Ara duraklar ve sıra editoryal seçimdir; çizilen güncel sokaklar karakterin kesin tarihî güzergâhının kanıtı değildir.

Güncel geometri OSRM/FOSSGIS yaya profiliyle 12 Kasım 2026 tarihinde alınmıştır. `haritalar/huzur-yaya.json` yaklaşık **2,02 km / 27 dakika** içerir; okuma molaları dahil değildir. Bu, karakterin yürüdüğü tarihî mesafe değildir. Kullanıcı başına rota servisi çağrılmaz. Kaynak: OpenStreetMap katkıcıları; OSM atfı haritada korunur. Yol koşulları değişebilir.

- [MSGSÜ Tanpınar Merkezi: Huzur](https://tanpinarmerkezi.msgsu.edu.tr/1667.html)
- [Vehbi Eralp: Huzur değerlendirmesi](https://tanpinarmerkezi.msgsu.edu.tr/v2/vehbi-eralp-hamdi-tanpinarin-romani-huzur/index.html)
- [OSRM yaya servisi yapılandırması](https://github.com/Project-OSRM/osrm-frontend)

## Mekânın duygu haritası

**Kitaplara göre / Duygulara göre** seçimi işaretçilerin renk ve simgelerini değiştirir. Ayrıntı panelinde etiket ve gerekçe bulunur.

| Duygu | Renk | Simge |
| --- | --- | --- |
| Hüzün / Melankoli | Mavi | ◒ |
| Kaos / Gerilim | Kırmızı | ϟ |
| Huzur / Aşk | Yeşil | ♡ |
| Hafıza / Aidiyet | Mor | ◇ |

Etiketler sahne özetlerine dayalı editoryal yorumlardır; otomatik duygu analizi veya psikolojik ölçüm değildir. Araştırmada baskı, sayfa ve bağlam belgelenmeli; iki okuyucunun bağımsız kodlaması karşılaştırılmalıdır.

## Dönemin sesleri ve atmosferi

Mekân ayrıntısında vapur düdüğü, tramvay zili ve martı çağrışımı seçilebilir. Başlat/durdur ve ses düzeyi kontrolleri bulunur. Ses otomatik başlamaz; pencere kapanınca, mekân değişince ve sekme gizlenince durur.

Sesler Web Audio ile cihazda üretilen özgün sentetik çağrışımlardır; gerçek tarihî kayıt veya gerçek martı kaydı değildir. Taş plak müziği kullanılmaz. Arşiv kaydı eklenirse kaynak, yıl, eser ve kayıt hakları ile lisans belgelenmelidir.

## Dosyalar

`atlas-data.js`: kaynaklar ve yorumlar. `atlas.js`: harita araçları, rota ve GPX. `atmosphere.js`: ses üretimi. `atlas.css`: mobil ve tema stilleri. `haritalar/`: yerel arşiv haritası ve yaya geometrisi.

Özellikler GitHub Pages üzerinde ayrı veritabanı olmadan çalışır. Mevcut kitap verilerinin doğrulama uyarıları ve Google Forms öneri akışı korunur.
