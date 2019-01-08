var http = require("http");
var work = require("./lib/timetrack");
var mongodb = require("mongodb");

//var server = new mongodb.Server("127.0.0.1",27017,{});
//var client = new mongodb.Db("test",server,{w:1});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'test';

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
                    MongoClient.connect(url, function(err, client) {
                        console.log("Connected successfully to server");

                        const db = client.db(dbName);

                        client.close();
                    });
                    break;
                case "/archived":
                    work.showArchived(client,res);
            }
            break;
    }
})
server.listen(3000,"127.0.0.1");
