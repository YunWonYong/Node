/**
 * 비동기 프로그래밍
 * node는 비동기 실행 환경임 비동기를 권장함.
 * node는 process 프로세스고
 * node를 통한 비동기 작업은 Thread
 * node는 libuv 라이브러리를 사용하여 비동기 통신을 구현함
 * 대신  node.js는 mainThread CPU intensive job 작업을
 * 하면 성능을 극도로 저하시키니 주의하자!
 * */ 

const fs = require("fs"); //core module: file system module

console.log("1.start");

//Synchronous
let content = fs.readFileSync("./new", "utf8"); // 동기 실행

console.log(content);

console.log("1.Finish");

console.log("===========================");

console.log("2.start"); // 1

//Asynchronous
fs.readFile( // 2
    "./new",
    "utf8", 
    (err, data) => { // 4 callback Function 
        console.log(data);
    }
); // 비동기 실행

console.log("2.Finish");// 3
