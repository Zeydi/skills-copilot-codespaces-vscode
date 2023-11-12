 // Create web server
 const express = require('express');
 const app = express();
 const port = 3000;
 
 // Use the static files in the public folder
 app.use(express.static('public'));
 
 // Start the server
 app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 
 // Use the body-parser library to parse the body of POST requests
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }));
 
 // Use the nedb library to connect to the database
 const Datastore = require('nedb');
 const database = new Datastore('database.db');
 database.loadDatabase();
 
 // When a POST request is made to /api, insert the data into the database
 app.post('/api', (request, response) => {
   console.log('I got a request!');
   console.log(request.body);
   const data = request.body;
   const timestamp = Date.now();
   data.timestamp = timestamp;
   database.insert(data);
   response.json(data);
 });
 
 // When a GET request is made to /api, send the data from the database
 app.get('/api', (request, response) => {
   database.find({}, (err, data) => {
     if (err) {
       response.end();
       return;
     }
     response.json(data);
   });
 });