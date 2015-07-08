var json_only = require("../modules/middlewares/json_response");
var _ = require("lodash");
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("JSON response middleware", function () {
    it("should set the response type to application/json for a GET request", function() {

        req = { url: "/", method: "GET"};
        var setHeaderSpy = sinon.spy();
        res = {setHeader: setHeaderSpy};
        var next = sinon.spy();

        var initialized = json_only.setResponseContentType("application/json");
        initialized(req,res,next);

        expect(setHeaderSpy).to.have.been.calledWith("Content-Type", "application/json");
        expect(next).to.have.been.called;
    });

    it("should set the response type to application/json for a POST request", function() {

        req = { url: "/", method: "POST"};
        var setHeader = function () {};
        var setHeaderSpy = sinon.spy(setHeader);
        res = {setHeader: setHeaderSpy};
        var next = sinon.spy();

        var initialized = json_only.setResponseContentType("application/json");
        initialized(req,res,next);

        expect(setHeaderSpy).to.have.been.calledWith("Content-Type", "application/json");
        expect(next).to.have.been.called;
    });

    it("should set the response type to application/json for a PUT request", function() {

        req = { url: "/", method: "PUT"};
        var setHeader = function () {};
        var setHeaderSpy = sinon.spy(setHeader);
        res = {setHeader: setHeaderSpy};
        var next = sinon.spy();

        var initialized = json_only.setResponseContentType("application/json");
        initialized(req,res,next);

        expect(setHeaderSpy).to.have.been.calledWith("Content-Type", "application/json");
        expect(next).to.have.been.called;
    });

});