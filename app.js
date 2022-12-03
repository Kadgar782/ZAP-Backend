const express = require('express')
const mongoose = require('mongoose')
const app = express()
const products_routes = require('./routes/products.js')
const imgs_routes = require('./routes/img.routes.js')
const comments_routes = require('./routes/comment.routes.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))

const cors = require('cors');
app.use(cors({
}));

app.use(express.json())
app.use('/api/products', products_routes)
app.use('/api/imgs', imgs_routes)
app.use('/api/comments', comments_routes)