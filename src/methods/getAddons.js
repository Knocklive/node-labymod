'use strict';

const fetch = require('node-fetch');

/**
 * Gets the list of all available LabyMod addons and their details.
 * @returns {Promise<unknown>}
 */
module.exports = function getAddons() {
  return new Promise((resolve, reject) => {
    fetch('https://dl.labymod.net/addons.json')
      .then(res => res.json())
      .then(json => resolve(Object.values(json)))
      .catch(err => reject(err));
  });
};
