'use strict';

const fetch = require('node-fetch');
const { availableCosmetics } = require('../data/Data');

module.exports = function getCosmetics(uuid) {
  return new Promise((resolve, reject) => {
    if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

    fetch(`https://dl.labymod.net/userdata/${uuid}.json`)
      .then(res => res.json())
      .then(json => {
        let cosmetics = json.c?.map(c => c.i) || [];
        resolve(availableCosmetics.filter(ac => cosmetics.includes(ac.id)));
      })
      .catch(err => reject(err));
  });
};
