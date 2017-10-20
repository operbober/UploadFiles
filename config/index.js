module.exports = {
    "server": {
        "ipAddress": process.env.OPENSHIFT_NODEJS_IP || "192.168.1.3",
        "port": process.env.OPENSHIFT_NODEJS_PORT ||3000
    },
    "mongoose" : {
        "url": process.env.OPENSHIFT_MONGODB_DB_PASSWORD
            ? connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                process.env.OPENSHIFT_APP_NAME
            : "mongodb://192.168.1.3/upload"
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