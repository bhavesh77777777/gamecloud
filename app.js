export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/favicon.ico") {
      return new Response("", { status: 204 });
    }

    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-cache"
      }
    });
  }
};

const GAMES = [
  {
    id: "snake",
    title: "Snake",
    category: "Classic",
    emoji: "🐍",
    description: "Classic snake game. Eat the food and grow.",
    color: "#22c55e"
  },
  {
    id: "racing",
    title: "Neon Racing",
    category: "Racing",
    emoji: "🏎️",
    description: "Avoid traffic and survive as long as possible.",
    color: "#ef4444"
  },
  {
    id: "space",
    title: "Space Shooter",
    category: "Action",
    emoji: "🚀",
    description: "Destroy incoming enemies and survive.",
    color: "#8b5cf6"
  },
  {
    id: "breakout",
    title: "Brick Breaker",
    category: "Arcade",
    emoji: "🧱",
    description: "Break every brick with your ball.",
    color: "#f59e0b"
  },
  {
    id: "pong",
    title: "Pong",
    category: "Sports",
    emoji: "🏓",
    description: "Classic paddle versus computer.",
    color: "#06b6d4"
  },
  {
    id: "runner",
    title: "Cyber Runner",
    category: "Skill",
    emoji: "🏃",
    description: "Jump over obstacles and set a high score.",
    color: "#ec4899"
  },
  {
    id: "2048",
    title: "2048",
    category: "Puzzle",
    emoji: "🔢",
    description: "Combine matching numbers to reach 2048.",
    color: "#f97316"
  },
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe",
    category: "Strategy",
    emoji: "❌",
    description: "Beat the computer in this classic strategy game.",
    color: "#3b82f6"
  },
  {
    id: "memory",
    title: "Memory Match",
    category: "Puzzle",
    emoji: "🃏",
    description: "Find all matching pairs.",
    color: "#a855f7"
  },
  {
    id: "mines",
    title: "Mines",
    category: "Strategy",
    emoji: "💣",
    description: "Clear the board without hitting a mine.",
    color: "#64748b"
  },
  {
    id: "reaction",
    title: "Reaction Test",
    category: "Skill",
    emoji: "🎯",
    description: "Test how quickly you can react.",
    color: "#14b8a6"
  },
  {
    id: "clicker",
    title: "Space Clicker",
    category: "Arcade",
    emoji: "🌟",
    description: "Click the star and build your score.",
    color: "#eab308"
  }
];

