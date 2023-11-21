const{get_CSV_FileSync,get_JSON_File,get_JSON_FileSync, fetchData} = require("./readData.js");


let jsonFile = "./data/earthquakes.json";
let restUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
let csvFile = "./data/earthquakes.csv";
let textFile = "./data/earthquakes.txt";

getData();
async function getData(){

 //1:: using the asynch option   
//let jsonData =  await get_JSON_File(jsonFile);
//console.log(jsonData);

//2: using the synch option
let t = get_JSON_FileSync(jsonFile)
//console.log(t); 

let q = await fetchData(restUrl);
//console.log(q);

let r = get_CSV_FileSync(csvFile);
console.log(r);
}