/* Araştırma kaynakları ve editoryal yorumlar; veritabanı gerekmez. */
(function(root) {
  'use strict';
  const data = {
    history: {
      year:1922, title:'Plan Rouge · İstanbul, 1922', image:'haritalar/istanbul-1922-original.jpg',
      bounds:[[40.97,28.91],[41.075,29.065]],
      source:'https://commons.wikimedia.org/wiki/File:Istanbul_PU889.jpg',
      catalog:'https://maps.princeton.edu/catalog/princeton-3b591b14j',
      credit:'Société anonyme ottomane d’études et d’entreprises urbaines · Princeton University Library',
      license:'Public Domain Mark 1.0',
      note:'Tarihî tarama yaklaşık sınırlarla yerleştirilmiştir; kenar yazıları ve çizim farklılıkları nedeniyle güncel sokaklarla örtüşmez. Konum veya parsel ölçümü için kullanılamaz.'
    },
    moods: {
      melancholy:{label:'Hüzün / Melankoli',color:'#3977c1',symbol:'◒'},
      tension:{label:'Kaos / Gerilim',color:'#c34d4d',symbol:'ϟ'},
      peace:{label:'Huzur / Aşk',color:'#32865c',symbol:'♡'},
      memory:{label:'Hafıza / Aidiyet',color:'#9465ad',symbol:'◇'}
    },
    readings: {
      fh1:{mood:'memory',reason:'Mahalle ve gelenek duygusu üzerinden editoryal yorum.',sound:'bell'},
      fh2:{mood:'tension',reason:'İki yaşam biçimi arasındaki gerilim üzerinden editoryal yorum.',sound:'bell'},
      mm1:{mood:'tension',reason:'Toplumsal çevre ve sınıf karşıtlığı üzerinden editoryal yorum.',sound:'bell'},
      mm2:{mood:'melancholy',reason:'Özlem, hatırlama ve eşya biriktirme üzerinden editoryal yorum.',sound:'gulls'},
      hz1:{mood:'peace',reason:'Mimari ve musikiyle kurulan ilişki üzerinden editoryal yorum.',sound:'gulls'},
      sf1:{mood:'peace',reason:'Ada ve gündelik yaşam temaları üzerinden editoryal yorum.',sound:'ferry'},
      sb1:{mood:'memory',reason:'Mahalle kültürü ve birlikte yaşama üzerinden editoryal yorum.',sound:'bell'},
      ib1:{mood:'melancholy',reason:'Geçmişe ve çok kültürlü hayata bakış üzerinden editoryal yorum.',sound:'gulls'},
      oe1:{mood:'tension',reason:'Polisiye eserin tonuna ilişkin yorum; otelin romanda geçtiğini kanıtlamaz.',sound:'bell'},
      oe2:{mood:'tension',reason:'Yolculuk ve polisiye anlatı üzerinden editoryal yorum.',sound:'ferry'}
    },
    walks:[{
      id:'huzur', book:'Huzur', title:'Mümtaz’ın İstanbul’u', subtitle:'Beyazıt’tan Eminönü’ne bir okuma yürüyüşü',
      description:'Romandaki Beyazıt–Eminönü yürüyüşünden hareketle hazırlanmış günümüz okuma rotası. Ara duraklar tematik seçimdir; Mümtaz’ın sokak sokak izlediği kesin yol olarak sunulmaz.',
      sources:[
        {title:'MSGSÜ Tanpınar Merkezi · Huzur',url:'https://tanpinarmerkezi.msgsu.edu.tr/1667.html'},
        {title:'Vehbi Eralp · Huzur değerlendirmesi',url:'https://tanpinarmerkezi.msgsu.edu.tr/v2/vehbi-eralp-hamdi-tanpinarin-romani-huzur/index.html'}
      ],
      stops:[
        {name:'Beyazıt Meydanı',lat:41.0105,lng:28.9658,note:'Kaynakta Mümtaz’ın yürüyüşünün başlangıcı olarak belirtilir. Savaş beklentisi, hastalık ve Nuran’ın anıları bu yürüyüşe eşlik eder.'},
        {name:'Sahaflar Çarşısı',lat:41.0101,lng:28.9642,note:'Roman üzerine değerlendirmede öne çıkan kitap ve şehir hafızası durağı. Bu rotadaki sıra editoryal seçimdir.'},
        {name:'Kapalıçarşı',lat:41.0107,lng:28.9682,note:'Tanpınar’ın şehir tasvirleriyle ilişkilendirilen çarşı. Durağa vardığınızda kalabalık ve iç dünya ilişkisini düşünün.'},
        {name:'Nuruosmaniye çevresi',lat:41.0101,lng:28.9711,note:'Çarşıdan çıkış için seçilmiş güncel geçiş durağı; bu kesin konumda belirli bir roman olayı yaşandığı iddia edilmez.'},
        {name:'Eminönü / Yeni Cami çevresi',lat:41.0173,lng:28.9703,note:'Kaynakta yürüyüşün ulaştığı bölge Eminönü’dür. Burası yürüyüşü tamamlamak için seçilmiş buluşma noktasıdır.'}
      ]
    }]
  };
  if(typeof module!=='undefined')module.exports=data;else root.AtlasData=data;
})(typeof window!=='undefined'?window:globalThis);
