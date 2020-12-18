'use strict';

const fetch = require('node-fetch');
const { availableStickers } = require('../data/Data');

module.exports = function getStickers(uuid) {
  return new Promise((resolve, reject) => {
    if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

    fetch(`https://dl.labymod.net/userdata/${uuid}.json`)
      .then(res => res.json())
      .then(json => {
        let stickers = json.st?.p || [];
        resolve(availableStickers.filter(as => stickers.includes(as.id)));
      })
      .catch(err => reject(err));
  });
};
