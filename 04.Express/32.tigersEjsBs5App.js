const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');   // view에 대해서 하기 때문에 module은 크게 상관없음
const pm = require('path');      // path module     / head의 공통된 부분 줄이기 위해 

const app = express();
app.use(express.static(__dirname + '/public'));         // html 연결하기위해 작성 
app.use(bodyParser.urlencoded({extended: false}));      // body-parser을 쓰겠다고 설정해두는 것 
const path = pm.join(__dirname, 'views/common');

app.get('/', (req, res) => {
    const menu = {ho:1, cr:0, up:0};
    dm.getList(rows => {
        ejs.renderFile('views/32.index.ejs', {
            menu, path, rows                    // {path:path, rows:rows} 
        }, (err, html) => {  
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    const menu = {ho:1, cr:0, up:0};
    ejs.renderFile('views/32.create.ejs', {
        path, menu
    }, (err, html) => {
        res.send(html);
    });
});

app.post('/create', (req, res) => {
    const player = req.body.player;     
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player, backNo, position], () => {
        res.redirect('/')
    });
});

app.get('/update/:id', (req, res) => {          // http://localhost:3000/update/id/123
    const id = parseInt(req.params.id);
    const menu = {ho:0, cr:0, up:1};
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/32.update.ejs', {
            menu, path, id, player, backNo, position        // id:id, player:player, backNo:backNo, position:position
        }, (err, html) => {
            res.send(html);
        });
    });
});

app.post('/update', (req, res) => {
    const id = req.body.id;
    const player = req.body.player;
    const backNo = req.body.backNo;
    const position = req.body.position;
    dm.updatePlayer([player, backNo, position, id], () => {
        res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {      // http://localhost:3000/delete/id/123
    const id = parseInt(req.params.id);
    ejs.renderFile('views/32.delete.ejs', {
        path, id
    }, (err, html) => {
        res.send(html);
    });
});

app.get('/deleteConfirm/:id', (req, res) => {       // http://localhost/deleteConfirm/123
    const id = parseInt(req.params.id);
    dm.deletePlayer(id, () => {
        res.redirect('/');
    });
});

app.get('*', (req, res) => {          
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});