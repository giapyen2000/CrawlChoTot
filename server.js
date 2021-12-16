const request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
const {
    sequelize,
    Sequelize
} = require('./models');
const models = sequelize.models;

var db = require('./models/index');
db.sequelize.sync();
const fs = require('fs');
const {
    index
} = require('cheerio/lib/api/traversing');
const {
    html
} = require('cheerio/lib/static');

const URL = "https://nha.chotot.com/mua-ban-bat-dong-san";

const Regex = require('regex');
const {
    exec
} = require('child_process');

request(URL, function (err, res, body) {
    let urls = []

    if (err) {
        console.log(err, "error occured while hitting URL ");
    } else {
        const $ = cheerio.load(body);

        $('#__next > div.container.ct-listing > div.styles_listViewWrapper__162PR > div.styles_base__2D2wo > main > div.no-padding.col-md-8.ct-col-8 > div.list-view > div > div:nth-child(2) > ul:nth-child(1) > div').each((index, element) => {
            const href = $(element).find('li > a').attr('href')
            if (href == undefined) {
                console.log(undefined);
            } else {
                const newHref = href.replace('/[object Object]-', 'https://nha.chotot.com/');
                urls.push(newHref)
            }
        })
    }

})


async function getPageData(page) {

    let url = "https://nha.chotot.com/mua-ban-bat-dong-san"
    if (page > 0) {
        url = "https://nha.chotot.com/mua-ban-bat-dong-san" + `?page=${page}`
    }

    let urls = []

    const {
        data
    } = await axios(url)

    const $ = cheerio.load(data);

    $('#__next > div.container.ct-listing > div.styles_listViewWrapper__162PR > div.styles_base__2D2wo > main > div.no-padding.col-md-8.ct-col-8 > div.list-view > div > div:nth-child(2) > ul:nth-child(1) > div').each((index, element) => {
        const href = $(element).find('li > a').attr('href')
        console.log(href);
        if (href == undefined) {
            console.log(undefined);
        } else {
            const newHref = href.replace('/[object Object]-', 'https://nha.chotot.com/');
            urls.push(newHref)
            console.log(urls);
        }
    })

    for (const eachUrl of urls) {
        getListingData(eachUrl)
        break
    }
    // return getPageData(page + 1)
}

async function getListingData(url) {
    const {
        data
    } = await axios(url);

    const $ = cheerio.load(data);
    console.log($.html());


    $('#__next > div.container').each(async (index, element) => {

        // $(element).find('AdImage_sliderWrapper__GkjAp > img').each(async (index, el) => {
        //     console.log(el["attributes"]["src"]);
        // });
        // console.log(img);

        // const address = $(this).find('#address').text()
        // console.log('address: ', address);

        const name = $(element).find('.sc-bdVaJa hOBpFl > span').text();
        // console.log(name);

        const title = $(element).find('.AdDecription_adDecriptionWrapper__36qgN > h1').text();
        // console.log(title);

        const price = $(element).find('.AdDecription_price__O6z15 > span').text()
        //console.log(price);

        const information = $(element).find('.media-middle ').text();
        //console.log(information);

        const content = $(element).find('p.AdDecription_adBody__1c8SG').text();

        // await models.Post.create({
        //     title: title,
        //     img: img,
        //     price: price,
        //     information: information,
        //     content: content
        // });
    })
}

getPageData(0)