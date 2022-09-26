const fs = require('fs');
const mysql = require('mysql');
const config = require('./mysql.json');
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country Code</th>
            <th>District</th>
            <th>Population</th>
        </tr>
        
`;

const connection = mysql.createConnection(config);      // DB와 프로그램이 접속


connection.connect();               // MySQL DB에 접속 // 사이에 원하는 작업을 하면 됨 // ``로 작성해서 몇 줄이 되든 상관없도록 하기 
const sql = `SELECT * FROM city WHERE population > 9000000;`;       // HS에서 쓰는거 여기서도 동일하게 작성하면 됨 
connection.query(sql, (err, rows, fields) => {              // 조회할게 있으면 3개, 없으면 2개
    if (err)
        throw err;
    for (let row of rows) {
        let line = '<tr>';
        line +=`<td>${row.ID}</td><td>${row.Name}</td><td>${row.CountryCode}</td><td>${row.District}</td><td>${row.Population}`
        line += '</tr>\n';
        html += line;
    }
    html += `
    </table>
</body>
</html>
    `;
    fs.writeFile('12.table.html', html, err => {        // html 파일을 만들어 줌 

    });
})  
connection.end();                   // MySQL DB 접속 해제