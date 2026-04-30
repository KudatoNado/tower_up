const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const bgImg = new Image();
const dinoImg = new Image();

let czeker = true;/*naczalo igry nie zabidz izmenit "true" na "false"*/


let y = 0;
let speed = 1;

//start, size nip
let playerX = 0;
let playerY = 600;
let playerWidth = 200;
let playerHeight = 280;



let bgLoaded = false;
let dinoLoaded = false;

bgImg.src = "../game/img/block1.png"; 
dinoImg.src = "../game/img/nps/dino01.png"; 

bgImg.onload = () => {
  bgLoaded = true;
  dinoLoaded = true;
  startGame();
};

// dinoImg.onload = () => {
//   dinoLoaded = true;
//   startGame();
// };

function startGame() {
  if (!bgLoaded || !dinoLoaded) return;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.drawImage(bgImg, 0, y, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, y - canvas.height, canvas.width, canvas.height);

    y+= speed;
    if (y >= canvas.height) y = 0;

    
    ctx.drawImage(dinoImg, playerX, playerY, playerWidth, playerHeight);

    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener("keydown", (e) => {
  const step_x = 570;
  const step_y = 150;

  if (e.key === "ArrowLeft") 
    {
      playerX -= step_x; 
      dinoImg.src = "../game/img/nps/dino01.png";
      
    };
  if (e.key === "ArrowRight")
 {
    playerX += step_x;
    dinoImg.src = "../game/img/nps/dino011.png";
  };
  if (e.key === "ArrowUp") playerY -= step_y;
  if (e.key === "ArrowDown") playerY += step_y;

  
  if (playerX < 0) playerX = 0;
  if (playerY < 0) playerY = 0;
  if (playerX + playerWidth > canvas.width) {
    playerX = canvas.width - playerWidth;
  }
  if (playerY + playerHeight > canvas.height) {
    playerY = canvas.height - playerHeight;
  }
  
});








const main_block = document.getElementById("ara");

const sczot = document.getElementById("cyfra")
sczot.appendChild.main_block;

let points = 0;

function updt() {
  points++;
  sczot.textContent =`${points.toString()}`;
  console.log(points);
}

updt();

let timerId = setInterval(() => {
  if(czeker){
    points++
  
  sczot.textContent =`${points.toString()}`;

  };
}, 1000);


