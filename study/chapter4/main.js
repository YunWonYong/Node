/**
 * module API의 종류
 * 1. core module: node만 있으면 사용할 수 있음
 * https://nodejs.org/dist/latest-v12.x/docs/api/
 * https://kangax.github.io/compat-table/es6/
 * */ 

const fs = require("fs"); //core module: file system module

let fileList = fs.readdirSync(".");
console.log(fileList);

fs.writeFileSync("new", "Hello Node.js!"); // 파일 생성

const os = require("os");

console.log(os.cpus());