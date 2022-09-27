const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();     
const sql = `SELECT g.hit_song_id AS ID, g.name, DATE_FORMAT(g.debut, '%Y-%m-%d') AS debutDate, s.title
FROM girl_group AS g
JOIN song AS s
ON g.hit_song_id=s.sid; 
`; 
conn.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.ID}\t${row.name}\t${row.debutDate}\t${row.title}`);    
    }   
});
conn.end();



// HS에서 작성한 것
/* SELECT gid, `name`, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, hit_song_id FROM girl_group;  

/* name에 `` 안붙이면 대문자가 되어서 바꿔야함 *//* AS로 이름바꿔줘야함*/   // 위에서는 name에 `` 빼기 (HS) 에서는 사용
/* js에서 쓰려면 생각보다 정교하게 해줘야함(이름도 바꾸고) */
