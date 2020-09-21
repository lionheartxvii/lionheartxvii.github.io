// Scroll into View
let controller = new ScrollMagic.Controller(); //Controller der die meisten ScrollMagic Animationen initiiert

//Alle Klassen von className bekommen ein offset, mit welcher "verspätung" sie auftauchen sollen
function ScrollIn(className, offsetvalue) {
    var revealElements = document.getElementsByClassName(className);
    new ScrollMagic.Scene({
            triggerElement: revealElements[0],
            offset: offsetvalue,
            triggerHook: 0.9,
            delay: 150,
        })
        .setClassToggle(revealElements[0], "visible")
        //.addIndicators({name: className+ (0+1) }) 
        .addTo(controller);
}

ScrollIn("pinkesrechteck", 50);
ScrollIn("lilarechteck", 150);
ScrollIn("blauesrechteck", 250);



//  Parallax

//Parallaxeffekt durch Veränderung der Position des Hintergrundes
//Position errechnet durch Formel in Zeile 38
let parallaxsection = document.getElementById('parallax');
new ScrollMagic.Scene({
        triggerElement: '#parallax',
        triggerHook: 'on enter',
        duration: '100%'
    })
    .addTo(controller)
    //.addIndicators({name: 'Parallax', colorStart:'#ffffff', colorEnd:'#ffffff',  colorTrigger:'#ffffff'})
    .on("progress", function (event) {
        console.log(window.innerHeight);
        let verschiebung = event.progress * window.innerHeight * -0.5;
        parallaxsection.style.backgroundPosition = 'center ' + verschiebung + 'px';
    });



// Chocolat
Chocolat(document.querySelectorAll('.chocolat'), {
    // options here
});



// Accordion
(function () {
    var accordionToggles = document.querySelectorAll('.accordion-toggle');
    if (accordionToggles.length) {
        accordionToggles.forEach(function (el, i) {
            // add click event to single elements
            el.addEventListener('click', function (e) {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    if (accordionToggles[0].dataset.accordionmode && accordionToggles[0].dataset.accordionmode == 'single') {
                        //close inactive elements
                        accordionToggles.forEach(function (eli, ii) {
                            if (el != eli) {
                                eli.classList.remove('active');
                                eli.nextElementSibling.style.maxHeight = 0 + 'px';
                            }
                        })
                    }
                    this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight +
                        'px';
                } else {
                    this.nextElementSibling.style.maxHeight = 0 + 'px';
                }
            })
        })
    }

})();

// Flexslider
$(window).on('load', function () {
    $('.flexslider').flexslider({
        animation: "slide",
        slideshow: true,
        slideshowSpeed: 7000,
        easing: "swing",
        itemWidth: 460,
        itemMargin: 5,
        maxItems: 2,
        smoothHeight: true,
    });
});



// Leaflet
let map = L.map('map-container', {
    fullscreenControl: true,
}).setView([49.75911, 6.63203], 15);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([49.75911, 6.63203]).addTo(map)
    .bindPopup('Irminenfreihof 8, Intermedia Design')
    .openPopup();



// TippyJS  

function TippySeite(className, placementsetting) {
    tippy('.' + className, {
        content(reference) {
            return reference.nextElementSibling.innerHTML;
        },
        placement: placementsetting,
        animation: 'scale',
        theme: 'mystyle',
    })
};

TippySeite("erstebox", 'top-start');
TippySeite("zweitebox", 'top-end');
TippySeite("drittebox", 'bottom-start');
// TippySeite("viertebox", 'bottom-end');



//Svg Animation

function AnimeSVG(event) {
    //console.log("Event fired! (" + event.type + ")");
    anime({
        targets: '#imd path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: function (el, i) {
            return i * 150
        },
        begin: function (anime) {   //callback begin->sobald anime startet
            SVGScene.remove();      //Scene aus controller entfernen 
        }                           //um mehrfaches triggern zu verhindern
    });
}

var SVGScene = new ScrollMagic.Scene({
        triggerElement: '#svg-container',
        triggerHook: 0.35,
    })
    .addTo(controller)
    // .addIndicators({name: 'SVG'})
    .setClassToggle('#svg-container', "active")
    .on("enter", AnimeSVG);


//AnimeJS Animation

//Funktion erzeugt ein x,y Feld an Divboxen, welche eine Animation abspielen
//Animation selbst ist in der Funktion definiert 
function GridAnime(x, y) {
    text = "";
    var element;

    //in for-schleife werden x*y divboxen geschrieben
    for (i = 0; i < (x * y); i++) {
        text += "<div></div>";
    }
    //die Divboxen werden an gebrauchter Stelle der HTML eingefügt
    element = document.getElementById("gridTest");
    element.style.gridTemplateColumns = ("repeat(" + x + ", 1fr)");
    element.innerHTML = text;

    //Animation mit animejs für divs
    anime({
        targets: '.grid > div',
        scale: [{
                value: .1,
                easing: 'easeOutSine',
                duration: 500
            },
            {
                value: 1,
                easing: 'easeInOutQuad',
                duration: 600
            },
            {
                value: 1,
                easing: 'easeInOutQuad',
                duration: 700
            },

        ],
        backgroundColor: [{
                value: '#E23FE3',
                easing: 'linear',
                duration: 500
            },
            {
                value: '#7321df',
                easing: 'linear',
                duration: 600
            },
            {
                value: '#FF0561',
                easing: 'linear',
                duration: 700
            },
        ],
        delay: anime.stagger(100, {
            from: 'center'
        }),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
    });
}

//Bestimmen wie viele Reihen und Zeilen das Grid haben soll
GridAnime(20, 5);



//Writer
var writerEl = document.querySelector('.writertext');

var txtobject = {
    txt: "I KEEP HITTING THE SPACE BAR BUT I'M STILL ON EARTH.",

    pos: 0,
}
//Funktion für Aniamtion zu starten
function AnimeWriter() {

    //animation definiert
    anime({
        targets: txtobject,
        pos: txtobject.txt.length,
        round: 1,
        easing: 'linear',
        duration: 3000,

        //Buchstabe für Buchstabe wird in HTML geschrieben
        update: function () {
            writerEl.innerHTML = txtobject.txt.substr(0, txtobject.pos);
        },

        //wenn fertig wird button angezeigt
        complete: function (anime) {
            $('.writing').addClass('active');
        }
    });
}

//neue ScrollMagic Scene
var SceneWriter = new ScrollMagic.Scene({
        triggerElement: '.writertext',
        triggerHook: 0.85,
    })
    .addTo(controller)
    // .addIndicators({name: 'Writer'})
    .on("enter", AnimeWriter);



// JumperMenu

//neuer ScrollMagic Controller
let controller2 = new ScrollMagic.Controller({
    globalSceneOptions: {
        duration: '100%'
    }
});

autoJumperMenu.init({
    targetElementsSelector: 'section',
    jumpLinkTextSelector: 'div'
})


let sections = document.querySelectorAll('section');
let jumperElements = document.querySelectorAll('#jumperMenuContainer a');

sections.forEach((element, index) => {

    new ScrollMagic.Scene({
            triggerElement: element
        })
        .setClassToggle(jumperElements[index], "active")
        .addTo(controller2);

});



// Hamburgermenu


var menuToggle = document.querySelector("#menu-toggle");
var mnclasses = menucontent.classList;
menuToggle.addEventListener("click", function (event) {
    mnclasses.toggle('active');
});


document.getElementById('menu-toggle').addEventListener('click', function (event) {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('backwards');
    } else {
        this.classList.add('active');
        this.classList.remove('backwards');
    }
})