const mysql = require('mysql');
const config = require('./mysql.json');

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
    getList: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers WHERE isDeleted=0`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    insertPlayer: function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO tigers (player, backNo, position)
                VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getPlayer: function(params, callback) {
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers WHERE id=? and isDeleted=0;`;
        conn.query(sql,params, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updatePlayer: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE tigers SET player=?, backNo=?, position=?
                            WHERE id=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deletePlayer: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE tigers SET isDeleted=1 WHERE id=?`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getPlayersByPosition: function(params, callback) {          // 필요한 파라메터
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers WHERE POSITION=?;`;
        conn.query(sql, params, (err, rows, fields) => {              // 콜백 파라메터
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getPlayersOrderByBackNO: function(order, callback) {          // ASC-0, DESC-1
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers WHERE isDeleted=0
                        ORDER BY backNo`;                        // 세미콜론을 뗀다 -> 뒤에 조건에 따라 붙일 수도 안붙일 수도 있어서 
        sql += (order ==1) ? 'DESC;' : ';';                      // order가 1이면 DESC 갖다 붙이고 아니면 없음 
        conn.query(sql, (err, rows, fields) => {              
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getPlayersByOrder: function(field, order, callback) {
        const conn = this.getConnection();
        let sql = `SELECT * FROM tigers WHERE isDeleted=0
        ORDER BY ${field}`;  
        sql += (order ==1) ? 'DESC;' : ';';                      
        conn.query(sql, (err, rows, fields) => {              
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();

    }
}