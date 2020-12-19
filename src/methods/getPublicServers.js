'use strict';

const fetch = require('node-fetch');

module.exports = function getPublicServers() {
    return new Promise((resolve, reject) => {
        fetch('https://dl.labymod.net/servers.json')
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
};
