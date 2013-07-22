var TRUSTED_PARAMS = [
  'trusted',
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

module.exports = {
  names: function() {
    return TRUSTED_PARAMS.slice();
  },

  httpNames: function() {
    return TRUSTED_PARAMS.map(function(param) {
      return 'EVE_' + param.toUpperCase();
    });
  },

  extractParameters: function(request) {
    return this.httpNames().reduce(function(target, param) {
      if(typeof(request.headers[param]) !== 'undefined') {
        target[param] = request.headers[param];
      }
      return target;
    }, {});
  }
}
