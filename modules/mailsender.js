var nodemailer = require("nodemailer");
var Q = require("q");
var transporter;
var config = require("../config");

//TODO: Actually mailsender should not really handle the content of the registration email directly.

/* A notificationmanager could be useful, which will know, how does a registration e-mail look like ( either from code,
 or from some kind of templating engines (jade seems to be more than enough for this purpose)

 It would be also helpful, as it makes adding new notification types to the application easier, when needed.
 */

exports.sendRegistrationMail = function(to, name, token) {

    if (!transporter) {
        console.log("Creating transporter for the first e-mail to send.");
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.mail.user,
                pass: config.mail.pass
            }
        });
    }

    var mailOptions = {
        from: config.mail.from, // sender address
        to: to,
        subject: 'Registration on the RS JSON API test server', // Subject line
        text: 'Heeello! You can use this link: http://localhost:'+config.express.port+'/users/' + token, // plaintext body
        html: "Heeello! You can use this link here: http://localhost:"+config.express.port+"/users/"+token // html body
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




