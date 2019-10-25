const { Router } = require('express')
const Chatroom = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()


router.get('/stream', async (request, response) => {
  console.log("got a request on /stream")
  // response.status(200)
  // response.send("it work")

  const messages = await Chatroom.findAll()
  const data = JSON.stringify(messages)
  console.log('stringify messages in db: ', data)
  stream.updateInit(data) //put data in the stream
  stream.init(request, response)  //stream handle the connection

  //how to test if stream is working
  //use Httpie ---> http :5000/stream --stream
})


router.post('/message', async (request, response) => {
  console.log('got a request on /message', request.body)
  const { message } = request.body
  //store in the database
  const entity = await Chatroom.create({
    message: message
  })

  //update the stream when someone send the messages
  const messages = await Chatroom.findAll()
  const data = JSON.stringify(messages)
  // console.log('stringify messages in db: ', data)
  stream.send(data)  //Update the stream

  response.status(201)
  response.send('Thank for your message')

})

module.exports = router