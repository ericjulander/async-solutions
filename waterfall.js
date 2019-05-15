const [fs, async, https, http] = [require("fs"), require("async"), require("https"), require("http")];


function getPathToFile(callback) {
    var path = process.argv[2];
    if (!path) {
        callback("Please a file path", null);
        return;
    }

    callback(null, path);
}

function readURLFromFile(path, callback) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            callback(err, data);
            return;
        }
        callback(null, data);
    });
}

function getPageDataFromURL(url, callback) {
    var method = (/https\:/g.test(url)) ? https : http;
    method.get(url, (res) => {
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
}

(function () {
    async.waterfall([getPathToFile, readURLFromFile, getPageDataFromURL], (err, res) => {
        if (err !== null)
            console.log(err);
        console.log(res);
    })

})();