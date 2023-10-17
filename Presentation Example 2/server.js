//EXPRESS SETUP//
const express = require("express");
const app = express();
const port = 3000;
const server = require("http").createServer(app);
require('dotenv').config();

//MONGO SETUP//
const mongo_connection_url = process.env.MONGO_DB_URI;
const {MongoClient} = require('mongodb');
const client = new MongoClient(mongo_connection_url,{});

let static = require('node-static');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => {res.sendFile(__dirname + '/public/index.html')});
app.listen(port, () => {console.log("Server is listening")});


//MONGO CONNECTION//
async function run() {

    try {
      
        app.post('/sendData', async(req, res) => {

            //INITIAL CONNECTION TO UPLOADED MONGO DB//
            await client.connect();
            await client.db("538").command({ping:1});

            //ACCESS COLLECTION//
            const db = await client.db("538");
            const mascSurveryDB = await db.collection('masculinitySurvey');
        
            let data1 = req.body.data1;
            let data2 = req.body.data2;
            let data3 = req.body.data3;
        
            let dbQuery = await mascSurveryDB.aggregate([

                {$match:    {q0001: data1}},
                {$match:    {q0002: data2}},
                {$match:    {q0024: data3}},
                {$group:    {_id: null, total: {$count: {}}}},
                {$project:  {_id:0, total:1}}
            ]).toArray();

            res.send(dbQuery[0]);
    })

    }catch(error){

        console.log(error);
        
    }finally{

        await client.close();
    }
}

run();



