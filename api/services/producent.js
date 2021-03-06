const fs = require('fs');
const path = require('path');
const mysql = require('../config/mysql.js');
const log_to_file = require(path.join(__dirname, '..', 'modules', 'log_to_file.js'));

let sql = ` SELECT
                producent_id,
                producent_navn, 
                producent_info 
            FROM
                producenter `;

module.exports = {
    hent_alle: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(sql,
                [], (err, rows) => {
                    if (err) {
                        log_to_file.message(err.message);
                        reject('sql fejl' + err.message);
                    }
                    if (rows.length == 0) {
                        rows = [];
                    }
                    else {
                        resolve(rows);
                    }
                });
            db.end();
        });
    },

    hent_en: (id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(sql + `WHERE producent_id = ?`,
                [id], (err, rows) => {
                    if (err) {
                        log_to_file.message(err.message);
                        reject('sql fejl' + err.message);
                    }
                    else {
                        resolve(rows[0]);
                    }
                });
            db.end();
        });
    },

    opret_en: (navn, info) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`INSERT INTO producenter 
                        SET 
                            producent_navn = ?, 
                            producent_info = ? `,
                [navn, info], (err, rows) => {
                    if (err) {
                        log_to_file.message(err.message);
                        reject('sql fejl' + err.message);
                    }
                    else {
                        resolve(rows)
                    }
                });
            db.end();
        });
    },

    opdater_en: (navn, info, id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`UPDATE producenter 
                        SET 
                            producent_navn = ?, 
                            producent_info = ? 
                        WHERE 
                            producent_id = ?`,
                [navn, info, id], (err, rows) => {
                    if (err) {
                        log_to_file.message(err.message);
                        reject('sql fejl' + err.message);
                    }
                    else {
                        resolve(rows)
                    }
                });
            db.end();
        });
    },

    slet_en: (id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`DELETE FROM 
                            producenter
                        WHERE producent_id = ?`,
                [id], (err, rows) => {
                    if (err) {
                        log_to_file.message(err.message);
                        reject('sql fejl' + err.message);
                    }
                    else {
                        resolve(rows)
                    }
                });
            db.end();
        });
    }
};