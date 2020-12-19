'use strict';

const fetch = require('node-fetch');
const { availableRoles, availableEmotes, availableCosmetics, availableStickers } = require('../data/Data');

module.exports = function getUser(uuid) {
  return new Promise((resolve, reject) => {
    if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

    fetch(`https://dl.labymod.net/userdata/${uuid}.json`)
      .then(res => res.json())
      .then(json => {
        let roles = json.g?.map(g => g.i) || [];
        let cosmetics = json.c?.map(c => c.i) || [];
        let emotes = json.e || [];
        let stickers = json.st?.p || [];

        let user = {
          roles: availableRoles.filter(ar => roles.includes(ar.id)),
          cosmetics: availableCosmetics.filter(ac => cosmetics.includes(ac.id)),
          emotes: availableEmotes.filter(ae => emotes.includes(ae.id)),
          stickers: availableStickers.filter(as => stickers.includes(as.id)),
        };
        resolve(user);
      })
      .catch(err => reject(err));
  });
};
