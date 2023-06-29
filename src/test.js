import { createServer } from "http";

createServer((request, response) => {
            response.end();
    }).listen(3000);

    async function postJSON(data) {
        try {
          const response = await fetch("https://localhost:3000", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            tls: {
                ciphers:'SSLv3'
            }
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      const data = { username: "example" };
      postJSON(data);