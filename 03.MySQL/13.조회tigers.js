const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();     // MySQL DB에 접속
const sql = `SELECT * FROM tigers;`;
conn.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isdeleted}`);   // column명을 제대로 쓰지 않으면 undefined가 나옴 
    }   
});
conn.end();