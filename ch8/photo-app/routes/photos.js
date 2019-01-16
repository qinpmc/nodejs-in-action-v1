var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var multer  = require('multer');
var upload = multer({dest: './'});

exports.list = function(req, res){ res.render('photos', {
  title: 'Photos',
  photos: photos });
};

exports.list = function(req, res, next){
  Photo.find({}, function(err, photos){
    if (err) return next(err);
    res.render('photos/index', {
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function(req, res){
  res.render('photos/upload', {
    title: 'Photo upload' 
  });
};

/*
exports.submit = function (dir) {
  return function(req, res, next){
    //var img = req.files.photo.image;
    //var name = req.body.photo.name || img.name;
	var img = req.files["photo[image]"].data;
	var name = req.files["photo[image]"].name;
    var path = join(dir,   name);

    fs.rename(img.path, path, function(err){
      if (err) return next(err);

      Photo.create({
        name: name,
        path: img.name
      }, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  };
};
*/

exports.submit = function (dir) {
	return function(req, res, next){
		var des_file = dir + req.files[0].originalname;
		fs.readFile( req.files[0].path, function (err, data) {
			fs.writeFile(des_file, data, function (err) {
				if( err ){
					console.log( err );
				}else{
					response = {
						message:'File uploaded successfully',
						filename:req.files[0].originalname
					};
					Photo.create({
						name: req.files[0].originalname,
						path: dir + req.files[0].originalname
					  }, function(err) {
						if (err) return next(err);
						res.redirect('/');
					  });
				}
			});
		});
		
	}
}

f26bc29d0ea0ff266635b2e708834a6b
f26bc29d0ea0

exports.download = function(dir){
  return function(req, res, next){
    var id = req.params.id;
    Photo.findById(id, function(err, photo){
      if (err) return next(err);
      var path = join(dir, photo.name);
      res.download(path, photo.name);
    });
  };
};
