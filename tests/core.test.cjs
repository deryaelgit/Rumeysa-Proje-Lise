const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const data = require('../mekanlar.js');
const E = require('../core.js');
test('Örnek veri şeması ve toplamlar',()=>{
  assert.deepEqual(E.validate(data),[]);
  assert.deepEqual(E.stats(data),{books:7,authors:7,places:10,verified:0,districts:{Fatih:4,'Şişli':2,'Beyoğlu':3,Adalar:1}});
});
test('Türkçe arama ve birleşik filtreler',()=>{
  assert.equal(E.filter(data,{search:'nisantasi'}).length,1);
  assert.equal(E.filter(data,{search:'İSTANBUL'}).length>0,true);
  assert.equal(E.filter(data,{book:'Fatih-Harbiye',author:'Orhan Pamuk'}).length,0);
  assert.equal(E.filter(data,{book:'Fatih-Harbiye'}).length,2);
  assert.equal(E.filter(data,{search:'asla-bulunmayacak'}).length,0);
});
test('Rota sırası ve doğrulama belgeleri',()=>{
  assert.deepEqual(E.route([...data].reverse(),'Fatih-Harbiye').map(m=>m.id),['fh1','fh2']);
  assert.deepEqual(E.route(data,'hepsi'),[]);
  assert.ok(E.validate([{...data[0],dogrulandi:true}]).some(m=>m.includes('belgeleri')));
  assert.ok(E.validate([data[0],data[0]]).some(m=>m.includes('tekrar')));
  assert.equal(E.escape('<script>"x"</script>'),'&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
});
test('Dosya API: kalıcı, eşzamanlı, doğrulanan, gizli ve bozuk dosyayı koruyan kayıt',async()=>{
  const dir = await fs.mkdtemp(path.join(os.tmpdir(),'edebiyat-test-'));
  const file=path.join(dir,'oneriler.json');
  process.env.SUGGESTIONS_FILE=file;
  const {createServer}=require('../tools/server.cjs');
  const server=createServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const post=(entry,headers={})=>fetch(base+'/api/oneriler',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(entry)});
  const entry={kitap:'Test kitabı',yazar:'Test yazarı',mekan:'Test mekânı',not:'Test notu'};
  try {
    assert.equal((await post({})).status,400);
    assert.equal((await post(entry,{Origin:'https://baska.example'})).status,403);
    const responses=await Promise.all(Array.from({length:8},(_,i)=>post({...entry,mekan:`Test ${i}`})));
    responses.forEach(r=>assert.equal(r.status,201));
    const records=JSON.parse(await fs.readFile(file,'utf8'));
    assert.equal(records.length,8);
    assert.equal(new Set(records.map(m=>m.id)).size,8);
    assert.ok(records.every(m=>m.dogrulandi===false));
    assert.equal((await fetch(base+'/oneriler.json')).status,404);
    assert.equal((await fetch(base+'/%2e%2e%5coneriler.json')).status,403);
    await fs.writeFile(file,'bozuk dosya');
    assert.equal((await post(entry)).status,500);
    assert.equal(await fs.readFile(file,'utf8'),'bozuk dosya');
  } finally {await new Promise(resolve=>server.close(resolve));await fs.rm(dir,{recursive:true,force:true});}
});
