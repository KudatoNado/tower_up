// Нужно хранить у персонажа:
// x, y - позиция
// vx, vy - скорость по X и Y
// speedMultiplier - ускорение
// alive - жив ли он
// distance - сколько уже пролетел вверх
// И на каждом кадре:
// очищаешь canvas
// обновляешь логику
// рисуешь все заново

// 1. Движение персонажа
// Персонаж:
// имеет x
// почти не меняет y сильно
// двигается влево/вправо
// при касании стены меняет направление
// визуально может чуть подпрыгивать для эффекта плавности
// 2. Движение мира вниз
// Все препятствия, враги, стены, декор:
// двигаются вниз
// чем дольше игра идет, тем быстрее они двигаются
// 3. Рост сложности
// Каждые 15 секунд:
// немного увеличивается общая скорость игры
// враги могут появляться чаще
// препятствия могут становиться сложнее

const game = {
    speed: 2,
    targetSpeed: 2,
    speedStep: 0.4,
    maxSpeed: 8,
    nextSpeedTime: 15000,
    elapsed: 0
  };
  
  function updateGame(deltaTime) {
    game.elapsed += deltaTime;
  
    // каждые 15 секунд увеличиваем целевую скорость
    if (game.elapsed >= game.nextSpeedTime) {
      game.targetSpeed = Math.min(game.targetSpeed + game.speedStep, game.maxSpeed);
      game.nextSpeedTime += 15000;
    }
  
    // плавно подтягиваем текущую скорость к targetSpeed
    game.speed += (game.targetSpeed - game.speed) * 0.02;
  }
  
  // Плавный зигзаг у персонажа  Движение по X 
    const player = {
    x: 100,
    y: 500,
    width: 32,
    height: 32,
    vx: 3,
    baseY: 500,
    bobTime: 0,
    bobAmplitude: 8
  };
  
  // Функция обновления 
  function updatePlayer(deltaTime) {
    player.x += player.vx * game.speed;
  
    // отскок от стен
    if (player.x <= 0) {
      player.x = 0;
      player.vx *= -1;
    }
  
    if (player.x + player.width >= canvas.width) {
      player.x = canvas.width - player.width;
      player.vx *= -1;
    }
  
    // маленькое плавное покачивание по Y
    player.bobTime += deltaTime * 0.01;
    player.y = player.baseY + Math.sin(player.bobTime) * player.bobAmplitude;
  }
  // Движение стен  анимируем вместе с твоим миром 
  
  const wallPattern = {
    offsetY: 0
  };
  
  function updateWalls() {
    wallPattern.offsetY += game.speed;
    if (wallPattern.offsetY > 40) {
      wallPattern.offsetY = 0;
    }
  }
  
  function drawWalls() {
    const blockHeight = 40;
  
    for (let y = -blockHeight; y < canvas.height + blockHeight; y += blockHeight) {
      ctx.fillStyle = "#444";
      ctx.fillRect(0, y + wallPattern.offsetY, 20, blockHeight - 4);
  
      ctx.fillRect(canvas.width - 20, y + wallPattern.offsetY, 20, blockHeight - 4);
    }
  }
  
  // Сделай один объект с описанием типов препятствий.
  // Например так:
  
  const OBSTACLE_TYPES = {
    GAP: "gap",           // разрыв стены
    SPIKES: "spikes",     // шипы
    SHOOTER: "shooter",   // враг, который стреляет
    VINES: "vines",       // розги / ветки / лианы
    SNAKE: "snake"        // змеи
  };
  
  // Структура: 
  let struktur=
  {
    type: "spikes",
    x: 120,
    y: -50,
    width: 40,
    height: 40,
    speed: 2,
    active: true
  }
  
  // И после добавить поля для других препятствий 
  // Стреляющий враг:
  let shut_guy=
  {
    type: "shooter",
    x: 150,
    y: -60,
    width: 40,
    height: 40,
    speed: 2,
    shootTimer: 0,
    shootDelay: 1400,
    active: true
  }
  // Змея 
  let snake =
  {
    type: "snake",
    x: 100,
    y: -50,
    width: 50,
    height: 20,
    speed: 2,
    dirX: 1,
    moveAmplitude: 2,
    active: true
  }  
  // Описание типов 
  
  function createObstacle(type) {
    switch (type) {
      case OBSTACLE_TYPES.GAP:
        return {
          type,
          side: Math.random() < 0.5 ? "left" : "right",
          y: -80,
          width: 20,
          height: 80,
          speed: game.speed
        };
  
      case OBSTACLE_TYPES.SPIKES:
        return {
          type,
          x: random(30, canvas.width - 70),
          y: -40,
          width: 40,
          height: 40,
          speed: game.speed
        };
  
      case OBSTACLE_TYPES.SHOOTER:
        return {
          type,
          x: random(30, canvas.width - 70),
          y: -50,
          width: 40,
          height: 40,
          speed: game.speed,
          shootTimer: 0,
          shootDelay: random(1000, 2500)
        };
  
      case OBSTACLE_TYPES.VINES:
        return {
          type,
          x: random(40, canvas.width - 80),
          y: -70,
          width: 20,
          height: 70,
          speed: game.speed
        };
  
      case OBSTACLE_TYPES.SNAKE:
        return {
          type,
          x: random(40, canvas.
            width - 90),
            y: -30,
            width: 60,
            height: 20,
            speed: game.speed,
            dirX: Math.random() < 0.5 ? -1 : 1,
            moveSpeedX: 1.2
          };
    
        default:
          return null;
      }
    }
    
    // один вход - type
    // один выход - готовый объект
    // все свойства каждого препятствия лежат в одном месте
    // потом легко менять размеры и баланс
    
    
    // один вход — type
    // один выход — готовый объект
    // все свойства каждого препятствия лежат в одном месте
    // потом легко менять размеры и баланс
    
    // Можно сделать массив доступных типов 
    const obstaclePool = [
      OBSTACLE_TYPES.GAP,
      OBSTACLE_TYPES.SPIKES,
      OBSTACLE_TYPES.SHOOTER,
      OBSTACLE_TYPES.VINES,
      OBSTACLE_TYPES.SNAKE
    ];
    
    // И функцию для случайного выбора 
    function getRandomObstacleType() {
      const index = Math.floor(Math.random() * obstaclePool.length);
      return obstaclePool[index];
    }
    
    const obstacles = [];
    
    function spawnRandomObstacle() {
      const type = getRandomObstacleType();
      const obstacle = createObstacle(type);
    
      if (obstacle) {
        obstacles.push(obstacle);
      }
    }
    
    // рандомное время появления 
    let spawnTimer = 0;
    let nextSpawnTime = random(700, 1800);
    
    Обновляем 
    function updateSpawning(deltaTime) {
      spawnTimer += deltaTime;
    
      if (spawnTimer >= nextSpawnTime) {
        spawnRandomObstacle();
        spawnTimer = 0;
        nextSpawnTime = random(700, 1800);
      }
    }
    
    // Обновляем препятствия 
    function updateObstacles(deltaTime) {
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
    
        // базовое движение вниз
        o.y += game.speed;
    
        // доп. логика по типу
        if (o.type === OBSTACLE_TYPES.SHOOTER) {
          updateShooter(o, deltaTime);
        }
    
        if (o.type === OBSTACLE_TYPES.SNAKE) {
          updateSnake(o);
        }
    
        // удаление за экраном
        if (o.y > canvas.height + 100) {
          obstacles.splice(i, 1);
        }
      }
    }
    
    
    
    
    // Стреляющий игрок 
    function updateShooter(obstacle, deltaTime) {
      obstacle.shootTimer += deltaTime;
    
      if (obstacle.shootTimer >= obstacle.shootDelay) {
        bullets.push({
          x: obstacle.x + obstacle.width / 2 - 4,
          y: obstacle.y + obstacle.height,
          width: 8,
          height: 14,
          speed: 4 + game.speed * 0.5
        });
    
        obstacle.shootTimer = 0;
        obstacle.shootDelay = random(1000, 2500);
      }
    }
    
    // Змея  вниз и немного влево-право   
    function updateSnake(obstacle) {
      obstacle.x += obstacle.dirX * obstacle.moveSpeedX;
    
      if (obstacle.x <= 25) {
        obstacle.x = 25;
        obstacle.dirX *= -1;
      }
    
      if (obstacle.x + obstacle.width >= canvas.width - 25) {
        obstacle.x = canvas.width - 25 - obstacle.width;
        obstacle.dirX *= -1;
      }
    }
    
    // Розги/лианы
    // Самая простая версия:
    // вертикальная полоска
    // висит сверху
    // движется вниз
    // если задел игрока — проигрыш
    // То есть это по сути обычное препятствие-прямоугольник.
    
    // Отрисуем через цикл 
    function drawObstacles() {
      for (const o of obstacles) {
        switch (o.type) {
          case OBSTACLE_TYPES.GAP:
            drawGap(o);
            break;
    
          case OBSTACLE_TYPES.SPIKES:
            drawSpikes(o);
            break;
    
          case OBSTACLE_TYPES.SHOOTER:
            drawShooter(o);
            break;
    
          case OBSTACLE_TYPES.VINES:
            drawVines(o);
            break;
    
          case OBSTACLE_TYPES.SNAKE:
            drawSnake(o);
            break;
        }
      }
    }
    
    // Шипы пока можно как прямоугольники 
    function drawSpikes(o) {
      ctx.fillStyle = "red";
      ctx.fillRect(o.x, o.y, o.width, o.height);
    }
    
    Стрелок 
    function drawShooter(o) {
      ctx.fillStyle = "purple";
      ctx.fillRect(o.x, o.y, o.width, o.height);
    }
    
    Лианы 
    function drawVines(o) {
      ctx.fillStyle = "green";
      ctx.fillRect(o.x, o.y, o.width, o.height);
    }
    
    Змея 
    function drawSnake(o) {
      ctx.fillStyle = "orange";
      ctx.fillRect(o.x, o.y, o.width, o.height);
    }
    
    // Разрыв стены 
    
    function drawGap(o) {
      ctx.fillStyle = "black";
    
      if (o.side === "left") {
        ctx.fillRect(0, o.y, 20, o.height);
      } else {
        ctx.fillRect(canvas.width - 20, o.y, 20, o.height);
      }
    }
    // Проверяем столкновение 
  function isColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  
  // Проверяем типы 
  function checkObstacleCollisions() {
    for (const o of obstacles) {
      if (
        o.type === OBSTACLE_TYPES.SPIKES ||
        o.type === OBSTACLE_TYPES.SHOOTER ||
        o.type === OBSTACLE_TYPES.VINES ||
        o.type === OBSTACLE_TYPES.SNAKE
      ) {
        if (isColliding(player, o)) {
          game.running = false;
        }
      }
  
      if (o.type === OBSTACLE_TYPES.GAP) {
        checkGapCollision(o);
      }
    }
  }
  
  // Проверяем разрыв стены 
  function checkGapCollision(o) {
    const touchesLeftWall = player.x <= 20;
    const touchesRightWall = player.x + player.width >= canvas.width - 20;
  
    const overlapsY =
      player.y < o.y + o.height &&
      player.y + player.height > o.y;
  
    if (o.side === "left" && touchesLeftWall && overlapsY) {
      game.running = false;
    }
  
    if (o.side === "right" && touchesRightWall && overlapsY) {
      game.running = false;
    }
  }