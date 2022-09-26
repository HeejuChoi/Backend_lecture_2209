const mysql = require('mysql');
const config = require('./mysql.json');

const connection = mysql.createConnection(config);      // DB와 프로그램이 접속


connection.connect();               // MySQL DB에 접속 // 사이에 원하는 작업을 하면 됨 // ``로 작성해서 몇 줄이 되든 상관없도록 하기 
const sql = `SELECT * FROM city WHERE population > 9000000;`;       // HS에서 쓰는거 여기서도 동일하게 작성하면 됨 
connection.query(sql, (err, rows, fields) => {              // 조회할게 있으면 3개, 없으면 2개
    if (err)
        throw err;
    // console.log(rows);          // rows : 배열 타입
    for (let row of rows) {
        const str = `${row.ID}\t${row.Name}\t${row.CountryCode}\t${row.District}\t${row.Population}`
        console.log(str);
    }

    // console.log(fields);
})  
connection.end();                   // MySQL DB 접속 해제