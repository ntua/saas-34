var response = function(result, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(result) + '\n');
}
var error = function(message, res) {
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({error: message}) + '\n');
}
var Router = require('../frontend/js/lib/router')();
Router
.add('api/version', function(req, res) {
  response({
    version: '0.1'
  }, res);
})
.add('api/user/login', function(req, res) {
  processPOSTRequest(req, function(data) {
    if(!data.email || data.email === '' || !validEmail(data.email)) {
      error('Invalid or missing email.', res);
    } else if(!data.password || data.password === '') {
      error('Please fill your password.', res);
    } else {
      getDatabaseConnection(function(db) {
        var collection = db.collection('users');
        collection.find({ 
          email: data.email,
          password: sha1(data.password)
        }).toArray(function(err, result) {
          if(result.length === 0) {
            error('Wrong email or password', res);
          } else {
            var user = result[0];
            delete user.password;
            delete user._id;
            req.session.user = user;
            response({
              success: 'OK',
              user: user
            }, res);
          }
        });
      });
    }
  });
})

module.exports = function(req, res) {
  Router.check(req.url, [req, res]);
}
