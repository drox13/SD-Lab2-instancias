const express = require('express')
const axios = require('axios')
const Jimp = require('jimp')
const app = express()
const port = 4000

app.use(express.json({ limit: '10mb' }))
app.use("/public", express.static("/public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.post('/image', (req, res) => {
  console.log('requested')
  Jimp.read(Buffer.from(req.body.buffer.data))
    .then(image => {
      axios.get('https://geek-jokes.sameerkumar.website/api?format=json').then(function (response) {
        Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
          let txt = {content: response.data.joke};
          const txtWidth = Jimp.measureText(font, txt.content);
          const txtHeight = Jimp.measureTextHeight(font, txt.content);
          const height = image.bitmap.height;
          const width = image.bitmap.width;
          const txtHorizontalDivisions = txtWidth/(width*80 / 100);
          const breakPosition = txt.content.length/txtHorizontalDivisions;
          let index = 0;
          for(let i = 0; i < txtHorizontalDivisions; i ++) {
            image.print(font, width * 10 / 100, (height * 5 / 100) + (i*txtHeight), txt.content.substring(index,(i+1)*breakPosition));
            index = (i+1)*breakPosition;
          }
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


