const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {Parser} = require('json2csv');
const fs = require('fs');

async function main(){
    const url ='https://www.imdb.com/search/title/?groups=top_250&sort=user_rating,desc&start=200&ref_=adv_prv';
    const res = await axios.get(url);
    const dom = new JSDOM(res.data);
    const movieEls = dom.window.document.getElementsByClassName('lister-item mode-advanced');

    let movies = [];
    let movieEl;

    for (movieEl of movieEls){
        const title = movieEl.getElementsByClassName('lister-item-header')[0].textContent;
        const rating = movieEl.getElementsByClassName('inline-block ratings-imdb-rating')[0].textContent;
        const description = movieEl.getElementsByClassName('text-muted')[2].textContent;
        const genre = movieEl.getElementsByClassName('genre')[0].textContent;

        movies.push({
            Title:title.replace(/\n/g,'').replace(/ /g,''),
            Rating:rating.replace(/\n/g,'').replace(/ /g,''),
            Description:description.replace(/\n/g,''),
            Genre:genre.replace(/\n/g,'')
        });
    }

    const parser = new Parser({fields:['Title','Rating','Description','Genre']});
    const csv = parser.parse(movies);
    fs.writeFileSync('./movies.csv',csv);
}

main();