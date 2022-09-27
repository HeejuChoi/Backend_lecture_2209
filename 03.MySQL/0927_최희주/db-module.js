const mysql = require('mysql');
const config = require('../mysql.json');

module.exports = {
    getConnection : function() {
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.log('mysql connetion error');
                console.log(err);
            }
        });
        return conn;
    },
    girlGroupList: function(callback) {
        const conn = this.getConnection();  // mysql과 this 차이 
        const sql = `SELECT g.gid, g.name, DATE_FORMAT(g.debut, '%Y-%m-%d') AS debutDate, s.title 
        FROM girl_group AS g
        JOIN song AS s
        ON g.hit_song_id=s.sid;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    songList: function(callback) {
        const conn = this.getConnection();  
        const sql = `SELECT s.sid, s.title, s.lyrics, g.name 
        FROM girl_group AS g
        JOIN song AS s
        ON g.hit_song_id=s.sid;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getGirlGroup: function(params, callback) {
        const conn = this.getConnection();
        const sql = `SELECT g.gid, g.name, DATE_FORMAT(g.debut, '%Y-%m-%d') AS debutDate, s.title
        FROM girl_group AS g
        JOIN song AS s
        ON g.hit_song_id=s.sid
        WHERE g.gid=?;`;
        conn.query(sql,params, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `SELECT s.sid, s.title, s.lyrics, g.name
        FROM girl_group AS g
        JOIN song AS s
        ON g.hit_song_id=s.sid
        WHERE s.sid=?;`;
        conn.query(sql,params, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    insertGirlGroup: function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO girl_group
        (gid, name, debut, hit_song_id)
        VALUES (?, ?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getAllGirlGroup: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, hit_song_id 
        FROM girl_group;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updateGirlGroup: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE girl_group 	
        SET NAME=?, debut=?, hit_song_id=?
        WHERE gid=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deleteGirlGroup: function(params, callback) {
        const conn = this.getConnection();
        const sql = `DELETE FROM girl_group 
        WHERE gid=?`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO song
        (sid, title, lyrics)
        VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getAllSong: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT sid, title, lyrics 
        FROM song;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE song 	
        SET title=?, lyrics=?
        WHERE sid=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deleteSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `DELETE FROM song 
        WHERE sid=?`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
}