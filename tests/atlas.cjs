const {chromium,expect}=require('@playwright/test');
const {createServer}=require('../tools/server.cjs');
const fs=require('node:fs/promises');
(async()=>{
 const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route(/https:\/\/.*(?:tile|arcgisonline).*/,r=>r.abort());
  await page.goto(process.env.ATLAS_TEST_URL||`http://127.0.0.1:${server.address().port}`,{waitUntil:'domcontentloaded'});
  await expect(page.locator('.place-card')).toHaveCount(10);
  await page.selectOption('#kitapSecim','Huzur');await expect(page.locator('#historyBook')).toContainText('1949');
  await page.check('#historyToggle');await expect(page.locator('.historical-overlay')).toBeVisible();
  await expect.poll(()=>page.locator('.historical-overlay').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
  await page.locator('#historySlider').fill('30');await expect(page.locator('.historical-overlay')).toHaveCSS('opacity','0.3');
  await page.uncheck('#historyToggle');await expect(page.locator('.historical-overlay')).toHaveCount(0);
  await page.click('#sifirlaBtn');await page.selectOption('#moodMode','mood');await expect(page.locator('.map-marker').first()).toContainText('◇');
  await page.locator('.place-card').first().click();await expect(page.locator('.mood-badge')).toContainText('Hafıza');
  await expect(page.locator('#soundPlay')).toHaveAttribute('aria-pressed','false');await page.click('#soundPlay');await expect(page.locator('#soundPlay')).toHaveAttribute('aria-pressed','true');
  await page.selectOption('#soundKind','ferry');await expect(page.locator('#soundPlay')).toHaveAttribute('aria-pressed','false');
  await page.click('#soundPlay');await page.keyboard.press('Escape');await expect.poll(()=>page.evaluate(()=>window.AtlasSound.isPlaying())).toBe(false);
  await page.click('#walkGuide summary');await expect(page.locator('#walkMetrics')).toContainText('km');await expect(page.locator('#walkStops li')).toHaveCount(5);
  await page.check('#walkToggle');await expect(page.locator('.walk-marker')).toHaveCount(5);
  const download=page.waitForEvent('download');await page.click('#walkGpx');const file=await download;const xml=await fs.readFile(await file.path(),'utf8');if(!xml.includes('<trkpt')||!xml.includes('http://www.topografix.com/GPX/1/1'))throw Error('Geçersiz GPX');
  await expect(page.locator('#walkMaps')).toHaveAttribute('href',/travelmode=walking/);
  await page.uncheck('#walkToggle');await expect(page.locator('.walk-marker')).toHaveCount(0);
  await page.setViewportSize({width:390,height:844});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobil yatay taşma');
  await page.emulateMedia({colorScheme:'dark'});await page.locator('#atlasTools').screenshot({path:'test-results/atlas-mobile.png'});
  if(errors.length)throw Error(errors.join('\n'));console.log('Atlas kontrolü başarılı: gerçek harita, kaydırıcı, yıl, duygu, ses yaşam döngüsü, yaya mesafesi, beş durak, GPX ve mobil.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
