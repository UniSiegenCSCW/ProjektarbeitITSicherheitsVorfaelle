var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/autocompleteVendor', function(req, res){
	var vendorArr;
	var vendorArrReplaced = [];
	var filter = req.body.filter;
	
	var options = {
	  uri: 'http://cve.circl.lu/api/browse/',
	  method: 'GET'
	};

	if(filter.length >= 2) {
		request(options, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
		  	var jsonBody = JSON.parse(body);
			vendorArr = jsonBody.vendor;	
			//console.log(vendorArr);	
			for (var index in vendorArr) {
				var repl = vendorArr[index].replace(/_/g, " ");
				if (repl.indexOf(filter) != -1) {
					vendorArrReplaced.push(repl);
					//console.log(repl);
				}
			}
			//console.log(productArrReplaced);
			res.send(vendorArrReplaced);
	  		}
		});
	}
	else {
		res.sendStatus(400);
	}
})

app.post('/autocompleteProduct', function(req, res){
	var vendor = req.body.vendor;
	var productArr;
	var productArrReplaced = [];
	
	var options = {
	  uri: 'http://cve.circl.lu/api/browse/' + vendor,
	  method: 'GET'
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var jsonBody = JSON.parse(body);
		productArr = jsonBody.product;		
		for (var index in productArr) {
			var repl = productArr[index].replace(/_/g, " ");
			productArrReplaced.push(repl);
			//console.log(repl);
		}
		console.log(productArrReplaced);
		res.send(productArrReplaced);
	  }
	});
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});