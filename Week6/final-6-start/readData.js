const fs = require('fs');
const papa = require('papaparse');

//SYNCH
function get_JSON_FileSync(jsonFile){
try {
  const data = JSON.parse(fs.readFileSync(jsonFile,'utf8'));
  return(data);
} catch (err) {
  return(err);
}
}

//ASYNCH option
function get_JSON_File(jsonFile){
return new Promise(function(resolve, reject){

    fs.readFile(jsonFile, (err, data) => {
    if (err) reject(error);
    let parsedData = JSON.parse(data);
    resolve(parsedData);
});

});
}

//READ CSV FILE SYNCH OPTION 
function get_CSV_FileSync(csvfile){
    try {
      const data = fs.readFileSync(csvfile,'utf8');
      const result = papa.parse(data, {
        header:         true,
        dynamicTyping:  true

      });
      return(result.data);
    } catch (err) {
      return(err);
    }


}

//FETCH DATA
 function fetchData(url){
    return new Promise( async function (resolve,reject){
    const response = await fetch(url);
    const body = await response.json();
    //resolve (body);

    const earthquakes = body.features.map(function (feature) {
      const earthQuake = {
        id: feature.id,
        ...feature.properties
      };

      return earthQuake;
    });

    resolve(earthquakes);
    });
}


module.exports = {get_JSON_File,get_JSON_FileSync,get_CSV_FileSync,fetchData} 