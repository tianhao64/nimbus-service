# nimbus-service
Caches testbedInfo.json files and returns the 4 IP addresses (vc, esx1, esx2, nfs) of the most recently created Nimbus testbed.

    npm install
    npm run start

**Example**

POST a testbedInfo.json file:

    $ curl -vX POST http://localhost:8080 -d "@testbedInfo.json" --header "Content-Type: application/json"

Fetch most recently POSTed file:

    $ curl http://localhost:8080/
    {"testbed_name":"testbed-rtm-1","vc":"10.160.57.109","esx1":"10.160.62.58","esx2":"10.160.46.234","nfs":"10.160.60.42"}
