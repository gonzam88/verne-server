// Instancio las librerias que voy a usar
var io = require('socket.io-client');
var osc = require('node-osc');
var myId = "";

// Inicializo el cliente de Socket.io apuntando al servidor en glitch.me
var serverUrl = 'ws://verne-socket.glitch.me/'
var socket = require('socket.io-client')(serverUrl)

socket.on('connect', function(){
    console.log('Conectado al Servidor', serverUrl);
});

socket.on("id",function(data){
  // recibo mi id
  console.log("Mi ID:", data)
  myId = data
  let address = "/id"
  // Le envío los datos a VVVV vía OSC
  oscClient.send(address, 123)

  // Le mando al servidor mi nombre (para identificar)
  socket.emit("playerUpdate", {id: myId, parameter: "nombre", value: "vvvv"})
})

socket.on('disconnect', function () {
   console.log('Client disconnecting');
});


socket.on("newPlayer", function(data){ // Un player nuevo
  let address = "/crear"
  let val = data.id
  console.log(address, val)
  oscClient.send(address, val)
})

socket.on("deletePlayer",function(data){ // Un player se fue y lo borro de la lista
  let address = "/eliminar"
  let val = data
  console.log(address, val)
  oscClient.send(address, val)
})


socket.on("otherUpdate", function(data){
  let address = `/update/${data.id}/${data.parameter}`
  let floatAttempt = parseFloat(data.value);
  var val = data.value
  console.log(address, val)
  oscClient.send(address, val)
})

// Inicializo el cliente de OSC que se conecta a VVVV
const oscClient = new osc.Client('127.0.0.1', 4444);


// A modo de prueba hice una función que cada 2 segundos le manda un número al azar a OSC a la dirección /test
// Si molesta se puede comentar tranquilamente
(function(){
    let rand = Math.random()
    oscClient.send("/test", rand)
    console.log("Enviado Prueba /test", rand.toFixed(2))
    setTimeout(arguments.callee, 2000);
})();
