var twitterConsumerKey = '1V06tgB6jgzw03ODbFy1NQ';
var twitterConsumerSecret = 'GC7W0SZgrU8s3Rnhi82uh3X7njbOzppekzIkAKrTbk';
var twitterAccessTokenKey = '19132948-9oFtnyOQ4xsZz4T0hboOL7t1OBakEfBzV5eVWxOzc';
var twitterAccessTokenSecret = 'n5meS9coCcDzT8DCUEXCZNyLy5Wa4jrXiKGyIdYd6Y';

var dgram = require("dgram");

var twitter = require('ntwitter');

var $ = require('jquery');


var fs = require('fs');
var util = require('util');

var twit = new twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});




// sending example
var sender  = dgram.createSocket("udp4");
var osc = require('osc-min');
var buf = osc.toBuffer(
{
	address : "sayword",
	oscType : "message",
	args : 
	[{ type : "string",
		value : "hi there kid"}]
}
);
sender.send(buf, 0, buf.length, 12000, '127.0.0.1');




// listener setup
var listener = dgram.createSocket("udp4");
listener.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
  console.log(rinfo);
  processMessage(msg, rinfo);
});

listener.on("listening", function () {
  var address = listener.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

listener.bind(11000);
// server listening 0.0.0.0:41234


function processMessage(msg, rInfo){
//	msg = ""+msg;

	var fb = osc.fromBuffer(msg);
	console.log(fb);	

	var msg = fb.args[0].value;
	var type = fb.args[0].type;
	var addr = fb.address;

	console.log("addr '" +  addr +"'");
	console.log("msg '" + msg +"'");
	console.log("type '" + type +"'");

	switch (addr){
		case "searchTweet":
			searchTweet(msg);
			break;
		default:
			console.log("unknown address "  + addr);


	}



}




function searchTweet(msg){

	/* twitter search results format:
	{ completed_in: 0.012,
  max_id: 297724194320437250,
  max_id_str: '297724194320437248',
  next_page: '?page=2&max_id=297724194320437248&q=donundeen',
  page: 1,
  query: 'donundeen',
  refresh_url: '?since_id=297724194320437248&q=donundeen',
  results: 
   [ { 
	created_at: 'Sat, 02 Feb 2013 15:12:34 +0000',
       from_user: 'donundeen',
       from_user_id: 19132948,
       from_user_id_str: '19132948',
       from_user_name: 'don undeen',
       geo: null,
       id: 297724194320437250,
       id_str: '297724194320437248',
       iso_language_code: 'en',
       metadata: [Object],
       profile_image_url: 'http://a0.twimg.com/profile_images/81890486/DonAndBug_normal.jpg',
       profile_image_url_https: 'https://si0.twimg.com/profile_images/81890486/DonAndBug_normal.jpg',
       source: '&lt;a href=&quot;http://www.flipboard.com&quot;&gt;Flipboard&lt;/a&gt;',
       text: '@lili_czarina @Build3dprinter me want! Probably not cool to send budget on kickstarter, booo.',
       to_user: 'lili_czarina',
       to_user_id: 33736942,
       to_user_id_str: '33736942',
       to_user_name: 'Liz Neely',
       in_reply_to_status_id: 297683386967916540,
       in_reply_to_status_id_str: '297683386967916544' },
       etc ...
],
  results_per_page: 15,
  since_id: 0,
  since_id_str: '0' }

       */


	console.log("searching for " + msg);


  var namePattr = /(@\w+)/g;
  var tagPattr= /(#\w+)/g;
  var wordPattr = /(\w+)/g;
  var urlPattr = /(http:\/\/\S+)/g;




	twit.search(msg, {count: 1}, function(err, data) {
		
//		fs.writeFile('out.txt', util.inspect(data, false. null));

		$(data.results).each(function(index, value){
      console.log('********************************************');
			console.log(value.text);

      // split the text up into individual words

      // extract other useful features, like images, links, etc.
      msg = value.text;
      var names = msg.match(namePattr);
      console.log(names);
      msg = msg.replace(namePattr, ' ');
      var tags = msg.match(tagPattr);
      console.log(tags);
      msg = msg.replace(tagPattr, ' ');
      var urls = msg.match(urlPattr);
      console.log(urls);
      msg = msg.replace(urlPattr, ' ');
      var words = msg.match(wordPattr);
      console.log(words);

      var wordargs = [];
      $(words).each(function(i, word){
         var wordarg = {type: "string", value:word};
         wordargs.push(wordarg);
      });

      var buf = osc.toBuffer(
      {
        address : "line",
        oscType : "message",
        args : wordargs        
      }
      );
      sender.send(buf, 0, buf.length, 12000, '127.0.0.1');
      return false;

		});


	 // console.log(data);
	});



}


