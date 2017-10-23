const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

module.exports = {
    "server": {
        "ipAddress": "127.0.0.1",
        "port": normalizePort(process.env.PORT || '3000')
    },
    "mongoose" : {
        "url": process.env.MONGODB_URI || "mongodb://127.0.0.1/upload"
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