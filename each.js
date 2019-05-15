const [async, https, http] = [require("async"), require("https"), require("http")];

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
    var urls = [].concat(process.argv).slice(2);
    if (urls.length < 2) {
        console.log("Please Enter Two Valid URLS ");
        return;
    }

    async.each(urls, getPageDataFromURL,
        function (err) {
            if (err !== null)
                console.log(err);
        });
})();