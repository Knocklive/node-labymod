# node-labymod

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Examples](#examples)
- [Contributing](#contributing)

## About

node-labymod is a [Node.js](https://nodejs.org) module that allows you to easily fetch LabyMod information about a
minecraft user, get the daily shop, status of LabyMod and more!

- Based on Promises
- Light-Weight

## Installation

**Node.js 14.0.0 or newer is required.**  
Ignore any warnings about unmet peer dependencies, as they're all optional.

To install the module run `npm install node-labymod`.

## Documentation

- getAddons() => Returns a list of available LabyMod addons and their details.
- getCapeData(uuid) => Returns information about a LabyMod users' cape
- getCosmetics(uuid) => Returns a list of owned cosmetics by a user
- getEmotes(uuid) => Returns a list of owned emotes by a user
- getRoles(uuid) => Returns a list of roles a user has
- getStickers(uuid) => Returns a list of owned stickers a user has
- getShop(type) => Returns the daily emotes
- getStatus() => Returns the status of LabyMod services
- getUser(uuid) => Returns all stats of a LabyMod user
- getVersions() => Returns a list of available LabyMod versions
- reportCape(owner, reporter) => Reports a users' cape

## Examples

```js
const LabyMod = require('node-labymod');

// Using Promises
LabyMod.getStatus().then(status => console.log(status)); // Prints "OK" if everything is fine
LabyMod.getUser('70d39c44-adbd-442f-a0a3-f29fcb895699').then(user => console.log(user));
LabyMod.reportCape('DomeMilch', 'TiimDE').then(() => console.log('Success!')).catch((err) => console.error(err));

// Or using ASYNC/AWAIT syntax
(async () => {
    console.log(await LabyMod.getStatus());
    console.log(await LabyMod.getUser('70d39c44-adbd-442f-a0a3-f29fcb895699'));

    try {
        await LabyMod.reportCape('DomeMilch', 'TiimDE');
    } catch (err) {
        console.error(err);
    }
})();
```

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
documentation.