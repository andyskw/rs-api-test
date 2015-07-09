# RS JSON API implementation

This repository implements gergelyke's RS test (described here: http://gist.github.com/gergelyke/4afba1e555378c4c92db), mostly. :)

I've started with a very basic project, that implements the basic requirements (registration, e-mail sending, and user listing), but also gave some thoughts on questions like "How would I maintain it? How would I run it in prod?") and subjects like that, so it has a couple of extra features added (and a lot of them still missing).

## Tech

MongoDB was choosen as database, as one can rapidly develop on the top of it, and we are having an extremely simple schema for now. :)

The project builds on top of these main dependencies:
 - Express - serves as HTTP server
 - Mongoose-q - for MongoDB access
 - Q - for promises
 - lodash - for making my life easier (actually I am not sure if I am using it right now anywhere in the code. :D)
 - nodemailer - for sending e-mails, as it supports a lot of transports out-of-the-box.
 
For development and testing I used
 - nodemon - (with -g )
 - mocha
 - chai 
 - sinon
 - rewire for making my life easier. :)

## Installation

```sh
$ git clone [git-repo-url] rs-api-test
$ cd rs-api-test
$ npm i -d
```

## Starting the application

The application has a couple of mandatory environment variables, these should be set prior to running the app. 
The app currently uses GMail as SMTP provider (spared some time by not having to set up the IP/port/ssl/etc of the SMTP server). In order to use it, you should set up an application wide password on the "Login and security" page of https://myaccount.google.com/ :)

Here is the easiest (and ugliest) way to start the app:

```sh
$ MAILUSER=anyone@gmail.com MAILPASS=<anypass> MAILFROM="Any One<anyone@gmail.com>" npm start
```

It is however smarter if you build up a start.sh that hides the sensitive env variables from your bash history. :)

## Testing the app

The app contains a couple of test cases. They can be run by:

```sh
$ npm test
```

### Things to be improved

I don't consider the code production ready, but as I have no information regarding the requirements or the depth of the project, I decided to collect a couple of things that should be improved before I'd deploy it to a production environment:

* **proper logging** - winston or ain2 sounds good for local logging / loggly or papertrail for cloud log management; dropping messages to syslog/cloud is much better than catching console, and your devops guy will definitely hate you less.
* **CORS header support** - depending on the frontend.
* **monitoring** - raygun, newrelic, etc
 
Some other things to be improved:
* **smarter routing** - we are awesome with the current method up until we have less-than-a-screen routes. Then it will be a real pain in the 455.
* **template-based e-mails** - in case if there are more than one e-mail notifications in the long run, hardcoding html e-mail bodies into the source code is well... Less, than convenient. A simple jade templating seems to be cool for this purpose. :)
