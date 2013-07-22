var Q = require('q');
var hamster = require('hamster');

module.exports = {


  get: function(path, params) {
    var defer = Q.defer();

    hamster.fetch(path, params, function(err, res) {
      if(err) {
        defer.reject(err);
      } else {
        defer.resolve(res);
      }
    });
    return defer.promise;
  },

  checkApiKey: function(User) {
    return this.get('account:Characters', {
      keyID: User.apiKey.keyID,
      vCode: User.apiKey.vCode
    }).then(function(result) {
      if(typeof(result.characters[User._id]) !== 'undefined') {
        var apiChar = result.characters[User._id];
        if(apiChar.name !== User.name ||
            apiChar.corporationID != User.corp.corpID ||
              apiChar.corporationName != User.corp.name)
        {
          throw new Error('API Key does not belong to character');
        } else {
          return true;
        }
      } else {
        throw new Error('API Key does not belong to character');
      }
      return false;
    }
    , function(err) {
      throw new Error(err.name + ': ' + err.message + '. Unable to authenticate.');
    });
  }

};


