const axios = require('axios');
const cheerio = require('cheerio');     // (Python) BeautifulSoup 같은 느낌 

const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001';
axios.get(url)      // axios는 promise 형태로 되어있음 (일주고 딴일할 수 있음)
    .then(response => {
        //console.log(response.data);     // .data 안치면 전체내용이 나옴 .data 치면 data에 해당하는 html 내용이 나옴 
        const $ = cheerio.load(response.data);

        $('.listItem singleType').each((index, element) => {
            let title = $(element).find('.itemName').text().trim();  // trim() -> 공백은 버린다. 
            let author = $(element).find('.itemMeta').text().trim();
            author = author.split(',').map(x => x.trim()).join(', '); // 저자와 역자를? 
            console.log(index+1, '========================================');
            console.log(title);
            console.log(author);
        });
    })
    .catch(err => {
        console.log(err);
    });