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
    let res = "";
    var count = 0;
    async.whilst(function () {
        return res !== "meerkat";
    }, function (callback) {
        getPageDataFromOptions(url, function (err, data) {
            res = data;
            count++;
            callback(null, res);
        });
    }, function (e, r) {
        console.log(count);
    });

})();