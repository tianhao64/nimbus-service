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

Claim the first "65" testbed in the queue:

    $ curl http://localhost:8080/?version=65
    {
        type: "test-vpx-2esx-virtual-pxeBoot-vcva",
        name: "sdk-testbed-85",
        user_name: "svc.vmware",
        podname: "sc-prd-vc042",
        vc: [
            {
                name: "svc.vmware-sdk-testbed-85.vc.0",
                ip: "10.192.35.65",
                ip4: "10.192.35.65",
                ...
     }

GET the size of all queues:

    $ curl http://localhost:8080/size
    {"55":5,"60":3}

Peek at queues:

    $ curl http://localhost:8080/peek
    { ... }

Delete a testbed with name "testbed_100" from the queues:

    $ curl -vX DELETE http://localhost:8080/?name=testbed_100

About:

    $ curl http://localhost:8080/about
    <redirect to this README.md>
