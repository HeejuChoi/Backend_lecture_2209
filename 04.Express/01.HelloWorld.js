const express = require('express');
const app = express();

// use - express가 뭔가를 사용하겠다. / Middleware 적용
// http method - get, post, (put, delete,) all / 괄호에 있는건 잘 안씀 
// listen - 대기

// http에서는 하나로 묶여있는데 express는 모듈을 조각낼 수 있음

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});


// routing path 별 처리해주는 함수
app.get('/aaa', (req, res) => {
    res.send('<h1>Hello World</h1>');
});
app.get('/bbb', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// Status code 404 / 아래 두 줄은 무조건 고정 
app.get('*', (req, res) => {            // * : 앞에서 진행하지 않은 모든 것 / 404 에러가 난 것 / 맨 위에 가면 안됨, listen 바로 위에 온다. 
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});