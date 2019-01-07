var qs = require("querystring");

exports.sendHtml = function(res,html){
    res.setHeader("Content-Type","text/html");
    res.setHeader("Content-Length",Buffer.byteLength(html));
    res.end(html);
}

exports.parseReceivedData = function(req,cb){
    var body = "";
    req.setEncoding("utf8");
    req.on("data",function(chunck){
        body+=chunck;
    });
    req.on("end",function(){
        var data = qs.parse(body);
        cb(data);
    })
};
exports.actionForm = function(id,path,label){
    var html = "<form method='POST' action='"+path +"'>"
    + "<input type='hidden' name='id' value='"+id+"'>"
    + "<input type='submit' value='"+label+"'>"
    + "</form>"
}
exports.add = function(db,req,res){
    exports.parseReceivedData(req,function(work){
        db.query(
            "insert into work (hours,date,description )"
            + "values(?,?,?)",
            function(err){
                if(err) throw err;
                exports.show(db,res);
            }
        )
    })
}

exports.show = function(db,res,showArchived){
    var query = "select * from work "
    +"where archived=? "
    + "order by date desc";
    var archiveValue = (showArchived)? 1:0;
    db.query(
        query,
        [archiveValue],
        function(err,rows){
            if(err) throw err;
            html = (showArchived)? "":
                "<a href ='/archived '> Archived Work</a></<br>";
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res,html);
        }
    )
};
exports.showArchived = function(db,res){
    exports.show(db,res,true);
}
exports.workHitlistHtml = function(rows){
    var html = "<table>";
    for(var i in rows){
        html += "<tr>";
        html += "<td>"+rows[i].date+"</td>";
        html += "<td>"+rows[i].hours+"</td>";
        html += "<td>"+rows[i].description+"</td>";
        if(!rows[i].archived){
            html+="<td>"+ exports.workArchiveForm(rows[i].id)+"</td>";
        }
        html += "<td>"+exports.workDeleteForm(row[i].id)+"</td>";
        html +="<tr>";
    }
    html+="</table>";
    return html;
}
exports.workFormHtml = function(){
    var html = "<form method ='POST' action='/'>"
    + "<p>Date (YYYY-MM-DD):<br><input name='date' type='text'></p>"
    + "<p>Description:</p>"
    + "<p> <textarea name='description'></textarea></p>"
    + "<input type='submit' value='Add'>"
    + "</form>";
    return html;
}
exports.workArchiveForm = function(id){
    return exports.actionForm(id,"/archive","Archive");
}
exports.workDeleteForm = function(id){
    return exports.actionForm(id,"/delete","Delete");
}