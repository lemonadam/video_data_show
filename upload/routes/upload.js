/**
 * post upload .
 */
var formidable = require('formidable'),
	util = require('util'),fs=require('fs');

exports.upload = function(req, res) {
	// parse a file upload
	var form = new formidable.IncomingForm(),files=[],fields=[],docs=[];
	console.log('start upload');
	
	//存放目录
	form.uploadDir = 'tmp/';

	form.on('field', function(field, value) {
		//console.log(field, value);
		fields.push([field, value]);
	}).on('file', function(field, file) {
		console.log(field, file);
		files.push([field, file]);
		docs.push(file);


		var types = file.name.split('.');
		var date = new Date();
		var ms = Date.parse(date);
		fs.renameSync(file.path, "tmp/files" + ms + '_'+file.name);
	}).on('end', function() {
		console.log('-> upload done');
		res.writeHead(200, {
			'content-type': 'text/plain'
		});


		var exec = require('child_process').exec;
		var cmdStr_shell='sh shell.sh';
		var cmdStr_shell_rm='sh shell_rm.sh';
		var cmdStr_more = 'sh shell_more.sh';
		exec(cmdStr_shell);
		exec(cmdStr_more, function(err,stdout,stderr){
			if(err) {
				console.log('error:'+stderr);
			} else {
				/*
				 这个stdout的内容就是上面我curl出来的这个东西：
				 {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
				 */
				// var data = JSON.parse(stdout);
				console.log(stdout);
				var out={Response:{
					'result-code':0,
					timeStamp:new Date(),
					log :stdout
				},
					files:docs
				};
				var sout=JSON.stringify(out);
				res.end(sout);
			}
		});
		// exec(cmdStr_shell_rm);

	});

	form.parse(req, function(err, fields, files) {
		err && console.log('formidabel error : ' + err);

		console.log('parsing done');


	});

	//var str = readFileSync(path, 'utf-8')
	// res.json(data)
};

