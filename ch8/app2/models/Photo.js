var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photo_app");

var schema = new mongoose.Schema({
    name:string,
    path:string
})
module.exports = mongoose.model("Photo",schema);