const express = require('express');
const app = express();

// nodemon -> node로만 불러오면 서버를 껐다 켜야했는데 nodemon은 리로딩만 하면 바뀜 

app.get('/', (req, res) => {
    const agent = req.header('User-Agent');
    res.send(`<h3>User-Agent: ${agent}</h3>`);
});

app.get('/set/:key/value/:value', (req, res) => {       // 개발자 모드에서 header(control data)에 우리가 원하는 정보를 넣고 싶을 때 사용 
    const key = req.params.key;
    const value = req.params.value;
    res.set(key, value);
    res.send(`<h3>key:${key}, value:${value}</h3>`)
});

app.get('*', (req, res) => {          
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});