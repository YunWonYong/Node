/**
 * 비동기 프로그래밍
 * events core module 사용하기
 * listeners === events
 * */ 

 const EventEmitter = require("events"); //events module: file system module

 const emitter = new EventEmitter();
 const emitter2 = new EventEmitter();
 //emit: 발송하다, 발생시키다.
 
 emitter.emit("test"); // 순서가 중요함 실행하면 아무런 반응 없음
 
 emitter.on("test", () => { 
     console.log("1!");
 });
 
 emitter.on("test", () => { 
    console.log("2!");
 });

 emitter.on("test", () => { 
    console.log("3!");
 });

 emitter2.on("test", ()=> {
    console.log("4!");  
 });

 emitter.emit("test"); // instance기준으로 이벤트가 실행됨
 emitter2.emit("test"); // 이벤트 명이 같아도 instance가 다르면 의미 없음

 emitter.once("test2", () => { // 딱 한번만 실행됨.
    console.log("test2 once function");
 });
 emitter.emit("test2");
 emitter.emit("test2");
 emitter.emit("test2");

 console.log(emitter.listeners("test", "test2"));

 const offFuntionTest = new EventEmitter();

 const fn = () => console.log('A');
 offFuntionTest.on("test", fn);
 offFuntionTest.off("test", fn);
 offFuntionTest.emit("test");

 const fns = [
    () => console.log('A'),
    () => console.log('B')
];
offFuntionTest.on("test", fns[0]);
offFuntionTest.on("test", fns[1]);
offFuntionTest.off("test", fns[0]);
offFuntionTest.off("test", fns[1]);

 offFuntionTest.emit("test");