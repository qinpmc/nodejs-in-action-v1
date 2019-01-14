function setup(format){
    var regexp = /:(\w+)/g;
    return function logger(req,res,next){
        var str = format.replace(regexp,function(match,property){
            return req[property];  // ":method :url"   --- GET /  请求地址为http://localhost:3000
        });
        console.log(str);
        next();
    }
}
module.exports = setup;