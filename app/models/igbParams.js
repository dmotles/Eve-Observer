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

  httpNameMap: function() {
    return TRUSTED_PARAMS.reduce(function(target, param) {
      target[param] = 'eve_' + param.toLowerCase();
      return target;
    }, {});
  },

  extractParameters: function(request) {
    var httpNameMap = this.httpNameMap();
    return Object.keys(httpNameMap).reduce(function(target, param) {
      var httpName = httpNameMap[param];
      if(typeof(request.headers[httpName]) !== 'undefined') {
        target[param] = request.headers[httpName];
      }
      return target;
    }, {});
  }
}
