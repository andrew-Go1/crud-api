let response = await fetch("http://localhost:3000/api/users/", { // create new user
    method: "POST",
    headers: {
        accept: 'application/json',
    },
    body: JSON.stringify({

    })
}) 

try{
    let result = await response.json();
    console.log(result);
} catch (err) {
    console.log('error:', err)
}