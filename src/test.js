let response = await fetch("http://localhost:3000/api/users/", { // create new user
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