const HTML = `<!DOCTYPE html>
<html lang="en">
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
  background: #05070b;
  color: #f8fafc;
  font-family: Arial, Helvetica, sans-serif;
}

nav {
  height: 74px;
  border-bottom: 1px solid #1d2430;
  display: flex;
  align-items: center;
  padding: 0 5%;
  gap: 42px;
  background: rgba(5,7,11,.95);
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo {
  font-size: 25px;
  font-weight: 900;
  letter-spacing: -1px;
}

.logo span {
  color: #8257ff;
}

.navlink {
  color: #a8b0bf;
  text-decoration: none;
  cursor: pointer;
}

.navlink:hover {
  color: white;
}

main {
  width: min(1200px, 90%);
  margin: auto;
}

.hero {
  padding: 75px 0 35px;
}

.kicker {
  color: #9670ff;
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 13px;
}

h1 {
  font-size: clamp(45px,7vw,80px);
  line-height: .95;
  margin: 15px 0;
}

.gradient {
  color: #8b5cf6;
}

.hero p {
  color: #9ba4b3;
  max-width: 650px;
  font-size: 18px;
  line-height: 1.7;
}

.controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 30px 0;
}

input {
  flex: 1;
  min-width: 240px;
  background: #0d1118;
  border: 1px solid #293140;
  color: white;
  padding: 16px 18px;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
}

input:focus {
  border-color: #8257ff;
}

.categories {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin: 20px 0 35px;
}

.category {
  background: #0d1118;
  color: #aab3c2;
  border: 1px solid #252d39;
  padding: 9px 14px;
  border-radius: 20px;
  cursor: pointer;
}

.category.active,
.category:hover {
  background: #8257ff;
  color: white;
  border-color: #8257ff;
}

.games {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 18px;
  padding-bottom: 80px;
}

.card {
  background: #0d1118;
  border: 1px solid #202735;
  border-radius: 18px;
  padding: 20px;
  transition: .2s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #8257ff;
  box-shadow: 0 15px 40px rgba(99,65,180,.15);
}

.cover {
  height: 145px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 65px;
  margin-bottom: 17px;
  background:
    radial-gradient(circle at 50% 30%, var(--game-color), #090c12 70%);
}

.card h2 {
  margin: 5px 0;
  font-size: 20px;
}

.type {
  color: #9670ff;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card p {
  color: #8d96a5;
  line-height: 1.5;
  min-height: 45px;
}

.play {
  width: 100%;
  border: 0;
  padding: 13px;
  border-radius: 10px;
  background: #8257ff;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.play:hover {
  background: #7045ee;
}

.empty {
  grid-column: 1/-1;
  text-align: center;
  padding: 60px;
  color: #778091;
}

#gameScreen {
  display: none;
  position: fixed;
  inset: 0;
  background: #030407;
  z-index: 100;
  overflow: auto;
}

.gameTop {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  border-bottom: 1px solid #202530;
}

.back {
  background: #111620;
  border: 1px solid #303846;
  color: white;
  padding: 10px 17px;
  border-radius: 9px;
  cursor: pointer;
}

#gameArea {
  width: min(900px,95%);
  margin: 30px auto;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  max-width: 100%;
  border: 1px solid #293140;
  border-radius: 12px;
  background: #080b10;
}

.gameBox {
  width: min(650px,95%);
  background: #0c1017;
  border: 1px solid #252d3a;
  border-radius: 18px;
  padding: 30px;
  text-align: center;
}

.bigButton {
  padding: 15px 25px;
  background: #8257ff;
  color: white;
  border: 0;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}

.score {
  color: #a78bfa;
  font-size: 20px;
  margin: 15px;
}

.ttt {
  display: grid;
  grid-template-columns: repeat(3,90px);
  gap: 8px;
  justify-content: center;
}

.ttt button {
  height: 90px;
  font-size: 35px;
  background: #111722;
  color: white;
  border: 1px solid #30394a;
  border-radius: 10px;
  cursor: pointer;
}

.memory {
  display: grid;
  grid-template-columns: repeat(4,75px);
  gap: 8px;
  justify-content: center;
}

.memory button {
  height: 75px;
  font-size: 28px;
  background: #151b26;
  border: 1px solid #30394a;
  border-radius: 9px;
  cursor: pointer;
}

footer {
  border-top: 1px solid #1d2430;
  padding: 40px;
  text-align: center;
  color: #687182;
}

@media(max-width:600px) {
  nav {
    gap: 15px;
    padding: 0 20px;
  }

  .navlink {
    display: none;
  }

  .hero {
    padding-top: 45px;
  }

  .memory {
    grid-template-columns: repeat(4,60px);
  }

  .memory button {
    height: 60px;
  }
}
</style>
</head>

<body>

<nav>
  <div class="logo">GAME<span>CLOUD</span></div>
  <a class="navlink" href="/">Home</a>
  <a class="navlink" href="#games">Games</a>
  <a class="navlink" href="#about">About</a>
</nav>

<main>

<section class="hero">
  <div class="kicker">PLAY IN YOUR BROWSER</div>

  <h1>
    More games.<br>
    <span class="gradient">More fun.</span>
  </h1>

  <p>
    Choose from different types of games and start playing instantly.
    No installation required.
  </p>

  <div class="controls">
    <input id="search" placeholder="Search games...">
  </div>

  <div class="categories" id="categories"></div>
</section>

<section id="games">
  <div class="games" id="gameList"></div>
</section>

</main>

<footer id="about">
  GAMECLOUD • Browser Gaming
</footer>

<div id="gameScreen">

  <div class="gameTop">
    <strong id="gameTitle">Game</strong>
    <button class="back" onclick="closeGame()">← Back to Games</button>
  </div>

  <div id="gameArea"></div>

</div>

<script>

const games = ${JSON.stringify(GAMES)};

const gameList = document.getElementById("gameList");
const search = document.getElementById("search");
const categories = document.getElementById("categories");

let activeCategory = "All";

function createCategories() {
  const cats = ["All", ...new Set(games.map(g => g.category))];

  categories.innerHTML = cats.map(c =>
    '<button class="category ' +
    (c === "All" ? "active" : "") +
    '" onclick="filterCategory(\\'' + c + '\\',this)">' +
    c +
    '</button>'
  ).join("");
}

function filterCategory(category, el) {
  activeCategory = category;

  document.querySelectorAll(".category")
    .forEach(x => x.classList.remove("active"));

  el.classList.add("active");

  render();
}

function render() {
  const q = search.value.toLowerCase();

  const filtered = games.filter(g => {
    const matchesSearch =
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q);

    const matchesCategory =
      activeCategory === "All" ||
      g.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    gameList.innerHTML =
      '<div class="empty">No games found.</div>';
    return;
  }

  gameList.innerHTML = filtered.map(g => `
    <div class="card">
      <div class="cover"
           style="--game-color:${g.color}">
        ${g.emoji}
      </div>

      <div class="type">${g.category}</div>

      <h2>${g.title}</h2>

      <p>${g.description}</p>

      <button class="play"
        onclick="openGame('${g.id}')">
        ▶ Play Now
      </button>
    </div>
  `).join("");
}

search.addEventListener("input", render);

createCategories();
render();

function openGame(id) {
  const game = games.find(g => g.id === id);

  if (!game) return;

  document.getElementById("gameTitle").textContent =
    game.emoji + " " + game.title;

  document.getElementById("gameScreen").style.display = "block";

  const area = document.getElementById("gameArea");

  if (id === "snake") snake(area);
  else if (id === "racing") racing(area);
  else if (id === "space") space(area);
  else if (id === "breakout") breakout(area);
  else if (id === "pong") pong(area);
  else if (id === "runner") runner(area);
  else if (id === "2048") game2048(area);
  else if (id === "tictactoe") ticTacToe(area);
  else if (id === "memory") memory(area);
  else if (id === "mines") mines(area);
  else if (id === "reaction") reaction(area);
  else if (id === "clicker") clicker(area);
}

function closeGame() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("gameArea").innerHTML = "";
}

/* SNAKE */

function snake(area) {
  area.innerHTML = '<canvas width="500" height="500"></canvas>';

  const c = area.querySelector("canvas");
  const ctx = c.getContext("2d");

  let snake = [{x:10,y:10}];
  let food = {x:15,y:15};
  let dx = 1;
  let dy = 0;
  let score = 0;

  document.onkeydown = e => {
    if(e.key==="ArrowUp" && dy===0){dx=0;dy=-1}
    if(e.key==="ArrowDown" && dy===0){dx=0;dy=1}
    if(e.key==="ArrowLeft" && dx===0){dx=-1;dy=0}
    if(e.key==="ArrowRight" && dx===0){dx=1;dy=0}
  };

  const timer = setInterval(() => {
    const head = {
      x: snake[0].x + dx,
      y: snake[0].y + dy
    };

    if(
      head.x<0 || head.x>=25 ||
      head.y<0 || head.y>=25 ||
      snake.some(s=>s.x===head.x&&s.y===head.y)
    ){
      clearInterval(timer);
      alert("Game Over! Score: "+score);
      return;
    }

    snake.unshift(head);

    if(head.x===food.x && head.y===food.y){
      score++;
      food={
        x:Math.floor(Math.random()*25),
        y:Math.floor(Math.random()*25)
      };
    } else {
      snake.pop();
    }

    ctx.fillStyle="#070a10";
    ctx.fillRect(0,0,500,500);

    ctx.fillStyle="#ef4444";
    ctx.fillRect(food.x*20,food.y*20,19,19);

    ctx.fillStyle="#22c55e";
    snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,19,19));

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Score: "+score,10,25);
  },100);
}

/* RACING */

function racing(area) {
  area.innerHTML = `
    <div class="gameBox">
      <h1>🏎️ Neon Racing</h1>
      <div class="score">Score: <span id="raceScore">0</span></div>
      <p>Use ← → to move your car.</p>
      <canvas width="400" height="550"></canvas>
    </div>
  `;

  const c=area.querySelector("canvas");
  const ctx=c.getContext("2d");

  let car=180;
  let score=0;
  let enemy={x:Math.random()*330,y:-100};
  let keys={};

  document.onkeydown=e=>keys[e.key]=true;
  document.onkeyup=e=>keys[e.key]=false;

  const timer=setInterval(()=>{

    if(keys["ArrowLeft"]) car-=7;
    if(keys["ArrowRight"]) car+=7;

    car=Math.max(20,Math.min(330,car));

    enemy.y+=6;

    if(enemy.y>550){
      enemy.y=-100;
      enemy.x=Math.random()*330;
      score++;
      document.getElementById("raceScore").textContent=score;
    }

    ctx.fillStyle="#111";
    ctx.fillRect(0,0,400,550);

    ctx.fillStyle="#333";
    ctx.fillRect(50,0,300,550);

    ctx.strokeStyle="#fff";
    ctx.setLineDash([25,25]);

    ctx.beginPath();
    ctx.moveTo(200,0);
    ctx.lineTo(200,550);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle="#22c55e";
    ctx.fillRect(car,450,50,80);

    ctx.fillStyle="#ef4444";
    ctx.fillRect(enemy.x,enemy.y,50,80);

    if(
      enemy.y+80>450 &&
      enemy.y<530 &&
      enemy.x<car+50 &&
      enemy.x+50>car
    ){
      clearInterval(timer);
      alert("Race Over! Score: "+score);
    }

  },30);
}

/* SPACE */

function space(area) {
  area.innerHTML=`
    <div class="gameBox">
      <h1>🚀 Space Shooter</h1>
      <div class="score">Score: <span id="spaceScore">0</span></div>
      <p>Move with ← → and shoot with SPACE.</p>
      <canvas width="600" height="500"></canvas>
    </div>
  `;

  const c=area.querySelector("canvas");
  const ctx=c.getContext("2d");

  let player=280;
  let bullets=[];
  let enemies=[];
  let score=0;
  let keys={};

  document.onkeydown=e=>{
    keys[e.key]=true;

    if(e.code==="Space"){
      bullets.push({
        x:player+15,
        y:450
      });
    }
  };

  document.onkeyup=e=>keys[e.key]=false;

  const timer=setInterval(()=>{

    if(keys["ArrowLeft"]) player-=6;
    if(keys["ArrowRight"]) player+=6;

    player=Math.max(0,Math.min(570,player));

    if(Math.random()<.025){
      enemies.push({
        x:Math.random()*570,
        y:-30
      });
    }

    bullets.forEach(b=>b.y-=9);
    enemies.forEach(e=>e.y+=3);

    bullets.forEach(b=>{
      enemies.forEach(e=>{
        if(
          b.x<e.x+30 &&
          b.x+5>e.x &&
          b.y<e.y+30 &&
          b.y+10>e.y
        ){
          e.dead=true;
          b.dead=true;
          score++;
          document.getElementById("spaceScore").textContent=score;
        }
      });
    });

    enemies=enemies.filter(e=>!e.dead&&e.y<520);
    bullets=bullets.filter(b=>!b.dead&&b.y>0);

    ctx.fillStyle="#050712";
    ctx.fillRect(0,0,600,500);

    ctx.fillStyle="#fff";

    for(let i=0;i<50;i++){
      ctx.fillRect(
        Math.random()*600,
        Math.random()*500,
        1,
        1
      );
    }

    ctx.fillStyle="#8b5cf6";
    ctx.fillRect(player,450,30,30);

    ctx.fillStyle="#22d3ee";
    bullets.forEach(b=>ctx.fillRect(b.x,b.y,5,12));

    ctx.fillStyle="#ef4444";
    enemies.forEach(e=>ctx.fillRect(e.x,e.y,30,30));

  },30);
}

/* BREAKOUT */

function breakout(area) {
  area.innerHTML=`
    <div class="gameBox">
      <h1>🧱 Brick Breaker</h1>
      <p>Move your paddle with ← →.</p>
      <canvas width="600" height="450"></canvas>
    </div>
  `;

  const c=area.querySelector("canvas");
  const ctx=c.getContext("2d");

  let x=285;
  let ball={x:300,y:350,dx:4,dy:-4};
  let paddle=250;
  let bricks=[];

  for(let r=0;r<5;r++){
    for(let col=0;col<9;col++){
      bricks.push({
        x:10+col*65,
        y:30+r*25,
        alive:true
      });
    }
  }

  document.onkeydown=e=>{
    if(e.key==="ArrowLeft")paddle-=20;
    if(e.key==="ArrowRight")paddle+=20;
  };

  setInterval(()=>{

    paddle=Math.max(0,Math.min(500,paddle));

    ball.x+=ball.dx;
    ball.y+=ball.dy;

    if(ball.x<0||ball.x>590)ball.dx*=-1;
    if(ball.y<0)ball.dy*=-1;

    if(
      ball.y>410 &&
      ball.x>paddle &&
      ball.x<paddle+100
    ) ball.dy=-Math.abs(ball.dy);

    bricks.forEach(b=>{
      if(
        b.alive &&
        ball.x>b.x &&
        ball.x<b.x+55 &&
        ball.y>b.y &&
        ball.y<b.y+18
      ){
        b.alive=false;
        ball.dy*=-1;
      }
    });

    if(ball.y>450){
      alert("Game Over");
      ball={x:300,y:350,dx:4,dy:-4};
    }

    ctx.fillStyle="#05070b";
    ctx.fillRect(0,0,600,450);

    ctx.fillStyle="#8b5cf6";
    bricks.filter(b=>b.alive)
      .forEach(b=>ctx.fillRect(b.x,b.y,55,18));

    ctx.fillStyle="#fff";
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,8,0,Math.PI*2);
    ctx.fill();

    ctx.fillRect(paddle,420,100,15);

  },30);
}

/* PONG */

function pong(area) {
  area.innerHTML=`
    <div class="gameBox">
      <h1>🏓 Pong</h1>
      <p>Move with W and S.</p>
      <canvas width="650" height="400"></canvas>
    </div>
  `;

  const c=area.querySelector("canvas");
  const ctx=c.getContext("2d");

  let py=160;
  let cy=160;
  let ball={x:325,y:200,dx:5,dy:3};

  document.onkeydown=e=>{
    if(e.key.toLowerCase()==="w")py-=20;
    if(e.key.toLowerCase()==="s")py+=20;
  };

  setInterval(()=>{

    ball.x+=ball.dx;
    ball.y+=ball.dy;

    if(ball.y<0||ball.y>390)ball.dy*=-1;

    cy+=ball.y>cy?3:-3;

    if(
      ball.x<40 &&
      ball.y>py &&
      ball.y<py+80
    ) ball.dx=Math.abs(ball.dx);

    if(
      ball.x>610 &&
      ball.y>cy &&
      ball.y<cy+80
    ) ball.dx=-Math.abs(ball.dx);

    if(ball.x<0||ball.x>650){
      ball={x:325,y:200,dx:5,dy:3};
    }

    ctx.fillStyle="#05070b";
    ctx.fillRect(0,0,650,400);

    ctx.fillStyle="#fff";
    ctx.fillRect(20,py,15,80);
    ctx.fillRect(615,cy,15,80);

    ctx.beginPath();
    ctx.arc(ball.x,ball.y,9,0,Math.PI*2);
    ctx.fill();

  },30);
}

/* RUNNER */

function runner(area) {
  area.innerHTML=`
    <div class="gameBox">
      <h1>🏃 Cyber Runner</h1>
      <p>Press SPACE to jump.</p>
      <div class="score">Score: <span id="runnerScore">0</span></div>
      <canvas width="700" height="350"></canvas>
    </div>
  `;

  const c=area.querySelector("canvas");
  const ctx=c.getContext("2d");

  let playerY=270;
  let velocity=0;
  let obstacle=700;
  let score=0;

  document.onkeydown=e=>{
    if(e.code==="Space" && playerY>=270){
      velocity=-13;
    }
  };

  setInterval(()=>{

    velocity+=.7;
    playerY+=velocity;

    if(playerY>270){
      playerY=270;
      velocity=0;
    }

    obstacle-=7;

    if(obstacle<-40){
      obstacle=700;
      score++;
      document.getElementById("runnerScore").textContent=score;
    }

    ctx.fillStyle="#060811";
    ctx.fillRect(0,0,700,350);

    ctx.fillStyle="#8b5cf6";
    ctx.fillRect(0,310,700,40);

    ctx.fillStyle="#22d3ee";
    ctx.fillRect(100,playerY,40,40);

    ctx.fillStyle="#ef4444";
    ctx.fillRect(obstacle,270,35,40);

    if(
      obstacle<140 &&
      obstacle+35>100 &&
      playerY+40>270
    ){
      alert("Game Over! Score: "+score);
      obstacle=700;
      score=0;
    }

  },30);
}

/* 2048 */

function game2048(area) {
  let board=Array(16).fill(0);

  area.innerHTML=`
    <div class="gameBox">
      <h1>🔢 2048</h1>
      <p>Use arrow keys.</p>
      <div id="board2048"
        style="
        display:grid;
        grid-template-columns:repeat(4,80px);
        gap:8px;
        justify-content:center;
        margin:20px">
      </div>
      <button class="bigButton"
        onclick="game2048(document.getElementById('gameArea'))">
        Restart
      </button>
    </div>
  `;

  function add() {
    const empty=board
      .map((x,i)=>x===0?i:-1)
      .filter(x=>x>=0);

    if(empty.length){
      board[empty[Math.floor(Math.random()*empty.length)]]=2;
    }
  }

  add();
  add();

  function draw(){

    document.getElementById("board2048").innerHTML=
      board.map(x=>
        '<div style="height:80px;background:#171d28;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:25px;font-weight:bold">'+
        (x||"")+
        '</div>'
      ).join("");
  }

  function move(dir){

    let old=board.join();

    function line(a){
      a=a.filter(x=>x);

      for(let i=0;i<a.length-1;i++){
        if(a[i]===a[i+1]){
          a[i]*=2;
          a.splice(i+1,1);
        }
      }

      while(a.length<4)a.push(0);

      return a;
    }

    if(dir==="left"||dir==="right"){
      for(let r=0;r<4;r++){
        let a=board.slice(r*4,r*4+4);

        if(dir==="right")a.reverse();

        a=line(a);

        if(dir==="right")a.reverse();

        for(let c=0;c<4;c++)
          board[r*4+c]=a[c];
      }
    } else {

      for(let c=0;c<4;c++){

        let a=[
          board[c],
          board[c+4],
          board[c+8],
          board[c+12]
        ];

        if(dir==="down")a.reverse();

        a=line(a);

        if(dir==="down")a.reverse();

        a.forEach((v,i)=>{
          board[c+i*4]=v;
        });
      }
    }

    if(old!==board.join())add();

    draw();
  }

  document.onkeydown=e=>{
    if(e.key==="ArrowLeft")move("left");
    if(e.key==="ArrowRight")move("right");
    if(e.key==="ArrowUp")move("up");
    if(e.key==="ArrowDown")move("down");
  };

  draw();
}

/* TIC TAC TOE */

function ticTacToe(area) {

  let board=Array(9).fill("");

  area.innerHTML=`
    <div class="gameBox">
      <h1>❌ Tic-Tac-Toe</h1>
      <div class="ttt" id="ttt"></div>
      <p id="tttStatus">Your turn</p>
      <button class="bigButton" onclick="ticTacToe(document.getElementById('gameArea'))">
        Restart
      </button>
    </div>
  `;

  function check(){

    const wins=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for(const w of wins){
      if(
        board[w[0]] &&
        board[w[0]]===board[w[1]] &&
        board[w[1]]===board[w[2]]
      ) return board[w[0]];
    }

    return board.every(Boolean)?"draw":null;
  }

  function draw(){

    document.getElementById("ttt").innerHTML=
      board.map((x,i)=>
        '<button onclick="window.tttMove('+i+')">'+x+'</button>'
      ).join("");

  }

  window.tttMove=i=>{

    if(board[i])return;

    board[i]="X";

    let result=check();

    if(result){
      document.getElementById("tttStatus").textContent=
        result==="draw"?"Draw!":result+" wins!";
      draw();
      return;
    }

    let empty=board
      .map((x,i)=>x?null:i)
      .filter(x=>x!==null);

    if(empty.length){
      board[empty[Math.floor(Math.random()*empty.length)]]="O";
    }

    result=check();

    if(result){
      document.getElementById("tttStatus").textContent=
        result==="draw"?"Draw!":result+" wins!";
    }

    draw();
  };

  draw();
}

/* MEMORY */

function memory(area){

  const icons=["🐶","🐱","🦊","🐼","🐸","🐵","🦁","🐯"];
  let cards=[...icons,...icons]
    .sort(()=>Math.random()-.5);

  let opened=[];
  let matched=[];

  area.innerHTML=`
    <div class="gameBox">
      <h1>🃏 Memory Match</h1>
      <div class="memory" id="memory"></div>
    </div>
  `;

  window.memoryClick=i=>{

    if(
      opened.length>=2 ||
      opened.includes(i) ||
      matched.includes(i)
    )return;

    opened.push(i);
    draw();

    if(opened.length===2){

      if(cards[opened[0]]===cards[opened[1]]){

        matched.push(...opened);
        opened=[];
        draw();

      }else{

        setTimeout(()=>{
          opened=[];
          draw();
        },700);

      }
    }
  };

  function draw(){

    document.getElementById("memory").innerHTML=
      cards.map((c,i)=>{

        const show=
          opened.includes(i)||matched.includes(i);

        return '<button onclick="memoryClick('+i+')">'+
          (show?c:"?")+
          '</button>';

      }).join("");
  }

  draw();
}

/* MINES */

function mines(area){

  let cells=Array(25).fill(0);

  let mines=new Set();

  while(mines.size<5)
    mines.add(Math.floor(Math.random()*25));

  area.innerHTML=`
    <div class="gameBox">
      <h1>💣 Mines</h1>
      <p>Find safe squares.</p>
      <div id="mineBoard"
        style="
        display:grid;
        grid-template-columns:repeat(5,55px);
        gap:6px;
        justify-content:center">
      </div>
    </div>
  `;

  window.mineClick=i=>{

    const buttons=
      document.querySelectorAll("#mineBoard button");

    if(mines.has(i)){
      buttons[i].textContent="💣";
      alert("Boom! Try again.");
      return;
    }

    buttons[i].textContent="✓";
    buttons[i].style.color="#22c55e";
  };

  document.getElementById("mineBoard").innerHTML=
    cells.map((_,i)=>
      '<button onclick="mineClick('+i+')" '+
      'style="height:55px;background:#151b25;color:white;border:1px solid #30394a;border-radius:8px;font-size:20px">?</button>'
    ).join("");
}

/* REACTION */

function reaction(area){

  area.innerHTML=`
    <div class="gameBox">
      <h1>🎯 Reaction Test</h1>
      <p id="reactionText">Press START and wait for green.</p>
      <button class="bigButton" id="reactionButton">
        START
      </button>
    </div>
  `;

  const btn=document.getElementById("reactionButton");
  const text=document.getElementById("reactionText");

  let start=0;
  let waiting=false;

  btn.onclick=()=>{

    if(!waiting){

      waiting=true;
      btn.textContent="WAIT...";

      setTimeout(()=>{

        start=Date.now();
        btn.textContent="CLICK!";
        btn.style.background="#22c55e";

      },1000+Math.random()*3000);

    }else{

      if(start){

        const ms=Date.now()-start;

        text.textContent=
          "Your reaction time: "+ms+" ms";

        btn.textContent="TRY AGAIN";
        btn.style.background="";

        waiting=false;
        start=0;

      }else{

        text.textContent="Too early!";

        btn.textContent="TRY AGAIN";
        waiting=false;
      }
    }
  };
}

/* CLICKER */

function clicker(area){

  let score=0;

  area.innerHTML=`
    <div class="gameBox">
      <h1>🌟 Space Clicker</h1>
      <div class="score">
        Stars: <span id="clickScore">0</span>
      </div>
      <button
        id="star"
        style="
        width:180px;
        height:180px;
        border-radius:50%;
        border:0;
        background:#8257ff;
        color:white;
        font-size:70px;
        cursor:pointer">
        ⭐
      </button>
    </div>
  `;

  document.getElementById("star").onclick=()=>{

    score++;

    document.getElementById("clickScore")
      .textContent=score;
  };
}

</script>

</body>
</html>`;
