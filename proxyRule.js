const os = require('os');

var ipAddr = getIP();
var weinrePort = '8080';

function getIP() {
    var neti = os.networkInterfaces();
    var en0;
    if(neti.hasOwnProperty('en0')) {
        en0 = neti['en0']; //mac
    } else if(neti.hasOwnProperty('以太网')) {
        en0 = neti['以太网']; //windows
    } else {
        en0 = neti['eth0']; //linux
    }
    for(var i=0; i<en0.length; i++) {
        if(en0[i].family == 'IPv4') {
            return en0[i].address;
        }
    }
    return '127.0.0.1';
}

module.exports = {
    replaceServerResDataAsync: function(req, res, serverResData, callback) {
        if(/html/i.test(res.headers['content-type'])) {
            var newDataStr = serverResData.toString();
            var pos = newDataStr.search(/<\/body>/);
            var insertScript = `<script src="http://${ipAddr}:${weinrePort}/target/target-script-min.js"></script>`;
            callback(newDataStr.substring(0, pos) + insertScript + newDataStr.substring(pos));
        }
        else {
            callback(serverResData);
        }
    },
    // shouldInterceptHttpsReq: function(req) {
    //     return true;
    // }
}