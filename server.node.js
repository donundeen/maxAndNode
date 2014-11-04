/*
https://dev.twitter.com/docs/api


*/

var secrets = require('./secrets');
var twitterConsumerKey = secrets.twitterConsumerKey ;
var twitterConsumerSecret = secrets.twitterConsumerSecret ;
var twitterAccessTokenKey = secrets.twitterAccessTokenKey ;
var twitterAccessTokenSecret = secrets.twitterAccessTokenSecret ;

var colourpressurePath = '/Users/buffy/Documents/myApps/Projects/maxAndNode/colourpressure/colourpressure.py'

var sys = require('sys')
var exec = require('child_process').exec;



var twitterBotName = "@donmaxbot";
var lastTweetId = '0';

var dgram = require("dgram");
//var http = require('http');
var http = require('follow-redirects').http;
var twitter = require('mtwitter');
var crypto = require('crypto');

var fs = require('graceful-fs');
var path = require('path');
var request = require('request');

var $ = require('jquery');

var teoria = require('teoria');

var osc = require('osc-min');

var fs = require('fs');
var util = require('util');


var foundTweets = {};


var twit = new twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});


// currently this account is read-only, can't post.
//twit.updateStatus("here is a cool message",{}, function(err){console.log("in callback"); console.log(err);});

var donMaxBotCommands= {
  's' : function(args){ runCommandSearchTwitter(args);},
  'search' :  function(args){ runCommandSearchTwitter(args);},
  'a' : function(args){ runCommandSearchArt(args);},
  'art' :  function(args){ runCommandSearchArt(args);},
  'c' :  function(args){ runCommandChord(args);},
  'chord' :  function(args){ runCommandChord(args);},
  'r' :  function(args){ runCommandRhythm(args);},
  'rhythm' :  function(args){ runCommandRhythm(args);},
  'b' :  function(args){ runCommandBpm(args);},
  'bpm' :  function(args){ runCommandBpm(args);},
  'rs' :  function(args){ runCommandRestart(args);},
  'restart' :  function(args){ runCommandRestart(args);},
  'h' :  function(args){ runCommandHelp(args);},
  '?' :  function(args){ runCommandHelp(args);},
  'help' :  function(args){ runCommandHelp(args);},

};

var commandHelp = [
  {
    'regex' : /(s|search)$/,
    'command' : 'search',
    'short_command' : 's',
    'usage' : 'search SEARCHSTRING',
    'example' : 'search cats',
    'description' : 'search twitter for string. send images, words, etc to performer' 
  },
  {
    'regex' : /(c|chord)$/,
    'command' : 'chord',
    'short_command' : 'c',
    'usage' : 'chord CHORDNAME',
    'example' : 'chord Gm7b5',
    'description' : 'send a chord to the performer' 
  },
  {
    'regex' : /(a|art)$/,
    'command' : 'art',
    'short_command' : 'a',
    'usage' : 'art ARTSEARCHTERM',
    'example' : 'art chair',
    'description' : 'search art databases for matches, send images, words, etc to performer' 
  },
  {
    'regex' : /(r|rhythm)$/,
    'command' : 'rhythm',
    'short_command' : 'r',
    'usage' : 'rhythm PATTERN',
    'example' : 'rhythm . .. . . ',
    'description' : 'spaces are rests, dots are beats.' 
  },
  {
    'regex' : /(b|bpm)$/,
    'command' : 'bpm',
    'short_command' : 'b',
    'usage' : 'bpm BEATS PER MINUTE',
    'example' : 'bpm 140',
    'description' : 'set the tempo' 
  }
];

comar = []; 
scomar = []
$(commandHelp).each(function(index, com){ 
  comar.push(com.command);
  scomar.push(com.short_command);
});
var helpdesc = comar.join(',') + " ("+scomar.join(',')+")";

