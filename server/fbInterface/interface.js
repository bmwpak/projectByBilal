// //*[@id="CONVERSIONS"]/div/div[1]/div/input
// edit age
//
// #campaignTargetingSection > div > div > div > div > div._ww_ > div > div > div > div._7rv4 > div:nth-child(1) > div > div > div:nth-child(4) > div > div > div > div > div > div._21op > div > div > div._7yfk > div > div > span


// image
// 



const puppeteer = require('puppeteer');

const newFbCampData = require('../router/auth');

console.log(newFbCampData.AdName);

function evaluateRules() {
  var ruleset = OpenAjax.a11y.RulesetManager.getRuleset("ARIA_STRICT");
  var evaluator_factory = OpenAjax.a11y.EvaluatorFactory.newInstance();
  evaluator_factory.setParameter('ruleset', ruleset);
  evaluator_factory.setFeature('eventProcessing', 'fae-util');
  evaluator_factory.setFeature('groups', 7);
  var evaluator = evaluator_factory.newEvaluator();
  var evaluation = evaluator.evaluate(window.document, document.title, document.location.href);
  // var out = evaluation.toJSON(true);
  return;
}

const fb = 
(async (e) => {
  // console.log(newFbCampData);
  const browser = await puppeteer.launch({
    headless: false,
    args:[
       '--start-maximized' // can also use '--start-fullscreen'
    ]}
    );
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://business.facebook.com/login/?next=https%3A%2F%2Fbusiness.facebook.com%2F');
  await page.type('#email',process.env.FBMAIL);
  await page.type('#pass',process.env.FBPASS);
  for(var i=0 ; i<=newFbCampData.demographics.length;i++){

    console.log(newFbCampData.demographics[i]);

  // await page.click('input[placeholder="Add demographics, interests or behaviors"]');

  // await page.type('input[placeholder="Add demographics, interests or behaviors"]','calisthenics');
  
  // await page.waitForTimeout(2000);
  // await page.keyboard.press('Enter');
  }


  
  await Promise.all([
      page.waitForNavigation(),
    page.click('#loginbutton')
  ]);


  await page.goto('https://business.facebook.com/adsmanager/manage/?nav_entry_point=lep_123&nav_source=lwi_ad_center');
  
  const create = await page.waitForXPath('//*[@id="pe_toolbar"]/div/div/div/div[1]/div/div[1]');
  await create.click() ;


  // campaign type
  if(newFbCampData.selection == 'Brand Awareness'){
  const campaignObjective = await page.waitForXPath('//*[@id="BRAND_AWARENESS"]/div/div[1]/div/input');
  await campaignObjective.click();
  }else if(newFbCampData.selection == 'Traffic'){
    const campaignObjective = await page.waitForXPath('//*[@id="LINK_CLICKS"]/div/div[1]/div/input');
  await campaignObjective.click();
  }else if(newFbCampData.selection == 'Engagement'){
    const campaignObjective = await page.waitForXPath('//*[@id="SOCIAL_INTERACTION"]/div/div[1]/div/input');
  await campaignObjective.click();

    if(newFbCampData.engagement == 'Post engagement'){
      const engagementType = await page.waitForSelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div:nth-child(2) > div > div.dhycqfdu > div.ol91lf0t > div > div._89nb > div > div._3qn7._61-0._2fyh._3qnf > div:nth-child(1) > div._7_ol._3qn7._61-0._2fyi._3qng > div > div');
      await engagementType.click();
    }else if(newFbCampData.engagement == 'Page likes'){
      const engagementType = await page.waitForSelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div:nth-child(2) > div > div.dhycqfdu > div.ol91lf0t > div > div._89nb > div > div._3qn7._61-0._2fyh._3qnf > div:nth-child(2) > div._7_ol._3qn7._61-0._2fyi._3qng > div > div');
      await engagementType.click();
    }

  }else if(newFbCampData.selection == 'Video Views'){
    const campaignObjective = await page.waitForXPath('//*[@id="VIDEO_VIEWS"]/div/div[1]/div/input');
    await campaignObjective.click();
  }else if(newFbCampData.selection == 'Lead Generation'){
    const campaignObjective = await page.waitForXPath('//*[@id="LEAD_GENERATION"]/div/div[1]/div/input');
    await campaignObjective.click();
  }else if(newFbCampData.selection == 'Messages'){
    const campaignObjective = await page.waitForXPath('//*[@id="MESSAGES"]/div/div[1]/div/input');
    await campaignObjective.click();
  }else if(newFbCampData.selection == 'Conversions'){
    const campaignObjective = await page.waitForXPath('//*[@id="CONVERSIONS"]/div/div[1]/div/input');
    await campaignObjective.click();
  }
  
  const cont = await page.waitForXPath('//*[@id="facebook"]/body/div[5]/div[2]/div/div/div/div/div[1]/div/div[3]/span[2]/div/div[2]/button/div/div');
  await cont.click();

  const campaignName = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div[1]/div[1]/div/div/div/div/div/div/div/div/div/div/div[1]/div[2]/span');
  await campaignName.click({clickCount:3});
  await campaignName.type(newFbCampData.CampaignName);

  const onBudgetOptimization = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div[1]/div[5]/div/div/div/div/div[1]/div/div/div[2]/div/div');
  await onBudgetOptimization.click();

  const next = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[2]/div/div/div/div/div[2]/div/div/button/div/div');
  await next.click();

  const adsetName = await page.waitForXPath('//*[@id="campaignNameSection"]/div/div/div/div/div/div/div/div/div/div/div/div[1]/div[2]/span');
  await adsetName.click({clickCount:3});
  await adsetName.type(newFbCampData.AdsetName);



//=============================
date = new Date(newFbCampData.date);
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
hour = date.getHours();

let Am_Pm = 'AM';

if(hour > 12){
  
  hour = '0'+hour-12;
  Am_Pm = 'PM';
}

min = date.getMinutes();



console.log(year+'-' + month + '-'+dt + '-' + hour + '-' + min);


//========================================
 

  const selectors = await page.$$('input[placeholder="mm/dd/yyyy"]');
  await selectors[0].click();
  await selectors[0].type( month +'-'+ dt + '-' +year );

  const setHours = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[1]/div');
  await setHours.click({clickCount:1});
  await setHours.type(hour.toString() , { delay: 500});

  const setMin = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[2]/div');
  await setMin.click({clickCount:3});
  await setMin.type(min.toString());

  const setAm = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[3]/div');
  await setAm.click({clickCount:2});
  await setAm.type(Am_Pm);

  //----------------end time selection---------------------------

  // const clickEndDate = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/div[2]/div/div[1]/div/div');
  // await clickEndDate.click({clickCount:4});

  // const selectors1 = await page.waitForSelector('#js_m1');
  // await selectors1.click();
  // await selectors1.type('06-09-2022');

  // await page.type(' div._3qn7._61-0._2fyh._3qnf > div > span > div > div > span','06-09-2022');

  // const setEndHours = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[1]');
  // await setEndHours.click({clickCount:3});
  // await setEndHours.type('8');

  // const setEndMin = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[2]');
  // await setEndMin.click({clickCount:3});
  // await setEndMin.type('53');

  // const setEndAm = await page.waitForXPath('//*[@id="campaignBasicSection"]/div/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/div/div[2]/div/span[1]/div/div/div/div[1]/div[2]/div[3]');
  // await setEndAm.click({clickCount:3});
  // await setEndAm.type('AM');

//--------------------------------------------------------------------

try{const editLocationClick = await page.waitForXPath('//*[@id="campaignTargetingSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/span');

  await editLocationClick.click();
}
catch(error){console.log(error);}

const cancelLocation = await page.waitForXPath('//*[@id="LOCATION"]/div[2]/div[1]/ul/li/ul/li[1]/div/div[2]/span/button/span[2]/i');
await cancelLocation.click();

// select location

 await page.type('input[placeholder="Search Locations"]',newFbCampData.location);
 
 await page.waitForTimeout(5000);
 await page.keyboard.press('Enter');

// select age

  try{const editAge = await page.waitForXPath('//*[@id="campaignTargetingSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div/div[4]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/span');
  
  await editAge.click();}
    catch(error){console.log(error);}
  
  
  const startAge = await page.waitForXPath('//*[@id="AGE"]/div/div/div/div[2]/div/span[1]/span/span');
  await startAge.click();
  await page.click('div[value="'+ newFbCampData.startAge +'"]');

  const endAge = await page.waitForXPath('//*[@id="AGE"]/div/div/div/div[4]/div/span[1]/span/span');
  await endAge.click();
  await page.click('div[value="'+ newFbCampData.endAge +'"]');

  // select gender

  try{const editLanguage = await page.waitForXPath('//*[@id="campaignTargetingSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div/div[5]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/span');
  
  await editLanguage.click();}
  catch(error){console.log(error);}

  if(newFbCampData.gender == 'All'){
    const selectGender = await page.waitForXPath('//*[@id="GENDER"]/div/div/div/div/div[1]/div[1]/div/div');
    await selectGender.click();
  }else if(newFbCampData.gender == 'Men'){
    const selectGender = await page.waitForXPath('//*[@id="GENDER"]/div/div/div/div/div[2]/div[1]/div/div');
    await selectGender.click();
  }else if(newFbCampData.gender == 'Women'){
   const selectGender = await page.waitForXPath('//*[@id="GENDER"]/div/div/div/div/div[3]/div[1]/div/div');
   await selectGender.click();
  }

  // detailed targeting

  try{
  const clickInput = await page.waitForXPath('//*[@id="DETAILED"]/div/div/div[2]/div/div/i');
  
  await clickInput.click();
  }catch(error){console.log(error);}  

  for(var i=0 ; i<newFbCampData.demographics.length-1;i++){
    if(newFbCampData.demographics[i] == ''){
      console.log('demographic no. '+i+'is empty');
    }else{
      await page.click('input[placeholder="Add demographics, interests or behaviors"]');

      await page.type('input[placeholder="Add demographics, interests or behaviors"]',newFbCampData.demographics[i]);
      
      await page.waitForTimeout(4000);
      await page.keyboard.press('Enter');
    }
  }
// select language  

  
try{
  const clickInput = await page.waitForXPath('//*[@id="campaignTargetingSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div/div[7]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/span');
  
  await clickInput.click();
  }catch(error){
    console.log(error);} 


await page.type('input[placeholder="Search Languages"]','english');

await page.waitForTimeout(1000);
// await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');

//auto replacement


const autoReplacement = await page.waitForXPath('//*[@id="campaignPlacementSection"]/div/div/div/div/div[2]/div/div/div/div[2]/div[1]/div/div/div[1]/div[1]/div');
 await autoReplacement.click();

 // move to ad name page

 const toAdname = await page.waitForXPath('//*[@id="AdsPECampaignEditor"]/div/div[2]/div/div/div/div/div[2]/div/div[2]/button');
 await toAdname.click();

 // ad name

 const adName = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div[1]/div[2]/span');
 await adName.click({clickCount:3});
 await adName.type(newFbCampData.AdName);

 
   // select facebook page

  const optionSelection = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[2]/div/div/div[2]/div/div/div/div/div/div[1]/div[2]/div/div[2]/span');
  await optionSelection.click();
  await page.click('input[placeholder="Search by Page name or ID"]');
  await page.type('input[placeholder="Search by Page name or ID"]','Multi-ad');
  await page.keyboard.press('Enter');

  // try{
 // add media

 const clickAddMedia = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div/div/div/div[2]/div/div/div[3]/div/span[1]/div');
 await clickAddMedia.click();

 await page.click('li[role="menuitem"]','Add Image');

 // upload file if any file not uploaded

 
const [fileChooser] = await Promise.all([
  page.waitForFileChooser(),
  page.click('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.hmqwj350.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.diwav8v6.f3aw7s6y > div > div > div.pyd2nkot.adkrixjq.my9zkn4v.tds9wb2m > div.rwb8dzxj.diwav8v6.lftrkhxp > div.yukb02kx > div > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div.aqz1cesy.e1ri8yhr.hp07fi59.pesago7c.b6ewvobd > div > div > div > div > div:nth-child(1) > div > div.if5qj5rh.tb4cuiq2.kojzg8i3 > div')  
]);
await fileChooser.accept(['/Users/IT Soloutions/Desktop/pva4you/pp.png']);



  const selectImage = await page.waitForXPath('//*[@id="facebook"]/body/div[8]/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div/div/div/div/div[4]/div[1]/div/div/div[1]/span/div/div');

  await selectImage.click();
  // }
  // catch(error){console.log("==============================="+error+"===============================");}

// try{
//   const clickAddMedia = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div/div/div/div[2]/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[2]/div/div/div[2]/ul/div/div');
//   await clickAddMedia.click();
 
//   // await page.click('li[role="menuitem"]','Change Media');

//   const changeMedia = await page.waitForSelector('#js_o4');
//   await changeMedia.click();
//   // upload file if already loaded
 
//   const upload = await page.waitForSelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.hmqwj350.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.diwav8v6.f3aw7s6y > div > div > div.pyd2nkot.adkrixjq.my9zkn4v.tds9wb2m > div.rwb8dzxj.diwav8v6.lftrkhxp > div.yukb02kx > div > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div.aqz1cesy.e1ri8yhr.hp07fi59.pesago7c.b6ewvobd > div > div > div > div > div:nth-child(1) > div > div');

//   const [fileChooser2] = await Promise.all([
//     page.waitForFileChooser(),
//     upload.click()  
//   ]);
//   await fileChooser2.accept(['/Users/IT Soloutions/Desktop/pva4you/pva.jpg']);

//  page.waitForTimeout(10000);

//   const selectImage = await page.waitForXPath('//*[@id="facebook"]/body/div[8]/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div/div/div/div[4]/div[1]/div/div/div[1]/div/div/div[1]/div/div/img');

//   await selectImage.click();
// }catch(error){console.log(error+"================================================================");}
 




//   // to crop

//   const toCrop = await page.waitForXPath('//*[@id="facebook"]/body/div[8]/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[3]/div/div[3]/div');
//   await toCrop.click();

//   // to optimize

//   const toOptimize = await page.waitForXPath('//*[@id="facebook"]/body/div[8]/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[3]/div/div[3]/div/span/div/div/div');
//   await toOptimize.click();

//   // image-selection completed

//   const done = await page.waitForXPath('//*[@id="facebook"]/body/div[8]/div[2]/div/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[3]/div/div[3]/div/span/div/div/div');
//   await done.click();

//   // page.waitForTimeout(5000);

//     // primary text


//   const primaryText = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div/div/div/div[3]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div/div/div/div');
//   await primaryText.click();
//   await primaryText.type('Primary Text');

//   // Headline

//   const inputs = await page.$$('textarea[dir="auto"]');

//   await inputs[0].type('Headline');

//   // Description

//   await inputs[1].type('Description');

//   // call to action

//   const callToAction = await page.waitForXPath('//*[@id="ads_pe_container"]/div[1]/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div/div/div/div[3]/div/div/div[6]/div/div/div/div/div/div[2]/div/div[2]');
//   await callToAction.click();

//   const callToActionSelect = await page.$$('div[role="menuitemradio"]');

//   await callToActionSelect[13].click();

//   // website URL

//   await inputs[2].type('www.google.com');

//   // url parameters

//   const urlParameter = await page.waitForSelector('#ads_pe_container > div:nth-child(1) > div > div > div._2ww2 > div > div._49wu > div._2k0c._96v5._8_1l > div._2k0g > div > div._22s_._7ayd._8z1m > div > div > div > div._8y-d > div > div > div:nth-child(2) > div > div._3qn7._61-0._2fyi._1a9e > div._6g3g._1q-5 > div > div:nth-child(2) > div:nth-child(6) > div > div > div._ww_ > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > a', {visible: true});
//   await urlParameter.click();

//   // campaign source

//   const parameters = await page.$$('input[placeholder="Select a dynamic parameter or enter a value"]');

//   await parameters[0].type('Facebook');

//   // Campaign Medium

//   await parameters[1].type('Advertising');

//   // Campaign Name

//   await parameters[2].type('{{campaign.name}}');

//   // Campaign Content

//   await parameters[3].type('{{ad.name}}');

//   // apply

//   // await page.click('div[role="none"]');

//   const apply = await page.waitForSelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.a53abz89.rgsc13q7.dfy4e4am.rwb8dzxj.diwav8v6.hkvtgs2m.apktr6ye.tlhxvphw.s1aoc7nz.q72jrxl3.k1bdusab.mk3evetr.nlmdo9b9 > div > div:nth-child(3) > div > span > div > div');
//   await apply.click();

  console.log("pressed");
  await page.screenshot({ path: 'example.png' });

  page.evaluate(evaluateRules);
//   await browser.close();
})();
;
module.exoorts = fb;