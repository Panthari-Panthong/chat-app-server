const { Router } = require('express')
const router = new Router()


router.get('/stream', (request, response) => {
  console.log("got a request on /stream")
  response.status(200)
  response.send("it work")

})


module.exports = router