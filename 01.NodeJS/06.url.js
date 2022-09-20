const url = require('url');

const urlSample = 'https://www.hanbit.co.kr/academy/books/book_view.html?p_code=B6505632990'
const parseObject = url.parse(urlSample);

console.log(parseObject);
console.clear();
console.log(parseObject.href);          // https://www.hanbit.co.kr/academy/books/book_view.html?p_code=B6505632990
console.log(parseObject.query);         // p_code=B6505632990