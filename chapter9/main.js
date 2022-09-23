/**
 * 비동기 프로그래밍
 * events core module 사용하기
 * listeners === events
 * 
 * setTimeout 함수에서 시간(delay) 인자로 2147483647보다 큰 값 또는 1보다 작은 값을 주면, 시간(delay) 인자에 실제로는 1이 설정됩니다.
 * */ 

 const EventEmitter = require("events"); //events module: file system module

 const emitter = new EventEmitter();
 const emitter2 = new EventEmitter();

 emitter.on("test", (arg1, arg2, arg3) => { 
     console.log(arg1);
     console.log(arg2);
     console.log(arg3);
 });

 emitter.emit("test", "cat", "dog", "bird");

 emitter2.on("test", info => {
    console.log(info);
 });

 emitter2.emit("test", {
    type: "text",
    data: "Hello CondeIt",
    date: "2021-12-19"
 });