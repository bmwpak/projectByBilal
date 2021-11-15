// const puppeteer = require('puppeteer');
// const Location = require('../router/auth');

const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());




const google = 
(async () => {
  const browser = await puppeteer.launch({ headless: false,args:[
    '--start-maximized' // can also use '--start-fullscreen'
 ] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://accounts.google.com/signin/v2/challenge/pwd?service=adwords&passive=1209600&osid=1&continue=https%3A%2F%2Fads.google.com%2Fnav%2Flogin&followup=https%3A%2F%2Fads.google.com%2Fnav%2Flogin&flowName=GlifWebSignIn&flowEntry=ServiceLogin&cid=1&navigationDirection=forward&TL=AM3QAYZ0LBaFmL6kTMmo0GqaXkPnxB2xjXemYaJm-KDdoC3KMKhUw4OjBnqn7vwg');
 
  await page.type('input[aria-label="Email or phone"]','bilal1munawar@gmail.com');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(10000);  

  await page.type('input[type="password"]','alimentunground');
  await page.keyboard.press('Enter');

  

  // await page.type('#inputTextArea', Location);
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
})();

module.exports=google;


// ===================================================

// const puppeteer = require('puppeteer-extra');
// const pluginStealth = require('puppeteer-extra-plugin-stealth'); // Use v2.4.5 instead of latest
// // import * as readline from 'readline';

// puppeteer.use(pluginStealth());

// // Use '-h' arg for headful login.
// const headless = !process.argv.includes('-h');

// // // Prompt user for email and password.
// // const prompt = (query: string, hidden = false): Promise<string> =>
// //   new Promise((resolve, reject) => {
// //     const rl = readline.createInterface({
// //       input: process.stdin,
// //       output: process.stdout,
// //     });
// //     try {
// //       if (hidden) {
// //         const stdin = process.openStdin();
// //         process.stdin.on('data', (char: string) => {
// //           char = char + '';
// //           switch (char) {
// //             case '\n':
// //             case '\r':
// //             case '\u0004':
// //               stdin.pause();
// //               break;
// //             default:
// //               process.stdout.clearLine(0);
// //               readline.cursorTo(process.stdout, 0);
// //               process.stdout.write(query + Array(rl.line.length + 1).join('*'));
// //               break;
// //           }
// //         });
// //       }
// //       rl.question(query, (value) => {
// //         resolve(value);
// //         rl.close();
// //       });
// //     } catch (err) {
// //       reject(err);
// //     }
// //   });

// // Launch puppeteer browser.
// puppeteer.launch({ headless: headless }).then(async (browser) => {
//   console.log('Opening chromium browser...');
//   const page = await browser.newPage();
//   const pages = await browser.pages();
//   // Close the new tab that chromium always opens first.
//   pages[0].close();
//   await page.goto('https://accounts.google.com/signin/v2/challenge/pwd?service=adwords&passive=1209600&osid=1&continue=https%3A%2F%2Fads.google.com%2Fnav%2Flogin%3Fdst%3D%2Faw%2Fhome%3Focid%253D722526198%2526euid%253D532290202%2526__u%253D7949991498%2526uscid%253D722526198%2526__c%253D2191132102%2526authuser%253D0&followup=https%3A%2F%2Fads.google.com%2Fnav%2Flogin%3Fdst%3D%2Faw%2Fhome%3Focid%253D722526198%2526euid%253D532290202%2526__u%253D7949991498%2526uscid%253D722526198%2526__c%253D2191132102%2526authuser%253D0&ltmpl=signin&skipvpage=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&cid=1&navigationDirection=forward&TL=AM3QAYZ9Fr4V6ei8BMC3xFvKpBlZEt8PMhNp8ma4bHiQ0t5t1BoullW6jo_fgTla', { waitUntil: 'networkidle2' });
//   if (headless) {
//     // Only needed if sign in requires you to click 'sign in with google' button.
//     // await page.waitForSelector('button[data-test="google-button-login"]');
//     // await page.waitFor(1000);
//     // await page.click('button[data-test="google-button-login"]');

//     // Wait for email input.
//     await page.waitForSelector('#identifierId');
//     let badInput = true;
  
//     // Keep trying email until user inputs email correctly.
//     // This will error due to captcha if too many incorrect inputs.
//     while (badInput) {
//       const email = await prompt('Email or phone: ');
//       await page.type('#identifierId', 'bilal1munawar@gmail.com');
//       await page.waitFor(1000);
//       await page.keyboard.press('Enter');
//       await page.waitFor(1000);
//       badInput = await page.evaluate(() => document.querySelector('#identifierId[aria-invalid="true"]') !== null);
//       if (badInput) {
//         console.log('Incorrect email or phone. Please try again.');
//         await page.click('#identifierId', { clickCount: 3 });
//       }
//     }
//     const password = await prompt('Enter your password: ', true);
//     console.log('Finishing up...');
//     // Wait for password input
//     await page.type('input[type="password"]', 'alimentunground');
//     await page.waitFor(1000);
//     await page.keyboard.press('Enter');
//     // For headless mode, 2FA needs to be handled here.
//     // Login via gmail app works autmatically.
//   }
// });