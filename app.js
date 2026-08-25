export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(HTML, {
        headers: {
          "content-type": "text/html; charset=UTF-8"
        }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

const games = [
  {
    id: "space",
    title: "Space Shooter",
    category: "Action",
    icon: "🚀",
    description: "Destroy incoming asteroids and survive as long as possible."
  },
  {
    id: "snake",
    title: "Snake",
    category: "Arcade",
    icon: "🐍",
    description: "Eat the food and grow your snake."
  },
  {
    id: "runner",
    title: "Neon Runner",
    category: "Endless",
    icon: "🏃",
    description: "Jump over obstacles and survive."
  },
  {
    id: "breakout",
    title: "Brick Breaker",
    category: "Arcade",
    icon: "🧱",
    description: "Break all the bricks with your paddle."
  },
  {
    id: "memory",
    title: "Memory Match",
    category: "Puzzle",
    icon: "🧠",
    description: "Match all the hidden pairs."
  },
  {
    id: "clicker",
    title: "Monster Clicker",
    category: "Casual",
    icon: "👾",
    description: "Click the monster and get the highest score."
  },
  {
    id: "racing",
    title: "Highway Racer",
    category: "Racing",
    icon: "🏎️",
    description: "Avoid traffic and drive as far as you can."
  },
  {
    id: "pong",
    title: "Pong",
    category: "Sports",
    icon: "🏓",
    description: "Classic paddle-versus-paddle action."
  }
];

const HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GAMECLOUD</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #07090d;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

header {
  height: 76px;
  border-bottom: 1px solid #20242d;
  display: flex;
  align-items: center;
  padding: 0 5%;
  gap: 45px;
  background: #080a0f;
}

.logo {
  font-size: 25px;
  font-weight: 900;
  letter-spacing: -1px;
}

.logo span {
  color: #855cff;
}

nav a {
  color: #aeb4c2;
  text-decoration: none;
  margin-right: 30px;
  cursor: pointer;
}

nav a:hover {
  color: white;
}

.signin {
  margin-left: auto;
  background: #11151d;
  border: 1px solid #303642;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
}

.hero {
  padding: 70px 7% 35px;
}

.small {
  color: #8c65ff;
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 14px;
}

h1 {
  font-size: clamp(45px, 7vw, 82px);
  margin: 12px 0;
  line-height: .95;
}

.gradient {
  color: #8b63ff;
}

.subtitle {
  color: #aeb4c2;
  font-size: 18px;
  max-width: 650px;
  line-height: 1.6;
}

.controls {
  margin-top: 35px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.search {
  background: #10141c;
  border: 1px solid #303642;
  color: white;
  padding: 15px 18px;
  border-radius: 10px;
  width: min(430px, 100%);
  outline: none;
}

.categories {
  padding: 10px 7%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cat {
  background: #10141c;
  border: 1px solid #2d3340;
  color: #bfc5d1;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.cat.active,
.cat:hover {
  background: #8057ff;
  color: white;
  border-color: #8057ff;
}

.library {
  padding: 35px 7% 80px;
}

.library h2 {
  font-size: 40px;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.card {
  background: #10131a;
  border: 1px solid #282e39;
  border-radius: 18px;
  overflow: hidden;
  transition: .2s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #8057ff;
}

.game-art {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 65px;
  background:
    radial-gradient(circle at center, #4b2c96, #151326 45%, #0b0d12);
}

.card-body {
  padding: 20px;
}

.card h3 {
  margin: 0 0 8px;
  font-size: 22px;
}

.category {
  color: #8c65ff;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
}

.description {
  color: #8f97a7;
  line-height: 1.5;
  min-height: 45px;
}

.play {
  width: 100%;
  border: 0;
  background: #8057ff;
  color: white;
  padding: 13px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.play:hover {
  background: #9675ff;
}

.empty {
  display: none;
  padding: 50px;
  text-align: center;
  color: #89909f;
}

#player {
  display: none;
  position: fixed;
  inset: 0;
  background: #05060a;
  z-index: 1000;
}

.player-top {
  height: 65px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #252a34;
}

.player-title {
  font-weight: bold;
  font-size: 20px;
}

.close {
  margin-left: auto;
  background: #171b24;
  border: 1px solid #343b49;
  color: white;
  padding: 10px 18px;
  border-radius: 9px;
  cursor: pointer;
}

#gameCanvas {
  display: block;
  margin: 25px auto;
  max-width: calc(100% - 30px);
  background: #090b12;
  border: 1px solid #303642;
}

.instructions {
  text-align: center;
  color: #9299a8;
}
</style>
</head>

<body>

<header>
  <div class="logo">GAME<span>CLOUD</span></div>

  <nav>
    <a onclick="goHome()">Home</a>
    <a onclick="showGames()">Games</a>
    <a onclick="about()">About</a>
  </nav>

  <button class="signin">Sign in</button>
</header>

<section class="hero">
  <div class="small">PLAY IN YOUR BROWSER</div>

  <h1>
    Your games.<br>
    <span class="gradient">Instantly.</span>
  </h1>

  <p class="subtitle">
    Play different types of games directly in your browser.
    No installation required.
  </p>

  <div class="controls">
    <input
      id="search"
      class="search"
      placeholder="Search games..."
      oninput="filterGames()"
    >
  </div>
</section>

<div class="categories">
  <button class="cat active" onclick="setCategory('All', this)">All</button>
  <button class="cat" onclick="setCategory('Action', this)">Action</button>
  <button class="cat" onclick="setCategory('Arcade', this)">Arcade</button>
  <button class="cat" onclick="setCategory('Racing', this)">Racing</button>
  <button class="cat" onclick="setCategory('Puzzle', this)">Puzzle</button>
  <button class="cat" onclick="setCategory('Sports', this)">Sports</button>
  <button class="cat" onclick="setCategory('Casual', this)">Casual</button>
  <button class="cat" onclick="setCategory('Endless', this)">Endless</button>
</div>

<section class="library" id="games">
  <h2>Choose a game</h2>

  <div id="grid" class="grid"></div>

  <div id="empty" class="empty">
    No games found.
  </div>
</section>

<div id="player">

  <div class="player-top">
    <div id="playerTitle" class="player-title">Game</div>

    <button class="close" onclick="closeGame()">
      ✕ Close
    </button>
  </div>

  <canvas id="gameCanvas" width="900" height="550"></canvas>

  <div id="instructions" class="instructions"></div>

</div>

<script>

const games = ${JSON.stringify(games)};

let selectedCategory = "All";
let animation = null;

function renderGames() {

  const search =
    document.getElementById("search").value.toLowerCase();

  const grid =
    document.getElementById("grid");

  const empty =
    document.getElementById("empty");

  grid.innerHTML = "";

  const filtered = games.filter(game => {

    const categoryMatch =
      selectedCategory === "All" ||
      game.category === selectedCategory;

    const searchMatch =
      game.title.toLowerCase().includes(search) ||
      game.category.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  if (filtered.length === 0) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  filtered.forEach(game => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = \`
      <div class="game-art">\${game.icon}</div>

      <div class="card-body">

        <div class="category">
          \${game.category}
        </div>

        <h3>\${game.title}</h3>

        <p class="description">
          \${game.description}
        </p>

        <button class="play"
          onclick="playGame('\${game.id}')">
          ▶ Play
        </button>

      </div>
    \`;

    grid.appendChild(card);
  });
}

function filterGames() {
  renderGames();
}

function setCategory(category, button) {

  selectedCategory = category;

  document.querySelectorAll(".cat")
    .forEach(b => b.classList.remove("active"));

  button.classList.add("active");

  renderGames();
}

function showGames() {
  document.getElementById("games")
    .scrollIntoView({ behavior: "smooth" });
}

function goHome() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function about() {
  alert(
    "GameCloud is a browser gaming platform."
  );
}

function playGame(id) {

  document.getElementById("player").style.display = "block";

  const game = games.find(g => g.id === id);

  document.getElementById("playerTitle").textContent =
    game.title;

  if (animation) {
    cancelAnimationFrame(animation);
    animation = null;
  }

  if (id === "snake") startSnake();
  else if (id === "space") startSpace();
  else if (id === "runner") startRunner();
  else if (id === "breakout") startBreakout();
  else if (id === "memory") startMemory();
  else if (id === "clicker") startClicker();
  else if (id === "racing") startRacing();
  else if (id === "pong") startPong();
}

function closeGame() {

  document.getElementById("player").style.display = "none";

  if (animation) {
    cancelAnimationFrame(animation);
    animation = null;
  }
}


/* =========================
   SNAKE
========================= */

function startSnake() {

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  let snake = [
    {x: 10, y: 10}
  ];

  let food = {
    x: 15,
    y: 15
  };

  let dx = 1;
  let dy = 0;

  const size = 25;

  document.getElementById("instructions").textContent =
    "Use Arrow Keys to move.";

  document.onkeydown = e => {

    if (e.key === "ArrowUp" && dy !== 1) {
      dx = 0;
      dy = -1;
    }

    if (e.key === "ArrowDown" && dy !== -1) {
      dx = 0;
      dy = 1;
    }

    if (e.key === "ArrowLeft" && dx !== 1) {
      dx = -1;
      dy = 0;
    }

    if (e.key === "ArrowRight" && dx !== -1) {
      dx = 1;
      dy = 0;
    }
  };

  function loop() {

    animation = requestAnimationFrame(loop);

    if (Math.random() > .92) {

      const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
      };

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= c.width / size ||
        head.y >= c.height / size
      ) {
        snake = [{x: 10, y: 10}];
        dx = 1;
        dy = 0;
        return;
      }

      snake.unshift(head);

      if (
        head.x === food.x &&
        head.y === food.y
      ) {
        food = {
          x: Math.floor(Math.random() * 35),
          y: Math.floor(Math.random() * 21)
        };
      } else {
        snake.pop();
      }
    }

    ctx.fillStyle = "#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "#8b63ff";

    snake.forEach(p => {
      ctx.fillRect(
        p.x * size,
        p.y * size,
        size - 2,
        size - 2
      );
    });

    ctx.fillStyle = "#ff4d75";

    ctx.fillRect(
      food.x * size,
      food.y * size,
      size - 2,
      size - 2
    );
  }

  loop();
}


/* =========================
   SPACE SHOOTER
========================= */

function startSpace() {

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  let player = {
    x: 450,
    y: 480
  };

  let bullets = [];
  let enemies = [];
  let keys = {};

  document.getElementById("instructions").textContent =
    "Arrow Keys / A-D to move • Space to shoot.";

  document.onkeydown = e => {
    keys[e.key] = true;

    if (e.code === "Space") {

      bullets.push({
        x: player.x,
        y: player.y
      });
    }
  };

  document.onkeyup = e => {
    keys[e.key] = false;
  };

  function loop() {

    animation = requestAnimationFrame(loop);

    ctx.fillStyle = "#050711";
    ctx.fillRect(0,0,c.width,c.height);

    if (
      keys["ArrowLeft"] ||
      keys["a"]
    ) player.x -= 6;

    if (
      keys["ArrowRight"] ||
      keys["d"]
    ) player.x += 6;

    player.x =
      Math.max(20, Math.min(880, player.x));

    if (Math.random() < .03) {

      enemies.push({
        x: Math.random() * 860 + 20,
        y: -20
      });
    }

    bullets.forEach(b => {
      b.y -= 9;
    });

    enemies.forEach(e => {
      e.y += 3;
    });

    bullets = bullets.filter(b => b.y > 0);
    enemies = enemies.filter(e => e.y < 580);

    bullets.forEach(b => {

      enemies.forEach(e => {

        if (
          Math.abs(b.x - e.x) < 25 &&
          Math.abs(b.y - e.y) < 25
        ) {
          e.y = 700;
          b.y = -100;
        }

      });

    });

    ctx.fillStyle = "#8b63ff";

    ctx.beginPath();
    ctx.moveTo(player.x, player.y - 20);
    ctx.lineTo(player.x - 18, player.y + 20);
    ctx.lineTo(player.x + 18, player.y + 20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#52e5ff";

    bullets.forEach(b => {
      ctx.fillRect(b.x - 2,b.y,4,15);
    });

    ctx.fillStyle = "#ff426d";

    enemies.forEach(e => {
      ctx.beginPath();
      ctx.arc(e.x,e.y,18,0,Math.PI*2);
      ctx.fill();
    });
  }

  loop();
}


/* =========================
   NEON RUNNER
========================= */

function startRunner() {

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  let player = {
    x: 130,
    y: 440,
    vy: 0,
    jumping: false
  };

  let obstacles = [];
  let score = 0;

  document.getElementById("instructions").textContent =
    "Press SPACE or Arrow Up to jump.";

  document.onkeydown = e => {

    if (
      (e.code === "Space" ||
       e.key === "ArrowUp") &&
      !player.jumping
    ) {
      player.vy = -14;
      player.jumping = true;
    }
  };

  function loop() {

    animation = requestAnimationFrame(loop);

    ctx.fillStyle = "#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    player.vy += .7;
    player.y += player.vy;

    if (player.y >= 440) {
      player.y = 440;
      player.vy = 0;
      player.jumping = false;
    }

    if (Math.random() < .025) {

      obstacles.push({
        x: 900,
        y: 440,
        w: 30,
        h: 50
      });
    }

    obstacles.forEach(o => {
      o.x -= 7;
    });

    obstacles = obstacles.filter(o => o.x > -50);

    obstacles.forEach(o => {

      if (
        player.x + 20 > o.x &&
        player.x - 20 < o.x + o.w &&
        player.y + 20 > o.y - o.h
      ) {
        score = 0;
      }

    });

    score++;

    ctx.fillStyle = "#8b63ff";
    ctx.fillRect(
      player.x - 20,
      player.y - 40,
      40,
      40
    );

    ctx.fillStyle = "#ff426d";

    obstacles.forEach(o => {
      ctx.fillRect(o.x,o.y-o.h,o.w,o.h);
    });

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("Score: " + score,20,35);
  }

  loop();
}


/* =========================
   BREAKOUT
========================= */

function startBreakout() {

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  let x = 450;
  let y = 450;

  let dx = 5;
  let dy = -5;

  let paddle = 400;

  let bricks = [];

  for(let r=0;r<5;r++) {
    for(let col=0;col<10;col++) {

      bricks.push({
        x: col*85+25,
        y: r*30+50,
        alive: true
      });

    }
  }

  document.getElementById("instructions").textContent =
    "Move with Arrow Keys.";

  document.onkeydown = e => {

    if(e.key === "ArrowLeft")
      paddle -= 30;

    if(e.key === "ArrowRight")
      paddle += 30;

    paddle =
      Math.max(0,Math.min(780,paddle));
  };

  function loop() {

    animation = requestAnimationFrame(loop);

    ctx.fillStyle="#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    x += dx;
    y += dy;

    if(x < 10 || x > 890)
      dx *= -1;

    if(y < 10)
      dy *= -1;

    if(
      y > 445 &&
      x > paddle &&
      x < paddle + 120
    )
      dy = -Math.abs(dy);

    if(y > 550) {
      x=450;
      y=450;
    }

    bricks.forEach(b => {

      if(
        b.alive &&
        x > b.x &&
        x < b.x+75 &&
        y > b.y &&
        y < b.y+20
      ) {
        b.alive=false;
        dy*=-1;
      }

    });

    ctx.fillStyle="#8b63ff";

    bricks.forEach(b => {

      if(b.alive)
        ctx.fillRect(
          b.x,
          b.y,
          75,
          20
        );

    });

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.arc(x,y,8,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#52e5ff";
    ctx.fillRect(paddle,470,120,15);
  }

  loop();
}


/* =========================
   MEMORY
========================= */

function startMemory() {

  cancelAnimationFrame(animation);

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  const symbols = [
    "🍎","🍎",
    "🍕","🍕",
    "🚀","🚀",
    "⚽","⚽",
    "🎮","🎮",
    "🐱","🐱",
    "⭐","⭐",
    "🔥","🔥"
  ];

  symbols.sort(() => Math.random()-.5);

  let revealed=[];
  let matched=[];

  document.getElementById("instructions").textContent =
    "Click two cards to find matching pairs.";

  function draw() {

    ctx.fillStyle="#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    symbols.forEach((s,i)=>{

      const col=i%4;
      const row=Math.floor(i/4);

      const x=220+col*120;
      const y=80+row*110;

      ctx.fillStyle =
        matched.includes(i) ||
        revealed.includes(i)
        ? "#8057ff"
        : "#171b25";

      ctx.fillRect(x,y,90,80);

      if(
        matched.includes(i) ||
        revealed.includes(i)
      ) {
        ctx.font="40px Arial";
        ctx.fillStyle="white";
        ctx.fillText(s,x+25,y+53);
      }

    });
  }

  c.onclick = e => {

    const rect=c.getBoundingClientRect();

    const mx=e.clientX-rect.left;
    const my=e.clientY-rect.top;

    symbols.forEach((s,i)=>{

      const col=i%4;
      const row=Math.floor(i/4);

      const x=220+col*120;
      const y=80+row*110;

      if(
        mx>x &&
        mx<x+90 &&
        my>y &&
        my<y+80 &&
        !matched.includes(i) &&
        !revealed.includes(i)
      ) {

        revealed.push(i);

        if(revealed.length===2) {

          if(symbols[revealed[0]] === symbols[revealed[1]]) {

            matched.push(
              revealed[0],
              revealed[1]
            );

          }

          setTimeout(()=>{
            revealed=[];
            draw();
          },500);

        }

      }

    });

    draw();
  };

  draw();
}


/* =========================
   CLICKER
========================= */

function startClicker() {

  cancelAnimationFrame(animation);

  const c = gameCanvas;
  const ctx = c.getContext("2d");

  let score=0;

  document.getElementById("instructions").textContent =
    "Click the monster as many times as possible!";

  c.onclick=()=>{

    score++;

    draw();

  };

  function draw(){

    ctx.fillStyle="#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.font="90px Arial";
    ctx.fillText("👾",380,310);

    ctx.font="30px Arial";
    ctx.fillStyle="white";
    ctx.fillText(
      "Score: "+score,
      370,
      380
    );

  }

  draw();
}


/* =========================
   RACING
========================= */

function startRacing() {

  const c=gameCanvas;
  const ctx=c.getContext("2d");

  let car=450;
  let enemies=[];
  let keys={};
  let score=0;

  document.getElementById("instructions").textContent =
    "Use Left / Right Arrow Keys.";

  document.onkeydown=e=>{
    keys[e.key]=true;
  };

  document.onkeyup=e=>{
    keys[e.key]=false;
  };

  function loop(){

    animation=requestAnimationFrame(loop);

    if(keys["ArrowLeft"])
      car-=7;

    if(keys["ArrowRight"])
      car+=7;

    car=Math.max(300,Math.min(600,car));

    if(Math.random()<.025){

      enemies.push({
        x:300+Math.random()*300,
        y:-80
      });

    }

    enemies.forEach(e=>{
      e.y+=7;
    });

    enemies=enemies.filter(e=>e.y<600);

    enemies.forEach(e=>{

      if(
        Math.abs(car-e.x)<40 &&
        Math.abs(480-e.y)<70
      ){
        score=0;
      }

    });

    score++;

    ctx.fillStyle="#15171c";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle="#30343d";

    ctx.fillRect(280,0,340,c.height);

    ctx.fillStyle="#8b63ff";

    ctx.fillRect(
      car-20,
      470,
      40,
      70
    );

    ctx.fillStyle="#ff426d";

    enemies.forEach(e=>{
      ctx.fillRect(
        e.x-20,
        e.y,
        40,
        70
      );
    });

    ctx.fillStyle="white";
    ctx.font="22px Arial";
    ctx.fillText(
      "Distance: "+score,
      20,
      35
    );

  }

  loop();
}


/* =========================
   PONG
========================= */

function startPong(){

  const c=gameCanvas;
  const ctx=c.getContext("2d");

  let py=230;
  let ey=230;

  let ball={
    x:450,
    y:275,
    dx:5,
    dy:4
  };

  document.getElementById("instructions").textContent =
    "Use Arrow Up / Down.";

  document.onkeydown=e=>{

    if(e.key==="ArrowUp")
      py-=25;

    if(e.key==="ArrowDown")
      py+=25;

  };

  function loop(){

    animation=requestAnimationFrame(loop);

    ctx.fillStyle="#080a10";
    ctx.fillRect(0,0,c.width,c.height);

    ball.x+=ball.dx;
    ball.y+=ball.dy;

    if(ball.y<0 || ball.y>550)
      ball.dy*=-1;

    ey +=
      (ball.y-ey)*.04;

    if(
      ball.x<50 &&
      ball.y>py &&
      ball.y<py+100
    )
      ball.dx=Math.abs(ball.dx);

    if(
      ball.x>850 &&
      ball.y>ey &&
      ball.y<ey+100
    )
      ball.dx=-Math.abs(ball.dx);

    if(ball.x<0 || ball.x>900){

      ball.x=450;
      ball.y=275;

    }

    ctx.fillStyle="#8b63ff";

    ctx.fillRect(
      25,
      py,
      20,
      100
    );

    ctx.fillStyle="#52e5ff";

    ctx.fillRect(
      855,
      ey,
      20,
      100
    );

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.arc(
      ball.x,
      ball.y,
      10,
      0,
      Math.PI*2
    );
    ctx.fill();

  }

  loop();
}


/* START */

renderGames();

</script>

</body>
</html>
`;
