const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let query = url.parse(req.url, true).query;
    // query스트링 : URL 끝에 물음표로 시작하는 문자열 / let query로 정보담을 변수 만든 후 정보를 담으려는 것 
    // console.log(query);
    // localhost:3000?name=admin&region=asia
    console.log(query.name, query.asia);

    res.end(`<h1>${JSON.stringify(query)}</h1>`)
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

// localhost:3000?qs=querystring&name=admin
// 위 내용 치면 화면에 {"qs":"querystring","name":"admin"}