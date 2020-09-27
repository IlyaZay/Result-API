const express = require('express');
const bodyParser = require('body-parser');
const dotenvRes = require('dotenv').config();
dotenvRes.error ? console.warn(dotenvRes.error) : console.log('Environment variables set')

const app = express();

app.listen(process.env.PORT || 4040, () => {
    console.log(`Listening on port ${ process.env.PORT || 4040 }`)
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Here is gonna be SWAGGER")
})

app.post('/date', (req, res) => {

})

app.get(`/HelloWorld`, (req, res) => {
    res.status(200)
    res.send("Hello world!")
})