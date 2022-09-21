const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let method = req.method;
    console.log(pathname, method);

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(`<h1>${method}: ${pathname}</h1>`);
}); 

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


// 아무것도 안하면 / 나옴(루트)
// 뒤쪽에 /file 같은거 붙이면 pathname이 /file로 출력됨 


// pathname, method 넣으면 GET: / 으로 나옴