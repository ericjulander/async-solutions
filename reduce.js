const [async, https, http, URL] = [require("async"), require("https"), require("http"), require("url")];

function getPageDataFromOptions(url, callback) {

    http.get(url, (res) => {
        res.setEncoding("utf8")
        var body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            callback(null, body);
        });

        res.on("error", (err) => {
            console.log(err);
        });
    });
}


(function () {

    const url = process.argv[2];
    var queryz = ["one", "two", "three"];
    async.reduce(queryz, 0, function (acc, query, callback) {
        var query = {
            number: query
        }
        var urlObject = URL.parse(url);
        urlObject.query = query;
        var newUrl = URL.format(urlObject);

        getPageDataFromOptions(newUrl, function (err, data) {
            callback(null, acc + parseInt(data))
        });
    }, function (err, results) {
        console.log(results);
    });

})();