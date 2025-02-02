function speak(text) {
  let speakText = new SpeechSynthesisUtterance(text);
  speakText.rate = 1;
  speakText.pitch = 1;
  speakText.volume = 1;
  speakText.lang = "hi-GB";
  window.speechSynthesis.speak(speakText);
}

try {
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in your browser.");
  } else {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US"; 
    let isListening = false; 

    recognition.onresult = (event) => {
      let currentIndex = event.resultIndex;
      let transcript = event.results[currentIndex][0].transcript.toLowerCase();
      taskCommand(transcript);
    };

    recognition.onaudiostart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onaudioend = () => {
      console.log("Speech recognition stopped.");
      isListening = false;
      img.src = "icons/mic.svg"; 
    };

    const btn = document.querySelector(".mic");
    const img = document.querySelector(".mic-img");

    btn.addEventListener("click", () => {
      if (isListening) {
        recognition.stop();
        isListening = false;
        img.src = "icons/mic.svg"; 
      } else {
        recognition.start();
        isListening = true;
        img.src = "icons/loading-animation.gif"; 
      }
    });

    function taskCommand(command) {
      if (command.includes("hey") || command.includes("hello")) {
        speak("Hello, what can I help you with?");
      } else if (command.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://youtube.com/", "_blank");
      } else if (command.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");
      } else if (command.includes("open calculator")) {
        speak("Opening an online calculator...");
        window.open("https://www.calculatorsoup.com/", "_blank");
      } else if (command.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://instagram.com/", "_blank");
      } else if (command.includes("who are you") || command.includes("introduce yourself")) {
        speak("Hello, I am a virtual assistant made by Nikhil");
      } else if (command.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
      } else if (command.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("The date is " + date);
      } else {
        speak(`Here is what I found on the internet regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`, "_blank");
      }
    }
  }
} catch (err) {
  console.error("Speech recognition not supported:", err);
}

document.addEventListener("DOMContentLoaded", () => {
  const exampleElements = document.querySelectorAll(".example-type");

  exampleElements.forEach((element) => {
    element.addEventListener("click", () => {
      const exampleText = element.textContent.toLowerCase();
      console.log("Clicked:", exampleText);
      taskCommand(exampleText);
    });
  });
});

function wishMe() {
  let day = new Date();
  let hour = day.getHours();

  if (hour >= 5 && hour < 12) {
    speak("Good Morning sir, what can I do for you?");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon sir, what can I do for you?");
  } else {
    speak("Good Evening sir, what can I do for you?");
  }
}

window.addEventListener("load" ,()=>{
  wishMe();
})


const search = document.querySelector(".search-input");

search.addEventListener("keydown",function(event){
  if(event.key === "Enter"){
    console.log("search working ")
    const searchText = search.value ;
    taskCommand(searchText)
  }
})


