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

header.addEventListener('click', () => {
  expandableBox.classList.toggle('expanded');
  arrow.classList.toggle('up');
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
    }
  }

  function hideBox() {
    if (activeBox !== 0 && !pinnedBox) {
      const hiddenBox = document.getElementById(`hiddenBox${activeBox}`);
      hiddenBox.style.display = "none";
      circleElements[activeBox - 1].style.scale = 1;
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

  function toggleClick(element) {
    if (element.classList.contains("clicked")) {
      selectedBoxes--;
    } else {
      if (selectedBoxes < maxSelectedBoxes) {
        selectedBoxes++;
      } else {
        return; // Limit reached, prevent further selection
      }
    }
    element.classList.toggle("clicked");
    checkMaxSelectedBoxes();
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