var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var app = express();

app.use(bodyParser.json());

var file = '/tmp/testbeds.json';
queues = jsonfile.readFileSync(file);

app.get('/', function (req, res) {

    var query_version = req.query.version;

    if (queues === {} || !query_version) {
        return res.send(400);
    }

    var config = {};

    if (query_version in queues && queues[query_version].length > 0) {
        var testbed = queues[query_version][0];
        queues[query_version] = queues[query_version].slice(1, queues[query_version].length);
        config = testbed;
    }

    jsonfile.writeFile(file, queues, function (err) {
        console.error(err)
    });

    res.json(config);
});

app.get('/about', function (req, res) {
    res.redirect('https://github.com/strefethen/nimbus-service/blob/master/README.md');
});

app.get('/peek', function (req, res) {
    res.json(queues);
});

app.get('/size', function (req, res) {
    var queueSizes = {};
    for (var q in queues) {
        queueSizes[q] = queues[q].length;
    }
    res.json(queueSizes);
});

app.post('/', function (req, res) {

    var query_version = req.query.version;

    console.log(req.body);
    if (!query_version)
        res.send(400);
    if (queues[query_version]) {
        queues[query_version].push(req.body);
    } else {
        queues[query_version] = [req.body];
    }

    jsonfile.writeFile(file, queues, function (err) {
        console.error(err)
    })

    res.send('added');
});

app.delete('/', function (req, res) {

    var name_to_delete = req.query.name;

    for (var key in queues) {
        var queue = queues[key];
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].name == name_to_delete) {
                queue.splice(i, 1);
                res.send('deleted');
            }
        }
    }

    jsonfile.writeFile(file, queues, function (err) {
        console.error(err);
    });

    res.send("200");
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
