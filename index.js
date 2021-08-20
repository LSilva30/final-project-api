const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')

require('dotenv').config()

const startServer = async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  try {
    const res = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      auth: {
        user: 'Luiz',
        password: 'Luiz1995',
      }
    })

    console.log(`Connected to Mongo! Database name: ${res.connections[0].name}`)
  } catch (error) {
    console.log(`Error connecting to mongo ${error}`)
  }

  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  
  app.use(routes)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    startServer().then(() => console.log('wooohooo'));
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}