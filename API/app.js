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