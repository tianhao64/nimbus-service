var express = require('express');
var bodyParser = require('body-parser');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/settings.cfg');

var queueSize = properties.get('main.queue.size');

var app = express();

app.use(bodyParser.json());

var queues = { };

app.get('/', function (req, res) {

    var query_version = req.query.version

    if (queues === {} || !query_version) {
        return res.send(400);
    }

    var config = {}

    if (query_version in queues && queues[query_version].length > 0) {
        var testbed = queues[query_version][0];
        queues[query_version] = queues[query_version].slice(1, queues[query_version].length);
        config = {
            testbed_name: testbed.name,
            vc: testbed.vc[0].ip,
            esx1: testbed.esx[0].ip,
            esx2: testbed.esx[1].ip,
            nfs: testbed.nfs[0].ip
        };
    }
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

    var query_version = req.query.version

    console.log(req.body);
    if (!query_version)
        res.send(400);
    if (queues[query_version]) {
        if (queues[query_version].length >= queueSize){
            queues[query_version] = queues[query_version].slice(1, queues[query_version].length);
        }
        queues[query_version].push(req.body);
    } else {
        queues[query_version] = [req.body];
    }
    res.send('added');
});

var server = app.listen(8080, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});