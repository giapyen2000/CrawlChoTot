const request = require('request');
const axios = require('axios');
const puppeteer = require('puppeteer');
const {
    sequelize,
    Sequelize
} = require('./models');
const models = sequelize.models;

var db = require('./models/index');
db.sequelize.sync();
const fs = require('fs');


const url = "https://nha.chotot.com/mua-ban-bat-dong-san";
(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(url);

    let electronicData = await page.evaluate(() => {
        let products = [];
        let product_wrapper = document.querySelectorAll('.ListAds_ListAds__1z6Pv li a');
        product_wrapper.forEach((e) => {

            try {
                products.push({
                    href: e.getAttribute('href').replace('/[object Object]-', 'https://nha.chotot.com/')
                })

            } catch (err) {
                console.log(err)
            }

        });
        return products;
    });

    console.log(electronicData);
    await browser.close();
})();
// async function getPageData(pageNumber) {
//     const browser = await puppeteer.launch({
//         headless: true
//     });
//     const page = await browser.newPage();
//     await page.goto(url);
//     if (pageNumber > 0) {
//         url = "https://nha.chotot.com/mua-ban-bat-dong-san" + `?page=${pageNumber}`
//     }


//     const urls = await page.evaluate(() => {

//         let data = document.querySelectorAll('.ListAds_ListAds__1z6Pv li a');
//         let urls = [];
//         data.forEach((e) => {
//             try {
//                 urls.push({
//                     href: e.getAttribute('href').replace('/[object Object]-', 'https://nha.chotot.com/')
//                 })
//             } catch (error) {
//                 console.log(error);
//             }
//         })

//         return urls

//     })
//     for (const eachUrl of urls) {
//         await getListingData(eachUrl)
//     }
//     await browser.close()
//     return getPageData(page + 1)

// }

// async function getListingData(url) {
//     //     const {
//     //         data
//     //     } = await axios(url);

//     //     const $ = cheerio.load(data);
//     //     console.log($.html());


//     //     $('#__next > div.container').each(async (index, element) => {

//     //         // $(element).find('AdImage_sliderWrapper__GkjAp > img').each(async (index, el) => {
//     //         //     console.log(el["attributes"]["src"]);
//     //         // });
//     //         // console.log(img);

//     //         // const address = $(this).find('#address').text()
//     //         // console.log('address: ', address);

//     //         const name = $(element).find('.sc-bdVaJa hOBpFl > span').text();
//     //         // console.log(name);

//     //         const title = $(element).find('.AdDecription_adDecriptionWrapper__36qgN > h1').text();
//     //         // console.log(title);

//     //         const price = $(element).find('.AdDecription_price__O6z15 > span').text()
//     //         //console.log(price);

//     //         const information = $(element).find('.media-middle ').text();
//     //         //console.log(information);

//     //         const content = $(element).find('p.AdDecription_adBody__1c8SG').text();

//     //         // await models.Post.create({
//     //         //     title: title,
//     //         //     img: img,
//     //         //     price: price,
//     //         //     information: information,
//     //         //     content: content
//     //         // });
//     //     })
// }

// getPageData(0)