const fs = require('fs');

// console.log('순서 보장 방법');
fs.readFile('../07.File/tmp/a.txt', 'utf-8', (err, bufA) => {
    fs.readFile('../07.File/tmp/b.txt', 'utf-8', (err, bufB) => {
        console.log(bufB);
        fs.readFile('../07.File/tmp/c.txt', 'utf-8', (err, bufC) => {
            console.log(bufC);
        });
    });
    console.log(bufA);
});