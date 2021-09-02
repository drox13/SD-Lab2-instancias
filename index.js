const express = require('express')
const axios = require('axios')
const Jimp = require('jimp')
const app = express()
const port = 4000

app.use(express.json({limit: '10mb'}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.post('/image', (req, res) => {
  console.log(req.body)
  Jimp.read(Buffer.from(req.body.buffer.data))
    .then(image => {
      const height = image.bitmap.height;
      const width = image.bitmap.width;
      axios.get('https://geek-jokes.sameerkumar.website/api?format=json').then(function (response) {
            Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
              image.print(font, width * 20 / 100, height * 80 / 100, response.data.joke);
              res.send({width: width, height: height, mimetype: req.body.mimetype, buffer: Buffer.from(image.bitmap.data)})
            });
        }).catch(function (error) {
                console.error('Error ' + error.message)
            })
    }).catch(err => {
    console.log(err)
  });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

