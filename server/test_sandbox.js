/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');
const bib = require('./bib')
const fs = require('fs');

async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand', searchLink2 ='https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data') {
/*  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.get(searchLink);

    fs.writeFile("restaurantsMichelin.json", JSON.stringify("{" + restaurant + "}"), function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("\n\n\nListe des restaurants michelin appelation bib :")
    restaurant.forEach(restaurant => {
      console.log(restaurant.name);
    })
    console.log('done');
  } catch (e) {
    console.error(e);
  }





   {
    console.log(`🕵️‍♀️  browsing ${searchLink2} source`);

    const restaurant2 = await maitre.get(searchLink2);
    fs.writeFile("restaurantsMaitre.json", JSON.stringify("{" +restaurant2+ "}"), function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("\n\n\nListe des restaurants maitre :")
    restaurant2.forEach(restaurant2 => {
      //console.log(restaurant2);
    })
    console.log('done');
  } catch (e) {
    console.error(e);
  }*/



  try {
    console.log(`doing bib`);

    const restaurant3 = await bib.get([searchLink,searchLink2]);

    fs.writeFile("restaurantsBIB.json", JSON.stringify("{" + restaurant3 + "}"), function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("\n\n\nListe des restaurants bib et maitre :")
    restaurant3.forEach(restaurant3 => {
      console.log(restaurant3.name);
    })
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink, searchLink2] = process.argv;

sandbox(searchLink, searchLink2);
