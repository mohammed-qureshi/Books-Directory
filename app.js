const routes = require('./index.js');
const express = require('express');
const app = express();
const PORT = 5000

app.use(express.json());
app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});

// Everytime i tried to export index.js, nodemon crashes
// "nodemon app.js"
// To start app
// Postman to post, patch, and delete 

