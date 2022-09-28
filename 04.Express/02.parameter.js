const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// http://localhost:3000/query?id=123
app.get('/query', (req, res) => {       // callback 함수에 올 수 있는 인자는 req, res 두 가지임
    const id = req.query.id;            // ?id=123      // query : request의 객체
    res.send(`<h1>/query: id - ${id}</h1>`);

})
// http://localhost:3000/params/id/123         
app.get('/params/id/:id', (req, res) => {
    const id = req.params.id;           // /:id         // params : request의 객체 
    res.send(`<h1>/params/id: id - ${id}</h1>`);
});


app.get('*', (req, res) => {          
    res.status(404).send('Path not found.');
}); 

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});