const express = require('express')
const axios = require('axios')
const Jimp = require('jimp')
var ip = require("ip");
const app = express()
const port = 4000

app.use(express.json({ limit: '10mb' }))
app.use("/public", express.static("/public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.post('/image', (req, res) => {
  Jimp.read(Buffer.from(req.body.buffer.data))
    .then(image => {
      const height = image.bitmap.height;
      const width = image.bitmap.width;
      axios.get('https://geek-jokes.sameerkumar.website/api?format=json').then(function (response) {
        Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
          image.print(font, width * 20 / 100, height * 80 / 100, response.data.joke);
          image.resize(800, 600);
          res.send({width: image.bitmap.width, height: image.bitmap.height, pixels: Buffer.from(image.bitmap.data)})
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


