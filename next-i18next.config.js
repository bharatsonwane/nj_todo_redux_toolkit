const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    localeDetection: true,
  },
  localePath: path.resolve('src/utils/locales/languageJson'),
}
