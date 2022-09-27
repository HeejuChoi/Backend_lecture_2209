const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();
let sql = `
    INSERT INTO tigers (player, backNO, POSITION)
	VALUES (?, ?, ?);`;
const params = ['박준표', 31, '투수'];   // params에 있는 데이터를 ?에 맞춰서 넣어줘라 

conn.query(sql, params, (err, fields) => {  
    if (err) 
        throw err;
    sql = `SELECT * FROM tigers;`;              
    conn.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        for (let row of rows) {
            console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isdeleted}`);  
        }   
    });
    conn.end(); 
});

// 이렇게 해야 연동이 가능함 
// 입력 폼 -> (POST) parameter 읽음 -> DB로 보내줌 





