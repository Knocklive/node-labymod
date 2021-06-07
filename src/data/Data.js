'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = {
  availableRoles: JSON.parse(readFileSync(join(__dirname, './roles.json'), 'utf8')),
  availableEmotes: JSON.parse(readFileSync(join(__dirname, './emotes.json'), 'utf8')),
  availableStickers: JSON.parse(readFileSync(join(__dirname, './stickers.json'), 'utf8')),
  availableCosmetics: JSON.parse(readFileSync(join(__dirname, './cosmetics.json'), 'utf8')),
};
