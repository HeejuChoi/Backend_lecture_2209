function delayP(index, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(index + ' 성공');
        }, ms);
    });
}       // reject는 일단 여기서 생략

delayP(1,1000)
    .then(value => {
        console.log(value);
        return delayP(2, 1000);
    })
    .then(value => {
        console.log(value);
        return delayP(3, 1000);
    })
    .then(console.log);