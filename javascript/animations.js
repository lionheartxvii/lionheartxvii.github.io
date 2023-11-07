

// Lottie Animations

LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-1',
    container: "#section2",
    mode: 'cursor',
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });


//   Kettenreaktion Animation

  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-2',
    container: "#illustration-2-container",
    mode: 'cursor',
    speed: 0.2,
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });

  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-2-mobile',
    container: "#illustration-2-container-mobile",
    mode: 'cursor',
    speed: 0.2,
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });



//   why its difficult
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-3',
    container: "#section3",
    mode: 'cursor',
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });

  

//   More tipps animation
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-4',
    container: "#section5",
    mode: 'cursor',
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });

  //  Flowers
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#flowers-animation',
    container: "#section6",
    mode: 'cursor',
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });


    //  Bee
    LottieInteractivity.create({
      mode: 'scroll',
      player: '#bee-animation',
      container: "#section6",
      mode: 'cursor',
      actions: [
        {
            type: "hover",
            forceFlag: false
        }
      ],
    });


// Scroll in View

let controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
  triggerElement: '#section4',
  triggerHook: 0.35
})
.addTo( controller )
// .addIndicators({name: 'ClassToggle'})
.setClassToggle("#section4", "active");

function  ScrollIn(className, offsetvalue ){
  var revealElements = document.getElementsByClassName(className);
      for (var i=0; i<revealElements.length; i++) { 
          new ScrollMagic.Scene({
                              triggerElement: revealElements[i], 
                              offset: offsetvalue,												 
                              triggerHook: 0.92,
                              delay: 150,
                          })
                          .setClassToggle(revealElements[i], "visible") 
                          // .addIndicators({name: className+ (i+1) }) 
                          .addTo(controller);
      }
}

ScrollIn("box-0", 40);
ScrollIn("box-1", 80);
ScrollIn("box-2", 120);
ScrollIn("box-3", 160);
ScrollIn("box-4", 200);