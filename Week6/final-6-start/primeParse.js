const cheerio = require("cheerio");
const startURL = "https://en.wikipedia.org";

function primeParse(obj) {
//needs to return a promise because all this takes time ... 
  return new Promise(async function (resolve, rej) {
    let url = startURL + obj.href;
    console.log(url);

    //will return this inner function
    let data = await fetch(url);
    let html = await data.text();
    //console.log(html)
    const $ = cheerio.load(html);

    resolve({
      name: $(".firstHeading", html).text(),
      birthday: $(".bday", html).text(),
      url: url,
      title: obj.title,
    });
  });
}
module.exports = primeParse;
