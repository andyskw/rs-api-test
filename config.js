var config;

//This simple module just reads some environment variables, and if it can not find any of them, sets the default values;
initConfig = function() {
    if (!config) {

        var missingConfigVariables = checkForMissingConfigVariables();

        if (missingConfigVariables.length != 0) {
            var err = new Error("Error while reading configuration of the app.");

            throw err;
        }
        config = {
            mail: {
                user: process.env.MAILUSER,
                pass: process.env.MAILPASS,
                from: process.env.MAILFROM
            },
            mongo: {
                connectionString : process.env.MONGOCONNECT ? process.env.MONGOCONNECT : "mongodb://127.0.0.1:27017/rs-api-test"
            },
            express: {
                port: process.env.PORT ? process.env.PORT : 3000
            }
        }
        return config;
    } else {
        return config;
    }
}

function checkForMissingConfigVariables() {
    var miss = [];
    var mandatory = ["MAILUSER", "MAILPASS", "MAILFROM"];
    mandatory.forEach(function (f) {
        if (typeof process.env[f] == "undefined") {
            miss.push(f);
        }
    });

    return miss;
}


module.exports = initConfig();