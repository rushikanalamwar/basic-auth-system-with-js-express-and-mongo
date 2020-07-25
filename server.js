var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json())

var url = "mongodb://localhost:27017/auth";
var connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

var finalresult ={};
var todoo = {};
app.get('/auth/username', (req, res) => {
    var responseString = JSON.stringify(todoo);
    res.send(responseString);
    res.end();
});

mongo.MongoClient.connect(url, connectionOptions ,     (err, client)=>{
    if(err){
        console.log('error connecting database server')
        return;
    }
    else
        console.log('ho gya connect ');

    var todolist = client.db("auth");

    app.post('/auth/login' ,(req,res)=>{
        todolist.collection("signindetails").findOne(req.body ,(err,data)=>{
            if(err){
                console.log(err)
            }
            if(data!=undefined){
                res.status(200).send(data)
                todoo.username=data.username;
                console.log(data.username)
                
            }else{
                res.status(500).send()
                
            }

        })
    })

    app.post('/auth/signin',(req,res)=>{
        
        todolist
        .collection("signindetails")
        .findOne(req.body, (err,result)=>{
            var i = { "good": 0 }
            if(err){
                res.status(500).send();
                return;
            }
            if (result != undefined) {
                res.status(200).send(result);
                console.log(result)
            } else {
                res.status(200).send(i);
            }
        })
    })

    app.post('/auth/createacc',(req,res)=>{
        todolist.collection("signindetails").insertOne(req.body,(err,result)=>{
            if(err){
                res.status(401).send();
                return;
            }
            else{
                res.status(200).send(result.ops)
                // console.log(result.ops)
            }
        })
    })

    app.get('/auth/list' , (req, res)=>{
        
        
        todolist
            .collection("todoitems")
            .find()
            .toArray()
            .then(result=>{
                res.status(200).send(result);
            })
            .catch(error =>{rs
                console.log(err)
                re.status(500).send();
            })
    })
 app.listen(8080);
});