commandHelp.push(
  {
    'regex' : /$/,
    'command' : 'help',
    'short_command' : 'h',
    'usage' : 'help COMMAND',
    'example' : 'help bpm',
    'description' : 'get help! commands are ' + helpdesc
  }
);





// sending to Max,  example

var sender  = dgram.createSocket("udp4");
/*
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
*/



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

//parseTweetCommand("@donmaxbot h");

//parseTweetCommand("@donmaxbot r  . .. 987 .23 .2. ");


// search twitter for new orders
getTweetOrders();
setInterval(getTweetOrders, 10000);



function getTweetOrders(){

  msg = twitterBotName;
  console.log("\n\nsearching for " +msg + " orders since id " + lastTweetId);
  twit.search(msg, {count: 5,since_id: lastTweetId}, function(err, data) {
//  twit.search(msg, {}, function(err, data) {
  
//   fs.writeFile('out.txt', util.inspect(data, false, null));
    console.log("got results");
//    console.log(data);
if(!data){
  console.log("no statuses " + err);
}
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
			searchTweet(msg, 0);
			break;
		default:
			console.log("unknown address "  + addr);


	}
}

var namePattr = /(@\w+)/g;
var tagPattr= /(#\w+)/g;
var wordPattr = /(\w+)/g;
var urlPattr = /(http:\/\/\S+)/g;


function searchTweet(msg, numTimes){

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










	twit.search(msg, {count: 20}, function(err, data) {
		
//		fs.writeFile('out.txt', util.inspect(data, false. null));
  //  console.log(err);
//    console.log(data);

    if(err){
      console.log("twitter search error");
      console.log(err);
      console.log(msg);
    }

		$(data.statuses).each(function(index, value){
      console.log('************ Search Results ********************************');
			console.log(value.text);

      // split the text up into individual words

      // extract other useful features, like images, links, etc.
      msg = value.text;

      var msgkey = msg.replace(/^RT @[a-zA-Z]+:/, "");
      msgkey = msgkey.replace(/[^0-1a-zA-Z]/g, "");
      console.log("key " + msgkey);
      if(foundTweets[msgkey]){
        console.log("have this one already, skipping");
        return true;
      }
      foundTweets[msgkey] = true;

      var names = msg.match(namePattr);
    //  console.log(names);
      msg = msg.replace(namePattr, ' ');
      var tags = msg.match(tagPattr);
    //  console.log(tags);
      msg = msg.replace(tagPattr, ' ');

      var urls = msg.match(urlPattr);
      console.log(urls);
      msg = msg.replace(urlPattr, ' ');
      msg = msg.replace(/RT\W/,'');
      msg = msg.replace(/(^|\W)gt\W/i,'');
      var words = msg.match(wordPattr);
    //  console.log(words);

      processWords(words);

      processUrls(urls);

      processTags(tags);

      processNames(names);
      
 //     return false;

		});


	 // console.log(data);
	});

  // redo the search after some amoutn of time

  // in minutes
  var interval = numTimes * (Math.random() * 3);

  interval = interval * 60 * 1000;

  setTimeout(function(){searchTweet(msg, numTimes+1)}, interval);

}


function searchArt(searchTerm){
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nsearching art APIs for " + searchTerm);
  searchTerm = searchTerm.trim();
  searchMet(searchTerm);
  searchWolf(searchTerm);
  searchICAPhilla(searchTerm);  
  searchVA(searchTerm);  
  searchTate(searchTerm);  
}



function searchMet(searchTerm){
  var metSearchUrl = "http://scrapi.org/search/"+searchTerm+"?ao=on&noqs=true";
//  console.log("url is "+ metSearchUrl);
  request(metSearchUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("^^^^^^^^^^^^^^^^^^^^^^^ MET  got results from " + metSearchUrl);
  //    console.log(body) // Print the google web page.
      var data = JSON.parse(body);   //data.collection.items
  //    console.log(data);
      var i =0;
      while(i < 5){
          var index = Math.floor(Math.random()* data.collection.items.length);
        
        if(data.collection && data.collection.items[index] && data.collection.items[index].href){
          parseMetScrapiUrl(data.collection.items[index].href);
        }
        i++;
      }
    }else{
      console.log("error in metsearchrequest");
      console.log(error);
    }
  });

}

