var io = require('socket.io-client');
var osc = require('node-osc');


var socket = require('socket.io-client')('ws://verne-socket.glitch.me/');
socket.on('connect', function(){
    console.log('Connected to Server');
});

socket.on("valueChange", function(data){

  // Ahora reenvio a OSC local
  let address = "/" + data.parameter
  let val = parseFloat(data.value) + 0.00001
  client.send(address, val)
  console.log("OSC Sent ",address,val)
})

socket.on("clickedBut", function(data){
  console.log("Server Request",data)
  // Ahora reenvio a OSC local
  let address = "/" + data.parameter
  console.log(address, data.value)
  client.send(address, parseFloat(data.value))
})


// SENDING OSC A VVVV

const client = new osc.Client('127.0.0.1', 4444);
// client.send('/test', Math.random()*100, () => {
//   client.close();
// });


// setTimeout(function(){
//
// }, 2000)


(function(){
    client.send("/test", Math.random()*100)
    console.log("Sent Test")
    setTimeout(arguments.callee, 2000);
})();
