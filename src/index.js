'use strict';

let getStickers = require('./methods/getStickers')
getStickers('32645503-0d51-4fc6-8e4a-28b03714db5e').then(s => console.log(s))

module.exports = {
  getStatus: require('./methods/getStatus'),
  getShop: require('./methods/getShop'),
  getRoles: require('./methods/getRoles'),
  getStickers: require('./methods/getStickers'),
  getCosmetics: require('./methods/getCosmetics'),
  getUser: require('./methods/getUser'),
  reportCape: require('./methods/reportCape'),
  getVersions: require('./methods/getVersions'),
  getAddons: require('./methods/getAddons'),
  getCapeData: require('./methods/getCapeData'),
};
