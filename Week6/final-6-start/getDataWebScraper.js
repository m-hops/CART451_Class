/*
Node.js can be used to scrape data from websites using libraries such as cheerio and puppeteer. 
This data can then be processed and analyzed using machine learning algorithms. 
Web scraping is a useful technique for data gathering when there is no API 
available or when the available data sources do not contain the information that you need.
*/
/*
Node.js can be used to process and analyze data using its built-in libraries, such as fs and stream. 
These libraries can be used to read, write, and manipulate data files. 
Additionally, there are many third-party libraries, 
such as csv-parser and d3.js, that can be used for data analysis and visualization. 
With Node.js, you can easily perform tasks such as filtering and sorting data, cleaning data, and generating reports.
*/
const url = "https://en.wikipedia.org/wiki/List_of_prime_ministers_of_Canada";
//https://cheerio.js.org/docs/intro
const cheerio = require("cheerio");

//1:: a raw fetch
fetch(url)
.then(data => data.text())
.then(html=>
  {
    console.log(html)
  })
.catch(function(err){
  //handle error
});








