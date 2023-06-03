// Locale storage

const listOfWomen = [
  "leyen",
  "waha",
  "mayrisch",
  "marvingt", 
  "fassbinder"
];

function checkLocaleStorage(){
  if(!localStorage.getItem("herHistoryLocale")){
    initLocaleStorage();
  } else{
    return;
  }
}

function initLocaleStorage(){
  var key;

  listOfWomen.forEach(element => {
    if(!localStorage.getItem(element)){
      localStorage.setItem(element, false)
    }

    for(var i = 1; i <= 6; i++){
      key = element + i.toString();
      if (!localStorage.getItem(key) || localStorage.getItem(key) == null) {
          localStorage.setItem(key, false)
      }
    }
  })

  localStorage.setItem("herHistoryLocale", true);
}

checkLocaleStorage();

// Hamburger Menu

const menu_btn = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-nav');

menu_btn.addEventListener('click', function () {
  if(chevron_btn.classList[1]){
    dropdownLanguage();
  }
  dropdownMenu();
});

const chevron_btn = document.querySelector('.chevron');
const lang_menu = document.querySelector('.mobile-languages');

chevron_btn.addEventListener('click', function () {
  if(menu_btn.classList[1]){
    dropdownMenu();
  }
  dropdownLanguage();
});

lang_menu.addEventListener('click', function () {
  if(menu_btn.classList[1]){
    dropdownMenu();
  }
  dropdownLanguage();
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
  delay: anime.stagger(50, {
    start: 40,
    easing: 'easeInSine'
  }),
  autoplay: false,
  translateY: 20,
});
document.querySelector('.chevron').onclick = animation2.play;

function dropdownLanguage(){
  chevron_btn.classList.toggle('is-active');
  lang_menu.classList.toggle('is-active');
}

function dropdownMenu(){
  menu_btn.classList.toggle('is-active');
  mobile_menu.classList.toggle('is-active');
}


////////////////
// Indicators //
////////////////

var uriKey = getUriKey();
var currentNext = "";
var listOfIndicators = initIndicators(uriKey);
var listOfArticles = initArticle(uriKey);
var indicatorAnimationBlink;

// get Last part of the uri, without suffix 
function getLastUriPart(){
  const path = window.location.pathname;
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  return variable = lastPart.split('.')[0];
}

// check and get of a key Value for the locale Storage
// if the last uri part is a element of the listOfWomen
function getUriKey(){
  var uriPart = getLastUriPart();
  if(uriPart === "index"){
    checkPuzzle();
  }
  let match = listOfWomen.filter(element => element === uriPart);
  if (match.length == 1){
    initSoundElements();
    return match[0];
  }
}


// return a list of not triggerd Indicators
function initIndicators(key){
  if(!key) return;

  let selector = document.getElementsByClassName('indicator');
  let listOfIndicators = [];
  for (i = 0; i < selector.length; i++) {
    if(localStorage.getItem(uriKey + (i+1).toString()) === "false"){
      listOfIndicators[i] = selector[i].id;
    } else {
      document.getElementById("ind-" + (i+1).toString()).style.borderColor = "#ebdc89";
      document.getElementById("ind-" + (i+1).toString()).getElementsByClassName("text")[0].style.color = "#ebdc89";
    }
  }

  listOfIndicators = listOfIndicators.filter(value => value !== undefined);
  calcucatePositions(key);
  return listOfIndicators;
}

async function setPuzzleToStorage(){
  let key = uriKey + "Puzzle";
  localStorage.setItem(key, true);
  await Sleep(1000);
  document.getElementsByClassName("puzzle-piece")[0].style.cssText = "z-index: 300; opacity: 1";
}

function checkPuzzle(){
  let key;
  var collectedPuzzles = [];
  listOfWomen.forEach(element => {
    key = element + "Puzzle";
    if(localStorage.getItem(key)){
      setPuzzleToPicture(key);
      collectedPuzzles.push(element);
    }
  })

  if (collectedPuzzles.length === listOfWomen.length){
    document.getElementById('particles-konfetti').style.opacity = 1;
  }
}

function checkSelect(){
  let key;

  for (var i = 0; i < listOfWomen.length; i++){
    key = listOfWomen[i] + "Puzzle";
    if(localStorage.getItem(key)){
      document.getElementsByClassName("splide__pagination--ltr")[0].childNodes[i].childNodes[0].style.cssText = "background: #ec9582 ";
    }
  }
}

function setPuzzleToPicture(key){
  document.getElementById(key).classList.add("fill");
}

function initArticle(key){
  if(!key) return;

  let selector2 = document.getElementsByClassName('articles');
  const listOfArticles = [];
  for (i = 0; i < selector2.length; i++) {
    listOfArticles[i] = selector2[i].id;
  }
  return listOfArticles;
}

async function setNextBlink() {
  // console.log(listOfIndicators);
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
  } else if ( localStorage.getItem(uriKey + "Puzzle") !== "true"){
    setPuzzleToStorage();
  }
  // console.log(listOfIndicators);
}

