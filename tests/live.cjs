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
  await page.click('#temaDegistir');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.locator('.place-card').first().click();
  await expect(page.locator('#mekanDialog')).toBeVisible();
  await expect(page.locator('.media-thumbs button')).toHaveCount(3);
  await page.locator('.media-main').click();
  await expect(page.locator('#fotografDialog')).toBeVisible();
  await page.click('#fotoSonraki');
  await expect(page.locator('#fotoSayac')).toHaveText('2 / 3');
  await expect(page.locator('#fotoLisans')).not.toBeEmpty();
  await page.click('#fotoKapat');
  await expect(page.locator('.streetview-link')).toHaveAttribute('href',/map_action=pano/);
  await page.locator('#mekanDialog .detail-maps').scrollIntoViewIfNeeded();
  await page.locator('.place-dialog-close').click();
  await expect(page.locator('#oneriAc')).toHaveAttribute('href','https://docs.google.com/forms/d/e/1FAIpQLSdulWBurif7l4TCnujkntKR_rEZ3Ng2lkPhamHIgIOFUxL8Ug/viewform');
  await expect(page.locator('#oneriAc')).toHaveAttribute('target','_blank');
  await expect(page.locator('#oneriDialog')).not.toBeVisible();
  if(errors.length)throw Error(errors.join('\n'));
  console.log('Canlı kontrol başarılı:',url);
  await page.screenshot({path:'test-results/live.png',fullPage:false});
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
