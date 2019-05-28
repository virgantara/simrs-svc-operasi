'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/ok/rekap/bulanan')
    .get(todoList.getRekapTindakanOperasi);

};