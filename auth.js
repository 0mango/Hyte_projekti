const express = require('express')
const app = express()

const posts = [
    {
        username: 'Milla',
        title: 'Post 1'
    },
    {
        username: 'Minna',
        title: 'Post 2'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
});

app.listen(3000)