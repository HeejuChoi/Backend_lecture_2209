const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();
let sql = `
    INSERT INTO tigers (player, backNO, POSITION)
	VALUES ('한승택', 4, '포수');
`;
conn.query(sql, (err, fields) => {  // 가져올게 없어서 rows는 작성 X?
    if (err) 
        throw err;
    sql = `SELECT * FROM tigers;`;              // 변경된 사항을 확인하기 위해서 끌어옴 
    conn.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        for (let row of rows) {
            console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isdeleted}`);   // column명을 제대로 쓰지 않으면 undefined가 나옴 
        }   
    });
    conn.end();  // query가 다끝난 다음에 날려라? 
});






