var nodemailer = require("nodemailer");
var Q = require("q");
var transporter;

exports.sendRegistrationMail = function(to, name, token) {

    if (!transporter) {
        console.log("Creating transporter for the first e-mail to send.")
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAILUSER,
                pass: process.env.MAILPASS
            }
        });
    }

    var mailOptions = {
        from: process.env.MAILFROM ? process.env.MAILFROM : 'Andras Ivanyi <'+process.env.MAILUSER+'>', // sender address
        to: to,
        subject: 'Registration on the RS JSON API test server', // Subject line
        text: 'Heeello! You can use this link: http://localhost:3000/users/' + token, // plaintext body
        html: "Heeello! You can use this link here: http://localhost:3000/users/"+token // html body
    };
    var deferred = Q.defer();
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, res) {
      if (!err) {
          deferred.resolve(res);
      } else {
          deferred.reject(err);
      }
    });
    return deferred.promise;
}




