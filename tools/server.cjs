const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { root, copyStatic } = require('./build.cjs');
const publicDir = path.join(root,'dist');
const dataFile = process.env.SUGGESTIONS_FILE ? path.resolve(process.env.SUGGESTIONS_FILE) : path.join(root,'oneriler.json');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.avif':'image/avif'};
let writeQueue = Promise.resolve();
function reply(res,status,data) { res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(data)); }
function validateSuggestion(body) {
  const limits = { kitap:150, yazar:150, mekan:200, sayfa:40, baski:200, not:1500 };
  const entry = {};
  for (const [key, max] of Object.entries(limits)) {
    if (body[key] != null && typeof body[key] !== 'string') throw new Error('Alanlar metin olmalıdır.');
    entry[key] = (body[key] || '').trim();
    if (entry[key].length > max) throw new Error(`${key} alanı çok uzun.`);
    if (['kitap','yazar','mekan','not'].includes(key) && !entry[key]) throw new Error('Kitap, yazar, mekân ve not alanlarını doldurun.');
  }
  return {...entry,id:crypto.randomUUID(),tarih:new Date().toISOString(),dogrulandi:false};
}
async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 16384) { const error = new Error('Öneri boyutu çok büyük.'); error.status = 413; throw error; }
    chunks.push(chunk);
  }
  try { const body = JSON.parse(Buffer.concat(chunks).toString('utf8')); if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error(); return body; }
  catch { throw new Error('Geçerli JSON verisi bekleniyor.'); }
}
function save(entry) {
  const next = writeQueue.then(async () => {
    let records;
    try { records = JSON.parse(await fsp.readFile(dataFile,'utf8')); }
    catch(error) { if (error.code === 'ENOENT') records=[]; else throw error; }
    if (!Array.isArray(records)) throw new Error('Öneri dosyası liste biçiminde değil.');
    records.push(entry);
    await fsp.mkdir(path.dirname(dataFile),{recursive:true});
    const temp = `${dataFile}.${crypto.randomUUID()}.tmp`;
    try {
      await fsp.writeFile(temp, JSON.stringify(records,null,2)+'\n','utf8');
      await fsp.rename(temp,dataFile);
    } finally { await fsp.rm(temp,{force:true}).catch(()=>{}); }
  });
  writeQueue = next.catch(() => {});
  return next;
}
function createServer() {
  return http.createServer(async (req,res) => {
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    try {
      const url = new URL(req.url,'http://localhost');
      if (url.pathname === '/api/oneriler') {
        if (req.method !== 'POST') { res.setHeader('Allow','POST'); return reply(res,405,{error:'Bu adres yalnızca öneri kaydetmek içindir.'}); }
        if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) return reply(res,403,{error:'İstek aynı siteden gelmelidir.'});
        if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return reply(res,415,{error:'JSON verisi gönderin.'});
        let entry;
        try { entry = validateSuggestion(await readBody(req)); }
        catch (error) { return reply(res,error.status || 400,{error:error.message}); }
        try { await save(entry); }
        catch (error) { console.error('Öneri kaydedilemedi:',error.message); return reply(res,500,{error:'Öneri dosyasına yazılamadı. Formunuz korunuyor, lütfen tekrar deneyin.'}); }
        return reply(res,201,{ok:true,id:entry.id,tarih:entry.tarih});
      }
      if (!['GET','HEAD'].includes(req.method)) return reply(res,405,{error:'İzin verilmeyen yöntem.'});
      let decoded;
      try { decoded = decodeURIComponent(url.pathname); } catch { return reply(res,400,{error:'Geçersiz adres.'}); }
      const target = path.resolve(publicDir,'.'+(decoded === '/' ? '/index.html' : decoded));
      if (!target.startsWith(publicDir + path.sep) || decoded.includes('\\') || decoded.includes('\0')) return reply(res,403,{error:'Erişim yok.'});
      let stat;
      try { stat = await fsp.stat(target); } catch { return reply(res,404,{error:'Dosya bulunamadı.'}); }
      if (!stat.isFile()) return reply(res,404,{error:'Dosya bulunamadı.'});
      res.writeHead(200,{'Content-Type':mime[path.extname(target)] || 'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-cache'});
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(target).on('error',()=>res.destroy()).pipe(res);
    } catch (error) { if (!res.headersSent) reply(res,500,{error:'Beklenmeyen sunucu hatası.'}); else res.destroy(); }
  });
}
if (require.main === module) {
  copyStatic(publicDir);
  const server = createServer();
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || '127.0.0.1';
  server.on('error',error => { console.error(error.code === 'EADDRINUSE' ? `${port} portu kullanımda. PowerShell: $env:PORT=3001; npm start` : error.message); process.exitCode=1; });
  server.listen(port,host,()=>console.log(`İstanbul Edebiyat Haritası hazır: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}\nÖneriler: ${dataFile}\nDurdurmak için Ctrl+C. Dosya değişikliklerinden sonra sunucuyu yeniden başlatın.`));
}
module.exports = { createServer,validateSuggestion };
