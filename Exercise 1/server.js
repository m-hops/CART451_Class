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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log("Server is listening at port ${port}")
})


//MONGO CONNECTION//
async function run() {

    try {
      
        app.post('/sendData', async(req, res) => {

              //INITIAL CONNECTION TO UPLOADED MONGO DB//
        await client.connect();
        await client.db("exercise1").command({ping:1});

        //ACCESS COLLECTION//
        const db = await client.db("exercise1");
        const horrorFilmsDB = await db.collection('horrorFilms');
        console.log("success");
    
        let data1 = req.body.data1;
        let data2 = req.body.data2;
        let data3 = req.body.data3;
    
        
        //EXERCISE 1 CODE//
        let dbQuery = await horrorFilmsDB.aggregate([
            {$match:    {original_language: data1}},
            {$match:    {release_date: {$gte: new Date(data2), $lte: new Date(data3)}}},
            {$group:    {_id: null, pop_val: {$sum: "$popularity"}}},
            {$project:  {_id: 0, popularity: {$round: ["$pop_val", 0]}}}
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



//MONO QUERY EXAMPLES//

        // //MONO QUERY EXAMPLE ONE//
        // let ex1 = await horrorFilmsDB.findOne(
        //     {title:'Event Horizon'}
        // );

        // console.log(ex1);

        // //MONO QUERY EXAMPLE TWO//
        // let ex2 = await horrorFilmsDB.aggregate([
        //     {$match:    {popularity: {$gte: 1000}}},
        //     {$limit:    2}
        // ]).toArray();

        // console.log(ex2);

        // //MONO QUERY EXAMPLE THREE//
        // let ex3 = await horrorFilmsDB.distinct("original_language");

        // console.log(ex3);

        // //MONO QUERY EXAMPLE FOUR//
        // let ex4 = await horrorFilmsDB.aggregate([
        //     {$match:    {runtime:{$lte:  1}}},
        //     {$group:    {_id:'$title', runtime: {$sum:'$runtime'}}}
        // ]).toArray();

        // console.log(ex4);

        // //MONO QUERY EXAMPLE FIVE//
        // let ex5 = await horrorFilmsDB.aggregate([
        //     {$match:    {release_date: {$gt: new Date("2000-01-01")}}},
        //     {$match:    {runtime: {$gte: 60}}},
        //     {$match:    {popularity: {$gte: 500}}},
        //     {$match:    {title: {$not: {$regex: "#"}}}},
        //     {$project:  {_id: 0, title: 1, runtime: 1, popularity: {$round: ["$popularity", 0]}, release_date: {$dateToString: {format:"%Y-%m-%d", date: "$release_date"}}}},
        //     {$sort:     {poularity: 1}},
        //     {$limit:    10}
        // ]).toArray();

        // console.log(ex5);
