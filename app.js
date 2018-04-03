const express = require('express');
const bodyParser = require('body-parser');
const app = express() ;
var db;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

url='mongodb://localhost:27017/'

MongoClient.connect(url, (err, client)=>{
        if(err) return console.log(err);
        db = client.db('quotes');

        console.log('Connection Success...');
});

app.get('/', function(req, res){
        db.collection('quote').find().toArray(function(err, results){
                if(err) throw err;

                res.render('index', {quotes : results});
                console.log(results)
        })
});

app.post('/quotes', (req, res)=>{
        db.collection('quote').save(req.body, (err, result) => {
                if(err) return console.log(err);                        

                console.log('Saved to database');
                res.redirect('/');
        })
});
app.listen(3000, function(req, res){
                console.log('Listening on port 3000');
});
