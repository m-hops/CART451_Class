  //another package for getting ad exploring data: data -forge:: SUPER
  //https://www.npmjs.com/package/data-forge
  //https://www.data-forge-js.com/

const dataForge = require('data-forge');
require('data-forge-fs'); // For readFile/writeFile.
const formulajs = require('formulajs'); //https://www.npmjs.com/package/@formulajs/formulajs
//does excel like  functions i.e. FORECAST...

let file = './data/monthly_crashes-cut-down.csv';
//1 dataForge.readFile(file) // Read CSV file (or JSON!)
// //last 2 rows (tail) 
// //first 2 rows (head)
//     .parseCSV()
//     .then(data =>{
//         console.log(data.getColumnNames());
//         console.log("---HEAD---");
//         console.log(data.head(2).toString())
//         console.log("---TAIL---");
//         console.log(data.tail(2).toString())
//         console.log(data.detectTypes().toString())
//     })

//2
//    // parse the fields (convert data types) (just not of month)
//    dataForge.readFile(file) // Read CSV file (or JSON!)

//    .parseCSV()
//    .then(data =>{
//        data = data.parseFloats([
//            'Month#',
//            "Year",
//            "Crashes",
//            "Fatalities",
//            "hospitalized"
//        ])
//        console.log(data.detectTypes().toString())
//        console.log(data.head(10).toString())
//    })

   //3 getting a particular column:
    // parse the fields (convert data types) (just not of month)
    // dataForge.readFile(file) // Read CSV file (or JSON!)

    // .parseCSV()
    // .then(data =>{
    //     data = data.parseFloats([
    //         'Month#',
    //         "Year",
    //         "Crashes",
    //         "Fatalities",
    //         "hospitalized"
    //     ])
    //   console.log(data
    //     .getSeries("Fatalities") //get the fatality column
    //     .head(3) //get first 3
    //     .toString())
    // })
    // .catch(err =>{
    //     console.log("error");

    // })
 
//4
// dataForge.readFile(file) // Read CSV file (or JSON!)

//     .parseCSV()
//     .then(data =>{
//         data = data.parseFloats([
//             'Month#',
//             "Year",
//             "Crashes",
//             "Fatalities",
//             "hospitalized"
//         ])
//         const monthSeries = data.getSeries("Month#");
//         const fatalSeries = data.getSeries("Fatalities");
//         const xVals = monthSeries.head(6).toArray(); //get the first 6
//         const yVals = fatalSeries.head(6).toArray(); //get the first 6
//        const nextMonth = monthSeries.skip(6).first(); //get the 7th month
//       const nextMonthForecast = formulajs.FORECAST(nextMonth,yVals,xVals); //forecast:)
//       console.log(nextMonthForecast);
       
//     })
//     .catch(err =>{
//         console.log("error");

//     })


    //we can now with the dataforge library do this iteravly using the rollingWindow function 

