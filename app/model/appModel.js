'user strict';
var sql = require('../../db.js');

// var async = require('async');
// var await = require('await');
var Promise = require('promise');
//Task object constructor
var Operasi = function(task){
   
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getRekapTindakanOperasi(sd,ed, callback){
    let p = new Promise(function(resolve, reject){
        var txt = "SELECT u.nama,b.dr_operator, d.nama_dokter, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri  ";
txt += "        JOIN dm_ok_gol_operasi op ON op.id = ri.jenis_operasi  ";
txt += "        WHERE op.grup = 'KHUSUS'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ")  ";
txt += "as khusus, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_gol_operasi op ON op.id = ri.jenis_operasi ";
txt += "        WHERE op.grup = 'SEDANG'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
 txt += "   ) ";
txt += ")  ";
txt += "as sedang, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_gol_operasi op ON op.id = ri.jenis_operasi ";
txt += "        WHERE op.grup = 'KECIL'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ")  ";
txt += "as kecil, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_gol_operasi op ON op.id = ri.jenis_operasi ";
txt += "        WHERE op.grup = 'BESAR'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ")  ";
txt += "as besar, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "    JOIN dm_ok_jenis_tindakan dojt ON dojt.id = dot.dm_ok_jenis_tindakan_id ";
txt += "        WHERE dojt.nama = 'CITO'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as cito, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "    JOIN dm_ok_jenis_tindakan dojt ON dojt.id = dot.dm_ok_jenis_tindakan_id ";
txt += "        WHERE dojt.nama = 'ELEKTIF'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as elektif, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "        JOIN dm_kelas k ON k.id_kelas = dot.dm_kelas_id ";
txt += "        WHERE k.kode_kelas_bpjs = 'VIP'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as vip, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "        JOIN dm_kelas k ON k.id_kelas = dot.dm_kelas_id ";
txt += "        WHERE k.kode_kelas_bpjs = 'KL1'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as kelas1, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "        JOIN dm_kelas k ON k.id_kelas = dot.dm_kelas_id ";
txt += "        WHERE k.kode_kelas_bpjs = 'KL2'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as kelas2, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_tindakan dot ON dot.id = ri.tindakan ";
txt += "        JOIN dm_kelas k ON k.id_kelas = dot.dm_kelas_id ";
txt += "        WHERE k.kode_kelas_bpjs = 'KL3'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as kelas3, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_anastesi an ON an.id = ri.jenis_anastesi ";
txt += "        WHERE an.kode = 'LA'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as la, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_anastesi an ON an.id = ri.jenis_anastesi ";
txt += "        WHERE an.kode = 'SAB'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as sab, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_anastesi an ON an.id = ri.jenis_anastesi ";
txt += "        WHERE an.kode = 'GA'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as ga, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_anastesi an ON an.id = ri.jenis_anastesi ";
txt += "        WHERE an.kode = 'EPI'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as epi, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN dm_ok_anastesi an ON an.id = ri.jenis_anastesi ";
txt += "        WHERE an.kode = 'PER'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as per, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN b_pendaftaran b ON b.NODAFTAR = ri.kode_daftar ";
txt += "        JOIN a_golpasien g ON g.KodeGol = b.KodeGol ";
txt += "        WHERE g.NamaGol LIKE '%BPJS%'  ";
txt += "        AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as bpjs, ";
txt += "( ";
txt += "    SELECT COUNT(*) FROM td_ok_biaya bi  ";
txt += "    where  bi.dr_operator = b.dr_operator  ";
txt += "    AND bi.td_register_ok_id IN ( ";
txt += "        SELECT ri.id_ok FROM td_register_ok ri ";
txt += "        JOIN b_pendaftaran b ON b.NODAFTAR = ri.kode_daftar ";
txt += "        JOIN a_golpasien g ON g.KodeGol = b.KodeGol ";
txt += "        WHERE g.NamaGol = 'UMUM'  ";
txt += "       AND tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "    ) ";
txt += ") as umum ";
txt += "FROM td_register_ok r  ";
txt += "JOIN td_upf u ON r.upf = u.id ";
txt += "JOIN td_ok_biaya b ON b.td_register_ok_id = r.id_ok ";
txt += "JOIN dm_dokter d ON d.id_dokter = b.dr_operator ";
txt += "WHERE r.tgl_operasi between '"+sd+"' and '"+ed+"' ";
txt += "GROUP BY u.nama,b.dr_operator,d.nama_dokter ORDER BY u.nama; ";

        sql.query(txt,[],function(err, res){
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });

    p.then(result =>{
        callback(null,result);
    })
    .catch(err=>{
        console.log(err);
        callback(err,null);
    });
    
}


Operasi.getRekapTindakanOperasi = getRekapTindakanOperasi;
module.exports= Operasi;