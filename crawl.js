const parse = require('csv-parse/lib/sync');
const {stringify} = require('csv-stringify/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');
// const cron = require('node-cron');

const crawler = async () => {
  try {
    let result1;
    const csv = fs.readFileSync('./csv/data.csv');
    const records = parse(csv.toString('utf-8'));
    const category = records[0][0]
    console.log(category);

    const browser = await puppeteer.launch({headless: true});
    await Promise.all(records.map(async (r,i)=>{

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36');
    
    await page.goto(r[1])
    await page.waitForTimeout(5000);
    // await page.waitForNavigation();
    await page.waitForSelector("[itemprop='itemListElement']");
    for( let a = 0; a < 1000; a++){
      await page.keyboard.press('Tab');
    }
    await page.waitForTimeout(3000);


    const text = await page.evaluate(()=>{
      let data = [];
      let urls = [];
      for( let i = 0; i< document.querySelectorAll("[itemprop='itemListElement']").length; i++){
        let location = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[class='t1jojoys dir dir-ltr']").textContent
        let url_sample = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[itemprop='url']").content
        let url = `https://${url_sample}`
        let price = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[class='a8jt5op dir dir-ltr']").textContent
        let date = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelectorAll("[class='f15liw5s s1cjsi4j dir dir-ltr']")[1].querySelector("[class]").textContent
        let length = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[class='f15liw5s s1cjsi4j dir dir-ltr']").querySelector("[class]").textContent
        let star = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[class= 'ru0q88m dir dir-ltr']").textContent
        let title = document.querySelectorAll("[itemprop='itemListElement']")[i].querySelector("[itemprop='name']").content
        let postId = url_sample.split("rooms/")[1].split("?")[0]
        data.push({title, location, length, date, star, price, url,postId})
        urls.push([1, url]);
      }
      
      return {urls,data};
    })
  
    const {urls, data}= text
    // console.log(data);

    // result.push(data)
    console.log(data.length)
    result1=data


    await page.waitForTimeout(3000);  

    await page.close();
    // console.log(result1);

    const str = stringify(urls);
    fs.writeFileSync('./csv/result.csv',str);

   }))


    await browser.close();
    // console.log(result[0]);
    // console.log('result1',result1)

    return {result1, category};

  }catch(error){
    console.log({errorMessage: error});
  }
}
// crawler();



