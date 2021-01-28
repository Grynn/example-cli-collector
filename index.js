const axios = require("axios");
const jsdom = require("jsdom"); //cheerio
const { JSDOM } = jsdom;
const { Parser } = require("json2csv");
const fs = require("fs");

const outFile = "./movies.csv";

//Reads top 100 movies from IMDB and writes to movies.csv
async function collectTopMovies(numberOfMovies) {
  const url =
    "https://www.imdb.com/search/title/?groups=top_100&sort=user_rating,desc&start=0&ref_=adv_prv";

  //try catch
  const res = await axios.get(url);

  //check result is actually valid;

  const dom = new JSDOM(res.data);
  const movieEls = dom.window.document.getElementsByClassName(
    "lister-item mode-advanced"
  );

  let movies = [];
  let movieEl;

  //moviesEls.map( el => {} );
  for (movieEl of movieEls) {
    const title = movieEl.getElementsByClassName("lister-item-header")[0]
      .textContent;
    const rating = movieEl.getElementsByClassName(
      "inline-block ratings-imdb-rating"
    )[0].textContent;
    let description = movieEl.getElementsByClassName("text-muted")[2]
      .textContent;
    const genre = movieEl.getElementsByClassName("genre")[0].textContent;

    //Remove whitespace
    description = cleanField(description);

    movies.push({
      DateChecked: Date.now(),
      Title: title.replace(/\n/g, "").replace(/ /g, ""),
      Rating: rating.replace(/\n/g, "").replace(/ /g, ""),
      description,
      Genre: genre.replace(/\n/g, ""),
    });
  }

  const parser = new Parser({
    fields: ["DateChecked", "Title", "Rating", "description", "Genre"],
  });
  const csv = parser.parse(movies);

  //check if movies.csv is there
  //add new lines
  fs.appendFileSync("./movies.csv", csv);

  //sql: insert into tbl_movies (id, date, title, rating, descript ...) values (....)
}

function cleanField(value) {
  value = value.replace(/^\s/, "");
  value = value.replace(/\n/, "");
  return value;
}

collectTopMovies().then((_) => console.log("Done"));
