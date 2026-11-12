const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const files = ['index.html','style.css','script.js','core.js','mekanlar.js','favicon.svg','stand.html','stand.js'];
function copyStatic(target, staticMode = false) {
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target,'runtime-config.js'),`window.ATLAS_CONFIG = ${JSON.stringify({suggestions:staticMode ? 'download' : 'server'})};\n`);
  fs.writeFileSync(path.join(target,'.nojekyll'),'');
  files.forEach(file => fs.copyFileSync(path.join(root,file), path.join(target,file)));
  fs.cpSync(path.join(root,'kitaplar'),path.join(target,'kitaplar'),{recursive:true});
  fs.cpSync(path.join(root,'fotograflar'),path.join(target,'fotograflar'),{ recursive:true });
  fs.mkdirSync(path.join(target,'vendor','leaflet'), {recursive:true});
  fs.cpSync(path.join(root,'node_modules','leaflet','dist'),path.join(target,'vendor','leaflet'),{recursive:true});
  fs.copyFileSync(path.join(root,'node_modules','qrcode-generator','qrcode.js'),path.join(target,'vendor','qrcode.js'));
}
if (require.main === module) {
  const data = require('../mekanlar.js');
  const errors = require('../core.js').validate(data);
  if (errors.length) throw new Error(errors.join('\n'));
  copyStatic(path.join(root,'dist'),process.env.STATIC_HOSTING === '1');
  console.log('Statik dosyalar dist/ klasörüne hazırlandı. Dosyaya öneri kaydı için npm start sunucusu gereklidir.');
}
module.exports = { copyStatic, root };
