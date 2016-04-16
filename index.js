var express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  Twitter = require('twitter');

var app = express();
(function run(appdir) {
  app.use(cookieParser());

  app.dir = appdir;

  // static files
  app.use(express.static(app.dir + '/public'));

  // Standard error handling
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // to support JSON-encoded bodies
  app.use(bodyParser.json());

  // to support URL-encoded bodies
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.post('/inquire', function(req, res) {
    var senderEmail = req.body.email;
    var senderName = req.body.name || 'Anonymous';
    var senderMessage = req.body.message;
    var senderPhone = req.body.phone || "No phone number specified";
    var api_key = 'key-63b86d9d5953b932e5af3c1ad6f2ae4b';
    var domain = 'sandboxb2b5451c43284f7a8bc19a345ab06b2e.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    var message = 'See inquiry message below\n-----\n\n' + senderMessage;
    message += '\n\nPhone Number: ' + senderPhone;
    var data = {
      from: senderName + '<' + senderEmail + '>',
      to: 'chidiebere.nnadi@gmail.com',
      subject: 'Automated Inquiry Message from ' + senderName,
      text: message
    };

    mailgun.messages().send(data, function (error, body) {
      res.json(body);
    });
  });

  app.get('/tweets', function(req, res) {
    var client = new Twitter({
      consumer_key: 'E6YOnmoG6O1IJwFH89ReKRjCz',
      consumer_secret: 'fz6RIxOfMCdatbJCslabMi8J2uIoRcD9u90ngqfiHsEBS4BKeI',
      access_token_key: '15773034-joamdRd8IJyb7wAH5tjiDp9q1n8e3ES8mWf8WJwp6',
      access_token_secret: '4r6pZOsCh0A5xKkAdljKrS3lSrAIA0EZUHBGBW5bBfEX7'
    });

    var params = {screen_name: 'Chydeeybere', count: 10};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  });

  app.get('/*', function(req, res) {
    res.sendFile("index.html", {root:'./public'});
  });

  var server = app.listen(process.env.port || 3000, function() {
    console.log("Express server listening on port 3000");
  });
})(process.cwd());
