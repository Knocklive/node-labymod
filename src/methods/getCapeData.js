'use strict';

const fetch = require('node-fetch');

module.exports = function getCapeData(username) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.labymod.net/capes/capecreator/capedata.php?username=${username}`)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
