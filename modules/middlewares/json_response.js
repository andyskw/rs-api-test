exports.setResponseContentType = function(ct) {
   return  function(req,res,next) {
            res.type(ct);
            next();
    }
};