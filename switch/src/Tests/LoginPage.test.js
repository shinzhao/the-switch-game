const puppeteer = require('puppeteer');

test('should fill username', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3000/app/login'
  );
  await page.click()
  await page.click('#normal_login_userName');
  await page.type('#normal_login_userName', 'jariclnnf');
  await page.click('#normal_login_password');
  await page.type('#normal_login_password', 'Test1234!');
  await page.click('.login-form-button');
  await page.waitFor(30000);
  browser.close();
  
},1000000);

  