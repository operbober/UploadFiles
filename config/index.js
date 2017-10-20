module.exports = {
    "server": {
        "ipAddress": "192.168.1.3",
        "port": 3000
    },
    "mongoose" : {
        "url":"mongodb://192.168.1.3/upload"
    },
    "session": {
        "secret": "ololotrololo9voditelnlo",
        "key": "sid",
        "cookie": {
            "path": "/",
            "httpOnly": true,
            "maxAge": 1440000
        }
    },
    "upload" : {
        "dir": __dirname + "/../inbox",
        "maxSize" : 52428800
    }
};