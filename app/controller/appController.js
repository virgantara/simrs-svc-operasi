'use strict';

var Operasi = require('../model/appModel.js');

var response = require('../../res.js');

exports.getTotalOperasiTahun = function(req, res) {
  Operasi.getTotalOperasiTahun(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.getRekapOperator = function(req, res) {
  Operasi.getRekapOperator(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.getRekapAnastesi = function(req, res) {
  Operasi.getRekapAnastesi(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.getCitoElektif = function(req, res) {
  Operasi.getCitoElektif(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.getJasaRS = function(req, res) {
  Operasi.getJasaRS(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.getRekapTindakanOperasi = function(req, res) {
  Operasi.getRekapTindakanOperasi(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};