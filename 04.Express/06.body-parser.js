const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.static(__dirname + '/public'));         // html 연결하기위해 작성 
app.use(bodyParser.urlencoded({extended: false}));      // body-parser을 쓰겠다고 설정해두는 것 

app.get('/', (req, res) => {
    res.send(`<h1>Body-parser</h1>`);
});

app.get('/login', (req, res) => {
    fs.readFile('views/06.login.html', 'utf8', (err, html) => {        // 변수를 줄 수 없음 
        res.send(html);
    });
});

app.post('/login', (req, res) => {
    const uid = req.body.uid;
    const pwd = req.body.pwd;
    res.send(`<h1>사용자ID: ${uid}, 패스워드: ${pwd}</h1>`);
});

app.get('*', (req, res) => {          
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});