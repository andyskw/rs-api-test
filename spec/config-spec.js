var _ = require("lodash");
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("Configreader", function () {
    it("should throw an exception if MAILUSER environment variables are missing", function() {
        process.env.MAILPASS = "a";
        process.env.MAILFROM = "b";
        var threw = false;
        try {
            require("../config");
        } catch( ex) {
            threw = true;
        } finally {
            expect(threw).to.be.true;
        }
    });

    it("should throw an exception if MAILFROM mandatory environment variables are missing", function() {
        process.env.MAILUSER = "a";
        delete process.env.MAILFROM;
        var threw = false;
        try {
            require("../config");
        } catch( ex) {
            threw = true;
        } finally {
            expect(threw).to.be.true;
        }

    });

    it("should throw an exception if MAILPASS mandatory environment variables are missing", function() {
        process.env.MAILFROM = "a";
        delete process.env.MAILPASS;
        var threw = false;
        try {
            require("../config");
        } catch( ex) {
            threw = true;
        } finally {
            expect(threw).to.be.true;
        }

    });

    it("should set up the configuration object based on the received env vars", function() {
        process.env.MAILFROM = "from";
        process.env.MAILPASS = "pass";
        process.env.MAILUSER = "user";
        process.env.MONGOCONNECT = "connectionString";
        process.env.PORT = "port";
        var threw = false;
        var config = null;
        try {
             config = require("../config");
        } catch(ex) {
            threw = true;
        } finally {
            expect(threw).to.be.false;
            expect(config).not.to.be.null;
            expect(config.mail.from).to.be.equal("from");
            expect(config.mail.pass).to.be.equal("pass");
            expect(config.mail.user).to.be.equal("user");
            expect(config.mongo.connectionString).to.be.equal("connectionString");
            expect(config.express.port).to.be.equal("port");
        }

    });

});