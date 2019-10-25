const express = require('express')

const streamRouter = require('./stream/router')

const app = express()
const port = process.env.PORT || 5000


app.listen(port, () => console.log("Server running on port ", port))

app.get('/', (request, response) => {
  console.log('get an request on /')
  response.status(200)
  response.send('hello world')
})

app.use(streamRouter)