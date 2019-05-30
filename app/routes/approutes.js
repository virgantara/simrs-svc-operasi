'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/ok/count/tahunan')
    .get(todoList.getTotalOperasiTahun);

  app.route('/ok/rekap/operator')
    .get(todoList.getRekapOperator);

  app.route('/ok/upf/anastesi')
    .get(todoList.getRekapAnastesi);

  app.route('/ok/upf/citoelektif')
    .get(todoList.getCitoElektif);

  app.route('/ok/jasa/rs')
    .get(todoList.getJasaRS);

  app.route('/ok/rekap/bulanan')
    .get(todoList.getRekapTindakanOperasi);

};