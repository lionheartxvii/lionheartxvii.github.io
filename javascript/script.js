// Arrow Scroll Down Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({
    behavior: "smooth"
  });
}



// Scroll-Up 
const stickyButton = document.querySelector('.up-button');

stickyButton.addEventListener('click', () => {
const section1 = document.getElementById('section1');
if (section1) {
  section1.scrollIntoView({ behavior: 'smooth' });
}
});


// Artikel Rein und Rausfahren
let activePageValue = 0;
let isFunctionRunning = false;
const allArticle = document.querySelector(".all-articles");
async function func(newArticleValue) {
  if ( newArticleValue === activePageValue || isFunctionRunning ) {
      return;
  }
  isFunctionRunning = true;
  const oldArticle = document.querySelector(`#article-container-${activePageValue}`);
  const newArticle = document.querySelector(`#article-container-${newArticleValue}`);
  setNavBar(activePageValue, newArticleValue);

  newArticle.style.display = "flex";
  if ( newArticleValue === 0 ) {
      newArticle.style.zIndex = "0";
      oldArticle.style.zIndex = "100";
      oldArticle.style.transition = "0.75s";
      oldArticle.style.width = "0%"; // Artikel ausblenden
      await waitForTransitionEnd(oldArticle, 'width');
      oldArticle.style.display =  "none";
      oldArticle.style.zIndex = "0";
      activePageValue = newArticleValue;
      isFunctionRunning = false;
      return;
  }
  if  ( newArticleValue > 0 ) {
    allArticle.style.height = newArticle.offsetHeight.toString() + "px";
      oldArticle.style.zIndex = "0";
      newArticle.style.transition = "0.75s";
      newArticle.style.zIndex = "100";
      await setTimeout(() => {
        newArticle.style.width = "100%"; // Artikel einblenden
      }, 10); // Warten Sie 10 Millisekunden (kann angepasst werden)
      
      await waitForTransitionEnd(newArticle, 'width');
  }
  if  ( activePageValue > 0 ) {
      oldArticle.style.width = "0%"; // Artikel ausblenden
  }
  newArticle.style.zIndex = "0";
  oldArticle.style.display =  "none";
  newArticle.style.transition = "0s";
  activePageValue = newArticleValue;
  allArticle.style.height = newArticle.offsetHeight.toString() + "px";
  isFunctionRunning = false;
};

function setNavBar(oldArticle, newArticle) {
  const navElements = document.getElementsByClassName("nav-box-link");
  navElements[newArticle].classList.add("active");
  navElements[oldArticle].classList.remove("active");
}

function waitForTransitionEnd(element, propertyName) {
  // element.addEventListener('transitionend', transitionEndHandler);
  return new Promise(resolve => {
    element.addEventListener('transitionend', transitionEndHandler);
    function transitionEndHandler(event) {
      if (event.propertyName === propertyName) {
        element.removeEventListener('transitionend', transitionEndHandler);
        resolve();
      }
    }
  });
}

  // Quellen Box

const header = document.querySelector('.quellen-header');
const arrow = document.querySelector('.quellen-arrow');
const expandableBox = document.querySelector('.quellen');

header?.addEventListener('click', () => {
expandableBox?.classList.toggle('expanded');
arrow?.classList.toggle('up');
});

const links = document.querySelectorAll('.text a');

links.forEach(link => {
link.addEventListener('click', (event) => {
  event.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    expandableBox.classList.add('expanded');
    arrow.classList.add('up');
  }
});
});

// Max Neefs Bedürfnisse Kreis

document.querySelectorAll( '.circle' ).forEach( ( circle )=>{
  let circles = circle.querySelectorAll( '.circle-element' )
  let angle = 360-90, dangle = 360 / circles.length
  for( let i = 0; i < circles.length; ++i ){
    let circle = circles[i]
    angle += dangle
    circle.style.transform = `rotate(${angle}deg) translate(${circle.clientWidth / 0.45}px) rotate(-${angle}deg)`
  }
})


let activeBox = 0;
let pinnedBox = false;
let circleElements = document.querySelectorAll(".circle-element");

function showBox(boxNumber) {
  if (boxNumber !== activeBox && !pinnedBox) {
    hideBox();
    activeBox = boxNumber;
    const hiddenBox = document.getElementById(`hiddenBox${boxNumber}`);
    hiddenBox.style.display = "block";
    circleElements[boxNumber - 1 ].style.scale = 1.1;
    circleElements[boxNumber - 1 ].style.backgroundColor = "rgba(36, 36, 39, 0.1)";
  }
}

function hideBox() {
  if (activeBox !== 0 && !pinnedBox) {
    const hiddenBox = document.getElementById(`hiddenBox${activeBox}`);
    hiddenBox.style.display = "none";
    circleElements[activeBox - 1].style.scale = 1;
    circleElements[activeBox - 1 ].style.backgroundColor = "rgba(36, 36, 39, 0.0)";
    activeBox = 0;
  }
}

function pinBox(boxNumber){
  if (!pinnedBox) {
    pinnedBox = true;
  } else if ( activeBox === boxNumber) {
    pinnedBox = false;
  } else if ( activeBox !== boxNumber) {
    pinnedBox = false;
    hideBox();
    showBox(boxNumber);
    pinnedBox = true;
  }
}



// Werte / Eis Bespiel

let maxSelectedBoxes = 0;
let selectedBoxes = 0;

