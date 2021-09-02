var express = require('express');
var app = express();
const port = 9000;

app.get('/', function(req, res){
   res.send("Esta es una instancia Corriendo!");
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 });