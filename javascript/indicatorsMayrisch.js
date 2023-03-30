// Lade das Bild
var img = new Image();
img.src = '/assets/mayrisch/room.jpg';
var parentDiv = document.getElementsByClassName("room-container")[0]

var indicatorsText = ["I", "II", "III", "IV", "V", "VI"];
var indicatorPos = [
  { x: 0.10, y: 0.10 },
  { x: 0.20, y: 0.2 },
  { x: 0.30, y: 0.25 },
  { x: 0.40, y: 0.3 },
  { x: 0.50, y: 0.35 },
  { x: 0.60, y: 0.40 },
];
var galleryIndicator = 4;

// Warte, bis das Bild geladen wurde
img.onload = function() {
  // Erstelle ein Canvas-Element
  var canvas = document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;
  canvas.classList.add("asset");
  canvas.id = "backgroundImage";

  // Zeichne das Bild auf das Canvas
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


//   <div class="indicator" onclick="func(1)" id="ind-1">
//   <a class="text ind-number" onclick="func(1)">I</a>
// </div>

for (var i = 1; i <= 6; i++){
  var indicator = document.createElement("div");
  indicator.classList.add("indicator");
  indicator.id = ("ind-" + i);
  var textChild = document.createElement("a");
  textChild.classList.add("text");
  textChild.classList.add("ind-number");
  textChild.textContent = indicatorsText[i-1];
  if (galleryIndicator === i) {
    indicator.setAttribute("onclick", "func(" + i + "); getGallery();");
    textChild.setAttribute("onclick", "func(" + i + "); getGallery();");
  } else {
    indicator.setAttribute("onclick", "func(" + i + ")");
    textChild.setAttribute("onclick", "func(" + i + ")");
  }
  indicator.appendChild(textChild);
  parentDiv.appendChild(indicator);
}

  parentDiv.appendChild(canvas);
  calcucatePositions();
};

//     // Hänge einen Event-Listener für Mausklicks an das Canvas-Element
//     canvas.addEventListener('click', function(event) {
//         // Berechne die Position des Klicks relativ zur Position des Canvas auf dem Bildschirm
//         var rect = canvas.getBoundingClientRect();
//         var canvasLeft = rect.left + window.scrollX;
//         var canvasTop = rect.top + window.scrollY;
//         var clickX = event.clientX - canvasLeft;
//         var clickY = event.clientY - canvasTop;
    
//         // Bestimme die Farbwerte des Pixels an der Position des Klicks
//         var pixel = ctx.getImageData(clickX, clickY, 1, 1).data;
    
//         // Gib die Farbwerte und die Position des Klicks aus
//         console.log('Pixel bei (' + clickX + ', ' + clickY + '): Picture(' + event.clientX + ', ' + event.clientY + ')');

//         initIndicator(clickX, clickY, canvas);
//       });


//   // Füge das Canvas-Element zum DOM hinzu
//   canvas.classList.add('responsive-img');
//   document.body.appendChild(canvas);
// };

function calcucatePositions(){
  var canvas = document.getElementById("backgroundImage");
  var rect = canvas.getBoundingClientRect();
  var canvasLeft = rect.left + window.scrollX;
  var canvasTop = rect.top + window.scrollY;

  var indicators = document.getElementsByClassName("indicator");

  for (var i = 0; i < 6; i++){
    // indicators[i].style.right = indicatorPosX[i] - canvasLeft + "px";
    // indicators[i].style.bottom = indicatorPosY[i] - canvasTop + "px";

    // indicators[i].style.left = `${canvas.offsetLeft + canvas.width * 0.25}px`;
    // indicators[i].style.top = `${canvas.offsetTop + canvas.height * 0.25}px`;
    // indicators[i].style.width = `${canvas.width * 0.5}px`;
    // indicators[i].style.height = `${canvas.height * 0.5}px`;

    indicators[i].style.left = `${canvas.offsetLeft + canvas.width * indicatorPos[i].x}px`;
    indicators[i].style.top = `${canvas.offsetTop + canvas.height * indicatorPos[i].y}px`;
  }

//   indicatorPos.forEach((indicator, index) => {
//     const div = document.getElementById(`indicator-${index}`);
//     div.style.left = `${canvas.offsetLeft + canvas.width * indicator.x}px`;
//     div.style.top = `${canvas.offsetTop + canvas.height * indicator.y}px`;
// });
}

window.addEventListener('resize', () => {
  calcucatePositions()
});