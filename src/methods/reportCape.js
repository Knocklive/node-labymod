'use strict';

const fetch = require('node-fetch');

/**
 * Reports a players cape directly to LabyMod support.
 * @param {string} owner - The players ingame name to be reported.
 * @param {string} reporter - The ingame name of the reporter.
 * @returns {Promise<unknown>}
 */
module.exports = function reportCape(owner, reporter) {
  return new Promise((resolve, reject) => {
    fetch('https://api.labymod.net/capes/capeReport.php', {
      body: `${encodeURIComponent('reporter')}=${encodeURIComponent(reporter)}&${encodeURIComponent(
        'capeowner',
      )}=${encodeURIComponent(owner)}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11',
      },
    })
      .then(res => res.text())
      .then(message => {
        if (!message || message === 'Failed') {
          return reject(new Error(`Could not report the cape of ${owner}`));
        }

        if (message.startsWith('§cUser not found:')) {
          return reject(new Error(`The user could not be found: ${owner}`));
        }

        if (message.startsWith('§cYou already reported')) {
          return reject(new Error(`You already reported the cape of ${owner}`));
        }

        if (message.endsWith("doesn't own a LabyMod Custom cloak.")) {
          return reject(new Error(`This user does not own a LabyMod Custom Cloak: ${owner}`));
        }

        if (message.startsWith('§cThe reported cloak has been marked as valid.')) {
          return reject(new Error(`This cape has been marked as valid. It can not be reported: ${owner}`));
        }

        resolve();
      })
      .catch(err => reject(err));
  });
};
