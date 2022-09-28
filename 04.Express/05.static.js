const express = require('express');
const fs = require('fs');
const ejs = require('ejs');         // Extended javaScript -> 템플릿 엔진 
const app = express();

app.use(express.static(__dirname + '/public'));         // html 연결하기위해 작성 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.send(`<h1>Static</h1>`);
});

app.get('/static', (req, res) => {
    fs.readFile('views/05.static.html', 'utf8', (err, html) => {        // 변수를 줄 수 없음 
        res.send(html);
    });
});

app.get('/ejs', (req, res) => {     // 변수를 줄 수 있음 
    ejs.renderFile('./views/05.static.ejs', {data: 'EJS에서 보내는 데이터'}, (err, html) => {
        res.send(html);
    });
});

app.get('*', (req, res) => {          
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});