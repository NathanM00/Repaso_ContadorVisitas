var express = require('express');
var app = express();

const fs = require('fs');

app.use(express.static('public'));

var contador = {
  home : 0,
  splash : 0,
  campeon : 0,
};

console.log(__dirname);

app.get('/', function (req, response) {
  response.sendFile(__dirname + '/public/home.html');

  contador.home++;
  archivoEscrito();
});

function archivoEscrito(){
    //let vistas = 'visitas home: ' + contador.home + ' vistas contacto: ' + contador.contacto;

    fs.writeFileSync('visitas.txt', 'Visitas del home: ' + contador.home+'\nVisitas de Historia del Campeon: ' + contador.campeon+'\nVisitas de los Splash art: ' + contador.splash+'', 'utf8');

    //leer archivo
    fs.readFile('visitas.txt', 'utf8', function(err, data){
      if(err) throw err;
      console.log(data);
    });
}

app.get('/splash', function (request, response) {
  response.sendFile(__dirname + '/public/splash.html');
  contador.splash++;
  archivoEscrito();

});

app.get('/campeon', function (request, response) {
  response.sendFile(__dirname + '/public/campeon.html');
  contador.campeon++;
  archivoEscrito();

});

app.listen(3000, function () {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});