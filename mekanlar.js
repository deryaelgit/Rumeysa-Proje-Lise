// Edebî kayıtlar doğrulama bekler. Fotoğraf lisansları: fotograflar/README.md
const mekanlar = [
  {
    "id": "fh1",
    "kitap": "Fatih-Harbiye",
    "yazar": "Peyami Safa",
    "yil": 1931,
    "mekan": "Fatih (Neriman'ın mahallesi)",
    "ilce": "Fatih",
    "enlem": 41.0196,
    "boylam": 28.9497,
    "sira": 1,
    "ozet": "Neriman'ın ailesiyle yaşadığı Fatih, romanda geleneksel yaşamın ve Doğu'nun simgesi olarak çizilir.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Eskiden ahşap evlerin sık olduğu bir semt; bugün yoğun, kalabalık ve dönüşen bir merkez.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/fh1.jpg",
    "fotoAciklama": "Fatih Camii; semti temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Sultan_Muhammet_Fatih_camii_(cropped).jpg",
    "fotoYazar": "Ezzeldin.Elbaksawy",
    "fotoLisans": "CC BY-SA 4.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kitapGorsel": "kitaplar/kitap-1.svg",
    "fotograflar": [
      {
        "src": "fotograflar/fh1.jpg",
        "baslik": "Fatih Camii; semti temsil eden görüntü",
        "yazar": "Ezzeldin.Elbaksawy",
        "lisans": "CC BY-SA 4.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Sultan_Muhammet_Fatih_camii_(cropped).jpg"
      },
      {
        "src": "fotograflar/fh1-galeri-1.jpg",
        "baslik": "Fatih Camii, 1888–1910 tarihli kaynak görüntüsü",
        "yazar": "Sebah & Joaillier, photographer",
        "lisans": "Public domain",
        "lisansUrl": "",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Fatih_Camii_1888-1910_y%C4%B1llar%C4%B1.jpg"
      },
      {
        "src": "fotograflar/fh1-galeri-2.jpg",
        "baslik": "Fatih Camii çevresinden farklı bir görünüm",
        "yazar": "Sitomon",
        "lisans": "CC BY-SA 2.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/2.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Fatih_Mosque5.jpg"
      }
    ]
  },
  {
    "id": "fh2",
    "kitap": "Fatih-Harbiye",
    "yazar": "Peyami Safa",
    "yil": 1931,
    "mekan": "Harbiye",
    "ilce": "Şişli",
    "enlem": 41.0468,
    "boylam": 28.989,
    "sira": 2,
    "ozet": "Neriman'ın gittiği Harbiye, romanda Batılı eğlence hayatını temsil eder. Roman, iki semt arasındaki gidiş gelişle Doğu-Batı gerilimini anlatır.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Eğlence ve kültür mekânlarıyla bilinen bölge bugün de konser ve gösteri merkezlerine ev sahipliği yapar.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/fh2-photo.jpg",
    "fotoAciklama": "Harbiye Askerî Müze; bölgeyi temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Askeri_muze_Istanbul.jpg",
    "fotoYazar": "Mirada",
    "fotoLisans": "CC BY-SA 3.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kitapGorsel": "kitaplar/kitap-1.svg",
    "fotograflar": [
      {
        "src": "fotograflar/fh2-photo.jpg",
        "baslik": "Harbiye Askerî Müze; bölgeyi temsil eden görüntü",
        "yazar": "Mirada",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Askeri_muze_Istanbul.jpg"
      },
      {
        "src": "fotograflar/fh2-galeri-1.jpg",
        "baslik": "Harbiye Askerî Müze; bölgeyi temsil eden ek görüntü",
        "yazar": "Mirada",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Askeri_muze_Istanbul.jpg"
      }
    ]
  },
  {
    "id": "mm1",
    "kitap": "Masumiyet Müzesi",
    "yazar": "Orhan Pamuk",
    "yil": 2008,
    "mekan": "Nişantaşı / Teşvikiye çevresi",
    "ilce": "Şişli",
    "enlem": 41.048,
    "boylam": 28.9935,
    "sira": 1,
    "ozet": "Kemal'in ailesinin ve nişanlısının yer aldığı varlıklı, Batılılaşmış çevre Nişantaşı'dır. Romanın zıt dünyalarından biri burasıdır.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Romanın geçtiği yıllarda sakin bir mahalle; bugün lüks mağazaların ve kafelerin merkezi.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/mm1.jpg",
    "fotoAciklama": "Teşvikiye Camii; çevreyi temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Tesvikiye_Mosque,_Istanbul_07.jpg",
    "fotoYazar": "Chapultepec",
    "fotoLisans": "Public domain",
    "fotoLisansUrl": "",
    "kitapGorsel": "kitaplar/kitap-2.svg",
    "fotograflar": [
      {
        "src": "fotograflar/mm1.jpg",
        "baslik": "Teşvikiye Camii; çevreyi temsil eden görüntü",
        "yazar": "Chapultepec",
        "lisans": "Public domain",
        "lisansUrl": "",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Tesvikiye_Mosque,_Istanbul_07.jpg"
      },
      {
        "src": "fotograflar/mm1-galeri-1.jpg",
        "baslik": "Teşvikiye Camii; mahalle çevresini temsil eden görünüm",
        "yazar": "The original uploader was Cjs2111 at English Wikipedia.",
        "lisans": "CC BY 2.5",
        "lisansUrl": "https://creativecommons.org/licenses/by/2.5",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Teskmosque.jpg"
      },
      {
        "src": "fotograflar/mm1-galeri-2.jpg",
        "baslik": "Teşvikiye Camii mimarisinden farklı bir açı",
        "yazar": "Chapultepec",
        "lisans": "Public domain",
        "lisansUrl": "",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Tesvikiye_Mosque,_Istanbul_08.jpg"
      }
    ]
  },
  {
    "id": "mm2",
    "kitap": "Masumiyet Müzesi",
    "yazar": "Orhan Pamuk",
    "yil": 2008,
    "mekan": "Masumiyet Müzesi (Çukurcuma)",
    "ilce": "Beyoğlu",
    "enlem": 41.0319,
    "boylam": 28.9813,
    "sira": 2,
    "ozet": "Kemal'in sevdiği kadınla ilgili eşyaları biriktirdiği Çukurcuma, romanın duygusal merkezidir. Pamuk, kitapla birlikte gerçek bir müze de kurmuştur.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Kurgudaki mekân bugün gerçek bir müze olarak ziyaret edilebilir (2012).",
    "kesinlik": "kesin",
    "dogrulandi": false,
    "foto": "fotograflar/mm2.jpg",
    "fotoAciklama": "Masumiyet Müzesi dış görünümü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:The_Museum_of_Innocence.jpg",
    "fotoYazar": "Fuzheado (talk)",
    "fotoLisans": "CC BY-SA 3.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kitapGorsel": "kitaplar/kitap-2.svg",
    "fotograflar": [
      {
        "src": "fotograflar/mm2.jpg",
        "baslik": "Masumiyet Müzesi dış görünümü",
        "yazar": "Fuzheado (talk)",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:The_Museum_of_Innocence.jpg"
      },
      {
        "src": "fotograflar/mm2-galeri-1.jpg",
        "baslik": "Masumiyet Müzesi binası",
        "yazar": "Lambiam",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Masumiyet_M%C3%BCzesi%27nin_binas%C4%B1.JPG"
      }
    ]
  },
  {
    "id": "hz1",
    "kitap": "Huzur",
    "yazar": "Ahmet Hamdi Tanpınar",
    "yil": 1949,
    "mekan": "Süleymaniye Camii",
    "ilce": "Fatih",
    "enlem": 41.0162,
    "boylam": 28.964,
    "sira": 1,
    "ozet": "Romanda İstanbul'un geçmişi, mimarisi ve musikisi karakterlerin iç dünyasında önemli yer tutar. Süleymaniye bu kültürel hafızanın simgelerinden biridir.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Bugün de ibadete ve ziyarete açık, Süleymaniye Külliyesi'nin merkezi.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/hz1.jpg",
    "fotoAciklama": "Süleymaniye Camii",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:S%C3%BCleymaniyeMosqueIstanbul_(cropped).jpg",
    "fotoYazar": "Hunanuk",
    "fotoLisans": "CC0",
    "fotoLisansUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "kitapGorsel": "kitaplar/kitap-3.svg",
    "fotograflar": [
      {
        "src": "fotograflar/hz1.jpg",
        "baslik": "Süleymaniye Camii",
        "yazar": "Hunanuk",
        "lisans": "CC0",
        "lisansUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
        "kaynak": "https://commons.wikimedia.org/wiki/File:S%C3%BCleymaniyeMosqueIstanbul_(cropped).jpg"
      },
      {
        "src": "fotograflar/hz1-galeri-1.jpg",
        "baslik": "Süleymaniye Camii avlusu",
        "yazar": "Myrabella",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Cour_mosquee_Suleymaniye_Istanbul.jpg"
      },
      {
        "src": "fotograflar/hz1-galeri-2.jpg",
        "baslik": "Süleymaniye Camii çevresinden görünüm",
        "yazar": "Georges Jansoone JoJan",
        "lisans": "CC BY 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Istanbul.S%C3%BCleymaniye02.JPG"
      }
    ]
  },
  {
    "id": "sf1",
    "kitap": "Semaver",
    "yazar": "Sait Faik Abasıyanık",
    "yil": 1936,
    "mekan": "Burgazada",
    "ilce": "Adalar",
    "enlem": 40.879,
    "boylam": 29.069,
    "sira": 1,
    "ozet": "Yazarın yaşadığı ve öykülerine sık sık konu ettiği ada. Balıkçılar ve sıradan insanlar öykülerinin dünyasını kurar.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Yazarın evi bugün Sait Faik Müzesi olarak ziyaret edilebilir.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/sf1.jpg",
    "fotoAciklama": "Burgazada; adayı temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Adalar_5517.jpg",
    "fotoYazar": "User:Darwinek",
    "fotoLisans": "CC BY-SA 3.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kitapGorsel": "kitaplar/kitap-4.svg",
    "fotograflar": [
      {
        "src": "fotograflar/sf1.jpg",
        "baslik": "Burgazada; adayı temsil eden görüntü",
        "yazar": "User:Darwinek",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Adalar_5517.jpg"
      },
      {
        "src": "fotograflar/sf1-galeri-1.jpg",
        "baslik": "Burgazada çevresinden görünüm",
        "yazar": "User:Darwinek",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Adalar_6964.jpg"
      },
      {
        "src": "fotograflar/sf1-galeri-2.jpg",
        "baslik": "Burgazada sokaklarından bir görünüm",
        "yazar": "Ravages",
        "lisans": "CC BY-SA 4.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Burgazada-sokak.jpg"
      }
    ]
  },
  {
    "id": "sb1",
    "kitap": "Sinekli Bakkal",
    "yazar": "Halide Edib Adıvar",
    "yil": 1936,
    "mekan": "Sinekli Bakkal mahallesi (Sultanahmet-Çemberlitaş çevresi)",
    "ilce": "Fatih",
    "enlem": 41.0087,
    "boylam": 28.9714,
    "sira": 1,
    "ozet": "Roman, eski İstanbul mahalle hayatını, bakkalı ve çevresindeki insanları anlatır. Romandaki mahallenin tam adresi belirsiz; konum yaklaşık kabul edildi.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/sb1.jpg",
    "fotoAciklama": "Çemberlitaş; tahmini mahalle çevresini temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Coluna_de_Constantino_01-2.jpg",
    "fotoYazar": "Stegop",
    "fotoLisans": "CC BY-SA 4.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kitapGorsel": "kitaplar/kitap-5.svg",
    "fotograflar": [
      {
        "src": "fotograflar/sb1.jpg",
        "baslik": "Çemberlitaş; tahmini mahalle çevresini temsil eden görüntü",
        "yazar": "Stegop",
        "lisans": "CC BY-SA 4.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Coluna_de_Constantino_01-2.jpg"
      },
      {
        "src": "fotograflar/sb1-galeri-1.jpg",
        "baslik": "Çemberlitaş Sütunu; tahmini mahalle çevresi",
        "yazar": "Sandstein",
        "lisans": "CC BY 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Column_of_Constantine,_July_2010.jpg"
      },
      {
        "src": "fotograflar/sb1-galeri-2.jpg",
        "baslik": "Çemberlitaş Sütunu için tarihî betimleme; fotoğraf değildir",
        "yazar": "User:Marsyas",
        "lisans": "Public domain",
        "lisansUrl": "",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Gurlitt_Constantine_column_with_statue.jpg"
      }
    ]
  },
  {
    "id": "ib1",
    "kitap": "İstanbul Bir Masaldı",
    "yazar": "Mario Levi",
    "yil": 1999,
    "mekan": "Galata çevresi",
    "ilce": "Beyoğlu",
    "enlem": 41.0256,
    "boylam": 28.9744,
    "sira": 1,
    "ozet": "Romanda Galata ve çevresi, İstanbul'un çok kültürlü, özellikle Yahudi cemaatinin yaşamıyla birlikte hatırlanan mahallelerinden biri olarak geçer.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Galata Kulesi çevresi bugün turizmin ve sanatın merkezi.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/ib1.jpg",
    "fotoAciklama": "Galata Kulesi; çevreyi temsil eden görüntü",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Istanbul_asv2020-02_img48_Galata_Tower.jpg",
    "fotoYazar": "A.Savin",
    "fotoLisans": "FAL",
    "fotoLisansUrl": "http://artlibre.org/licence/lal/en",
    "kitapGorsel": "kitaplar/kitap-6.svg",
    "fotograflar": [
      {
        "src": "fotograflar/ib1.jpg",
        "baslik": "Galata Kulesi; çevreyi temsil eden görüntü",
        "yazar": "A.Savin",
        "lisans": "FAL",
        "lisansUrl": "http://artlibre.org/licence/lal/en",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Istanbul_asv2020-02_img48_Galata_Tower.jpg"
      },
      {
        "src": "fotograflar/ib1-galeri-1.jpg",
        "baslik": "Galata Kulesi seyir bölümünden çevreye bakış",
        "yazar": "Mark Ahsmann",
        "lisans": "CC BY-SA 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:20131205_Istanbul_311.jpg"
      },
      {
        "src": "fotograflar/ib1-galeri-2.jpg",
        "baslik": "Galata Kulesi iç mimarisinden bir ayrıntı",
        "yazar": "Fatih Yasin Köroğlu",
        "lisans": "CC BY-SA 4.0",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/4.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:A_circular_window_of_the_Galata_Tower_(5th_floor)-3.jpg"
      }
    ]
  },
  {
    "id": "oe1",
    "kitap": "Doğu Ekspresinde Cinayet",
    "yazar": "Agatha Christie",
    "yil": 1934,
    "mekan": "Pera Palace Oteli",
    "ilce": "Beyoğlu",
    "enlem": 41.0289,
    "boylam": 28.9741,
    "sira": 1,
    "ozet": "Christie'nin İstanbul'da konakladığı otel olarak bilinir. Kitapta ise Poirot'nun kaldığı otel olarak başka bir İstanbul oteli geçer; bu ayrım kaynaktan doğrulanmalı.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Otel 2010 civarında yenilenerek yeniden açıldı ve bugün hâlâ hizmet veriyor.",
    "kesinlik": "tahmini",
    "dogrulandi": false,
    "foto": "fotograflar/oe1.jpg",
    "fotoAciklama": "Pera Palace Oteli",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Pera_Palace_Hotel_Jumeirah_-_panoramio.jpg",
    "fotoYazar": "qwesy qwesy",
    "fotoLisans": "CC BY 3.0",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by/3.0",
    "kitapGorsel": "kitaplar/kitap-7.svg",
    "fotograflar": [
      {
        "src": "fotograflar/oe1.jpg",
        "baslik": "Pera Palace Oteli",
        "yazar": "qwesy qwesy",
        "lisans": "CC BY 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Pera_Palace_Hotel_Jumeirah_-_panoramio.jpg"
      },
      {
        "src": "fotograflar/oe1-galeri-1.jpg",
        "baslik": "Pera Palace Oteli çevresinden görünüm",
        "yazar": "A.Savin",
        "lisans": "FAL",
        "lisansUrl": "http://artlibre.org/licence/lal/en",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Istanbul_asv2020-02_img39_Pera_Palace_Hotel.jpg"
      },
      {
        "src": "fotograflar/oe1-galeri-2.jpg",
        "baslik": "Pera Palace Oteli; farklı bir açı",
        "yazar": "A.Savin",
        "lisans": "FAL",
        "lisansUrl": "http://artlibre.org/licence/lal/en",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Istanbul_asv2020-02_img43_Pera_Palace_Hotel.jpg"
      }
    ]
  },
  {
    "id": "oe2",
    "kitap": "Doğu Ekspresinde Cinayet",
    "yazar": "Agatha Christie",
    "yil": 1934,
    "mekan": "Sirkeci Garı",
    "ilce": "Fatih",
    "enlem": 41.0155,
    "boylam": 28.977,
    "sira": 2,
    "ozet": "Orient Express'in İstanbul'daki durağı. Roman, Poirot'nun İstanbul'dan trene binmesiyle ilerler.",
    "alinti": "",
    "sayfa": "",
    "eskiBugun": "Bugün Marmaray bağlantılı bir durak ve Demiryolu Müzesi ile hizmet veriyor.",
    "kesinlik": "kesin",
    "dogrulandi": false,
    "foto": "fotograflar/oe2.jpg",
    "fotoAciklama": "Sirkeci Garı",
    "fotoKaynak": "https://commons.wikimedia.org/wiki/File:Bahnhofsfront-Istanbul-Sirkeci_retouched.jpg",
    "fotoYazar": "Bahnhofsfront-Istanbul-Sirkeci.jpg: Martin Dürrschnabel\nderivative work: Dha (talk)",
    "fotoLisans": "CC BY-SA 2.5",
    "fotoLisansUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "kitapGorsel": "kitaplar/kitap-7.svg",
    "fotograflar": [
      {
        "src": "fotograflar/oe2.jpg",
        "baslik": "Sirkeci Garı",
        "yazar": "Bahnhofsfront-Istanbul-Sirkeci.jpg: Martin Dürrschnabel\nderivative work: Dha (talk)",
        "lisans": "CC BY-SA 2.5",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/2.5",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Bahnhofsfront-Istanbul-Sirkeci_retouched.jpg"
      },
      {
        "src": "fotograflar/oe2-galeri-2.jpg",
        "baslik": "Sirkeci Garı saatinden bir ayrıntı",
        "yazar": "Ail Subway",
        "lisans": "CC BY 3.0",
        "lisansUrl": "https://creativecommons.org/licenses/by/3.0",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Clock_Of_Sirkeci_Terminus.jpg"
      },
      {
        "src": "fotograflar/oe2-galeri-1.jpg",
        "baslik": "Sirkeci Garı iç mekânı",
        "yazar": "User:Themightyquill",
        "lisans": "CC BY-SA 2.5",
        "lisansUrl": "https://creativecommons.org/licenses/by-sa/2.5",
        "kaynak": "https://commons.wikimedia.org/wiki/File:Sirkeci_inside.jpg"
      }
    ]
  }
];
if(typeof module!=="undefined")module.exports=mekanlar;
