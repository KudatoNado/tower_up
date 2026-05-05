const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const main_block = document.getElementById("ara");
const sczot = document.getElementById("cyfra");


//const img
const bgImg = new Image();
const dinoImg = new Image();
const stoneImg = new Image();
//cons img


//img
bgImg.src = "../game/img/block1.png"; 
dinoImg.src = "../game/img/nps/dino01.png"; 
stoneImg.src = "../game/img/black_border_stone.png";
//img


let y_vnie = -100; 
let dengerX = 0; 
let showSecondStone = false; 
let secondStoneFinished = false;

setTimeout(() => {
    showSecondStone = true;
}, 1000);
const random_bool = 0;




let czeker = true;/*naczalo igry nie zabidz izmenit "true" na "false"*/
let points = 0;

//const speed
let y = 0;
let speed = 1;
//cons speed


//start, size nip
let playerX = 0;
let playerY = 600;
let playerWidth = 200;
let playerHeight = 280;
//start, size nip


//key
let bgLoaded = false;
let dinoLoaded = false;

bgImg.onload = () => {
  bgLoaded = true;
  dinoLoaded = true;
  startGame();
};
//key

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.drawImage(bgImg, 0, y, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, y - canvas.height, canvas.width, canvas.height);

    y+= speed;
    if (y >= canvas.height) y = 0;

    
    ctx.drawImage(dinoImg, playerX, playerY, playerWidth, playerHeight);
    
       
    
    requestAnimationFrame(animate);
  }
//main
function startGame() {
  if (!bgLoaded || !dinoLoaded) return;

  

  animate();

  // setInterval(()=>{},3000); 
  // random_bool = Math.random()<0.5;
  stone(random_bool)
}
//main


//awsd
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
//awsd







//sczet
sczot.appendChild.main_block;
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
//sczet



//stone animation
function stone(random_bool) { 
  

    if (showSecondStone && !secondStoneFinished){
    
        ctx.drawImage(stoneImg, dengerX, y_vnie, 200, 200); 
        y_vnie += speed + 5; 

        
        if(random_bool){
          dengerX =0;
        }else
        {
          dengerX = 370;
        }

        if (y_vnie > canvas.height) { 
            secondStoneFinished = true; 
        } 
        if (y_vnie > canvas.height) { 
            y_vnie = -100; 
  
        } 
        

        secondStoneFinished = false; 

        console.log("Kаmen poshel!!!!!!!")
    } 
    random_bool = Math.random()<0.5;
    requestAnimationFrame(stone);
}









