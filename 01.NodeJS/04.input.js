const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,               // standard input, termianl(keyboard)          
    output: process.stdout              // standard output, terminal(monitor)
});
r1.setPrompt('숫자를 입력하세요.> ');
r1.prompt();

// 위는 초반 세팅

// I/o (input, 파일 읽기/쓰기, 데이터 통신 등) 작업은 콜백함수에서 처리함 
r1.on('line', buf => {              // 숫자를 입력하고 엔터 키를 쳤을 때 발생하는 이벤트
    let num = parseInt(buf);
    let evenOdd = (num % 2 == 0) ? '짝수' : '홀수';
    console.log(`입력한 숫자는 ${num}이고, ${evenOdd}입니다.`);

    r1.close()           // 끝낼 때 반드시 처리해야 함
}) 



// 일반적으로 input()을 받은 후 input을 처리하는 프로그램 
// 자바스크립트, NodeJS는 입력을 받으면 callback함수로 입력을 처리하는 프로그램을 작성하도록 되어있음 
// (그래서 클라이언트단에서 사용할 때는 윗 줄처럼 되지 않게 처리함)