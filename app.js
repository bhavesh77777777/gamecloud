const games = [
  {id:1,name:"Neon Racer",genre:"Racing",icon:"🏎️",playable:false},
  {id:2,name:"Pixel Arena",genre:"Action",icon:"⚔️",playable:false},
  {id:3,name:"Sky Quest",genre:"Adventure",icon:"🚀",playable:false},
  {id:4,name:"2048",genre:"Puzzle",icon:"🔢",playable:true},
  {id:5,name:"Space Drift",genre:"Arcade",icon:"🛸",playable:false},
  {id:6,name:"Dungeon Run",genre:"Adventure",icon:"🏰",playable:false},
  {id:7,name:"Turbo Kart",genre:"Racing",icon:"🏁",playable:false},
  {id:8,name:"Galaxy Defender",genre:"Arcade",icon:"🌌",playable:false}
  {id:9,name:"Pokémon UNITE",genre:"MOBA",icon:"⚡",playable:false},
];

const grid = document.querySelector("#gamesGrid");
const search = document.querySelector("#search");
const modal = document.querySelector("#modal");
const content = document.querySelector("#modalContent");

function render(list = games) {
  grid.innerHTML = list.map(g => `
    <article class="game">
      <div class="cover">${g.icon}</div>
      <div class="game-info">
        <h3>${g.name}</h3>
        <p>${g.genre} • Browser</p>
        <button class="playbtn" onclick="launch(${g.id})">
          ${g.playable ? "PLAY NOW" : "COMING SOON"}
        </button>
      </div>
    </article>
  `).join("");
}

function launch(id) {
  const game = games.find(g => g.id === id);

  if (game.name === "Pokémon UNITE") {
    openPokemonUnite();
    return;
  }

  if (!game.playable) {
    content.innerHTML = `
      <h2>${game.icon} ${game.name}</h2>
      <div class="notice">
        This game is coming soon.
      </div>
    `;
    modal.classList.remove("hidden");
    return;
  }

  start2048();
}

