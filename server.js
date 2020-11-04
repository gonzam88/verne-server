// Instancio las librerias que voy a usar
var io = require('socket.io-client');
var osc = require('node-osc');

// Inicializo el cliente de Socket.io apuntando al servidor en glitch.me
var serverUrl = 'ws://verne-socket.glitch.me/'
var socket = require('socket.io-client')(serverUrl)

socket.on('connect', function(){
    console.log('Conectado al Servidor', serverUrl);
});

// El cliente recibe un mensaje llamado 'valueChange'
socket.on("valueChange", function(data){
  let address = "/" + data.parameter
  let val = parseFloat(data.value) + 0.00001 // el 0.00001 es porque en VVVV el rango me llegaba a 0.9 y después saltaba a 0. Es una solución rara, a revisar pero por ahora sirve.
  // Le envío los datos a VVVV vía OSC
  oscClient.send(address, val)
  console.log("OSC Sent ",address,val)
})

// Esto es igual que lo anterior pero me pintó tener por separado los botones de los sliders.
socket.on("clickedBut", function(data){
  console.log("Server Request",data)
  let address = "/" + data.parameter
  // Ahora reenvio a OSC local
  console.log(address, data.value)
  oscClient.send(address, parseFloat(data.value))
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
