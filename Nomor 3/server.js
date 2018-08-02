var express = require('express');
var app = express();
var mysql = require('mysql');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://sarahjul:1234@localhost:27017/animalia';


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Plantae'
});

db.connect();

MongoClient.connect(url, function(error, db){
    console.log("Terhubung ke MongoDB!");
   
})

app.get('/flora/monokotil', function(req, res){
    var sql = 'SELECT * from Monocotyledon';
    db.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        res.send(result);
    })
})

app.get('/flora/dikotil', function(req, res){
    var sql = 'SELECT * from Dicotyledon';
    db.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        res.send(result);
    })
})

app.get('/fauna/vertebrata',(req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('vertebrata');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
})

app.get('/fauna/invertebrata',(req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('invertebrata');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
})

app.listen(3000, () => {
    console.log('Server aktif @port 3000')
});