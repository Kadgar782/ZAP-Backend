const express = require('express')
const mongoose = require('mongoose')
const app = express()
const authRouter = require('./routes/authRouter')
const products_routes = require('./routes/products.js')
const comments_routes = require('./routes/comment.routes.js')
const data_routes = require('./routes/data.routes.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))

const cors = require('cors');
app.use(cors({

}));

app.use(express.json())
app.use('/auth', authRouter)
app.use('/api/products', products_routes)
app.use('/api/comments', comments_routes)
app.use('/api/data',data_routes)


