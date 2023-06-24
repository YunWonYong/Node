/**
 * 비동기 프로그래밍
 * events core module 사용하기
 * listeners === events
 * */ 

 const EventEmitter = require("events"); //events module: file system module

 const emitter = new EventEmitter();
 
 emitter.on("test", () => {
     console.log("Success!");
 });
 
 //emit: 발송하다, 발생시키다.
 emitter.emit("test");

