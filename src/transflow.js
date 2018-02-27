/**
 *
 * @param {Object} options
 * @param {String[]} options.locales
 * @param {Object} options.entries
 * @param {String} options.genDir
 * @param {String} options.localeDir
 * @param {String} [options.defaultLocale]
 * @param {String} [options.baseDir]
 */
const transflow = (options) => {

  const getTranslationsFromObject = require('./translations-from-object');
  const updateTranslationsFile = require('./update-translations-file');
  const po2json = require('./po2json');
  const path = require('path');

  const dirs = {
    base: options.baseDir || process.cwd()
  };

  dirs.locales = path.join(dirs.base, options.localeDir || 'locale');
  dirs.gen = path.join(dirs.base, options.genDir || 'gen');

  for(let entry in options.entries) {
    if(options.entries.hasOwnProperty(entry)) {
      const entryPath = path.join(dirs.base, options.entries[entry]);
      // eslint-disable-next-line
      const src = require(entryPath);
      const translations = getTranslationsFromObject(src);
      options.locales.forEach(locale => {
        updateTranslationsFile(translations, `${dirs.locales}/${locale}/${entry}.po`);
        po2json(
          src,
          translations,
          `${dirs.locales}/${locale}/${entry}.po`,
          `${dirs.gen}/${locale}/${entry}.json`
        )
      });
    }
  }
};

const Translation = require('./translation');

transflow.t = (opts) => new Translation(opts);

module.exports = transflow;