function searchWolf(searchTerm){
  var url = 'http://digital.wolfsonian.org/json/results/?t=' + encodeURI(searchTerm.trim());
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("WOLF!!!!!   got results from " + url);
      //console.log(body) // Print the google web page.
      if(body && body.trim() != ""){
        var data = JSON.parse(body);   //data.collection.items
        console.log(data);
        var i =0;
        while(i < 5 && i < data.length){
          var index = Math.floor(Math.random()* data.length);

          if(data[index].collection_item){
              var image = data[index].collection_item.thumb_url;
              image = image.replace("thm.jpg",".jpg");
              processImageUrls([image]);

              if(data[index].collection_item.name){
                console.log(data[index].collection_item.name);
                var words = data[index].collection_item.name.trim().match(wordPattr);
                console.log(words);
                processWords(words);
              }
          }
          i++;
        }
      }
    }else{
      console.log("error in searchWolf");
      console.log(error);
    }
  });


}

function searchICAPhilla(searchTerm){
  var url = 'http://icaphila.org/api/nodes.json?term='+ encodeURI(searchTerm);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("ICA!!!!!   got results from " + url);
    //  console.log(body) // Print the google web page.
      if(body && body.trim() != ""){
        var data = JSON.parse(body);   //data.collection.items
      //  console.log(data);
        var i =0;
        while(i < 5 && i < data.length){
          var index = Math.floor(Math.random()* data.length);
          if(data[index].excerpt_image && data[index].excerpt_image.large){
              var image = data[index].excerpt_image.large.url;
              image = 'http://icaphila.org/'+ image;
              console.log("(((((((((((((((((((((((((((( ICAPHILLA ! " + image);
              processImageUrls([image]);
              if(data[index].name){
                console.log(data[index].name.trim());
                var words = data[index].name.trim().match(wordPattr);
                console.log(words);                
                processWords(words);
              }

          }
          i++;
        }
      }
    }else{
      console.log("error in searchICAPhilla");
      console.log(error);
    }
  });

}

function searchVA(searchTerm){
  var url = 'http://www.vam.ac.uk/api/json/museumobject/search?q='+ encodeURI(searchTerm);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("VA!!!!!   got results from " + url);
    //  console.log(body) // Print the google web page.
      if(body && body.trim() != ""){
        var data = JSON.parse(body);   //data.collection.items
      //  console.log(data);
        var i =0;
        while(i < 5 && i < data.records.length){
          var index = Math.floor(Math.random()* data.records.length);
          if(data.records[index] && data.records[index].fields.primary_image_id){
              var image = data.records[index].fields.primary_image_id;
              var imagePath= 'http://media.vam.ac.uk/media/thira/collection_images/';
              image = imagePath + image.substring(0,6) + "/"+image+"_jpg_l.jpg";
              console.log("________________________________ V and A ! " + image);
              processImageUrls([image]);
              
              if(data.records[index].fields.object){
                console.log(data.records[index].fields.object.trim());
                var words = data.records[index].fields.object.trim().match(wordPattr);
                console.log(words);                
                processWords(words);
              }
              

          }
          i++;
        }
      }
    }else{
      console.log("error in searchVA");
      console.log(error);
    }
  });

}