function func(id) {
  // console.log(localStorage.getItem(uriKey + id.toString()));
  if (localStorage.getItem(uriKey + id.toString()) !== "true"){
    document.getElementById("ind-" + id.toString()).style.borderColor = "#ebdc89";
    document.getElementById("ind-" + id.toString()).getElementsByClassName("text")[0].style.color = "#ebdc89";
    localStorage.setItem(uriKey + id.toString(), true);
    listOfIndicators.splice(listOfIndicators.indexOf("ind-" + id.toString()), 1);
    setNextBlink();
  }
  document.getElementById("article-container-" + id.toString()).style.height = "100vh"; // Artikel einblenden 
}

// Texte ausblenden
function closeArticle(id) {
  document.getElementById("article-container-" + id.toString()).style.height = "0vh";
}

// Gallerie einblenden
function getGallery(id) {
  document.getElementById("ind-" + id.toString()).style.borderColor = "#ebdc89";
  document.getElementById("ind-" + id.toString()).getElementsByClassName("text")[0].style.color = "#ebdc89";
  document.getElementById("picture-gallery").style.cssText = "z-index: 400; opacity: 1";
}

// Gallerie ausblenden
function closeGallery(id) {
  document.getElementById("picture-gallery").style.cssText = "z-index: -10; opacity: 0";
}

// Puzzle einblenden
function openPuzzleScreen(id) {
  shakeanimation.pause(); 
  var listHiddenElements = document.getElementsByClassName("hide");
  for (var i = 0; i < listHiddenElements.length; i++){
    listHiddenElements[i].style.cssText = "z-index: 300 ; opacity: 1";
  }
  document.getElementsByClassName("puzzle-piece")[0].style.cssText = "cursor: default; z-index: 300";
}

// Puzzle ausblenden
function closePuzzleScreen(id) {
  document.getElementById("puzzleScreen").style.cssText = "z-index: -10 ; opacity: 0";
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
var sound;

//Animation für den MuteButton
function initSoundElements(){  
  document.querySelector('.sound-btn').onclick = muteLoop; 

  sound = new Howl({
    src: ['/assets/sound/soundtrack_herhistory.mp3', 'soundtrack_herhistory.mp3'],
    loop: true,
    volume: 0.4,
  });

}

var muteanimation = anime({
  targets: '.bar',
  height: '5px',
  easing: 'easeInOutQuad',
  autoplay: false,
  duration: 600,
  easing: 'easeInOutQuint',
});


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


// End Screen
// Click Indicator


const xMax = 6;
var shakeanimation = anime({
  targets: '.puzzle-svg',
  easing: 'easeInOutSine',
  duration: 600,
  loop: true,
  delay: 1000,
  rotate: [
    {
      value: xMax * -1,
    },
    {
      value: xMax,
    },
    {
      value: xMax/-2,
    },
    {
      value: xMax/2,
    },
    {
      value: 0
    }
  ],
});


function getIndicatorPos(key){
  var IndicatorsFassbinder = [
    { x: 0.58, y: 0.51 },
    { x: 0.88, y: 0.18 },
    { x: 0.15, y: 0.42 },
    { x: 0.66, y: 0.28 },
    { x: 0.48, y: 0.62 },
    { x: 0.36, y: 0.34 },
  ];
  
  var IndicatorsLeyen = [
    { x: 0.265, y: 0.21 },
    { x: 0.76, y: 0.18 },
    { x: 0.84, y: 0.73 },
    { x: 0.28, y: 0.51 },
    { x: 0.545, y: 0.28 },
    { x: 0.3, y: 0.72 },
  ];
  
  var IndicatorsMarvingt = [
    { x: 0.26, y: 0.26 },
    { x: 0.13, y: 0.53 },
    { x: 0.73, y: 0.58 },
    { x: 0.39, y: 0.6 },
    { x: 0.50, y: 0.84 },
    { x: 0.33, y: 0.49 },
  ];
  
  var IndicatorsMayrisch = [
    { x: 0.5, y: 0.28 },
    { x: 0.89, y: 0.69 },
    { x: 0.67, y: 0.66 },
    { x: 0.91, y: 0.23 },
    { x: 0.20, y: 0.6 },
    { x: 0.46, y: 0.64 },
  ];
  
  var IndicatorsWaha = [
    { x: 0.20, y: 0.30 },
    { x: 0.84, y: 0.64 },
    { x: 0.1, y: 0.85 },
    { x: 0.84, y: 0.26 },
    { x: 0.57, y: 0.61 },
    { x: 0.38, y: 0.72 },
  ];

  switch(key){
    case 'fassbinder':
      return IndicatorsFassbinder;
    case 'leyen':
      return IndicatorsLeyen;
    case 'marvingt':
      return IndicatorsMarvingt;
    case 'mayrisch':
      return IndicatorsMayrisch;
    case 'waha':
      return IndicatorsWaha;
    default:
      return null;
  }
}

function calcucatePositions(){
  var canvas = document.getElementById("backgroundImage");
  var indicators = document.getElementsByClassName("indicator");
  var position = getIndicatorPos(uriKey);

  if (position === null){
    return;
  }

  // console.log(canvas.width);
  // console.log(canvas.height);
  for (var i = 0; i < 6; i++){
    indicators[i].style.left = `${canvas.offsetLeft + canvas.width * position[i].x}px`;
    indicators[i].style.top = `${canvas.offsetTop + canvas.height * position[i].y}px`;
  }
}

window.addEventListener('resize', () => {
  calcucatePositions();
});

window.onload = (() => {
  calcucatePositions();
});
