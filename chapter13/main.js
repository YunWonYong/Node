/**
 * 라우팅(routing)해보기
 * 
 */
 const http = require("http"); // http core module

 const users = ["Tom", "Andy", "Jessica", "Paul", "Test"];
 let server = http.createServer((request, response) => {
    const url = request.url;
    const paths = url.split("/");
    let responseMsg = null;
    if (url === "/") {
        responseMsg = "<h1>Welcome!</h1>"; 
    } else if (url === "/users") {
        responseMsg = `<h1>${users}</h1>`;
    } else if (paths[1] === "users") {
        responseMsg = `<h1>${users[paths[2] - 1]}</h1>`;
    } else {
        responseMsg = "<h1>Page Not Avaliable</h1>";
    }
    response.end(responseMsg);
 });

 server.listen(3000); // 3000 == portNumber