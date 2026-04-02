const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// ctx.font="200000px Arial";

// // ctx.fillStyle ="#534A5F";
// // ctx.fillRect(0, 0, 570, 900);


// ctx.lineWidth = 16;
// ctx.strokeStyle ="#363337";
// ctx.fillStyle ="#363337";//#363337
// ctx.beginPath();
// // ctx.moveTo(1,120);
// // ctx.quadraticCurveTo(284, 110, 569, 120);

// // ctx.moveTo(1,167);
// // ctx.quadraticCurveTo(284, 159, 569, 167);

// // ctx.moveTo(1,222);
// // ctx.quadraticCurveTo(284, 212, 569, 222);

// // ctx.moveTo(1,275);
// // ctx.quadraticCurveTo(284, 266, 569, 275);

// // ctx.moveTo(1,330);
// // ctx.quadraticCurveTo(284, 315, 569, 330);

// // ctx.moveTo(1,380);
// // ctx.quadraticCurveTo(284, 377, 569, 380);

// // ctx.moveTo(1,437);
// // ctx.quadraticCurveTo(284, 425, 569, 437);

// // ctx.moveTo(1,490);
// // ctx.quadraticCurveTo(284, 480, 569, 490);

// // ctx.moveTo(1,545);
// // ctx.quadraticCurveTo(284, 530, 569, 545);

// // ctx.moveTo(1,595);
// // ctx.quadraticCurveTo(284, 589, 569, 595);

// // ctx.moveTo(1,653);
// // ctx.quadraticCurveTo(284, 640, 569, 653);

// // ctx.moveTo(1,700);
// // ctx.quadraticCurveTo(284, 703, 569, 700);

// ctx.moveTo(0,0);
// ctx.lineTo(0,900)
// ctx.moveTo(570,0);
// ctx.lineTo(570,900);
// ctx.moveTo(0,900);
// ctx.quadraticCurveTo(4, 720, 200, 800);
// // ctx.lineTo(0,900)
// ctx.stroke();
// // ctx.fill();


// // pridumac normalnyj pol 
// //otrisovac ne poluczilos





const img = new Image();
img.src = "../game/img/block.png"; 

let y = 0; 
const speed = 2; 

img.onload = function() {
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.drawImage(img, 0, y, canvas.width, canvas.height);
    ctx.drawImage(img, 0, y - canvas.height, canvas.width, canvas.height);

    y += speed; 
    if (y >= canvas.height) y = 0; 

    requestAnimationFrame(animate); 
  }
  animate();
};


// img.src = "../game/img/nps/dino01.png";


// img.onload = () => {
//   ctx.drawImage(img, 0, 0);
// };

