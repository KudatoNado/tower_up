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
let y_vnie_R = -100;
let dengerX = 0; 
let dengerXa = 370; 
let showSecondStone = false; 
let secondStoneFinished = false;

setTimeout(() => {
    showSecondStone = true;
}, 1000);
const random_bool = false;


let isGameOver = false;


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
   speed += 0.001;

   if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.drawImage(bgImg, 0, y, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, y - canvas.height, canvas.width, canvas.height);

    y+= speed;
    if (y >= canvas.height) y = 0;


    stone_l();
  stone();

    
    ctx.drawImage(dinoImg, playerX, playerY, playerWidth, playerHeight);
    
       
 checkCollision();

    
    requestAnimationFrame(animate);

    
  }



//main
function startGame() {
  if (!bgLoaded || !dinoLoaded) return;

  

  animate();

  
  setInterval(()=>{ },1000); 
  
  


   


//   while(true)
//   {
//     if (showSecondStone && !secondStoneFinished){

//     if (y_vnie > canvas.height) { 
//     secondStoneFinished = true;
//     y_vnie = -100;
      
//     random_bool = Math.random()<0.5;

//     if(random_bool){
//       stone;
//     }else
//     {
//       stone_l;
//     }

//   }
// }


    
// }
}
//main



//game over
 



//awsd
document.addEventListener("keydown", (e) => {
  const step_x = 370;
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
  



  if (e.key === "Enter" && isGameOver) {
        isGameOver = false; 
        czeker = true;   
        points = 0;         
        speed = 1;         
        y_vnie = -100;     
        y_vnie_R = -100;    
        playerX = 0;        
        playerY = 600;
        
        animate();          
        return;             
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
function stone() {
    if (showSecondStone) {
        ctx.drawImage(stoneImg, dengerX, y_vnie, 200, 200);
        y_vnie += speed + 0.8;
        if (y_vnie > canvas.height) {
            y_vnie = -100;
        }
    }
}



function stone_l() {
    if (showSecondStone) {
        
        ctx.drawImage(stoneImg, dengerXa, y_vnie_R, 200, 200);
        y_vnie_R += speed + 3;
        if (y_vnie_R > canvas.height) {
            y_vnie_R = -100;
        }
    }
}





//stop
function checkCollision() {
    let hitZone = 110; // Высота попадания

    // Левый камень
    if (playerX === 0) {
        if (y_vnie + hitZone > playerY && y_vnie < playerY + playerHeight - 50) {
            endGame();
        }
    }

    // Правый камень (теперь проверяем 370 и y_vnie_R)
    if (playerX === 370) { 
        if (y_vnie_R + hitZone > playerY && y_vnie_R < playerY + playerHeight - 50) {
            endGame();
        }
    }
}

function endGame() {
    isGameOver = true;
    czeker = false;
    speed = 0;
    
    // Рисуем надпись, чтобы убедиться, что сработало
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game over!", canvas.width / 2, canvas.height / 2);
}



function resetGame() {
    isGameOver = false;
    czeker = true;
    points = 0;
    speed = 1;
    y_vnie = -100;
    y_vnie_R = -100;
    playerX = 0;
    playerY = 600;
    
    sczot.textContent = "0";
    animate(); // Запускаем цикл заново
}
