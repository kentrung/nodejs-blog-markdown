require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const Article = require('./models/article')

const app = express()
const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = () => {
  try {
    mongoose.connect(
      MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
