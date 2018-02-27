const path = require('path');

module.exports = {
  entries: {
    entry: './data/src/entry.js'
  },
  locales: ['en', 'fr'],
  defaultLocale: 'en', // optional
  localeDir: './data/locale',
  genDir: './data/gen',
  baseDir: path.join(__dirname, '.') // optional
};
