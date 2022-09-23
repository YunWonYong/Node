/**
 * module: 전체를 이루는 각가의 부품
 * JavaScript 파일 = module
 * module의 핵심: module들을 잘 갖다 쓰기!
 * exports를 사용하여 외부 파일에서 찾아 쓸 수 있게 설정
 * 해줘야함.
 * */ 

const add = (a, b) => a + b;
const PI = 3.14;
let author = "ywy";
let test = {
    date: "2020-09-20",
    types: ["safetyTest", "performanceTests"],
    printTypes() {
        for ( const index in  this.types ){
            console.log(this.types[index]);
        }
    }
};

exports.add = add; // exports.[여기에 입력한 이름으로 사용할 수 있음(별칭 같은거)]
exports.PI = PI;
exports.author = author;
exports.test = test;


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