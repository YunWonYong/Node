/**
 * 서버 만들어 보기
 * http: protocol 통신 규약
 * 
 * 127.0.0.1 request
 * Notable     well-known port numbers
 * Number	      Assignment
 * 20	         File Transfer Protocol (FTP) Data Transfer
 * 21	         File Transfer Protocol (FTP) Command Control
 * 22	         Secure Shell (SSH) Secure Login
 * 23	         Telnet remote login service, unencrypted text messages
 * 25	         Simple Mail Transfer Protocol (SMTP) email delivery
 * 53	         Domain Name System (DNS) service
 * 67, 68	   Dynamic Host Configuration Protocol (DHCP)
 * 80	         Hypertext Transfer Protocol (HTTP) used in the World Wide Web
 * 110	      Post Office Protocol (POP3)
 * 119	      Network News Transfer Protocol (NNTP)
 * 123	      Network Time Protocol (NTP)
 * 143	      Internet Message Access Protocol (IMAP) Management of digital mail
 * 161	      Simple Network Management Protocol (SNMP)
 * 194	      Internet Relay Chat (IRC)
 * 443	      HTTP Secure (HTTPS) HTTP over TLS/SSL
 * 546, 547	   DHCPv6 IPv6 version of DHCP
 * */ 

 const http = require("http"); // http core module

 let server = http.createServer((request, response) =>{
    response.end('<h1>Hello world!</h1>');
 });

 server.listen(3000); // 3000 == portNumber