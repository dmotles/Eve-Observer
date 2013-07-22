'use strict';
describe('igbParams', function() {
  var igbParams = require('../../../../app/models/igbParams.js');
  var expect = require('expect.js');


  describe('#names', function() {
    it('should return an array of strings', function() {
      expect(igbParams.names()).to.be.an('array');
      expect(igbParams.names().every(function(value){
        return typeof(value) === 'string';
      })).to.equal(true);
    });
  });

  describe('#httpNames', function() {
    it('should return an array of strings', function() {
      expect(igbParams.httpNames()).to.be.an('array');
      expect(igbParams.httpNames().every(function(value){
        return typeof(value) === 'string';
      })).to.equal(true);
    });

    it('should prefix every element with EVE_', function() {
      expect(igbParams.httpNames().every(function(value) {
        return value.lastIndexOf('EVE_') === 0;
      })).to.equal(true);
    });
  });

  describe('#extractParameters', function() {
    var mockValidRequest = {};

    beforeEach(function() {
      mockValidRequest.headers = {
        'EVE_TRUSTED': 'Yes',
        'EVE_SERVERIP': '129.168.0.1:1234',
        'EVE_CHARNAME': 'Test Char',
        'EVE_CHARID': '34342342352',
        'EVE_CORPNAME': 'Test Corp',
        'EVE_CORPID': '343452',
        'EVE_ALLIANCENAME': 'None',
        'EVE_ALLIANCEID': 'None',
        'EVE_REGIONNAME': 'Some Region',
        'EVE_CONSTELLATIONNAME': 'Some Constellation',
        'EVE_SOLARSYSTEMNAME': 'some solar system',
        'EVE_STATIONNAME': 'Some station',
        'EVE_STATIONID': '234234234',
        'EVE_CORPROLE': 'Developer',
        'EVE_SOLARSYSTEMID': '343201',
        'EVE_WARFACTIONID': '3450200',
        'EVE_SHIPID': '340200203500450340',
        'EVE_SHIPNAME': 'Derp Derp',
        'EVE_SHIPTYPEID': '34304023',
        'EVE_SHIPTYPENAME': 'Executioner',
        host: 'localhost:5000',
        connection: 'keep-alive',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36',
        'accept-encoding': 'gzip,deflate,sdch',
        'accept-language': 'en-US,en;q=0.8',
        'if-none-match': '"1139-1374344976000"',
        'if-modified-since': 'Sat, 20 Jul 2013 18:29:36 GMT'
      };
    });

    it('should not return non-eve headers', function() {
      var headerParams = Object.keys(igbParams.extractParameters(mockValidRequest));
      expect(headerParams.every(function(headerParam) {
        return headerParam.match(/^EVE_\w+$/) !== null;
      })).to.equal(true);
    });

    it('should return an empty object from a normal browser request', function() {
      var headers = igbParams.extractParameters({
        headers: {
          host: 'localhost:5000',
          connection: 'keep-alive',
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36',
          'accept-encoding': 'gzip,deflate,sdch',
          'accept-language': 'en-US,en;q=0.8',
          'if-none-match': '"1139-1374344976000"',
          'if-modified-since': 'Sat, 20 Jul 2013 18:29:36 GMT'
      }});

      expect(headers).to.be.empty();
    });

  });
});