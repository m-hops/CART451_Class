//EXPRESS SETUP//
const express = require("express");
const portNumber = 4200;
const app = express();
const server = require("http").createServer(app);
require('dotenv').config();

//MONGO SETUP//
const mongo_connection_url = process.env.MONGO_DB_URI;
const {MongoClient} = require('mongodb');
const client = new MongoClient(mongo_connection_url,{});

//MONGO CONNECTION//
async function run() {

    try {
        //INITIAL CONNECTION TO UPLOADED MONGO DB//
        await client.connect();
        await client.db("exercise1").command({ping:1});

        //ACCESS COLLECTION//
        const db = await client.db("exercise1");
        const horrorFilmsDB = await db.collection('horrorFilms');
        console.log("success");

        //MONO QUERY EXAMPLE ONE//
        let ex1 =  await horrorFilmsDB.aggregate([
            {$match:{title:'Event Horizon'}},
            ]).toArray();

            console.log(ex1);

    }catch(error){
        console.log(error);
        
    }finally{
        await client.close();
    }
}

run();

