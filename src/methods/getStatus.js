'use strict';

const fetch = require('node-fetch');

module.exports = function getStatus() {
  return new Promise((resolve, reject) => {
    fetch('https://dl.labymod.net/')
      .then(res => res.json())
      .then(json => resolve(json.status))
      .catch(err => reject(err));
  });
};
