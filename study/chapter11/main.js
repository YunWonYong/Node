/**
 * 서버 만들어 보기
 * http: protocol 통신 규약
 * 
 * 127.0.0.1 request
 * 
 * protocol의 종류 : ftp, telnet, ssh, pop3, smtp, http, https
 * 
 * URL[Uniform Resource Locator]
 * http://example.com/business/item?category=14&id=2965
 * http: 스킴(scheme)-> protocol name
 * 
 * example.com: 호스트(host) -> 특정 서버를 가리킴 (DNS[domain name system])
 * root domain-> TLD[Top-level Domain] -> SLD[Second-level Domain]
 * Domain Name Resolution 검색해보기!
 * 
 * /business/item: 경로(path) 자원이 담겨져있는 경로 (개발자가 구현하는 방법에 따라 폴더나 파일이 없어도 상관없음)
 * category=14&id=2965: 쿼리(query) 무엇을 요청하는지 설명하는 것
 * */ 

 const url = new URL("http://example.com/business/item?category=14&id=2965"); // http core module

 console.log(url.protocol);
 console.log(url.host);
 console.log(url.pathname);
 console.log(url.search);