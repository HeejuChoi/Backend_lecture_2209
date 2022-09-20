const http = require('http');

const server = http.createServer((req, res) => {
    const cookie = req.headers.cookie;
    console.log(req.headers.cookie);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['breakfast=toast', 'dinner=bibimbab']
    });
    res.end(`<h1>${cookie}</h1>`);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})

// cookie 정보가 없어서 처음에는 undefined 라고 뜸 
// 새로고침하면 'Set-Cookie' 부분 내용이  출력됨 / 이후로 한동안은 cookie 유지됨 
// Cookie를 활용해서 로그인 기능을 만들 수 있다. 