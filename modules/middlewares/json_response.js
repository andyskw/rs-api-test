exports.setResponseContentType = function(ct) {
   return  function(req,res,next) {
            res.setHeader("Content-Type", ct);
            next();
    }
}