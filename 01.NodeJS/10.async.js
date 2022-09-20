const async = require('async');
const fs = require('fs');

/* 아래 코드는 순서보장이 안됨
fs.readFile('tmp/a.txt', 'utf-8', (err, bufA) => {
    console.log(bufA);
});
fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
    console.log(bufB);
});
fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
    console.log(bufC);
});

async.parallel({
    bufA: function(callback) {
        fs.readFile('07.File/tmp/a.txt', 'utf-8', callback);
    }
}) */

async.parallel({
    bufA:   function(callback) {
        fs.readFile('07.File/tmp/a.txt', 'utf-8', callback);
    },
    bufB:   function(callback) {
        fs.readFile('07.File/tmp/b.txt', 'utf-8', callback);
    },
    bufC:   function(callback) {
        fs.readFile('07.File/tmp/c.txt', 'utf-8', callback);
    }
}, (err, results) => {
    console.log(results.bufA);
    console.log(results.bufB);
    console.log(results.bufC);
});