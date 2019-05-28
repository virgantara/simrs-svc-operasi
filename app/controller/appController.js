'use strict';

var Operasi = require('../model/appModel.js');

var response = require('../../res.js');

exports.getRekapTindakanOperasi = function(req, res) {
  Operasi.getRekapTindakanOperasi(req.query.sd, req.query.ed,function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};