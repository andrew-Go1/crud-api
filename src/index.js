import { randomUUID } from "crypto";
import { createServer } from "http";
import 'dotenv/config';

const users = [];
const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
const PORT = parseInt(process.env.PORT);

// console.log('port is', PORT);

createServer((request, response) => {
    //response.writeHead(200,{"Content-Type":"aplication\json"});
    const url = request.url;
    const method = request.method;
                                                                    // endpoint /api/users 
    if (url === '/api/users' && method === 'GET') {                 //  => {all_users}
        users.forEach(user => {
            response.write(`${JSON.stringify(user)}\n`);
        });
        response.statusCode = 200;
        response.end(); 
    } else if (url === '/api/users' && method === "POST") {         //  => {new_user}     
        //console.log("request.body", request.body);                    
        request.on('data', (data) => {
            const user = JSON.parse(data.toString());               //buffer->string->Object
            const userHobbies = user.hobbies;
            /*console.log('user is string', typeof user.username === 'string', 
            ', age is number', typeof user.age === 'number', 
            ', hobbies is array', Array.isArray(userHobbies),
            ', hobbies are ampty', userHobbies.length == false,
            ', hobbies are strings', userHobbies.every(i => typeof i === 'string'));*/

            if (typeof user.username === 'string' &&                // user validation
                typeof user.age === 'number' &&
                ((Array.isArray(userHobbies) && !userHobbies.length) ||
                userHobbies.every(i => typeof i === 'string'))
            ) {
                user.id = randomUUID();
                //console.log('valid');
                users.push(user);
                response.statusCode = 201;
            } else {
                //console.log('not valid');
                response.statusCode = 400;
                response.write(`<div><center><H1>Body doesn't content required fields</H1></center></div>`);
            }
            response.end();
        });
        //response.end(); 
    } else if ( url.startsWith('/api/users/')) {                    // one specific user
        const uuid = url.split('/')[3];
        console.log(`uuid to test is ${uuid}`);
        if (regexExp.test(uuid)) {       // for some reason it's work only each second times
            (users.find((user, i) =>{
                if (user.id === uuid) {
                    if (method === 'GET') {                                     // GET
                        response.write(JSON.stringify(user));
                    } else if (method === 'PUT') {                              // PUT
                        request.on('data', (data) => {
                            const userPUT = JSON.parse(data.toString());      // buffer->string->Object
                            userPUT.id = uuid;
                            users[i] = userPUT;                               // need to check
                            response.statusCode = 200;                        // if user is valid
                        })
                    } else if (method === 'DELETE') {
                        users.splice(i);
                        //console.log(users);
                        response.statusCode = 200;  
                    }
                } else {                                /// uuid valid, but empty
                    response.statusCode = 404;
                    response.write(`<div><center><H1>Your ID is valid</H1><H2>But user didn't exist</H2></center></div>`);
                }
                return true;
            }));
        } else {                                        // if it's not correct uuid
            response.statusCode = 400;
            response.write(`<div><center><H1>Your ID not valid</H1><H2>it's not uuid</H2></center></div>`); 
        }
        response.end();
    } else {
        response.writeHead(200,{"Content-Type":"plan\text"});
        response.statusCode = 404;
        response.write("I'm HUMAN friendly,\nbut sorry, page not found\n404");
        response.end(); 
    }


    console.log(`Requested URL is: ${request.url}`);
    console.log(`Method of request is: ${request.method}`);
    //response.end();       
}).listen(PORT);


/*
await fetch("http://localhost:3000/api/users", { // create new user
    method: "POST",
    headers: {
        accept: 'application/json',
    },
    body: JSON.stringify({
        username : "Andrew",
        age : "25",
        hobbies : []
    })
});
/**/
await fetch("http://localhost:3000/api/users", { // create new user
    method: "POST",
    headers: {
        accept: 'application/json',
    },
    body: JSON.stringify({
        username : "Jen",
        age : 27,
        hobbies : ['search']
    })
});
/*
await fetch("http://localhost:3000/api/users/", { // update new user
    method: "PUT",
    headers: {
        accept: 'application/json',
    },
    body: JSON.stringify({
        username : "Joue",
        age : 10,
        hobbies : ['dance']
    })
});

try{
    let result = await response.json();
    console.log(result);
} catch (err) {
    console.log('error:', err)
}*/
