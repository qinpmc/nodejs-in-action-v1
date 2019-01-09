var http = require("http");
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://localhost/test",{ useNewUrlParser: true }); // test 为数据库名

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project:String,
    description:String
})

mongoose.model("test1",Tasks);  //

var server = http.createServer(function(req,res){
    switch (req.method){

        case "GET":
            switch (req.url){
                case "/":
                    var Task = mongoose.model("test1");
                    var task = new Task();
                    task.project = "Bikeshed";
                    task.description = "Paint the bikeshed red";
                    task.save(function(err){
                        if(err) throw err;
                        console.log("task saved");
                    });
                    break;
                case "/add":

            }
            break;
    }
})
server.listen(3000,"127.0.0.1",function(){
    console.log("server starting ....");
});