function openPokemonUnite() {
  content.innerHTML = `
    <div class="game-window">
      <div class="game-header">
        <div>
          <p class="eyebrow">CLOUD PLAY</p>
          <h2>⚡ Pokémon UNITE</h2>
        </div>
        <button class="secondary"
          onclick="modal.classList.add('hidden')">
          Close
        </button>
      </div>

      <div class="player unite-player">
        <div>
          <div style="font-size:64px">⚡</div>
          <h2>Pokémon UNITE</h2>
          <p>Cloud gaming session</p>

          <button class="primary" onclick="startUniteSession()">
            ▶ PLAY
          </button>
        </div>
      </div>

      <div class="notice">
        <b>Streaming ready:</b>
        This player is prepared for a legitimate game-streaming
        backend. The actual Pokémon UNITE game must run on an
        authorized remote gaming system.
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function startUniteSession() {
  content.innerHTML = `
    <div class="game-window">
      <div class="player unite-player">
        <div>
          <div style="font-size:64px">🎮</div>
          <h2>Waiting for game server</h2>
          <p>
            Your GameCloud frontend is ready.
            A legitimate streaming server still needs to be connected.
          </p>

          <div class="notice">
            Status: <b style="color:#49df8a">READY</b>
          </div>
        </div>
      </div>
    </div>
  `;
}

function start2048() {
  content.innerHTML = `
    <div class="game-window">
      <div class="game-header">
        <div>
          <p class="eyebrow">PLAYING NOW</p>
          <h2>🔢 2048</h2>
        </div>
        <button class="secondary" onclick="new2048()">New Game</button>
      </div>

      <div class="score-box">
        Score: <strong id="score">0</strong>
      </div>

      <div id="board" class="board"></div>

      <div class="controls">
        <button onclick="move2048('up')">⬆️</button>
        <button onclick="move2048('left')">⬅️</button>
        <button onclick="move2048('down')">⬇️</button>
        <button onclick="move2048('right')">➡️</button>
      </div>

      <p class="game-help">
        Use your keyboard arrow keys or the buttons above.
      </p>
    </div>
  `;

  add2048Styles();
  new2048();
  modal.classList.remove("hidden");
}

let board2048 = [];
let score2048 = 0;

function new2048() {
  board2048 = Array.from({length:4}, () => Array(4).fill(0));
  score2048 = 0;

  addTile();
  addTile();

  draw2048();
}

function addTile() {
  const empty = [];

  for(let r=0;r<4;r++) {
    for(let c=0;c<4;c++) {
      if(board2048[r][c] === 0) {
        empty.push([r,c]);
      }
    }
  }

  if(!empty.length) return;

  const [r,c] = empty[Math.floor(Math.random()*empty.length)];

  board2048[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function draw2048() {
  const board = document.querySelector("#board");
  const score = document.querySelector("#score");

  if(!board) return;

  board.innerHTML = "";

  board2048.forEach(row => {
    row.forEach(value => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = value || "";

      if(value) {
        tile.dataset.value = value;
      }

      board.appendChild(tile);
    });
  });

  if(score) {
    score.textContent = score2048;
  }
}

function move2048(direction) {
  const old = JSON.stringify(board2048);

  if(direction === "left") {
    for(let r=0;r<4;r++) {
      board2048[r] = mergeLine(board2048[r]);
    }
  }

  if(direction === "right") {
    for(let r=0;r<4;r++) {
      board2048[r] = mergeLine([...board2048[r]].reverse()).reverse();
    }
  }

  if(direction === "up") {
    for(let c=0;c<4;c++) {
      let column = [];

      for(let r=0;r<4;r++) {
        column.push(board2048[r][c]);
      }

      column = mergeLine(column);

      for(let r=0;r<4;r++) {
        board2048[r][c] = column[r];
      }
    }
  }

  if(direction === "down") {
    for(let c=0;c<4;c++) {
      let column = [];

      for(let r=0;r<4;r++) {
        column.push(board2048[r][c]);
      }

      column = mergeLine(column.reverse()).reverse();

      for(let r=0;r<4;r++) {
        board2048[r][c] = column[r];
      }
    }
  }

  if(JSON.stringify(board2048) !== old) {
    addTile();
    draw2048();
  }
}

function mergeLine(line) {
  let numbers = line.filter(x => x !== 0);
  let result = [];

  for(let i=0;i<numbers.length;i++) {
    if(numbers[i] === numbers[i+1]) {
      const merged = numbers[i] * 2;
      result.push(merged);
      score2048 += merged;
      i++;
    } else {
      result.push(numbers[i]);
    }
  }

  while(result.length < 4) {
    result.push(0);
  }

  return result;
}

document.addEventListener("keydown", event => {
  if(modal.classList.contains("hidden")) return;

  const keys = {
    ArrowUp:"up",
    ArrowDown:"down",
    ArrowLeft:"left",
    ArrowRight:"right"
  };

  if(keys[event.key]) {
    event.preventDefault();
    move2048(keys[event.key]);
  }
});

function add2048Styles() {
  if(document.querySelector("#game2048styles")) return;

  const style = document.createElement("style");
  style.id = "game2048styles";

  style.textContent = `
    .game-window {
      max-width: 520px;
      margin: auto;
    }

    .game-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:15px;
    }

    .game-header h2 {
      margin:5px 0 0;
    }

    .score-box {
      margin:18px 0;
      padding:12px;
      background:#171b24;
      border:1px solid #303642;
      border-radius:10px;
      text-align:center;
      color:#aab2c0;
    }

    .board {
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:8px;
      background:#292d38;
      padding:8px;
      border-radius:12px;
      aspect-ratio:1;
    }

    .tile {
      display:grid;
      place-items:center;
      background:#3a3f4c;
      border-radius:8px;
      font-size:clamp(20px,6vw,34px);
      font-weight:900;
      min-width:0;
    }

    .tile[data-value="2"] { background:#eee4da; color:#333; }
    .tile[data-value="4"] { background:#ede0c8; color:#333; }
    .tile[data-value="8"] { background:#f2b179; color:white; }
    .tile[data-value="16"] { background:#f59563; color:white; }
    .tile[data-value="32"] { background:#f67c5f; color:white; }
    .tile[data-value="64"] { background:#f65e3b; color:white; }
    .tile[data-value="128"] { background:#edcf72; color:white; }
    .tile[data-value="256"] { background:#edcc61; color:white; }
    .tile[data-value="512"] { background:#edc850; color:white; }
    .tile[data-value="1024"] { background:#edc53f; color:white; }
    .tile[data-value="2048"] { background:#edc22e; color:white; }

    .controls {
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:8px;
      margin-top:15px;
    }

    .controls button {
      border:1px solid #343a48;
      background:#171b24;
      color:white;
      border-radius:9px;
      padding:12px;
      font-size:18px;
      cursor:pointer;
    }

    .controls button:hover {
      background:#242a36;
    }

    .game-help {
      text-align:center;
      color:#8992a2;
      font-size:13px;
    }
  `;

  document.head.appendChild(style);
}

document.querySelector("#close").onclick = () => {
  modal.classList.add("hidden");
};

modal.addEventListener("click", event => {
  if(event.target === modal) {
    modal.classList.add("hidden");
  }
});

search.addEventListener("input", event => {
  const q = event.target.value.toLowerCase();

  render(
    games.filter(g =>
      (g.name + " " + g.genre)
      .toLowerCase()
      .includes(q)
    )
  );
});

document.querySelector("#randomBtn").onclick = () => {
  launch(4);
};

document.querySelector("#loginBtn").onclick = () => {
  content.innerHTML = `
    <h2>Sign in</h2>
    <p style="color:#9aa3b2">
      Supabase authentication will be connected in a later step.
    </p>
  `;

  modal.classList.remove("hidden");
};

render();
