// const puppeteer = require('puppeteer');

// (async () => {

//     const locateChrome = require('PUPPETEER_PRODUCT=firefox npm i puppeteer');
// const executablePath = await new Promise(resolve => locateChrome(arg => resolve(arg)));
    
//   const browser = await puppeteer.launch({
//     executablePath, headless: false,args:[
//     '--start-maximized' // can also use '--start-fullscreen'
//  ] });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1366, height: 768});
//   await page.goto('https://www.google.com');

// })();

// import { test } from '@playwright/test';

// beforeEach(async function fn() {
//     this.timeout(20000);
//     browser = await chromium.launch({ headless: false });
    
//     const context = await browser.newContext();
//     page = await context.newPage();
    
//     await page
//       .goto("http://www.google.com", {
//         waitUntil: "networkidle0",
//       });
      
//     await context.addCookies([{name:"csrftoken", value: "mytokenvalue123", url: "http://www.google.com"}]);
//     //   .catch(() => {});
//     });
// const { test, expect } = require('@playwright/test');
    

        // test('Page Screenshot', async ({ page }) => {
        //     const browser = await chromium.launch({ headless: false });
        
        // const context = await browser.newContext();
        // const page1 = await context.newPage();
        
        // await page1
        //   .goto("http://www.google.com", {
        //     waitUntil: "networkidle0",
        //   });
          
        // await context.addCookies([{name:"csrftoken", value: "mytokenvalue123", url: "http://www.google.com"}]);
        
        // });pect(title).toHaveText('Playwright');
          

//           const { test, expect } = require('@playwright/test');

// test('basic test', async ({ page }) => {
//   await page.goto('https://www.google.com/');
// });

const { chromium } = require('@playwright/test')
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();
  const page = await browser.newPage();
  // await page.waitForSelector('.js-cookie-consent-reject')
  // await page.click('.js-cookie-consent-reject')

  // const cookies = {'asasdadasdasdasd'};

  // const deserializedCookies = JSON.parse(cookies)
  // await context.addCookies(deserializedCookies)
``
  // const page = await context.newPage()

  await page.goto(`https://www.google.com`);
  
  // await page.waitForNavigation()
  const add = await context.addCookies([{name:"oye vishal asdasd", value: "mytokenvalue12345678", url: "https://www.google.com"}]);

  const cookies = await context.cookies();
  const cookieJson = JSON.stringify(cookies);

  fs.writeFileSync('cookies.json', cookieJson)
  // const deserializedCookies = JSON.parse(cookies)
  
  // await context.addCookies([{name:"token", value: "mytokenvalue123", url: "https://www.google.com"}]);
  // await page.setCookie(cook);
  // await browser.close()
})()