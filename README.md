# nimbus-service

Caches testbedInfo.json files and returns the 4 IP addresses (vc, esx1, esx2, nfs) of the most recently created Nimbus testbed.

    npm install
    npm run start

## Examples

POST a testbedInfo.json for vSphere 6.5 (note version=65 query param):

    $ curl -vX POST http://localhost:8080/?version=65 -d "@testbedInfo.json" --header "Content-Type: application/json"
    * Rebuilt URL to: http://localhost:8080/
    ...
    * Connection #0 to host localhost left intact
    added

GET most recently POSTed "65" testbed:

    $ curl http://localhost:8080/?version=65
    {
        "testbed_name":"testbed-rtm-1",
        "vc":"10.160.57.109",
        "esx1":"10.160.62.58",
        "esx2":"10.160.46.234",
        "nfs":"10.160.60.42"
    }

GET the size of all queues:

    $ curl http://localhost:8080/size
    {"55":5,"60":3}

Peek at queues:

    $ curl http://localhost:8080/peek
    { ... }

About:

    $ curl http://localhost:8080/about
    <redirect to this README.md>