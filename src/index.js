const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose()
const fs = require('fs')

const db = new sqlite.Database('./db.db')

const app = express();

app.listen(process.env.PORT || 4040, () => {
    console.log("Hello")
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("YOLO")
})

app.post('/new_quote', (req, res) => {
    const postNew = fs.readFileSync('./sql/post_new.sql').toString()
    db.run(postNew, {
        $body: req.body.body,
        $author: req.body.author
    });
    console.warn("helo")
    res.status(200)
    res.send('OK')
})

app.get(`/quote`, (req, res) => {
    const getQuoteById = fs.readFileSync('./sql/retrieve_by_id.sql').toString();
    db.get(getQuoteById, req.headers.id, (err, row) => {
        if (err) {
            res.status(500)
            res.send('Error 500')
        } else {
            res.status(200)
            res.send(row)
        }
    })
})