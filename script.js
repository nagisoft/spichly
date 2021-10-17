/*
 * Check for browser support
 */
var supportMsg = document.getElementById('msg');

if ('speechSynthesis' in window) {
	supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
} else {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.';
}


// Get all the elements
var button = document.getElementById('speak');
var pauseButton = document.getElementById('pause');
var resumeButton = document.getElementById('resume');
var speechMsgInput = document.querySelector('textarea');
var voiceSelect = document.getElementById('voice');
var volumeInput = document.getElementById('volume');
var speed = document.getElementById('rate');


// get voices and languages list and put them in select option
function loadVoices() {
  if (String(window.performance.getEntriesByType("navigation")[0].type)) {
    	speechSynthesis.cancel();

	}	
	var voices = speechSynthesis.getVoices();
  
	voices.forEach(function(voice, i) {
		var option = document.createElement('option');
		option.value = voice.name;
		option.innerHTML = voice.name;
		  
		voiceSelect.appendChild(option);
	});
}

loadVoices();

window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};



function speak(text) {
	if(window.speechSynthesis.paused){
		window.speechSynthesis.resume();
	}
	else{
	var msg = new SpeechSynthesisUtterance();
  
	msg.text = text;
  
	msg.volume = parseFloat(volumeInput.value);
	msg.rate = parseFloat(speed.value);
  

	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
  
	window.speechSynthesis.speak(msg);

	msg.onstart = function() { 
		addAnimation()
 	};
	msg.onresume = function() { 
		addAnimation()
 	};
	 msg.onend = function() { 
		removeAnimation()
 	};
	  msg.onpause = function() { 
		removeAnimation()
 	};
}
}
function addAnimation(){
	$('.visualizer-1').css( 'animation', 'music 0.5s linear infinite');
		$('.visualizer-2').css( 'animation' , "music 0.9s linear infinite");
		$('.visualizer-3').css( 'animation' , "music 0.7s linear infinite");
		$('.visualizer-4').css( 'animation' , "music 1.1s linear infinite");
}

function removeAnimation(){
	$('.visualizer-item').css( 'animation' , "none");
}

button.addEventListener('click', function(e) {
	if (speechMsgInput.value.length > 0) {
		speak(speechMsgInput.value);
	}
});

pauseButton.addEventListener('click', function(e) {
		window.speechSynthesis.pause();

});

resumeButton.addEventListener('click', function(e) {
		window.speechSynthesis.resume();

});

