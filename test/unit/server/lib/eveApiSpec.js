'use strict';
describe('eveApi', function() {
  var nock = require('nock');
  var eve = require('../../../../app/lib/eveApi.js');
  var expect = require('expect.js');


  describe('#get', function() {
    var scope = null,
    expectedJSON = null,
    user = null;

    beforeEach(function() {

      nock('https://api.eveonline.com:443')
  .get('/account/Characters.xml.aspx?keyID=8675309&vCode=deadbeef')
  .reply(200, "<?xml version='1.0' encoding='UTF-8'?>\r\n<eveapi version=\"2\">\r\n  <currentTime>2013-07-22 03:51:16</currentTime>\r\n  <result>\r\n    <rowset name=\"characters\" key=\"characterID\" columns=\"name,characterID,corporationName,corporationID\">\r\n      <row name=\"TacoHacker Vagina\" characterID=\"92014656\" corporationName=\"State War Academy\" corporationID=\"1000167\" />\r\n      <row name=\"Trygve Reenskaug\" characterID=\"93500724\" corporationName=\"THE AESIR.\" corporationID=\"98165216\" />\r\n    </rowset>\r\n  </result>\r\n  <cachedUntil>2013-07-22 04:45:58</cachedUntil>\r\n</eveapi>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/xml; charset=utf-8',
  date: 'Mon, 22 Jul 2013 03:51:16 GMT' })
  .get('/account/Characters.xml.aspx?keyID=invalid&vCode=stupid')
  .reply(403, "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"/>\r\n<title>403 - Forbidden: Access is denied.</title>\r\n<style type=\"text/css\">\r\n<!--\r\nbody{margin:0;font-size:.7em;font-family:Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;}\r\nfieldset{padding:0 15px 10px 15px;} \r\nh1{font-size:2.4em;margin:0;color:#FFF;}\r\nh2{font-size:1.7em;margin:0;color:#CC0000;} \r\nh3{font-size:1.2em;margin:10px 0 0 0;color:#000000;} \r\n#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:\"trebuchet MS\", Verdana, sans-serif;color:#FFF;\r\nbackground-color:#555555;}\r\n#content{margin:0 0 0 2%;position:relative;}\r\n.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;}\r\n-->\r\n</style>\r\n</head>\r\n<body>\r\n<div id=\"header\"><h1>Server Error</h1></div>\r\n<div id=\"content\">\r\n <div class=\"content-container\"><fieldset>\r\n  <h2>403 - Forbidden: Access is denied.</h2>\r\n  <h3>You do not have permission to view this directory or page using the credentials that you supplied.</h3>\r\n </fieldset></div>\r\n</div>\r\n</body>\r\n</html>\r\n", { 'content-type': 'text/html',
  date: 'Mon, 22 Jul 2013 03:57:27 GMT',
  'content-length': '1233' });

      user = {
        _id: 92014656,
        apiKey: {
          keyID: 8675309,
          vCode: 'deadbeef'
        },
        name: 'TacoHacker Vagina',
        corp: {
          corpID: 1000167,
          name: 'State War Academy'
        }
      };

      expectedJSON = {
        characters: {
          '93500724': { 
            name: 'Trygve Reenskaug',
            characterID: '93500724',
            corporationName: 'THE AESIR.',
            corporationID: '98165216'
          },
          '92014656': {
            name: 'TacoHacker Vagina',
            characterID: '92014656',
            corporationName: 'State War Academy',
            corporationID: '1000167'
          }
        },
        currentTime: '2013-07-22 03:51:16',
        cachedUntil: '2013-07-22 04:45:58'
      };

    });

    afterEach(function() {
      nock.cleanAll();
    });

    it('should return an object', function() {
      expect(eve.get('account:Characters', user.apiKey)).to.be.an('object');
    });

    it('should return json on success', function(done) {
      eve.get('account:Characters', user.apiKey).done(function(result) {
        expect(result).to.eql(expectedJSON);
        done();
      },
      done);
    });

    it('should return an error when api key is invalid', function(done) {
      eve.get('account:Characters', {keyID: 'invalid', vCode: 'stupid'})
      .done(function(result) {
        done(new Error('The query should have 403\'d. Check nock.'));
      },
      function(err) {
        expect(err).to.be.an(Error);
        done();
      });
    })

  });
});