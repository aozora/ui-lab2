const path = require('path');

module.exports = {
  target: 'serverless',
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  future: {
    webpack5: true
  }
};
