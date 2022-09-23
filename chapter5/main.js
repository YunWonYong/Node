/**
 * module API의 종류
 * 2. Thrid-party: 다른 개발자들이 만든 모듈들
 * (오픈 저장공간에서 제공함)
 * npm[Node Package Manager]를 사용하여 다운받음.
 * - npm install cowsay
 * */ 

const cowsay = require("cowsay"); //Thrid-party module: cowsay

console.log(cowsay.say(
    {
        text: "I love javascript"
    }
));

// __________________
// < I love javascript >
//  -------------------
//         \   ^__^
//          \  (oo)\_______
//             (__)\       )\/\
//                 ||----w |
//                 ||     ||_