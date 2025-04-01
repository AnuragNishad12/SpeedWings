const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      os: false, // Disable the 'os' module
    },
  },
  optimization: {
    minimize: false, // Disable minimization
  },
  module: {
    rules: [
      // Add rules for processing your CSS files here if needed
    ],
  },
};

  