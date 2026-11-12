const {chromium,expect}=require('@playwright/test');
const fs=require('node:fs/promises');
(async()=>{
 const {createServer}=require('../tools/server.cjs');
 const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 let browser;
 try{
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1050},colorScheme:'light'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route(/https:\/\/(tile\.openstreetmap\.org|server\.arcgisonline\.com|services\.arcgisonline\.com)\//,route=>route.abort());
  await page.goto(base,{waitUntil:'networkidle'});
  const marker=page.locator('.leaflet-marker-icon').first();
  const before=await marker.getAttribute('style');
  const map=await page.locator('#harita').boundingBox();
  await page.mouse.move(map.x+map.width*.7,map.y+map.height*.6);
  await page.mouse.wheel(0,-450);
  await expect.poll(()=>marker.getAttribute('style')).not.toBe(before);
  await page.locator('.place-card').first().click();
  await expect(page.locator('.media-thumbs button')).toHaveCount(3);
  await page.locator('[data-photo-select="1"]').click();
  await expect(page.locator('.media-count')).toHaveText('2 / 3');
  await page.locator('.media-main').click();
  await expect(page.locator('#fotografDialog')).toBeVisible();
  await expect.poll(()=>page.locator('#buyukFotograf').evaluate(img=>img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('#fotoSayac')).toHaveText('2 / 3');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#fotoSayac')).toHaveText('3 / 3');
  await page.click('#fotoZoom');
  await expect(page.locator('#fotoZoom')).toHaveAttribute('aria-pressed','true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#fotografDialog')).not.toBeVisible();
  await expect(page.locator('#mekanDialog')).toBeVisible();
  const href=await page.locator('.streetview-link').getAttribute('href');
  const street=new URL(href);if(street.searchParams.get('map_action')!=='pano'||street.searchParams.get('api')!=='1'||!street.searchParams.has('viewpoint'))throw Error('Street View bağlantısı hatalı');
  await page.click('.place-dialog-close');
  await page.click('#temaDegistir');
  for(const size of [{width:1440,height:1050},{width:390,height:844},{width:844,height:390}]){
   await page.setViewportSize(size);
   await page.locator('.place-card').first().click();
   await page.locator('.media-main').click();
   await expect(page.locator('#fotografDialog')).toBeVisible();
   const box=await page.locator('#fotografDialog').boundingBox();
   if(!box||box.y<-.5||box.y+box.height>size.height+.5||box.x<-.5||box.x+box.width>size.width+.5)throw Error('Büyük fotoğraf ekran sınırını aşıyor');
   await expect(page.locator('#fotoKapat')).toBeVisible();
   await expect(page.locator('#fotoLisans')).not.toBeEmpty();
   await page.click('#fotoSonraki');
   await expect(page.locator('#fotoSayac')).toHaveText('2 / 3');
   await fs.mkdir('test-results',{recursive:true});
   await page.screenshot({path:`test-results/gallery-${size.width}.png`});
   await page.click('#fotoKapat');
   await page.click('.place-dialog-close');
  }
  if(errors.length)throw Error(errors.join('\n'));
  console.log('Galeri testi başarılı: fareyle harita zoom, fotoğraf seçimi, büyütme, klavye, 360 bağlantısı, koyu tema ve mobil sınırlar.');
 }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
