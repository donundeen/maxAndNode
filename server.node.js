var twitterConsumerKey = '1V06tgB6jgzw03ODbFy1NQ';
var twitterConsumerSecret = 'GC7W0SZgrU8s3Rnhi82uh3X7njbOzppekzIkAKrTbk';
var twitterAccessTokenKey = '19132948-9oFtnyOQ4xsZz4T0hboOL7t1OBakEfBzV5eVWxOzc';
var twitterAccessTokenSecret = 'n5meS9coCcDzT8DCUEXCZNyLy5Wa4jrXiKGyIdYd6Y';

var twitterBotName = "@donmaxbot";
var lastTweetId = '0';

var dgram = require("dgram");
//var http = require('http');
var http = require('follow-redirects').http;
var twitter = require('mtwitter');
var crypto = require('crypto');

var fs = require('fs');
var path = require('path');
var request = require('request');

var $ = require('jquery');


var fs = require('fs');
var util = require('util');

var twit = new twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});



var donMaxBotCommands= {
  's' : function(args){ runCommandSearchTwitter(args);},
  'search' :  function(args){ runCommandSearchTwitter(args);},
  'c' :  function(args){ runCommandChord(args);},
  'chord' :  function(args){ runCommandChord(args);},
  'r' :  function(args){ runCommandRhythm(args);},
  'rhythm' :  function(args){ runCommandRhythm(args);},

}



// sending example
var sender  = dgram.createSocket("udp4");
var osc = require('osc-min');
var buf = osc.toBuffer(
{
	address : "sayword",
	oscType : "message",
	args : 
	[{ type : "string",
		value : "send from nodejs working"}]
}
);
sender.send(buf, 0, buf.length, 12000, '127.0.0.1');




// listener setup, for listening to requests from max via udp
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


// testing the processing of urls
//processUrls(["http://t.co/sj3hNDmq"]);


// search twitter for new orders
getTweetOrders();
setInterval(getTweetOrders, 10000);

// processing messages sent from max (maybe this can me merged with messages from twitter itself?)
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
    //  console.log(names);
      msg = msg.replace(namePattr, ' ');
      var tags = msg.match(tagPattr);
    //  console.log(tags);
      msg = msg.replace(tagPattr, ' ');
      var urls = msg.match(urlPattr);
      console.log(urls);
      msg = msg.replace(urlPattr, ' ');
      var words = msg.match(wordPattr);
    //  console.log(words);

      processWords(words);

      processUrls(urls);

      processTags(tags);

      processNames(names);
      
      return false;

		});


	 // console.log(data);
	});



}


function processWords(wordList){
  var wordargs = [];
  $(wordList).each(function(i, word){
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
}

function processUrls(urlList){
  console.log(urlList); 
  $(urlList).each(function (i, url){
    console.log(url);
    var hash = crypto.createHash('md5').update(url).digest("hex");
    fs.writeFile("files/"+hash+".url.txt", url, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });

    // fetch urls
    http.get(url, function(res){
      var data = '';
      res.on('data', function (chunk) {
        //console.log("chunk");
       // console.log(chunk);
        data += chunk;
      });
      res.on('end', function(err){
        var doc = $(data); 

        fs.writeFile("files/"+hash, data, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("The file was saved!");
          }
        });

        examineWebpage(url, doc);

      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });


}



function examineWebpage(url, doc){
  var images= [];

  console.log("examining " + url);

  $("meta[og\\:image]", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("og:\\image").trim();
    if(imageVal == ''){return true;}
    console.log(imageVal);
    images.push(imageVal);
  });

  $("meta[property='og:image']", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("content").trim();
    if(imageVal == ''){return true;}
    console.log(imageVal);
    images.push(imageVal);
  });

  $("img.media-slideshow-image[src]", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("src").trim();
    if(imageVal == ''){return true;}
    console.log(imageVal);
    images.push(imageVal);
  });

  console.log(images);
  processImageUrls(images);
}


function processImageUrls(images){
  // dl images, copy local, send path to max
  var imageargs = [];

  $(images).each(function(i, img_url){
    if (/^https?:\/\//.test(img_url)) {
        console.log("trying to dl image " + img_url);
        console.log(img_url);
        img_name = path.basename(img_url);
        if(img_name.indexOf(':') !== -1){
          var split = img_name.split(":");
          var last = split.pop();
          console.log(last);
          img_name = split.join(':');
        }
        var writepath = path.resolve(__dirname, 'files/images/' + img_name);

        console.log("dling from " + img_url);
        console.log("writing  to " + writepath);



        request(img_url)
          .pipe(fs.createWriteStream(writepath)
            .on('error', function(err){console.log("file write error " + err)})
            .on('close', function(event, filename){
              console.log("image file written");
              var imagearg = {type: "string" , value: writepath};
              var buf = osc.toBuffer(
                {
                  address : "image",
                  oscType : "message",
                  args : imagearg        
                }
                );
                sender.send(buf, 0, buf.length, 12000, '127.0.0.1');


            }));





    }

  });
/*
  $(wordList).each(function(i, word){
     var wordarg = {type: "string", value:word};
     wordargs.push(wordarg);
  });

*/
}


function processNames(nameList){



}

function processTags(tagList){



}



function getTweetOrders(){

  msg = twitterBotName;
  console.log("\n\nsearching for " +msg + " orders since id " + lastTweetId);
  twit.search(msg, {count: 20,since_id: lastTweetId}, function(err, data) {
//  twit.search(msg, {}, function(err, data) {
  
//   fs.writeFile('out.txt', util.inspect(data, false, null));
    console.log("got results" + data.statuses.length);
    data.statuses = sortTweets(data.statuses);
//    console.log(data);
    $(data.statuses).each(function(index, value){
      console.log('********************************************');
//      console.log(value);

      // split the text up into individual words

      // extract other useful features, like images, links, etc.
      var tweettext = value.text;
      var tweetid = value.id;
      console.log(tweettext);
      console.log(tweetid);

      if(lastTweetId == tweetid){
        return true;
      }
      lastTweetId = tweetid;
      console.log("lastTweetId : " + lastTweetId);
      parseTweetCommand(tweettext);

    });


 // console.log(data);
  });
}

function sortTweets(resultsArray){
  resultsArray.sort(function(a, b){
    return (a.id - b.id);
  });
  return resultsArray;
}

function parseTweetCommand(tweetCommand){
  tweetCommand = tweetCommand.trim();
  console.log("parsing command: " + tweetCommand);
  var pattr = /^\@donmaxbot\s+([\S]+)\s+(.*)$/;
  var matches = tweetCommand.match(pattr);
  var command = "";
  if(matches){
    var command = matches[1];
    var args = matches[2];

    console.log("command: " + command);
    console.log("args: " + args);
  }else{
    console.log("'"+tweetCommand+"' isn't good command syntax");
    return;
  }

  if(donMaxBotCommands[command]){
    var commandFunction = donMaxBotCommands[command];
    console.log("function is " + commandFunction);
    commandFunction(args);
  }else{
    console.log("no function for command " + command);
  }
}


function runCommandSearchTwitter(searchString){
  console.log("searching twitter for " + searchString);
}

function runCommandRhythm(rhythmString){
  console.log("processing rhythm " + rhythmString);
}

function runCommandChord(chordString){

    console.log("processing chord " + chordString);
}