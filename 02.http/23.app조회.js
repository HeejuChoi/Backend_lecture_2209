const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const view = require('./view/index');
const template = require('./view/template');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query;             // 쿼리스트링 불러오기 위해서
    switch(pathname) { 
    case '/':
        if (query.id === undefined) { // 초기화면
            fs.readdir('data', (err, files) => {                     // data의 err와 files를 읽음
                const title = '웹기술';                              // 초기화면에 들어갈 title
                const list = template.listGen(files);                // 홈 화면에는 들어올게 많아서 따로 template에 작성해서 빼놓는다.
                const content = template.HOME_CONTENTS.replace('\n','<br>');              // 초기화면에 들어갈 초기 데이터
                const html = view.index(title, list, content);
                res.end(html);
            }); 
        } else { // 개별 아이템에 대한 화면
            fs.readdir('data', (err, files) => {                     // data의 err와 files를 읽음
                const title = query.id;                              // query의 id 값으로 타이틀이 만들어짐 
                const list = template.listGen(files);                
                const filename = `data/${query.id}.txt`;             // 이번엔 파일에서 읽어서 content를 가져와야해서 HOME_TEMPLATE이랑 다름 
                fs.readFile(filename, 'utf-8', (err, data) => {
                    let content = data.replace('\n','<br>');          // content에서 /n을 <br>로 변경하겠다. 
                    const html = view.index(title, list, content);
                    res.end(html);
                });
            }); 
        }
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }

}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});