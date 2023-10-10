let express = require('express');
const res = require('express/lib/response');
const portNumber = 4200;
let app = express();

const { application } = require("express");

app.listen(portNumber, function(){
    console.log('Server running now');

});

app.get("/", requestHandler);

function requestHandler(req, res) {
    console.log("hello");
    console.log(req);
    console.log(req.url);
    res.send("sent from server");
}



// app.get(`/bananas`, function(req,res) {
//     res.send("bananas were requested");
// })

// app.get(`/fruit/bananas`, function(req,res) {
//     res.send("fruits and bananas were requested");
// })

// app.get(`/fruit/veg/:vegValue/fruit/:fruitValue`, function(req, res){
//     console.log(req.params);
//     res.send(req.params);
// })

// app.get('/fruits/peaches', function(req, res){
//     res.send("hello peaches")
//   })

//   app.get('/fruits/watermelon', function(req, res, next) {
//     console.log('the response will be sent by the next function ...')
//     next()
   
//   }, function (req, res){
//     res.send('Hello from watermelon!')
//   })

//   function orangesFunction (req,res){
//     res.send("hello from oranges independent");
//     }
 
//   app.get('/fruits/oranges', function(req, res,next) {
//     console.log('the response will be sent by the next function again ...')
//     next()  
 
//   },[orangesFunction])


app.use("/cheese", cheeseHandler, [nextHandler])

function cheeseHandler(red, res, next){
    console.log("in cheese")
    
    next()
}

function nextHandler(req, res){
    res.send("chhhhhhheeeeeesssseee!");
}

app.use(express.json());
app.post("/aPostEndPoint",postRequestHandler);

function postRequestHandler(req, res) {
    res.send("post was sent");
    console.log(req, body);
}
