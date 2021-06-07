'use strict';

const fetch = require('node-fetch');

/**
 * A list of public servers managed by LabyMod.
 * @returns {Promise<unknown>}
 */
module.exports = function getPublicServers() {
  return new Promise((resolve, reject) => {
    fetch('https://dl.labymod.net/servers.json')
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
