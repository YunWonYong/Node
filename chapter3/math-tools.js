// exports.PI = 3.14;
// exports.add = function (a, b) { return a + b;};
// exports.subtract = function (a, b) { return a - b;};
// exports.multiply = function (a, b) { return a * b;};
// exports.divide = function (a, b) { return a / b;};

module.exports = { //객체 한개를 통으로 리털하려면 module.exports해야한다.
    PI: 3.14,
    add: function (a, b) { return a + b;},
    subtract: function (a, b) { return a - b;},
    multiply: function (a, b) { return a * b;},
    divide: function (a, b) { return a / b;}
};

/* 
Module wrapper function
(function (exports, require, module, __filename, __dirname) {
  // 모듈 코드
});
*/

console.log('exports ------------------------->');
console.dir(exports);
console.log('require ------------------------->');
console.dir(require);
console.log('module ------------------------->');
console.dir(module);
console.log('__filename ------------------------->');
console.dir(__filename);
console.log('__dirname ------------------------->');
console.dir(__dirname);