'use strict';

const axios = require('axios');
const { availableCosmetics, availableEmotes, availableRoles, availableStickers } = require('../data/Data');

class LabyAPI {
  /**
   * Gets the list of all available LabyMod addons and their details.
   * @returns {Promise<unknown>}
   */
  static getAddons() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://dl.labymod.net/addons.json')
        .then(res => resolve(Object.values(res.data)))
        .catch(err => reject(err));
    });
  }

  /**
   * Gathers information about a LabyMod users' cape
   * @param {string} username - The username to look for.
   * @returns {Promise<unknown>}
   */
  static getCapeData(username) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.labymod.net/capes/capecreator/capedata.php?username=${username}`)
        .then(res => res.data)
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the list of owned cosmetics by a user.
   * @param {string} uuid - The uuid of the user to search for.
   * @returns {Promise<unknown>}
   */
  static getCosmetics(uuid) {
    return new Promise((resolve, reject) => {
      if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

      axios
        .get(`https://dl.labymod.net/userdata/${uuid}.json`)
        .then(res => {
          const cosmetics = res.data.c?.map(c => c.i) || [];
          resolve(availableCosmetics.filter(ac => cosmetics.includes(ac.id)));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the list of owned emotes by a user.
   * @param {string} uuid - The uuid of the user to search for.
   * @returns {Promise<unknown>}
   */
  static getEmotes(uuid) {
    return new Promise((resolve, reject) => {
      if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

      axios
        .get(`https://dl.labymod.net/userdata/${uuid}.json`)
        .then(res => {
          const emotes = res.data.e || [];
          resolve(availableEmotes.filter(ae => emotes.includes(ae.id)));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * A list of public servers managed by LabyMod.
   * @returns {Promise<unknown>}
   */
  static getPublicServers() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://dl.labymod.net/servers.json')
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the list of roles a LabyMod player has.
   * @param {string} uuid - The uuid of the user to search for.
   * @returns {Promise<unknown>}
   */
  static getRoles(uuid) {
    return new Promise((resolve, reject) => {
      if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

      axios
        .get(`https://dl.labymod.net/userdata/${uuid}.json`)
        .then(res => {
          const roles = res.data.g?.map(g => g.i) || [];
          resolve(availableRoles.filter(ar => roles.includes(ar.id)));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Fetches the daily emotes of the LabyMod shop.
   * @param {?('all'|'rare'|'raw')} type - Defines the output type.
   * @returns {Promise<any>}
   */
  static getShop(type = 'all') {
    return new Promise((resolve, reject) => {
      axios
        .get('https://dl.labymod.net/advertisement/entries.json')
        .then(res => {
          let dailyEmotes = res.data.dailyEmotes.map(e => e.id);

          type = type.toLowerCase();
          if (!['raw', 'all', 'rare'].includes(type)) type = 'all';

          if (type === 'raw') return resolve(dailyEmotes);
          if (type === 'all') return resolve(availableEmotes.filter(ae => dailyEmotes.includes(ae.id)));
          if (type === 'rare') return resolve(availableEmotes.filter(ae => dailyEmotes.includes(ae.id) && ae.rare));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the status of LabyMod services.
   * @returns {Promise<unknown>}
   */
  static getStatus() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://dl.labymod.net/')
        .then(res => resolve(res.data.status))
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the list of owned stickers by a user.
   * @param {string} uuid - The uuid of the user to search for.
   * @returns {Promise<unknown>}
   */
  static getStickers(uuid) {
    return new Promise((resolve, reject) => {
      if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

      axios
        .get(`https://dl.labymod.net/userdata/${uuid}.json`)
        .then(res => {
          const stickers = res.data.st?.p || [];
          resolve(availableStickers.filter(as => stickers.includes(as.id)));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Gets the list of owned emotes, cosmetics, roles and stickers by a user.
   * @param {string} uuid - The uuid of the user to search for.
   * @returns {Promise<unknown>}
   */
  static getUser(uuid) {
    return new Promise((resolve, reject) => {
      if (uuid.length < 36 || uuid.length > 36) return reject(new Error('Only a 36-character UUID can be specified.'));

      axios
        .get(`https://dl.labymod.net/userdata/${uuid}.json`)
        .then(res => {
          const roles = res.data.g?.map(g => g.i) || [];
          const cosmetics = res.data.c?.map(c => c.i) || [];
          const emotes = res.data.e || [];
          const stickers = res.data.st?.p || [];

          const user = {
            roles: availableRoles.filter(ar => roles.includes(ar.id)),
            cosmetics: availableCosmetics.filter(ac => cosmetics.includes(ac.id)),
            emotes: availableEmotes.filter(ae => emotes.includes(ae.id)),
            stickers: availableStickers.filter(as => stickers.includes(as.id)),
          };
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Gets a list of available LabyMod versions.
   * @returns {Promise<unknown>}
   */
  static getVersions() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://dl.labymod.net/versions.json')
        .then(res => resolve(Object.values(res.data)))
        .catch(err => reject(err));
    });
  }

  /**
   * Reports a players cape directly to LabyMod support.
   * @param {string} owner - The players ingame name to be reported.
   * @param {string} reporter - The ingame name of the reporter.
   * @returns {Promise<unknown>}
   */
  static reportCape(owner, reporter) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://api.labymod.net/capes/capeReport.php',
          new URLSearchParams({
            reporter,
            capeowner: owner,
          }),
          {
            responseType: 'text',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'User-Agent':
                'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) ' +
                'Chrome/23.0.1271.95 Safari/537.11',
            },
          },
        )
        .then(res => res.data)
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
  }
}

module.exports = LabyAPI;
