const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();
const sql = `
SELECT * FROM tigers WHERE POSITION=? and isDeleted=0;
`
// 현역이면서 투수인 사람을 조회    // parameter 자리에 값을 넣으면 조회, ?면 검색 
conn.query(sql, ['투수'], (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isdeleted}`);   
    }   
});
conn.end();



