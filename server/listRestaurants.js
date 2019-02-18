const fs = require('fs');
const path = require('path');

module.exports = function listRestaurants() {
  const files = fs.readdirSync(path.join(__dirname, '../data/'));

  const restaurants = files.map(file => path.basename(file, '.json'));

  return restaurants;
};
