
// Hamburger Menu

const menu_btn = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-nav');

menu_btn.addEventListener('click', function () {
  menu_btn.classList.toggle('is-active');
  mobile_menu.classList.toggle('is-active');
});

const chevron_btn = document.querySelector('.chevron');
const lang_menu = document.querySelector('.mobile-languages');

chevron_btn.addEventListener('click', function () {
  chevron_btn.classList.toggle('is-active');
  lang_menu.classList.toggle('is-active');
});

var animation1 = anime({
  targets: '.menu-item',
  delay: anime.stagger(80, {
    start: 80,
    easing: 'easeInSine'
  }),
  autoplay: false,
  translateY: 20,
});
document.querySelector('.hamburger').onclick = animation1.play;

var animation2 = anime({
  targets: '.menu-item',
  delay: anime.stagger(80, {
    start: 40,
    easing: 'easeInSine'
  }),
  autoplay: false,
  translateY: 20,
});
document.querySelector('.chevron').onclick = animation2.play;


// Open Articles + Blinken
let selector = document.getElementsByClassName('indicator');
const listOfIndicators = [];
for (i = 0; i < selector.length; i++) {
  listOfIndicators[i] = selector[i].id;
}
console.log(listOfIndicators);

let selector2 = document.getElementsByClassName('articles');
const listOfArticles = [];
for (i = 0; i < selector2.length; i++) {
  listOfArticles[i] = selector2[i].id;
}
console.log(listOfArticles);

var currentNext = "";
var indicatorAnimationBlink;


async function setNextBlink() {

  if (currentNext !== "") {
    indicatorAnimationBlink.duration = 100;
    indicatorAnimation.autoplay = false;
    await Sleep(100);
  }

  if (listOfIndicators.length > 0) {
    currentNext = listOfIndicators[0];
    indicatorAnimationBlink = anime({
      targets: '#' + currentNext,
      easing: 'easeInOutQuad',
      keyframes: [{
          scale: 1.2
        },
        {
          scale: 1
        },
      ],
      autoplay: true,
      delay: 1000,
      duration: 1500,
      easing: 'linear',
      loop: true,
    });
    indicatorAnimationBlink.play();
  }
  console.log(currentNext);
}

function func(id) {
  document.getElementById("ind-" + id.toString()).style.borderColor = "#ebdc89";
  document.getElementById("ind-" + id.toString()).getElementsByClassName("text")[0].style.color = "#ebdc89";
  listOfIndicators.splice(listOfIndicators.indexOf("ind-" + id.toString()), 1);
  setNextBlink();
  document.getElementById("article-container-" + id.toString()).style.height = "100vh"; // Texte einblenden 

}

// Texte ausblenden
function closeArticle(id) {
  document.getElementById("article-container-" + id.toString()).style.height = "0vh";
}

// Gallerie einblenden
function getGallery(id) {
  document.getElementById("ind-" + id.toString()).style.borderColor = "#ebdc89";
  document.getElementById("ind-" + id.toString()).getElementsByClassName("text")[0].style.color = "#ebdc89";
  listOfIndicators.splice(listOfIndicators.indexOf("ind-" + id.toString()), 1);
  setNextBlink();
  document.getElementById("picture-gallery").style.cssText = "z-index: 500; opacity: 1";
}

// Gallerie ausblenden
function closeGallery(id) {
  document.getElementById("picture-gallery").style.cssText = "z-index: -10; opacity: 0";
}

// Click Indicator
var textAnimation = anime({
  targets: '.click-indicator',
  keyframes: [{
          opacity: 0
      },
      {
          opacity: 1
      },
  ],
  loop: true,
  duration: 4000,
  easing: 'linear',
  autoplay: true
});



// Kapitel ausblenden

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function startChapter() {
  document.getElementById("chapter").onclick = "";
  chapterHide.play();
  await Sleep(1500);
  document.getElementById("chapter").style.display = "none";
  sound.play();

  indicatorAnimation.play();
  setNextBlink();
}

var chapterHide = anime({
  targets: '.chapter-container, .chapter-title, .dark',
  opacity: 0.0,
  easing: 'easeInOutSine',
  autoplay: false,
  loop: false,
  duration: 1000,
  delay: 300,
});


var indicatorAnimation = anime({
  targets: '.indicator',
  easing: 'easeInOutQuad',
  opacity: 1,
  autoplay: true,
  duration: 500,
  easing: 'linear',
  autoplay: false,

});
// indicatorAnimation.pause();



// Sound

//Animation für den MuteButton
var muteanimation = anime({
  targets: '.bar',
  height: '5px',
  easing: 'easeInOutQuad',
  autoplay: false,
  duration: 600,
  easing: 'easeInOutQuint',
});

document.querySelector('.sound-btn').onclick = muteLoop;

// MuteAniamtion wird nach Abschluss reverst  
function muteLoop() {
  muteanimation.play();
  muteanimation.finished.then(() => {
    muteanimation.reverse();
  })
}

//HintergrundMusik wird gemutet oder abgespielt
window.muteSound = window.muteSound || {
  isMuted: false,
  //Funktion für den Button
  muteButton: function () {
    muteSound.isMuted = !muteSound.isMuted;
    if (muteSound.isMuted) {
      sessionStorage.setItem("isMute", "true");
    } else {
      sessionStorage.setItem("isMute", "false");
    }
    Howler.mute(muteSound.isMuted);
  }
}

//Prüft den letzen gespeicherten Stand von isMuted
//Beim Laden der nächsten Seite wird je nachdem die Musik direkt gemuted
function checkMute() {
  Sleep(2000);
  if (!sessionStorage.getItem("isMute")) {
    sessionStorage.setItem("isMute", "false");
  }
  if (sessionStorage.getItem("isMute") == "true") {
    muteLoop();
    muteSound.muteButton();
  }
}

var sound = new Howl({
  src: ['/assets/sound/book-of-souls.mp3', 'book-of-souls.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.3,
});
var id1 = sound.play();
sound.fade(0, 0.3, 3000, id1);


// Infobox
var infoOn = false;
//Information werden eingeblendet/ausgeblendet (Help-Button)
function showInfo() {
  var infoBox = document.getElementById("infoBox");
  if (infoOn) {
    hideInfo(infoBox); // Falls InfoBox bereits an ist, wird hideInfo aufgerufen
    infoOn = false;
  } else {
    infoOn = true;
    infoBox.style.zIndex = "1001"; // Div-Box wird nach vorne gesetzt
    infoBox.style.opacity = "1";
  }
}

//Infobox wird ausgeblendet
function hideInfo(infoBox) {
  infoBox.style.zIndex = "-1000"; // Wird nach hinten gesetzt, um andere klickbare Div-Boxen nicht zu blockieren
  infoBox.style.opacity = "0";
}