//http://www.tate.org.uk/art/artworks.json?q=spoon
//http://www.tate.org.uk/art/images/work/AR/AR00033_8.jpg
function searchTate(searchTerm){
  var url = 'http://www.tate.org.uk/art/artworks.json?q='+ encodeURI(searchTerm);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("TATE!!!!!   got results from " + url);
    //  console.log(body) // Print the google web page.
      if(body && body.trim() != ""){
        var data = JSON.parse(body);   //data.collection.items
      //  console.log(data);
        var i =0;
        while(i < 5 && i < data.results.length){
          var index = Math.floor(Math.random()* data.results.length);
          if(data.results[index] && data.results[index].masterImages && data.results[index].masterImages.length > 0 ){
              var image = data.results[index].masterImages[0].sizes[0].file;
              image = 'http://www.tate.org.uk/art/images/work/' +image;
              console.log("++++++++++++++++++++++++++++++++++ TATE ! " + image);
              processImageUrls([image]);

              if(data.results[index].title){
                console.log(data.results[index].title.trim());
                var words = data.results[index].title.trim().match(wordPattr);
                console.log(words);

                processWords(words);
              }


          }
          i++;
        }
      }
    }else{
      console.log("error in searchTate");
      console.log(error);
    }
  });

}



function parseMetScrapiUrl(url){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("got results from " + url);

        console.log("\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%% MET DATA !!!!!!!!!!!!!!!!!!!!!!!!!!\n");
      //  console.log(body) // Print the google web page.
        var data = JSON.parse(body);   //data.currentImage.imageUrl
      //  console.log(data);
        console.log(data.currentImage.imageUrl);
        processImageUrls([data.currentImage.imageUrl]);
        if(data.title && data.title.trim() != ""){
          var words = data.title.trim().match(wordPattr);
          processWords(words);
        }
        // if the image is "no image," then we don't want it.

      }else{
        console.log("error in scrapiRequest " + url);
        console.log(error);
      }
    });
}


function processWords(wordList){
  console.log("wordList");
  console.log(wordList);
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

/*
  var buf2 = osc.toBuffer(
  {
    address : "sayword",
    oscType : "message",
    args : ["word"]        
  }
  );
  sender.send(buf2, 0, buf2.length, 12000, '127.0.0.1');
*/

}

function processUrls(urlList){
  console.log("processurls");
  console.log(urlList); 
  $(urlList).each(function (i, url){
    url = url.replace(/”/,"").trim();

    if(url.length == 0){
      return true;
    }

    var getthisurl = url + "";

    console.log("url is  " + getthisurl);
    var hash = crypto.createHash('md5').update(url).digest("hex");
    fs.writeFile("files/"+hash+".url.txt", url, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });

    // fetch urls
    http.get(getthisurl, function(res){
      var data = '';
      res.on('data', function (chunk) {
        //console.log("chunk");
       // console.log(chunk);
        data += chunk;
      });
      res.on('end', function(err){
        var doc = $(data); 
        console.log("got file at  " + getthisurl);

        fs.writeFile("files/"+hash, data, function(err) {
          if(err) {
            console.log("error getting file at ") + getthisurl;
            console.log(err);
          } else {
            console.log("The data file was saved!");
          }
        });

        examineWebpage(getthisurl, doc);

      });
    }).on('error', function(e) {
      console.log("Got error for url " + getthisurl + " : " + e.message);
    });
  });


}



