const [async, https, http] = [require("async"), require("https"), require("http")];

function makeHttpRequest(options, body, callback) {
    var wrek = http.request(options, function (res) {
        res.setEncoding("utf8")
        var body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            callback(null, body);
        });

        res.on("error", (err) => {
            callback(err, null);
        });
    });
    wrek.write(body);
    wrek.end();
}

function getPageDataFromOptions(options, callback) {

    http.get(options, (res) => {
        res.setEncoding("utf8")
        var body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            console.log(body);
        });

        res.on("error", (err) => {
            console.log(err);
        });
    });
}


(function () {
    const POST_OPTIONS = {
        hostname: process.argv[2],
        port: process.argv[3],
        path: '/users/create',
        method: 'POST',
    };

    const GET_OPTIONS = {
        hostname: process.argv[2],
        port: process.argv[3],
        path: '/users',
        method: 'GET',
    };

    const USERS = 5;

    async.times(USERS, function (user, callback) {
        makeHttpRequest(POST_OPTIONS, JSON.stringify({
            user_id: user + 1
        }), callback);
    }, function (err) {
        getPageDataFromOptions(GET_OPTIONS)
    });


})();