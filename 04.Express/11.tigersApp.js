const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const template = require('./views/tigers-template');

const app = express();
app.use(express.static(__dirname + '/public'));         // html 연결하기위해 작성 
app.use(bodyParser.urlencoded({extended: false}));      // body-parser을 쓰겠다고 설정해두는 것 

app.get('/', (req, res) => {
    dm.getList(rows => {
        const trs = template.trsGen(rows);
        const html = template.home(trs);
        res.send(html);
    });
});

app.get('/create', (req, res) => {          // 입력폼
    const html = template.createForm();
    res.send(html)                  // create를 눌렀을 때 save를 함 
})
app.post('/create', (req, res) => {
    const player = req.body.player;     // bodyParser라는 미들웨어를 추가해서 편리해짐 
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player, backNo, position], () => {
        res.redirect('/')
    });
});
app.get('/update', (req, res) => {          // http://localhost:3000/update?id=123
    const id = parseInt(req.query.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        const html = template.updateForm(id, player, backNo, position);
        res.send(html);
    })
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

app.get('/delete', (req, res) => {      // http://localhost:3000/delete?id=123
    const id = parseInt(req.query.id);
    const html = template.deleteForm(id);
    res.send(html);
});

app.get('/deleteConfirm', (req, res) => {
    const id = parseInt(req.query.id);
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