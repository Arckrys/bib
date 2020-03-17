const axios = require('axios');
const cheerio = require('cheerio');


/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */


/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async url => {
  const responselist = [];
  const response = await axios(url);
  const {data, status} = response;
  const $ = cheerio.load(data);
  const list = $('body').text().trim().replace("\u00d4","ô").replace("\u00e0","à").split("\"title\":\"");
  list.shift();
  for(let i = 0; i < list.length;i++){
    const copylist = list[i]
    const splitedlist = copylist.split("(");
    const name = String(splitedlist[0].toLowerCase().trim());
    responselist.push(name);
  }

  return responselist;

  console.error(status);

  return null;


  return [];
};