function examineWebpage(url, doc){
  var images= [];

  console.log("examining for images " + url);

  $("meta[og\\:image]", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("og:\\image").trim();
    if(imageVal.length > 0){
      console.log("4 got image " + imageVal);
      if(imageVal == ''){return true;}
      console.log(imageVal);
      images.push(imageVal);
    }
  });

  $("img[alt='Embedded image permalink']", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("src").trim();
    console.log("1 got image " + imageVal);
    if(imageVal == ''){return true;}
    console.log(imageVal);
    images.push(imageVal);
  });

  $("meta[property='og:image']", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("content").trim();
    console.log("2 got image " + imageVal);
    if(imageVal == ''){return true;}
    console.log(imageVal);
    images.push(imageVal);
  });

  $("img.media-slideshow-image[src]", doc).each(function(i, image){
   // console.log(image);
    var imageVal = $(image).attr("src").trim();
    console.log("3 got image " + imageVal);
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

              // before sending image out, also figure out the histogram.
              var cmd = "/usr/bin/python "+ colourpressurePath + " " + writepath;
console.log(cmd);
              var child = exec(cmd, function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                var hist = stdout.replace(/"[^"]+",/,"");
                console.log(hist);
                var imagearg = {type: "string" , value: writepath + "|" + hist};
//var regex = /"([^"]+)","([^"]+)"/g;
/*
var regex = /"((\([0-9]+,[0-9]+,[0-9]+\))\|?)+","((\([0-9]+,[0-9]+,[0-9]+\))\|?)+"/g;

var matches = regex.exec(hist);
if(matches){
  console.log(matches);
  console.log(matches[1]);
  console.log(matches[2]);
}
*/
                var buf = osc.toBuffer(
                  {
                    address : "image",
                    oscType : "message",
                    args : imagearg        
                  }
                );
                sender.send(buf, 0, buf.length, 12000, '127.0.0.1');
                 
                if (error !== null) {
                  console.log('exec error: ' + error);
                }
              });
// imageR: /Users/donundeen/Library/Containers/com.bitnami.mampstack/Data/app-5_4_9/apache2/htdocs/node/maxAndNode/files/images/DP116081.jpg|"(180,1,57)|(24,30,82)|(24,47,68)|(25,41,76)|(25,24,87)|(20,2,64)|(24,50,60)|(23,52,53)|(22,67,36)|(16,48,12)|(22,53,44)|(25,12,95)"
 



/*
              var imagearg = {type: "string" , value: writepath};
              var buf = osc.toBuffer(
                {
                  address : "image",
                  oscType : "message",
                  args : imagearg        
                }
                );
                sender.send(buf, 0, buf.length, 12000, '127.0.0.1');
*/
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



function sortTweets(resultsArray){
  if(!resultsArray){
    return resultsArray;
  }
  resultsArray.sort(function(a, b){
    return (a.id - b.id);
  });
  return resultsArray;
}

function parseTweetCommand(tweetCommand){
//  tweetCommand = tweetCommand.trim();
  console.log("parsing command: " + tweetCommand);
  var pattr = /^\@donmaxbot\s+([\S]+)\s?(\s+(.*))?$/;
  var matches = tweetCommand.match(pattr);
  console.log(matches);
  var command = "";
  if(matches){
    var command = matches[1];
    var args = matches[2];

    console.log("command: " + command);
    console.log("args: " + args);
  }else{
    console.log("'"+tweetCommand+"' isn't good command syntax, but maybe you sent an http link");
    
  }

  if(command != ""){
    if(donMaxBotCommands[command]){
      var commandFunction = donMaxBotCommands[command];
      console.log("function is " + commandFunction);
      commandFunction(args);
    }else{
      console.log("no function for command " + command);
    }
  }

  // processing urls sent directly to @donmaxbot
  console.log("checking command " + tweetCommand  + " for urls, using pattern " + urlPattr);
  var urls = tweetCommand.match(urlPattr);
  console.log(urls);
  processUrls(urls);


}


// run the searchtwee
function runCommandSearchTwitter(searchString){
  console.log("searching twitter for " + searchString);
  searchTweet(searchString,0);
}


function runCommandSearchArt(searchString){
  console.log("searching Art Databases for " + searchString);
  searchArt(searchString);
}



// some sort of string that represents a rhythm, maybe just dots and spaces, or something?
function runCommandRhythm(rhythmString){
  console.log("processing rhythm '" + rhythmString +"'");
  // rhythm is a series of spaces, and either dots or numbers. spaces get turned into 0s, and numbers get scaled to floats, somehow

  var r2 = rhythmString.replace(/ /g, "|0|");
  console.log(r2);
  var r2 = r2.replace(/(\.[0-9]*)/g, "|$1|");
  console.log(r2);
  var r2 = r2.replace(/(\.)([^0-9])/g, "|1|$2");
  console.log(r2);
  var r2 = r2.replace(/\|\|/g, "|");
  var r2 = r2.replace(/\|\|/g, "|");
  var r2 = r2.replace(/^\|(.*)\|$/g, "$1");
  console.log(r2);
  var split = r2.split("|");
  console.log(split);

  var args = [];
  $(split).each(function(index, value){
    console.log(value);
    if(value > 1){
      var valstring = "."+ Math.round(value);
      value = parseFloat(valstring);
    }
    console.log("now  " + value);

    args.push({type: "string",
              value : ""+value});

  });

  // now send back to Max
  var sender  = dgram.createSocket("udp4");
  var buf = osc.toBuffer(
    {
      address : "rhythm",
      oscType : "message",
      args : args
    }
  );
  sender.send(buf, 0, buf.length, 12000, '127.0.0.1');


}


function runCommandBpm(bpmString){
  console.log("processing bpm " + bpmString);
  bpmString = bpmString.trim();
  var args = {type: "string",
              value : ""+bpmString};

  // now send back to Max
  var sender  = dgram.createSocket("udp4");
  var buf = osc.toBuffer(
    {
      address : "bpm",
      oscType : "message",
      args : args
    }
  );
  sender.send(buf, 0, buf.length, 12000, '127.0.0.1');

}




// take a string that represents a chord, turn it into the full range of midi notes, and send to max
function runCommandChord(chordString){
  chordString = chordString.trim();
  console.log("processing chord " + chordString);

  var chord = teoria.chord(chordString);
  var noteArray = [];

  $(chord.notes).each(function(index, note){
    note.octave = 1;
//    noteArray.push(note); 
    var newoct = 1;
    while(newoct < 8){
      var newnote = new teoria.note(note.name + note.accidental.sign);
      newnote.octave = newoct;
      newnote.midi = newnote.key();
      newoct++;
      noteArray.push(newnote);
    }
  });

  noteArray.sort(function (a,b){
    return a.midi - b.midi;
  });


  var args = [];
  $(noteArray).each(function(index, note){
    args.push({type: "string",
              value : ""+note.midi});

  });

  // now send back to Max
  var sender  = dgram.createSocket("udp4");
  var buf = osc.toBuffer(
    {
      address : "chordnotes",
      oscType : "message",
      args : args
    }
  );
  sender.send(buf, 0, buf.length, 12000, '127.0.0.1');
}

function runCommandRestart(restartArgs){
  var args = {type: "string",
              value : "1"};

  // now send back to Max
  var sender  = dgram.createSocket("udp4");
  var buf = osc.toBuffer(
    {
      address : "restart",
      oscType : "message",
      args : args
    }
  );
  sender.send(buf, 0, buf.length, 12000, '127.0.0.1');

}


function runCommandHelp(helpString){
  // help command is either :
  // h, ? , or help alone. 
  // - that returns a list of possible commands
  // [h|help|?] <command> returns explanation of that command. 
  /*
      'regex' : '(b|bpm)$',
    'command' : 'bpm',
    'short_command' : 'b',
    'usage' : 'bpm BEATS PER MINUTE',
    'example' : 'bpm 140',
    'description' : 'set the tempo' 
    */
  if(!helpString){helpString = "";}  
  helpString = helpString.trim();
  var msg = "";
  $(commandHelp).each(function(index, command){
    if(helpString.match(command.regex)){
      msg += command.command + "\n";
      msg += command.description + "\n";
      msg += "usage: "+command.usage + "\n";
      msg += "eg: " + command.example;

      rand = Math.random() + "";
      rand = rand.substring(1,5);;
      msg += "\n" + rand;

      console.log(msg);
      console.log(msg.length);      
      if(msg.length< 140){
        twit.updateStatus(msg,{}, function(err){console.log("in callback"); console.log(err);});
      }
      return false;
    }

  });

}
