var express = require('express');
var bodyParser = require('body-parser');
var Stack = require('stackjs');

var app = express();

app.use(bodyParser.json());

var queue = [];

app.get('/', function (req, res) {
   console.log("GET request for a testbed");
    if (queue.length == 0)
        res.send(404);
    else {
        var testbed = queue[0];
        queue = queue.slice(1, queue.lenth);
        var config = { 
            testbed_name: testbed.name,
            vc: testbed.vc[0].ip,
            esx1: testbed.esx[0].ip,
            esx2: testbed.esx[1].ip,
            nfs: testbed.nfs[0].ip
        }
        res.json(config);
    }
})

app.get('/size', function (req, res) {
    console.log("GET request for stack size");
    res.send(queue.length.toString());
})

app.post('/', function (req, res) {
    console.log(req.body);
    queue.push(req.body);
    console.log("Got a POST request for the homepage");
    res.send('added');
})

var server = app.listen(8080, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})