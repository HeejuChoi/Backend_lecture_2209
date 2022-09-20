const axios = require('axios');
const cheerio = require('cheerio');     // (Python) BeautifulSoup 같은 느낌 

const url = 'https://www.hanbit.co.kr/academy/books/new_book_list.html';
axios.get(url)      // axios는 promise 형태로 되어있음 (일주고 딴일할 수 있음)
    .then(response => {
        //console.log(response.data);     // .data 안치면 전체내용이 나옴 .data 치면 data에 해당하는 html 내용이 나옴 
        const $ = cheerio.load(response.data);

        $('.view_box').each((index, element) => {
            let title = $(element).find('.book_tit').text().trim();
            let author = $(element).find('.book_writer').text().trim();
            author = author.split(',').map(x => x.trim()).join(', ');
            console.log(index+1, '========================================');
            console.log(title);
            console.log(author);
        });
    })
    .catch(err => {
        console.log(err);
    });