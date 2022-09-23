/**
 * math-tools.js에서 exports를 안했으면 오류남
 * require 함수의 인자로 불러오고 싶은 파일의 상대 
 * 경로를 넣어줘야하고 .js 확장자는 생략 가능
 * 
 * */ 

const math = require("./math-tools.js"); //moduleload

console.log(math.PI);
console.log(math.add(1, 3));
console.log(math.subtract(1, 3));
console.log(math.multiply(1, 3));
console.log(math.divide(1, 3));
