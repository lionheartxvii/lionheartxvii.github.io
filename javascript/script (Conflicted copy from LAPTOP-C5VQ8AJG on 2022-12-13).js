let selector = document.getElementsByClassName('indicator');
const listOfIndicators = [];
for(i = 0; i < selector.length; i++){
  listOfIndicators[i] = selector[i].id;
}
console.log(listOfIndicators);

var currentNext = "";
var indicatorAnimationBlink;

async function setNextBlink(){

  if (currentNext !== ""){
    indicatorAnimationBlink.duration = 100;
    indicatorAnimation.autoplay = false;
    await Sleep(100);
  } 

  if(listOfIndicators.length > 0){
    currentNext = listOfIndicators[0];
    indicatorAnimationBlink = anime({
      targets: '#' + currentNext,
      easing: 'easeInOutQuad',
      // keyframes: [
      //     {opacity: 0},
      //     {opacity: 1},
      //     {opacity: 0},
      // ],
      height: '42px',
      width: '42px',
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

  document.getElementById("article-container-" + id.toString()).style.height = "100vh"; // Texte einblenden 

  listOfIndicators.splice(listOfIndicators.indexOf("ind-" + id.toString()), 1);
  setNextBlink();
}
// Kapitel ausblenden

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function startChapter(){
    document.getElementById("chapter").onclick = "";    
    chapterHide.play();
    await Sleep(1500);
    document.getElementById("chapter").style.display = "none"; 

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