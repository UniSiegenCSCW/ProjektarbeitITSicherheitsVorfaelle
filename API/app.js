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

app.post('/cveSearch', function(req, res){
	var cveArr;
	var vendor = req.body.vendor;
	var product = req.body.product;
	var limit = parseInt(req.body.limit);
	var since = parseInt(req.body.since);
	var cwe = String(req.body.cwe);
	var cvss = parseInt(req.body.cvss);

	console.log(vendor + product);

	var options = {
		uri: 'http://cve.circl.lu/api/search/' + vendor + '/' + product,
		method: 'GET'
	};

	var listLimit = 5;
	if (Number.isInteger(limit))
	{
		listLimit = limit;
	}

	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200){
			var jsonBody = JSON.parse(body);
			var resultList = [];
			var count = 0;

			var isSince = Number.isInteger(since);
			var isLimit = Number.isInteger(limit);
			var isCwe = (cwe.indexOf('CWE') != -1);
			var isCvss = Number.isInteger(cvss);
			var isFiltered = isSince || isCwe || isCvss;
			
			for(var x in jsonBody){
				var element = jsonBody[x];
				
				if(isFiltered)
				{
					if(isSince)
					{
						var modified = new Date(element["Modified"]);
						var now = Date.now();
						var week = since * 24 * 60 * 60 * 1000;
						
						if ((now - modified) < week){
							resultList.push(element);
						}
					}
					if(isCwe)
					{
						var elementCwe = String(element["cwe"]);
						if(elementCwe.indexOf(cwe) != -1 || elementCwe.indexOf('Unknown') != -1)
						{
							resultList.push(element);
						}
					}

					if(isCvss)
					{
						if(parseInt(element["cvss"]) > cvss)
						{
							resultList.push(element);
						}
					}

					if(isLimit)
					{	
						if(resultList.length >= listLimit)
						{
							break;
						}
					}
				}
				else
				{
					resultList.push(element);

					if(resultList.length >= listLimit)
					{
						break;
					}
				}
			}

			res.send(resultList);
		}
	});
})

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
			for (var index in vendorArr) {
				var repl = vendorArr[index].replace(/_/g, " ");
				if (repl.indexOf(filter) != -1) {
					vendorArrReplaced.push(repl);
				}
			}

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
		}
		console.log(productArrReplaced);
		res.send(productArrReplaced);
	  }
	});
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});