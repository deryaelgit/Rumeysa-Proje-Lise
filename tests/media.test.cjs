const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=require('../mekanlar.js');
test('Her mekânda farklı dosyalardan en az iki kaynaklı, lisanslı görsel var',()=>{
 for(const place of data){
  assert.ok(place.fotograflar.length>=2,place.id);
  assert.equal(new Set(place.fotograflar.map(p=>p.src)).size,place.fotograflar.length);
  for(const photo of place.fotograflar){
   assert.match(photo.src,/^fotograflar\/[\w.-]+\.(jpg|png)$/i);
   assert.ok(fs.existsSync(path.join(__dirname,'..',photo.src)),photo.src);
   assert.ok(photo.baslik&&photo.yazar&&photo.lisans,photo.src);
   assert.match(photo.kaynak,/^https:\/\/commons\.wikimedia\.org\//);
   if(!['Public domain','CC0'].includes(photo.lisans))assert.match(photo.lisansUrl,/^https?:\/\//);
  }
 }
});
