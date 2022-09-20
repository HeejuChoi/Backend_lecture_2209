// Promise
// Producer
function delayP(ms) {
    return new Promise((resolve, reject) => {   // 콜백함수 // resolve : 성공했을 때 실행되는 callback 함수 / reject: 실패했을 때 실행되는 callback 함수
        try {
            setTimeout(() => {
                resolve('성공');
            }, ms);
        } catch(e) {
            reject('실패');
        }
    });
}

// Consumer
delayP(1000)
    // .then((val) => {
    //     console.log(val);       // 성공 
    // })
    .then(console.log)
    .catch(console.log); // err => {console.log(err)}; 이렇게 써야되는데 앞부분 처럼 써도 됨