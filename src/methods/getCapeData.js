'use strict';

const fetch = require('node-fetch');

/**
 * Gathers information about a LabyMod users' cape
 * @param {string} username - The username to look for.
 * @returns {Promise<unknown>}
 */
module.exports = function getCapeData(username) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.labymod.net/capes/capecreator/capedata.php?username=${username}`)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
