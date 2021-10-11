const puppeteer = require('puppeteer');
const Location = require('../router/auth');
const path = require('path');

// var Location = path.parse(.replace(/^data:image\/(png|gif|jpeg);base64,/,''));
console.log(Location);
binaryData = new Buffer(Location, 'base64').toString('binary');

console.log(binaryData);

const imageDecoder = 
(async () => {
  const browser = await puppeteer.launch({ headless: false,args:[
    '--start-maximized' // can also use '--start-fullscreen'
 ] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://codebeautify.org/base64-to-image-converter');
 

  await page.type('#inputTextArea', Location);
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
})();

module.exports=imageDecoder;