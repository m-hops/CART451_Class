const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);
require('dotenv').config();

// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));



app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use("/client", clientRoute);
const mongo_connection_url = process.env.MONGO_DB_URI;

let data = [{
        country : 'Spain',
        city : 'Salamanca',
        name : 'USAL',
        location : {
          type : 'Point',
          coordinates : [ -5.6722512,17, 40.9607792 ]
        },
        students : [
          { year : 2014, number : 24774 },
          { year : 2015, number : 23166 },
          { year : 2016, number : 21913 },
          { year : 2017, number : 21715 }
        ]
      },
      {
        country : 'Spain',
        city : 'Salamanca',
        name : 'UPSA',
        location : {
          type : 'Point',
          coordinates : [ -5.6691191,17, 40.9631732 ]
        },
        students : [
          { year : 2014, number : 4788 },
          { year : 2015, number : 4821 },
          { year : 2016, number : 6550 },
          { year : 2017, number : 6125 }
        ]
      }
    ] 
let courseData = [
        {
            university : 'USAL',
            name : 'Computer Science',
            level : 'Excellent'
          },
          {
            university : 'USAL',
            name : 'Electronics',
            level : 'Intermediate'
          },
          {
            university : 'USAL',
            name : 'Communication',
            level : 'Excellent'
          }

    ]

const {MongoClient} = require('mongodb'); //REFERENCE TO THE LIBRARY
const client = new MongoClient(mongo_connection_url,{}); //INSTANCE OF CLIENT
async function run() {
  try{
    await client.connect();
    await client.db("admin").command({ping:1});
    console.log("success");
    const db = await client.db("madelineTest");
    //const unis = await db.createCollection("Universities");
    //const courses = await db.createCollection("courses");
    const unis = await db.collection('Universities');
    const courses = await db.collection('courses');
    // await unis.insertMany(data);
    // await courses.insertMany(courseData);
    // await courses.insertOne({
    //   university:'Concordia',
    //   name:'Madeline',
    //   level:'Beginner'
    // });

    // let matches =  await unis.aggregate([
    //   {$match:{country:'Spain', city:'Salamanca'}},
    //   {$project:{city:1, name:1}},
    //   {$group:{_id:'$name', totaldocs:{$sum:1}}}
    // ]).toArray();
    // console.log(matches);

    let unwound = await unis.aggregate([
      {$match:{country:'Spain', city:'Salamanca'}},
      {$unwind: '$students'},
      {$project: {_id:0, 'students.number':1, 'students.year':1}},
      {$sort: {'students.number':-1}},
      {$count: 'salamanca_students'}
    ]).toArray();
    console.log(unwound);

  }catch(error){
    console.log(error);
  }finally{
    await client.close();
  }

  

} 

run();

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);

});

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}




