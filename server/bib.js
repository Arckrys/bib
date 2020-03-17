const axios = require('axios');
const cheerio = require('cheerio');
const michelin = require('./michelin');
const maitre = require('./maitre');

module.exports.get = async urls => {
  const responselist = [];
  const listMichelin = [];
  const listMaitre = []
  try {
    console.log(`🕵️‍♀️  browsing ${urls[0]} source`);

    const restaurant = await michelin.get_only_names(urls[0]);
    for(let i =0; i<restaurant.length; i++){
      listMichelin.push(restaurant[i])
    }
    console.log('michelin done');
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(`🕵️‍♀️  browsing ${urls[1]} source`);

    const restaurant2 = await maitre.get(urls[1]);
    for(let i =0; i<restaurant2.length; i++){
      listMaitre.push(restaurant2[i])
    }
    console.log('maitre done');
  } catch (e) {
    console.error(e);

  }
  listMichelin.forEach(restaurant => {
    if(listMaitre.includes(restaurant.name)){
      console.log(restaurant.name);
      responselist.push(restaurant);
    }
  })
  return responselist;

  console.error(status);

  return null;


  return [];
};
