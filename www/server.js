"use strict";

var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var http = require('http');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ibtdb";

var port = 8080;

var staticBasePath = './';

var staticServe = function(req, res) {
    var resolvedBase = path.resolve(staticBasePath);
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    var fileLoc = path.join(resolvedBase, safeSuffix);

	if(req.method === "POST" && !req.url.includes("order")){
		var body = '';
   		req.on('data', (data) => {
			body+=data;
			if(body.length > 1e6){
				req.connection.destroy();
			}
		});

		req.on('end', function() {
			var post = qs.parse(body);
			var revs = post.revname.split('\r\n');
			var _revname = revs[0];
			var revstars = revs[1].substr(9);
			var revtext = revs[2].substr(8);
			var searchparams = req.url.split('?')[1];
			var params = new URLSearchParams(searchparams);
			var itemNum = parseInt(params.get('item'));
			if(_revname!=""&&revtext!=""&&revstars!=""){
				var review = {name: _revname, text:revtext, stars:revstars, revItemNum:itemNum};
				MongoClient.connect(url, function(err, db){
					if(err) throw err;
					useUnifiedTopology:true;
					var dbo = db.db("ibtdb");
					dbo.collection("reviews").insertOne(review, function(err, res){
						if (err) throw err;
						res.statusCode = 200;
						db.close();
					});
				});
			}else{
				res.statusCode = 403;
				res.end("INVALID FORM!");
			}
		});	  
		console.log("1 NEW REVIEW ON ITEM " + itemNum);
	}

	if(req.method === "POST" && req.url.includes("order")){
		var body = '';
   		req.on('data', (data) => {
			body+=data;
			if(body.length > 1e6){
				req.connection.destroy();
			}
		});

		req.on('end', function() {
			var order = qs.parse(body);
			var vals = JSON.stringify(order).toString().replace('"', '').replace("{", "").replace("}", "");
			var valsFormatted = vals.substr(0, vals.length-4).split(";");
			var order = {name: valsFormatted[0].split(":")[1], surname:valsFormatted[1].split(":")[1], description:valsFormatted[2].split(":")[1], address:valsFormatted[3].split(":")[1], mobile:valsFormatted[4].split(":")[1], email:valsFormatted[5].split(":")[1]};
			console.log("1 NEW ORDER RECEIVED!");
			console.log(valsFormatted);
			MongoClient.connect(url, function(err, db){
				if(err) throw err;
				useUnifiedTopology:true;
				var dbo = db.db("ibtdb");
				dbo.collection("orders").insertOne(order, function(err, res){
					if (err) throw err;
					res.statusCode = 200;
					db.close();
				});
			});
		});

	}


	if(req.method === "GET" && req.url.includes("reviews")){
		var body = '';
		var values = req.url.split(".");
		var itemNum = parseInt(values[0].substr(4));
		req.on('data', (data) => {
			body+=data;
			if(body.length > 1e6){
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			
			MongoClient.connect(url, function(err, db){
				if(err) throw err;
				useUnifiedTopology:true;
				var dbo = db.db("ibtdb");
				dbo.collection("reviews").find({revItemNum:itemNum}, function(err, result){
					if (err) throw err;
					return result.toArray().then(items =>{
						var answer = JSON.stringify(items).split(":").toString().replace("'", "").match(/\w+|"[^"]+"/g);
						for(var i = 0; i < answer.length; i++){
						 	answer[i] = answer[i].replace(/"/g,"");
					 	}
						db.close();
						res.statusCode = 200;
						res.end(answer.toString());
					});	
				});
			});
		});
	console.log("Displaying reviews...")		
	}

	if(req.method === "GET" && req.url.includes(".json")){
		var body = '';
		
		var values = req.url.split(".");
		var fileNum = values[0].substr(4);
		req.on('data', (data) => {
			body+=data;
			if(body.length > 1e6){
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			
			MongoClient.connect(url, function(err, db){
				if(err) throw err;
				useUnifiedTopology:true;
				var dbo = db.db("ibtdb");
				dbo.collection("items").findOne({localId:fileNum}, function(err, result){
					if (err) throw err;
					var answer = JSON.stringify(result).split(":").toString().replace("'", "").match(/\w+|"[^"]+"/g);
					for(var i = 0; i < answer.length; i++){
						answer[i] = answer[i].toString().replace(/"/g,"");
					}
					db.close();
					res.statusCode = 200;
					res.end(answer.toString());
				});
			});
		});
	console.log("Loading .json...");
	}

	if(req.method === "GET" && req.url.includes(".ejson")){
		var body = '';	
		var values = req.url.split(".");
		var fileNum = parseInt(values[0].substr(4));
		req.on('data', (data) => {
			body+=data;
			if(body.length > 1e6){
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			
			MongoClient.connect(url, function(err, db){
				if(err) throw err;
				useUnifiedTopology:true;
				var dbo = db.db("ibtdb");
				dbo.collection("itemse").findOne({localId:fileNum}, function(err, result){
					if (err) throw err;
					var answer = JSON.stringify(result).split(":").toString().replace("'", "").match(/\w+|"[^"]+"/g);
					for(var i = 0; i < answer.length; i++){
						answer[i] = answer[i].toString().replace(/"/g,"");
					}
					
					db.close();
					res.statusCode = 200;
					res.end(answer.toString());
				});
			});
		});
	console.log("Loading .json in English...");
	}

	var trueUrl = fileLoc.split('?')[0];
    fs.readFile(trueUrl, function(err, data) {
        if(!req.url.includes("json")&&!req.url.includes("reviews")&& !req.url.includes("revForm")){
        	if (err) {
            	res.writeHead(404, 'Not Found');
            	res.write('404: File Not Found!');
            	return res.end();
        	}
        	res.statusCode = 200;
        	if(fileLoc.includes("html")){
        		console.log("Loaded file at " + trueUrl + " by " + req.connection.remoteAddress);	
        	}
        	res.write(data);
        	return res.end();
    	}
    });
};

var httpServer = http.createServer(staticServe);

httpServer.listen(port, function(){
	console.log("Listening on " + port);
});
