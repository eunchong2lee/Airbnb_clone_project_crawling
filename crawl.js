const parse = require('csv-parse/lib/sync');
const {stringify} = require('csv-stringify/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');
const url = require('url');
// require('puppeteer-for-crawling')

// const csv = fs.readFileSync('./csv/data.csv');

// const records = parse(csv.toString('utf-8'));
// console.log(records);
// console.log(records[0][1])
// console.log(records[0][0])

// console.log(records);

// #site-content > div.f1mkluj0.dir.dir-ltr > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div.c1l1h97y.dir.dir-ltr > div > meta:nth-child(3)
// #site-content > div.f1mkluj0.dir.dir-ltr > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div.c1l1h97y.dir.dir-ltr > div > meta:nth-child(3)
// #site-content > div.f1mkluj0.dir.dir-ltr > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div.c1l1h97y.dir.dir-ltr > div > meta:nth-child(3)

const crawler = async () => {
  try {
    const csv = fs.readFileSync('./csv/data.csv');
    const records = parse(csv.toString('utf-8'));

    const result = [];
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log(records);


    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36');
    

    await page.goto(records[0][1])
   
    // console.log(hotels);
    await page.waitForSelector("[itemprop='itemListElement']");
    
    // const chk= await page.evaluate(()=>{
    //   const check =document.querySelectorAll("[itemprop='itemListElement']");
    //   for(let i=0; i<check.length; i++){
    //     check[i].click("[class='_1d3iagv']")
    //   }
    // })


    // await page.querySelectorAll("[itemprop='itemListElement']").click("[class='_1d3iagv']")
    // await page.querySelectorAll("[itemprop='itemListElement']").click("[class='_1d3iagv']")
    // await page.querySelectorAll("[itemprop='itemListElement']").click("[class='_1d3iagv']")
    // await page.querySelectorAll("[itemprop='itemListElement']").click("[class='_1d3iagv']")
    // await page.querySelectorAll("[itemprop='itemListElement']").click("[class='_1d3iagv']")
    



    // document.querySelectorAll("[class='_1d3iagv']")
    const text = await page.evaluate(()=>{
      const root =document.querySelectorAll("[itemprop='itemListElement']");
      let data = [];
      let urls = [];
      if(root.length){
        root.forEach((v)=>{

          let location = v.querySelector("[class='t1jojoys dir dir-ltr']").textContent
          let url_sample = v.querySelector("[itemprop='url']").content
          let url = `https://${url_sample}`
          let price = v.querySelector("[class='a8jt5op dir dir-ltr']").textContent
          let date = v.querySelectorAll("[class='f15liw5s s1cjsi4j dir dir-ltr']")[1].querySelector("[class]").textContent
          let length = v.querySelector("[class='f15liw5s s1cjsi4j dir dir-ltr']").querySelector("[class]").textContent
          let star = v.querySelector("[class= 'ru0q88m dir dir-ltr']").textContent
          let title = v.querySelector("[itemprop='name']").content
          // let category = records[0][0]
        
          data.push({title, location, length, date, star, price, url});
          urls.push([title, url]);
        })
      }
      // document.querySelectorAll("[itemprop='itemListElement']").querySelector("[class='c14whb16 dir dir-ltr']").querySelectorAll("[class='_1h6n1zu']")[0].querySelector("[srcset]").getAttribute('srcset')
      // hotels = root.map(hotel => {
      //   url : hotel.querySelector("[itemprop='url']").content
      // })
      return {urls,data};
      
     
      
      
      // document.querySelectorAll("[itemprop='itemListElement']")[0].querySelector("[itemprop='url']").content

    })
  
    const {urls, data}= text
    // console.log(data);
    console.log(data);
    await page.waitForTimeout(3000);
    await page.close();

    const str = stringify(urls);
    fs.writeFileSync('./csv/result.csv',str);


    await browser.close();

    return {data, category: records[0][0]};

  }catch(error){
    console.log({errorMessage: error});
  }
}
// crawler();


// console.log(records2);



