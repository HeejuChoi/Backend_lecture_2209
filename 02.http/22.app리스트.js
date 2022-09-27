const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const view = require('./view/index');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    switch(pathname) { 
    case '/':
        fs.readdir('data', (err, files) => {        // data의 err와 files를 읽음
            let list = '';              // list를 빈 string으로 만든다.
            for (let file of files) {
                const title = file.substring(0, file.length-4)              // 제목에서 .txt를 제외한 나머지를 구함 
                list += `<li><h3><a href="/?id=${title}">${title}</a></h3></li>`;
            }
            const html = view.index(list);
            res.end(html);
        }); 

        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }

}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});