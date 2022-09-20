console.log('process.env:', process.env);       // 환경 설정 
console.clear();
console.log(process.env.COMPUTERNAME);

console.log('process.version:', process.version);        // NodeJS version
console.log('process.arch:', process.arch);
console.log('process.platform:', process.platform);
console.log('process.argv:', process.argv); 

process.exit(0); // 이 이후의 코드들은 실행 불가 // 정상종료, 코드값이 -1은 비정상 종료

console.log('프로세스');        // unreachable

// Hoisting (선언한 함수와 변수들은 프로그램 실행할 때 맨위로 올라감 / 위치는 여기여도 함수와 변수의 실행은 제일 꼭대기로 올라감)
// 어느 위치에 있어도 
function aa() {
    let a = 2;
    return a;
    let b = 3;      // unreachable
}
var a = 5;