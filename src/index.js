import { createServer } from "http";
import { type } from "os";

const users = {};


createServer((request, response) => {
    response.writeHead(200,{"Content-Type":"aplication\json"});
    switch (request.url) {
        case '/api/users':                                      //Answer on GET with 
            if (request.method === 'GET') {                     //  => {all_users}
                response.write(JSON.stringify(users));
            }
            break;

        case `/api/users`:                                      //Answer on POST with
            if (request.method === 'POST') {                    //  => {new_user}
                var __body = "{}";
                console.log(request.body);
                request.on('data', (data) => {
                    __body = data.toString();
                    console.log(__body);
                    response.write(__body);
                });
            }
            response.statusCode = 200;
            break;
    
        default:
            response.writeHead(200,{"Content-Type":"plan\text"});
            response.statusCode = 404;
            response.write("I'm HUMAN frendly,\nbut sorry, page not found\n404");
            break;
    }

    console.log(`Requested URL is: ${request.url}`);
    console.log(`Method of request is: ${request.method}`);
    response.end();       
}).listen(3000);

let response = await fetch("http://localhost:3000/api/users/", {
    method: "POST",
    headers: {
        accept: 'application/json',
    }//,
    //body: JSON.stringify(users)
}) 
    //.then((response) => console.log(response.json()))

    try{
        let result = await response.json();
        console.log(result);
    } catch (err) {
        console.log('error:', err)
    }
