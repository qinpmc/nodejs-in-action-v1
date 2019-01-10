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
                case "/find":
                    var Task = mongoose.model("test1");
                    Task.find({"project":"Bikeshed"},function(err,tasks){
                        for(var i=0;i<tasks.length;i++){
                            console.log(tasks[i].id + " "+ tasks[i].description);
                        }
                    });
                    break;
                case "/update":
                    var Task = mongoose.model("test1");
                    Task.update(
                        {_id:"5c35bf48dec3a92cd0e9c255"},
                        {description:"new Description"},
                        function(err,rows_updated){
                            if(err) throw err;
                            console.log("Update");
                        });
                    break;
                case "/delete":
                    var Task = mongoose.model("test1");
                    Task.findById("5c369f5c505cff11c072c9b0", function (err,task) {
                        console.log(task);
                        task.remove();
                    })
                    break;
            }
            break;
    }
})
server.listen(3000,"127.0.0.1",function(){
    console.log("server starting ....");
});
