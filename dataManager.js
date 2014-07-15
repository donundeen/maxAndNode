autowatch = 1;

outlets = 6;

somedata = {};

textLines = [];
curTextLineIndex = 0;
maxNumTextLines = 5;


chordLines = [];
curChordLineIndex = 0;
maxNumChordLines = 5;

rhythmLines = [];
curRhythmLineIndex = 0;
maxNumRhythmLines = 5;


readingWordLine = 0;
readingWord = 0;
readingChord = 0;

readingRhythmLine = 0;
readingRhythm = 0;



function getNextWordNote(randVal){
	// do lines in order, until dnoe, then to next
	// stay on a chord until a line is done, then to next chord. get a note randomly (fractally?) from chord
	post("getNextWordNote (" + randVal + ") " + readingWordLine + " " + readingWord + " " + textLines.length+ "\n");
	var line = textLines[readingWordLine];
	if(!line){

		// do nothing
		readingWordLine++;
		if(textLines.length > 0){
			readingWordLine = readingWordLine % textLines.length;
		}
		readingWord = 0;
		return;
	}


	var word = textLines[readingWordLine][readingWord];
	if(!word){
	}

	// get chord
	var chordNotes = chordLines[readingChord];

	var chordIndex = Math.floor(randVal * chordNotes.length);
	var note = chordLines[readingChord][chordIndex];

	// advance to next word or line (and maybe chord).
	readingWord++;
	if(readingWord > textLines[readingWordLine].length - 1){
		//advance to next line, also next chord
		readingWord = 0;
		readingWordLine++;
		if(readingWordLine > textLines.length - 1){
			readingWordLine = 0;
		}
		readingChord++;
		if(readingChord > chordLines.length - 1){
			readingChord = 0;
		}

	}


	if(word != ""){
		outlet(3, parseInt(note));
		outlet(2, word);
	}
}

function getNextWord(){
	// do lines in order, until dnoe, then to next
	// stay on a chord until a line is done, then to next chord. get a note randomly (fractally?) from chord
	post("getNextWordNote " + readingWordLine + " " + readingWord + " " + textLines.length+ "\n");
	var line = textLines[readingWordLine];
	if(!line){

		// do nothing
		readingWordLine++;
		if(textLines.length > 0){
			readingWordLine = readingWordLine % textLines.length;
		}
		readingWord = 0;
		return;
	}


	var word = textLines[readingWordLine][readingWord];
	if(!word){
	}
	// advance to next word or line (and maybe chord).
	readingWord++;
	if(readingWord > textLines[readingWordLine].length - 1){
		//advance to next line, also next chord
		readingWord = 0;
		readingWordLine++;
		if(readingWordLine > textLines.length - 1){
			readingWordLine = 0;
		}
	}


	if(word != ""){
		outlet(5, word);
	}
}


function getVolumeOrNothing(){
	// use a rhythm in order until it's done, then next one.
	// the value at that point is the volume
	// if it's 0, dont' send out anything
	var line = rhythmLines[readingRhythmLine];
	if(!line){
		// do nothing
		readingRhythmLine++;
		if(rhythmLines.length > 0){
			readingRhythmLine = readingRhythmLine % rhythmLines.length;
		}else{
			readingRhythmLine = 0;
		}
		readingRhythm=0;
		return;
	}else{
	}

	var volume = rhythmLines[readingRhythmLine][readingRhythm];
	// advance to next word or line (and maybe chord).

	readingRhythm++;
	if(readingRhythm > rhythmLines[readingRhythmLine].length - 1){
		//advance to next line, also next chord
		readingRhythm = 0;
		readingRhythmLine++;
		if(readingRhythmLine > rhythmLines.length - 1){
			readingRhythmLine = 0;
		}
	}

	if(volume && volume > 0){
		outlet(4, parseFloat(volume));
	}

}
 
function setChordNotes(){
	if(readingChord == curChordLineIndex && chordLines[curChordLineIndex]){
		curChordLineIndex++;
	}
	var args = Array.prototype.slice.call(arguments, 0);
	post(curChordLineIndex % maxNumChordLines);
	chordLines[curChordLineIndex % maxNumChordLines] = args;
	curChordLineIndex++;

}


function setLineOfText(){
	if(readingWordLine == curTextLineIndex && textLines[curTextLineIndex]){
		curTextLineIndex++;
	}
	var args = Array.prototype.slice.call(arguments, 0);
	textLines[curTextLineIndex % maxNumTextLines] = args;


	curTextLineIndex++;
}

function setLineOfRhythm(){
	if(readingRhythmLine == curRhythmLineIndex &&  rhythmLines[curRhythmLineIndex]){
		curRhythmLineIndex++;		
	}
	var args = Array.prototype.slice.call(arguments, 0);
	rhythmLines[curRhythmLineIndex % maxNumRhythmLines] = args;
	curRhythmLineIndex++;
	curRhythmLineIndex =  curRhythmLineIndex % maxNumRhythmLines	
}