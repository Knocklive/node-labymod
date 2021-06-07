'use strict';

const fetch = require('node-fetch');

/**
 * Gets a list of available LabyMod versions.
 * @returns {Promise<unknown>}
 */
module.exports = function getVersions() {
  return new Promise((resolve, reject) => {
    fetch('https://dl.labymod.net/versions.json')
      .then(res => res.json())
      .then(json => resolve(Object.values(json)))
      .catch(err => reject(err));
  });
};