const crawlerdetails = async () =>{
  try{
    const result = [];
    const csv2 = fs.readFileSync('./csv/result.csv');
    const records2 = parse(csv2.toString('utf-8'));
    const browser = await puppeteer.launch({
      headless: true
    });

  // ????????? ???????????? ??????.
    
  // ???????????? ????????? ????????????.

  for(const [i,r] of records2.entries()){
    // await Promise.all(records2.map(async (r,i)=>{
    const page = await browser.newPage();

    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36');
    // let urlString = 'https://www.airbnb.co.kr/rooms/34043729?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-21&check_out=2022-05-28&federated_search_id=3bfb4c81-6f76-4f3d-87ce-233f8af13b5f&source_impression_id=p3_1645359387_GgDVUVUH%2BJC%2BK6wC'
    // let r[1] = url.parse(urlString, true); // urlString??? ?????? ????????? ??????
    await page.goto(r[1]);

    // ????????? ????????? ???????????? ?????? ????????????. ????????? ?????? ????????? ???????????? ????????? ??????, ???????????? ?????? ?????? ??????????????? ??????????????????.
    await page.waitForTimeout(5000);
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)') // ?????? ?????? ????????? ??????????????? ??????
    // await page.waitForNavigation(),
    // await page.waitForSelector("[class='_1ju7xj0j']")
    await page.waitForTimeout(2000);

    await page.waitForSelector('._1ju7xj0j ._uhxsfg')

    await page.click('._1ju7xj0j ._uhxsfg')
    // await page.click('._1ju7xj0j')

    await page.waitForTimeout(2000);

    for( let l = 0; l <=100; l++){
      await page.keyboard.press('Tab');
    }

    await page.waitForTimeout(1000);
    const [text] = await page.evaluate(()=>{
      let data = [];
      let image = [];
      let score = [];
      
      
      for( let j = 0; j< document.querySelector("[aria-label='?????? ?????? ??????']").querySelectorAll("[class='_skzmvy']").length; j++){
        image.push(document.querySelector("[aria-label='?????? ?????? ??????']").querySelectorAll("[class='_skzmvy']")[j].querySelector('img').src)
      }

      if(document.querySelectorAll("[class='_1s11ltsf']").length){
        for( let k= 0; k< document.querySelectorAll("[class='_1s11ltsf']").length;k++){
          score.push(document.querySelectorAll("[class='_1s11ltsf']")[k].querySelector("[class='_4oybiu']").textContent)
        }
      }

      let hosting = document.querySelector("[class='_14i3z6h']").textContent

      let information0 = document.querySelectorAll("[class='len26si dir dir-ltr']")[0].textContent
      let information1 = document.querySelectorAll("[class='len26si dir dir-ltr']")[1].textContent
      let information2 = document.querySelectorAll("[class='len26si dir dir-ltr']")[2].textContent
      let information3 = document.querySelectorAll("[class='len26si dir dir-ltr']")[3].textContent

      let money = document.querySelector("[class='_ud8a1c']").querySelector("[class='a8jt5op dir dir-ltr']").textContent
      let description = document.querySelector("[class='_12nksyy']").querySelectorAll("[class='c1yo0219 dir dir-ltr']")[3].querySelector("[class='ll4r2nl dir dir-ltr']").innerHTML.replaceAll('<br>','\n').replace('<span class="_1di55y9">','').replace('</span>','');

      if(description== '?????? ????????? ?????? ?????????????????????.'){
        description = document.querySelector("[class='_12nksyy']").querySelectorAll("[class='c1yo0219 dir dir-ltr']")[4].querySelector("[class='ll4r2nl dir dir-ltr']").innerHTML.replaceAll('<br>','\n').replace('<span class="_1di55y9">','').replace('</span>','');
      }

      let information = `${information0} ${information1} ${information2} ${information3}`

      data.push({ image, hosting, information, money, description, score});
      return data;
    })
    let url = r[1]
    let postId = url.split("rooms/")[1].split("?")[0]
    text.postId = postId;
    console.log(text);
    result.push(text);
   
    await page.waitForTimeout(1000);
    await page.close();
}
// }))

  console.log(result);
  await browser.close();
  return result;
} catch (e) {
console.error(e);
}
}
// crawlerdetails();


const test_crawler = async () => {

  try{
    const result = [];
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    await page.goto("https://www.pinterest.co.kr/")

    await page.waitForTimeout(3000); 
    // await page.evaluate('window.scrollTo(0, document.body.scrollHeight)') // ?????? ?????? ????????? ??????????????? ??????
    await page.click("#fullpage-wrapper > div.section.fp-section.active.fp-table.fp-completely > div > div > div.QLY._he.zI7.iyn.Hsu > div > div.Eqh.gjz.hs0.un8.C9i > div.wc1.zI7.iyn.Hsu > button")
    await page.waitForTimeout(3000);

    // document.querySelector('input[name="id"]').value = 'id'; 
    // document.querySelector('input[name="password"]').value = 'pw';

 


    await page.waitForTimeout(3000);
    await page.keyboard.press('Tab');



    await page.waitForTimeout(10000);


    // document.querySelector('input[name="id"]').value = 'id'; 
    // document.querySelector('input[name="password"]').value = 'pw';


    
    // for( let i = 0; i <=20; i++){
    //   await page.keyboard.press('Tab');  
    // }

    await page.waitForTimeout(3000);


    // const text = await page.evaluate(()=>{
    //   const data = [];
    //   if(document.querySelector("[data-testid ='pdp-show-all-reviews-button']")){
 
    //   }
    //   let id1 = 1
    //   let comment = document.querySelector("[data-testid='pdp-reviews-modal-scrollable-panel']").querySelectorAll("[class='r1are2x1 dir dir-ltr']")[1].querySelector("[class='ll4r2nl dir dir-ltr']").textContent


    //   return {image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15}
    
    // })
    // console.log(text);



    await page.close();

    await browser.close();

  } catch (e){
    console.log(e);
  }

}

// test_crawler();

module.exports ={crawler, crawlerdetails}