const crawlerdetails = async () =>{
  try{
    const result = [];
    const csv2 = fs.readFileSync('./csv/result.csv');
    const records2 = parse(csv2.toString('utf-8'));
    const browser = await puppeteer.launch({
      headless: false
    });

  // 새로운 페이지를 연다.
    const page = await browser.newPage();
  // 페이지의 크기를 설정한다.

  for(const [i,r] of records2.entries()){
    // let urlString = 'https://www.airbnb.co.kr/rooms/34043729?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-21&check_out=2022-05-28&federated_search_id=3bfb4c81-6f76-4f3d-87ce-233f8af13b5f&source_impression_id=p3_1645359387_GgDVUVUH%2BJC%2BK6wC'
    // let r[1] = url.parse(urlString, true); // urlString을 객체 형태로 파싱
    // console.log(r);
    await page.goto(r[1]);
    // 페이지 로딩이 되기까지 잠시 기다린다. 테스트 중인 기기의 사양이나 인터넷 속도, 웹서버의 속도 따라 경험적으로 테스트해야함.
    await page.waitForTimeout(10000); 
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)') // 숙소 내부 페이지 최하단으로 이동
    await page.click("[class='_1ju7xj0j']")
    await page.waitForTimeout(3000);

    for( let l = 0; l <=100; l++){
      await page.keyboard.press('Tab');
    }

    await page.waitForTimeout(10000);
    let url = r[1]
    const [text] = await page.evaluate(()=>{
      let data = [];
      let image = [];
      
      for( let j = 0; j< document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']").length; j++){
        image.push(document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[j].querySelector('img').src)
      }
      // let image1= document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[1].querySelector('img').src
      // let image2 =document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[2].querySelector('img').src
      // let image3 =document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[3].querySelector('img').src
      // let image4 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[4].querySelector('img').src
      // let image5 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[5].querySelector('img').src
      // let image6= document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[6].querySelector('img').src
      // let image7 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[7].querySelector('img').src
      // let image8 =document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[8].querySelector('img').src
      // let image9 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[9].querySelector('img').src
      // let image10 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[10].querySelector('img').src
      // let image11= document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[11].querySelector('img').src
      // let image12 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[12].querySelector('img').src
      // let image13 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[13].querySelector('img').src
      // let image14 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[14].querySelector('img').src
      // let image15 = document.querySelector("[aria-label='숙소 사진 투어']").querySelectorAll("[class='_skzmvy']")[15].querySelector('img').src
      let hosting = document.querySelector("[class='_14i3z6h']").textContent
      let information0 = document.querySelectorAll("[class='len26si dir dir-ltr']")[0].textContent
      let information1 = document.querySelectorAll("[class='len26si dir dir-ltr']")[1].textContent
      let information2 = document.querySelectorAll("[class='len26si dir dir-ltr']")[2].textContent
      let information3 = document.querySelectorAll("[class='len26si dir dir-ltr']")[3].textContent
      let money = document.querySelector("[class='_ud8a1c']").querySelector("[class='a8jt5op dir dir-ltr']").textContent
      let description = document.querySelector("[class='_12nksyy']").querySelectorAll("[class='c1yo0219 dir dir-ltr']")[4].querySelector("[class='ll4r2nl dir dir-ltr']").innerHTML.replaceAll('<br>','\n').replace('<span class="_1di55y9">','').replace('</span>','');

    

      let information = `${information0} ${information1} ${information2} ${information3}`

      // result.push([title, image, hosting, information, money])
      data.push({ image, hosting, information, money, description});
      return data;
    })
    // console.log(text);
    text.url = url;
    console.log(text);
    result.push(text);
    // console.log(text);
    
    

    await page.waitForTimeout(3000);

    // await Homes.create(homeInfo);
    // console.log(homeInfo);
   
    await page.waitForTimeout(3000);
}
  await page.close();
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

    await page.goto("https://www.airbnb.co.kr/rooms/39164017?adults=1&category_tag=Tag%3A675&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-06-21&check_out=2022-06-26&federated_search_id=5a8ddc47-8c80-42d7-96b1-4b477b245033&source_impression_id=p3_1655767134_unYApdtndB0%2FNQl5")

    await page.waitForTimeout(10000); 
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)') // 숙소 내부 페이지 최하단으로 이동
    await page.click("[data-testid ='pdp-show-all-reviews-button']")
    await page.waitForTimeout(3000);
    

    // await page.waitForSelector('.modal', { visible: true });
    // await page.waitForNavigation();

    // await page.focus('._1gjkp1');
    // await page.click("[class='_1xh26pm2']")
    for( let i = 0; i <=20; i++){
      await page.keyboard.press('Tab');
    }

    await page.waitForTimeout(10000);


    const text = await page.evaluate(()=>{
      const data = [];
      if(document.querySelector("[data-testid ='pdp-show-all-reviews-button']")){
 
      }
      let id1 = 1
      let comment = document.querySelector("[data-testid='pdp-reviews-modal-scrollable-panel']").querySelectorAll("[class='r1are2x1 dir dir-ltr']")[1].querySelector("[class='ll4r2nl dir dir-ltr']").textContent


      return {image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15}
    
    })
    console.log(text);



    await page.close();

    await browser.close();

  } catch (e){
    console.log(e);
  }

}

// test_crawler();

module.exports ={crawler, crawlerdetails}