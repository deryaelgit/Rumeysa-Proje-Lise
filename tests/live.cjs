const {chromium,expect}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1050}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='https://deryaelgit.github.io/Rumeysa-Proje-Lise/';
  const response=await page.goto(url,{waitUntil:'networkidle',timeout:45000});
  console.log('Canlı HTTP:',response.status());
  await expect(page.locator('.map-marker')).toHaveCount(10);
  await expect(page.locator('.book-card')).toHaveCount(7);
  await expect(page.locator('.place-photo')).toHaveCount(10);
  const broken=await page.locator('.place-photo').evaluateAll(imgs=>imgs.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src));
  if(broken.length)throw Error('Görsel yüklenemedi: '+broken.join(','));
  await page.click('[data-map-style="uydu"]');
  await expect(page.locator('[data-map-style="uydu"]')).toHaveAttribute('aria-pressed','true');
  await page.click('#oneriAc');
  for(const[k,v]of Object.entries({kitap:'Canlı test',yazar:'Test',mekan:'Test',not:'Yalnızca indirme testi'}))await page.locator(`[name="${k}"]`).fill(v);
  const download=page.waitForEvent('download');
  await page.click('#oneriForm [type=submit]');
  console.log('Öneri dosyası:',(await download).suggestedFilename());
  await expect(page.locator('#oneriDurum')).toContainText('Henüz ekibe gönderilmedi');
  await page.keyboard.press('Escape');
  if(errors.length)throw Error(errors.join('\n'));
  console.log('Canlı kontrol başarılı:',url);
  await page.screenshot({path:'test-results/live.png',fullPage:false});
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
