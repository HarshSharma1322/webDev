var count = 15;
var word;
var p1id, p2id;
var val = 0;
let visited = true;

function changeColor() {
  console.log('Hello');
  if (val == 0) {
      p1id = document.getElementById('p1');
      p2id = document.getElementById('p2');
      p1id.style.backgroundColor = "Green";
      p2id.style.backgroundColor = "blue";
    val = !val;
  }
  else {
      p2id = document.getElementById('p2');
  p1id = document.getElementById('p1');
  p2id.style.backgroundColor = "Green";
    p1id.style.backgroundColor = "blue";
    val = !val;
  }
}
function timer()
{
  count = count - 1;
   // document.getElementById("timer").innerHTML = count;
  if (count == 0) {
    console.log("timer if");
      document.getElementById("timer").innerHTML = '';
      if ("speechSynthesis" in window) {
         let voices = getVoices();
         let rate = 0.75,
            pitch = 2,
           volume = 100;
        if (visited) {
          visited = false;
          // const cars = ["I", "U", "Hello", "Love", "We"];
          // word = cars[Math.floor(Math.random() * cars.length)];
          let text = `Start singing with word ${word}`;
          document.getElementById('word').innerHTML = '';
 
         speak(text, voices[40], rate, pitch, volume);
        }
        handleStartButton();
      }
   }
   if (count > 0) {
      document.getElementById("timer").innerHTML = count;
   }

}
const timerHelper = () => {
  console.log('Hello called');
   TimerHelperResolved();
   btn = true;
};

let intervalId = null;
function TimerHelperResolved() {
  myFunction();
  clearInterval(intervalId);
  intervalId = null;
  intervalId = setInterval(timer, 1000); 
  setTimeout(getWords, 1000);
   
}

function getWords() {
  if (visited) { 
    const cars = ["I", "U", "Hello", "Love", "We"];
    word = cars[Math.floor(Math.random() * cars.length)];
    document.getElementById("word").innerHTML = "Your word is: "+word;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;
let rounds = [];
let finalSpeech = "";

const StartTimer = () => setTimeout(() => recognition.stop(), 10000);

var btn = false;
function callFun() {
   btn ? handleStartButton() : timerHelper();
}
function handleStartButton() {
   recognition.start();
   StartTimer();
   btn = false;
};

recognition.onstart = () => {
  console.log("Start Speech...");
};

function getVoices() {
  let voices = speechSynthesis.getVoices();
  if (!voices.length) {
    // some time the voice will not be initialized so we can call spaek with empty string
    // this will initialize the voices
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = speechSynthesis.getVoices();
  }
  return voices;
}

function speak(text, voice, rate, pitch, volume) {
  // create a SpeechSynthesisUtterance to configure the how text to be spoken
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; // From 0 to 1
  speakData.rate = rate; // From 0.1 to 10
  speakData.pitch = pitch; // From 0 to 2
  speakData.text = text;
  speakData.lang = "en";
  speakData.voice = voice;

  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
  speechSynthesis.speak(speakData);
}



recognition.onspeechend = () => {
  console.log("Speech Ended...");
  console.log("finalSpeech ", finalSpeech);
  let wordArr = finalSpeech.split(" ");
  if ("speechSynthesis" in window) {
    let voices = getVoices();
    let rate = 0.75,
      pitch = 2,
      volume = 100;
    let lastWord = wordArr[wordArr.length - 1];
    let text = `Start singing with word ${lastWord}`;

    speak(text, voices[40], rate, pitch, volume);
    document.getElementById("word").innerHTML = "Your word is: "+lastWord;
    finalSpeech = "";
    changeColor();
    count =15;
    setTimeout(timerHelper, 3000);
  } else {
    console.log(" Speech Synthesis Not Supported 😞");
  }
};

const btn1 = document.getElementById("start-button");
btn1.onclick = callFun;

recognition.onresult = (event) => {
  // console.log("event -> ", event.results[0][0].transcript);
  finalSpeech = "";
  finalSpeech = event.results[0][0].transcript;
  rounds.push(finalSpeech);
};
var buttonVal = document.getElementById("start-button");

function myFunction() {
   buttonVal.style.visibility = "hidden"
//   setTimeout(()=>{
//    buttonVal.style.visibility = "visible"
//     console.log('Button Activated')}, 16000)
 
}
// setInterval(changeColor, 35000);