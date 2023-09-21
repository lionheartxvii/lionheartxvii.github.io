// var controller = new ScrollMagic.Controller(); //Controller der die meisten ScrollMagic Animationen initiiert



// Indicator Trigger

// var IndicatorRemoval2 = new ScrollMagic.Scene({
//     triggerElement: '.scroll-trigger',
//     triggerHook: 0.70,
// })
// .addTo(controller)
// .addIndicators({
//     name: 'SCROLL2&3'
// })
// .setClassToggle('.text-indicator', 'active');



// Lottie Animations

LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-1',
    // actions: [
    //   {
    //     visibility: [0.2, 1],
    //     type: 'seek',
    //     frames: [0, 110],
    //   },
      
    // ],

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
    // actions: [
    //   {
    //     visibility: [0.2, 1],
    //     type: 'seek',
    //     frames: [0, 280],
    //   },
      
    // ],
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

  

//   why its difficult
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-3',
    // actions: [
    //   {
    //     visibility: [0.2, 1],
    //     type: 'seek',
    //     frames: [0, 110],
    //   },
      
    // ],

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
    // actions: [
    //   {
    //     visibility: [0.2, 1],
    //     type: 'seek',
    //     frames: [0, 110],
    //   },
      
    // ],

    container: "#section5",
    mode: 'cursor',
    actions: [
      {
          type: "hover",
          forceFlag: false
      }
    ],
  });


//   flowers

// var animation2 = anime({
//     targets: '#flowers path',
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     autoplay: true,
//     duration: 5000,

//     direction: 'alternate',
//     loop: false,
//   });
//   document.querySelector('#flowers').onclick = animation2.play;