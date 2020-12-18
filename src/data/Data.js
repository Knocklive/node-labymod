'use strict';

const fs = require('fs');
const path = require('path');

const availableRoles = JSON.parse(fs.readFileSync(path.join(__dirname, './roles.json'), 'utf8'));
const availableEmotes = JSON.parse(fs.readFileSync(path.join(__dirname, './emotes.json'), 'utf8'));
const availableStickers = JSON.parse(fs.readFileSync(path.join(__dirname, './stickers.json'), 'utf8'));
const availableCosmetics = JSON.parse(fs.readFileSync(path.join(__dirname, './cosmetics.json'), 'utf8'));

module.exports = {
  availableRoles,
  availableEmotes,
  availableStickers,
  availableCosmetics,
};
