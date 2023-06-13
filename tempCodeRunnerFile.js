const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConect');
const { readdirSync } = require('fs');
const path = require('path');


require('dotenv').config()

const PORT = process.env.PORT || 8000

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
//middlewares
app.use(cors())
app.use(express.json())

//routes
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

//serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))

const server = () => {
    dbConnection()
    app.listen(PORT, () => {
        console.log(`Server is listening to ${PORT}`)
    })
}

server()