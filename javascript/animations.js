var controller = new ScrollMagic.Controller(); //Controller der die meisten ScrollMagic Animationen initiiert

var animationBall = anime({
    targets: '#ball',
    keyframes: [{
            translateY: -20
        },
        {
            translateY: 20
        },
        {
            translateY: 0
        }
    ],
    easing: 'linear',
    duration: 4000,
});

// Indicator Trigger

var IndicatorRemoval2 = new ScrollMagic.Scene({
    triggerElement: '.scroll-trigger',
    triggerHook: 0.70,
})
.addTo(controller)
.addIndicators({
    name: 'SCROLL2&3'
})
.setClassToggle('.text-indicator', 'active');

// Lottie Animations

LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-1',
    actions: [
      {
        visibility: [0.2, 1],
        type: 'seek',
        frames: [0, 110],
      },
      
    ],

    // container: "#section2",
    // mode: 'cursor',
    // actions: [
    //   {
    //       type: "hover",
    //       forceFlag: false
    //   }
    // ],
  });

  LottieInteractivity.create({
    mode: 'scroll',
    player: '#illustration-2',
    actions: [
      {
        visibility: [0.3, 1],
        type: 'seek',
        frames: [0, 220],
      },
      
    ],
  });