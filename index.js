
const express = require('express')
const app = express()
const port = 4000

app.use(express.json({limit: '10mb'}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/image', (req, res) => {
  console.log(req.body)
  res.send({aja: 'great'})
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