function toggleClick(element, verfahren) {
  if (element.classList.contains("clicked")) {
    selectedBoxes--;
  } else {
    if (selectedBoxes <= maxSelectedBoxes) {
      selectedBoxes++;
    } else {
      return; // Limit reached, prevent further selection
    }
  }
  element.classList.toggle("clicked");
  checkMaxSelectedBoxes();

  if (verfahren){
    executeAusschluss(verfahren);
  }
}

function checkMaxSelectedBoxes() {
  const allSmallBoxes = document.querySelectorAll(".small-box");
  allSmallBoxes.forEach(box => {
    if (selectedBoxes >= maxSelectedBoxes && !box.classList.contains("clicked")) {
      box.classList.add("max-selected");
    } else {
      box.classList.remove("max-selected");
    }
  });
}


// Code von: https://stackoverflow.com/questions/49923588/input-type-number-with-pattern-0-9-allows-letters-in-firefox
function preventNonNumericalInput(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9]+$/))
    e.preventDefault();
}

function executeAusschluss(value) {
  if (selectedBoxes === maxSelectedBoxes && value === 'ausschluss1') {
    let allElements = document.querySelectorAll('.small-box.paradox');
    let wholeDiv = document.querySelector('.beispiel-paradox');
    let elementsToRemove = [];
    let elementsToMove = [];

    setHeight(wholeDiv.children[1]);

    for (let i = 0; i < wholeDiv.children[1].children.length; i++) {
      const element = wholeDiv.children[1].children[i];
      let height = element.offsetHeight;
      let width = element.offsetWidth;
      element.style.height = height;
      element.style.width = width;
    }

    //remove not fruity elements
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.classList.contains('fruity')){
        element.classList.remove('clicked');
        element.classList.remove('fruity');
        element.removeAttribute('onClick');        
        element.classList.add('move-up-class');
        if (element.children[0].innerHTML === "Erdbeere" || element.children[0].innerHTML === "Himbeere"){
          element.classList.add("fruity");
          element.addEventListener('click', function() {
            toggleClick(this, 'ausschluss2');
          });  
        }
        let height = element.offsetHeight;
        let width = element.offsetWidth;
        element.style.height = height;
        element.style.width = width;
        element.style.transform = `translateY(-${ height * (i % 5) }px)`;
        elementsToMove.push(element);
      }else {
        element.classList.add('remove-class');
        elementsToRemove.push(element);
      }
    }
    // document.querySelector('.beispiel-paradox').children[1].classList.add('paradox-height-class');
    setTimeout(function() {
      elementsToRemove.forEach(element => {
        element.remove();
      });
      elementsToMove.forEach(element => {
        element.style.transition = 'translate 0s';
        element.style.transform = '';
      });
    }, 300);
    document.querySelector('.box-counter').innerHTML = "2/2";
    document.querySelector('.beispiel-paradox').children[0].children[2].children[0].textContent = "Nun haben Sie Ihre Auswahl von 25 auf 5 Sorten reduziert.";
    let boldA = document.createElement('a');
    boldA.innerHTML = " Im zweiten Schritt verringeren Sie nun Ihre Auswahl auf Beeren.";
    boldA.classList.add("bold");
    document.querySelector('.beispiel-paradox').children[0].children[2].children[0].appendChild(boldA);
    maxSelectedBoxes = 2;
    selectedBoxes = 0
  }
  if (selectedBoxes === maxSelectedBoxes && value === 'ausschluss2') {
    let allElements = document.querySelectorAll('.small-box.paradox');
    let elementsToRemove = [];
    let elementsToMove = [];

    //remove not fruity elements
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.classList.contains('fruity')){
        element.classList.remove('clicked');
        element.classList.remove('fruity');
        element.removeAttribute('onClick');      
        element.addEventListener('click', function() {
          toggleClick(this, 'nichts');
        });
        element.style.transition = 'transform 0.3s';
        element.style.transform = `translateX(55%)`;
        elementsToMove.push(element);
      }else {
        element.classList.add('remove-class');
        elementsToRemove.push(element);
      }
    }
    // document.querySelector('.beispiel-paradox').children[1].classList.add('paradox-height-class');
    setTimeout(function() {
      elementsToRemove.forEach(element => {
        element.remove();
        elementsToMove.forEach(element => {
          element.style.transition = 'translate 0s';
          element.style.transform = '';
        });
      });
    }, 300);
    document.querySelector('.box-counter').innerHTML = "2/2";
    document.querySelector('.beispiel-paradox').children[0].children[2].children[0].textContent = "Gratulation!";
  }
}

function setHeight(element) {
  let height = element.offsetHeight;
  element.style.height = height + "px";
}







// Hamburger Menu

const menu_btn = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-nav');

menu_btn?.addEventListener('click', function () {
  dropdownMenu();
});


// var animation1 = anime({
//   targets: '.menu-item',
//   delay: anime.stagger(80, {
//     start: 80,
//     easing: 'easeInSine'
//   }),
//   autoplay: false,
//   translateY: 20,
// });
// document.querySelector('.hamburger').onclick = animation1.play;

function dropdownMenu(){
  menu_btn.classList.toggle('is-active');
  mobile_menu.classList.toggle('is-active');
}


function berechneBreiten() {
  var viewportBreite = window.innerWidth;
  var elementBreite = document.getElementById("meinElement").offsetWidth;
  var ergebnisText = "Viewport-Breite: " + viewportBreite + "px, Element-Breite: " + elementBreite + "px";
  document.getElementById("ergebnis").textContent = ergebnisText;

  document.getElementsByTagName('body')[0].width = viewportBreite >= elementBreite ? elementBreite : viewportBreite;
}
window.addEventListener("load", berechneBreiten);
window.addEventListener("resize", berechneBreiten); 