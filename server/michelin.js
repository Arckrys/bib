const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();

  return {name, experience};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

const parse_bib = data => {
  const $ = cheerio.load(data);
  const rows = $('.restaurant__list-row > div');
  const listURL = []

  rows.each(function (){
    if($(this).attr('class') == "col-md-6 col-lg-6 col-xl-3" ){
      const resturl = "https://guide.michelin.com" + $(this).find('.card__menu-content--title > a').attr("href") +"/";
      const restname = $(this).find('.card__menu-content--title').text().replace('\n',' ').trim();

      listURL.push({
        name: restname,
        url: resturl,
      })
    }
  })


  return listURL;
}

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async url => {
  const response = await axios(url);
  const {data, status} = response;
  const $ = cheerio.load(data);
  const dataCount = parseInt($('.flex-fill.js-restaurant__stats >h1').text().replace('1-40',' ').replace('sur',' ').replace('restaurants', ' ').trim());
  console.log(dataCount);
  const numberOfPages = (dataCount / 40) +1;
  const responselist = [];

  for(let i = 14; i<numberOfPages; i++ ){
    const url2 = url + "/page/" + i;
    const response = await axios(url2);
    const {data, status} = response;
    const $ = cheerio.load(data);

    if (status >= 200 && status < 300) {
      const list = parse_bib(data);
      console.log("reading page "+ (i+1));
      for(let j = 0; j< list.length; j++){
        const response2 = await axios(list[j].url);
        const {data, status} = response2;
        const $ = cheerio.load(data);


        if(status >= 200 && status <300) {
          const desc = $('.js-show-description-text > p').text();
          const listad = $('.restaurant-details__heading.d-none.d-lg-block').text().replace(/\n/g,' ').replace('Guide MICHELIN 2020',' ').replace(list[j].name,' ').replace('=',' ').replace('•',' ').trim().split("  ");
          const info = [];
          for(let k = 0; k < listad.length; k++){
            if(listad[k] != ''){
              info.push(listad[k].trim())
            }
          }
          responselist.push({
            name : list[j].name,
            url : list[j].url,
            adresse : info[0],
            pricing : (parseInt(info[1]) + parseInt(info[3]))/2 +" "+ info[4],
            type : info[5],
            description : desc
          })
        }
      }
      console.log("page "+ (i+1) +" has been read");


    }

  }

  return responselist;

  console.error(status);

  return null;


  return [];
};
