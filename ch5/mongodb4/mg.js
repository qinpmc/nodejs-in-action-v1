var http = require("http");
var work = require("./lib/timetrack");
var mongodb = require("mongodb");

//var server = new mongodb.Server("127.0.0.1",27017,{});
//var client = new mongodb.Db("test",server,{w:1});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'test';


var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log(docs);
        callback(docs);
    });
}
var server = http.createServer(function(req,res){
    switch (req.method){
        case "POST":
            switch (req.url){
                case "/":
                    work.add(client,req,res);
                    break;
                case "/archive":
                    work.archive(client,req,res);
                    break;
                case "/delete":
                    work.delete(client,req,res);
                    break;
            }
            break;
        case "GET":
            switch (req.url){
                case "/":
                    //work.show(client,res);
 /*                   client.open(function(err){
                        if(err) throw err;
                        client.collection("test",function(err,collection){
                            if(err) throw err;
                            console.log("ok....................")
                        })
                    })*/
                    MongoClient.connect(url, {useNewUrlParser:true},function(err, client) {
                        console.log("Connected successfully to server");

                        const db = client.db(dbName);
                        findDocuments(db, function() {
                            client.close();
                        });

                    });
                    break;
                case "/add":
                    //work.showArchived(client,res);

                    MongoClient.connect(url,{useNewUrlParser:true}, function(err, client) {
                        var db = client.db(dbName);
                        insertDocuments(db, function() {
                            client.close();
                        });
                    });


            }
            break;
    }
})
server.listen(3000,"127.0.0.1");
