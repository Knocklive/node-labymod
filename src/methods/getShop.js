'use strict';

const fetch = require('node-fetch');
const { availableEmotes } = require('../data/Data');

module.exports = function getShop(type = 'all') {
  return new Promise((resolve, reject) => {
    fetch('https://dl.labymod.net/advertisement/entries.json')
      .then(res => res.json())
      .then(json => {
        let dailyEmotes = json.dailyEmotes.map(e => e.id);

        type = type.toLowerCase();
        if (!['raw', 'all', 'rare'].includes(type)) type = 'all';

        if (type === 'raw') return resolve(dailyEmotes);
        if (type === 'all') return resolve(availableEmotes.filter(ae => dailyEmotes.includes(ae.emote_id)));
        if (type === 'rare') return resolve(availableEmotes.filter(ae => dailyEmotes.includes(ae.emote_id) && ae.rare));
      })
      .catch(err => reject(err));
  });
};
