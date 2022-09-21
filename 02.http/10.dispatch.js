const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

        let pathname = url.parse(req.url).pathname;
        if (pathname === '/') {                 // pathname이 루트면 아래 내용을 해라 
            fs.readFile('view/03.helloWorld.html', 'utf-8', (err, html) => {
                res.writeHead(200, {'Content-Type': 'text/html'});      // writeHead : response 객체의 메소드에서 헤더 정보를 응답에 작성해서 내보내는 것 
                res.end(html);                                          // end : response 객체의 메소드에서 본문 정보를 응답에 작성해서 내보내는 것
            });
        } else if (pathname === '/image') {
            fs.readFile('media/고양이.jpg', (err, image) => {
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.end(image);
            });
        } else if (pathname === '/audio') { 
            fs.readFile('media/file_example_MP3_700KB.mp3', (err, audio) => {
                res.writeHead(200, {'Content-Type': 'audio/mp3'});
                res.end(audio);
            });
        } else if (pathname === '/video') {
            fs.readFile('media/file_example_MP4_480_1_5MG.mp4', (err, video) => {
                res.writeHead(200, {'Content-Type': 'video/mp4'});
                res.end(video);
            });
        } else {        // 루트 이외의 것은 404를 띄워라   // 이게 없으면 뒤에 다른거 써도 그냥 pathname이 뭔지 알려줌
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }


});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

