const fs = require('fs');


// 순서 보장이 안됨 
fs.readFile('tmp/a.txt', 'utf-8', (err, bufA) => {
    console.log(bufA);
});
fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
    console.log(bufB);
});
fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
    console.log(bufC);
});

// 순서 보장 방법 
// console.log('순서 보장 방법 1'); ==> callback 지옥(JS를 잘하려면 callback지옥에서 벗어나는 방법을 알아야함) 
fs.readFile('tmp/a.txt', 'utf-8', (err, bufA) => {
    console.log(bufA);
    fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
        console.log(bufB);
        fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
            console.log(bufC);
        });
    });
});

// console.log('순서 보장 방법 2');
fs.readFile('tmp/a.txt', 'utf-8', (err, bufA) => {
    fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
        fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
            console.log(bufA);
            console.log(bufB);
            console.log(bufC);
        });
    });
});