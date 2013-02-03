var dgram = require("dgram");


// sending example
var sender  = dgram.createSocket("udp4");
var osc = require('osc-min');
var buf = osc.toBuffer(
{
	address : "addr",
	oscType : "message",
	args : 
	[{ type : "string",
		value : "hi there"}]
}
);
sender.send(buf, 0, buf.length, 12000, '127.0.0.1');




// listener setup
var listener = dgram.createSocket("udp4");
listener.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});

listener.on("listening", function () {
  var address = listener.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

listener.bind(11000);
// server listening 0.0.0.0:41234
