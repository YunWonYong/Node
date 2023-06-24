/**
 * express로 라우팅(routing)하기
 * Thrid-party: expressFramework module
 * 
 */
 const express = require("express"); // express module
 const app = express();
 const users = ["tom", "Andy", "Jessica", "Paul"];

 app.get("/", (request, response) => {
    response.end("<h1>Welcome!</h1>");
 });

 app.get("/users", (request, response) => {
    response.end('<h1>${users}</h1>');
 });

 app.get("/users/:id", (request, response) => {
     console.log(request.params);
     response.end(`<h1>${users[request.params.id - 1]}</h1>`);
 });

 app.get("*", (request, response) => {
    response.end("<h1>Page Not Available</h1>");
 });

 app.listen(3000);