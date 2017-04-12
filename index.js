var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var queues = { };

app.get('/', function (req, res) {
    if (queues === {} || !req.query.version) {
        return res.send(400);
    }
    var testbed = queues[req.query.version][0];
    queues[req.query.version] = queues[req.query.version].slice(1, queues[req.query.version].length);
    var config = { 
        testbed_name: testbed.name,
        vc: testbed.vc[0].ip,
        esx1: testbed.esx[0].ip,
        esx2: testbed.esx[1].ip,
        nfs: testbed.nfs[0].ip
    };
    res.json(config);
});

app.get('/about', function (req, res) {
    res.redirect('https://github.com/strefethen/nimbus-service/blob/master/README.md');
});

app.get('/peek', function (req, res) {
    res.json(queues);
});

app.get('/size', function (req, res) {
    var queueSizes = { };
    for (var q in queues) {
        queueSizes[q] = queues[q].length;
    }
    res.json(queueSizes);
});

app.post('/', function (req, res) {
    console.log(req.body);
    if (!req.query.version)
        res.send(400);
    if (queues[req.query.version]) {
        queues[req.query.version].push(req.body);
    } else {
        queues[req.query.version] = [req.body];
    }
    res.send('added');
});

var server = app.listen(8080, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});