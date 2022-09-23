/**
 * 라우팅(routing)해보기
 * 
 */
 const http = require("http"); // http core module

 const users = ["Tom", "Andy", "Jessica", "Paul"];
 let server = http.createServer((request, response) => {

    if (request.url === "/") {
        response.end("<h1>Welcome!</h1>");
    } else if (request.url === "/users") {
        response.end("<h1>"+ users +"</h1>");
    } else {
        response.end("<h1>Page Not Avaliable</h1>");
    }
 });

 server.listen(3000); // 3000 == portNumber