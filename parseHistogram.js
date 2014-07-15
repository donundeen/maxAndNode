// parsing histogram data
autowatch = 1;

outlets = 9;



function histogramToNotes(histString){
	post("histstring " + histString);

	var regex = /"([^"]+)","([^"]+)"/g;
	var matches = regex.exec(histString);
	if(matches){
		var rgb = matches[1];
		var hsv = matches[2];
		/*
	  	post("rgb: " + rgb + "\n");
	  	post("hsv: " + hsv + "\n");
*/
		var rgbsplit = rgb.split("|");
		var hsvsplit = hsv.split("|"); 

		var i = 0;
		while(i < rgbsplit.length  ){
			var rgbval = rgbsplit[i];
			rgbval = rgbval.replace("(", "");
			rgbval = rgbval.replace(")", "");
		//	post ("rbg" +  rgbval + "\n");
			var innersplit = rgbval.split(",");
			outlet(5, parseInt(innersplit[2]));
			outlet(4, parseInt(innersplit[1]));
			outlet(3, parseInt(innersplit[0]));
			i++;
		}
		i = 0;
		while(i < hsvsplit.length ){
			var hsvval = hsvsplit[i];
			hsvval = hsvval.replace("(", "");
			hsvval = hsvval.replace(")", "");
		//	post ("hsv" + hsvval + "\n");
			var innersplit2 = hsvval.split(",");
			outlet(8, parseInt(innersplit2[2]));
			outlet(7, parseInt(innersplit2[1]));
			outlet(6, parseInt(innersplit2[0]));
			i++;
		}
	}



}

function imageHistSplit(imageHistString){
	var split = imageHistString.split("|");
	var image = split.shift().trim();
	var hist = split.join("|").trim();

	outlet(1, hist);
	outlet(0, image);
}