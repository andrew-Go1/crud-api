import { createServer } from "http";
import { type } from "os";

const users = [];


createServer((request, response) => {
    //response.writeHead(200,{"Content-Type":"aplication\json"});
    switch (request.url) {
        case '/api/users':                                      // endpoint /api/users 
            if (request.method === "GET") {                     //  => {all_users}
                response.write(JSON.stringify(users));
                response.end(); 
            } else if (request.method === "POST") {             //  => {new_user}     
                //console.log("request.body", request.body);                    
                request.on('data', (data) => {
                    const user = JSON.parse(data.toString()); //buffer->string->Object
                    user.id = 123123132;
                    //console.log(user);
                    users.push(user);
                    response.end(); 
                });
            }
            response.statusCode = 200;
            break;
    
        default:
            response.writeHead(200,{"Content-Type":"plan\text"});
            response.statusCode = 404;
            response.write("I'm HUMAN friendly,\nbut sorry, page not found\n404");
            response.end(); 
            break;
    }

    console.log(`Requested URL is: ${request.url}`);
    console.log(`Method of request is: ${request.method}`);
    //response.end();       
}).listen(3000);

let response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
        accept: 'application/json',
    },
    body: JSON.stringify({
        "username" : "Andrew",
        "age" : "25",
        "hobbies" : []
    })
    /*Users are stored as objects that have following properties:
id — unique identifier (string, uuid) generated on server side
username — user's name (string, required)
age — user's age (number, required)
hobbies — user's hobbies (array of strings or empty array, required) */
}) 

try{
    let result = await response.json();
    console.log(result);
} catch (err) {
    console.log('error:', err)
}
