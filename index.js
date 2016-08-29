'use strict'

module.exports = function(folder, file) {
  return require('./src/main/db/dao/' + folder + '/' + file + '.js');
};