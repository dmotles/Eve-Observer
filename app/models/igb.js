/**
 * In Game Browser Model
 */
function IGB() {
}

IGB.PARAMS = [
  'serverIp',
  'charName',
  'charId',
  'corpName',
  'corpId',
  'allianceName',
  'allianceId',
  'regionName',
  'constellationName',
  'solarsystemName',
  'stationName',
  'stationId',
  'corpRole',
  'solarSystemId',
  'warFactionId',
  'shipId',
  'shipName',
  'shipTypeId',
  'shipTypeName'
];

IGB.prototype = {
  params: function() {
    return IGB.PARAMS.slice();
  },

  processHeaders: function(headers) {
    var eveHeaders = {
      trusted: (headers['eve_trusted'] === 'Yes') ? true : false
    };

    if(eveHeaders.trusted) {
      eveHeaders = this.params().reduce(function(eveHeaders, param) {
        var val = headers['eve_' + param.toLowerCase()];
        if(typeof(val) !== 'undefined') {
          eveHeaders[param] = val;
        }
        return eveHeaders;
      }, eveHeaders);
    }

    return eveHeaders;
  }
}

var igb = new IGB();
module.exports = igb;
module.exports.middleware = function(req, res, next) {
  req.igb = igb.processHeaders(req.headers);
  next();
};
