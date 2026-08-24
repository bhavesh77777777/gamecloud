const games = [
  { id: 1, name: "Neon Racer", genre: "Racing", icon: "🏎️", playable: false },
  { id: 2, name: "Pixel Arena", genre: "Action", icon: "⚔️", playable: false },
  { id: 3, name: "Sky Quest", genre: "Adventure", icon: "🚀", playable: false },
  { id: 4, name: "2048", genre: "Puzzle", icon: "🔢", playable: true },
  { id: 5, name: "Space Drift", genre: "Arcade", icon: "🛸", playable: false },
  { id: 6, name: "Dungeon Run", genre: "Adventure", icon: "🏰", playable: false },
  { id: 7, name: "Turbo Kart", genre: "Racing", icon: "🏁", playable: false },
  { id: 8, name: "Galaxy Defender", genre: "Arcade", icon: "🌌", playable: false },
  { id: 9, name: "Pokémon UNITE", genre: "MOBA", icon: "⚡", playable: false }
];

const grid = document.querySelector("#gamesGrid");
const search = document.querySelector("#search");
const modal = document.querySelector("#modal");
const content = document.querySelector("#modalContent");

function render(list = games) {
  if (!grid) return;

  grid.innerHTML = list.map(game => `
    <article class="game">
      <div class="cover">${game.icon}</div>

      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.genre} • Browser</p>

        <button
          class="playbtn"
          data-game-id="${game.id}">
          ${game.playable ? "PLAY NOW" : "COMING SOON"}
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".playbtn").forEach(button => {
    button.addEventListener("click", () => {
      launch(Number(button.dataset.gameId));
    });
  });
}


/* =========================
   GAME LAUNCHER
========================= */

function launch(id) {
  const game = games.find(item => item.id === id);

  if (!game) return;

  if (game.name === "2048") {
    start2048();
    return;
  }

  if (game.name === "Pokémon UNITE") {
    showPokemonUnite();
    return;
  }

  showModal(`
    <h2>${game.icon} ${game.name}</h2>

    <div class="notice">
      This game is currently in the GameCloud library.
      A legitimate game source can be connected later.
    </div>
  `);
}


/* =========================
   MODAL
========================= */

function showModal(html) {
  if (!modal || !content) return;

  content.innerHTML = html;
  modal.classList.remove("hidden");
}

function closeModal() {
  if (modal) {
    modal.classList.add("hidden");
  }
}

if (document.querySelector("#close")) {
  document.querySelector("#close").addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });
}


/* =========================
   POKÉMON UNITE
========================= */

function showPokemonUnite() {
  showModal(`
    <div class="game-window">

      <div class="game-header">

        <div>
          <p class="eyebrow">CLOUD PLAY</p>
          <h2>⚡ Pokémon UNITE</h2>
        </div>

        <button class="secondary" id="uniteClose">
          Close
        </button>

      </div>


      <div class="player unite-player">

        <div>

          <div style="font-size:64px">
            ⚡
          </div>

          <h2>
            Pokémon UNITE
          </h2>

          <p>
            Cloud gaming player
          </p>

          <button class="primary" id="unitePlay">
            ▶ PLAY
          </button>

        </div>

      </div>


      <div class="notice">

        <b>GameCloud player ready.</b>

        <br><br>

        The actual commercial game must come
        from an authorized game/streaming source.
        GameCloud does not copy or host the
        game's files.

      </div>

    </div>
  `);


  const closeButton =
    document.querySelector("#uniteClose");

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeModal
    );
  }


  const playButton =
    document.querySelector("#unitePlay");

  if (playButton) {

    playButton.addEventListener(
      "click",
      () => {

        const player =
          document.querySelector(".unite-player");

        if (!player) return;

        player.innerHTML = `

          <div>

            <div style="font-size:64px">
              🎮
            </div>

            <h2>
              Waiting for game server
            </h2>

            <p>
              GameCloud is ready for a
              legitimate streaming connection.
            </p>

            <div class="notice">

              Server status:
              <b style="color:#49df8a">
                READY
              </b>

            </div>

          </div>

        `;

      }
    );

  }

}


/* =========================
   2048 GAME
========================= */

let board = [];
let score = 0;


function start2048() {

  showModal(`

    <div class="game-window">

      <div class="game-header">

        <div>

          <p class="eyebrow">
            PLAYING NOW
          </p>

          <h2>
            🔢 2048
          </h2>

        </div>

        <button
          class="secondary"
          id="newGame">

          New Game

        </button>

      </div>


      <div class="score-box">

        Score:
        <strong id="score">
          0
        </strong>

      </div>


      <div
        id="board"
        class="board">
      </div>


      <div class="controls">

        <button data-move="up">
          ⬆️
        </button>

        <button data-move="left">
          ⬅️
        </button>

        <button data-move="down">
          ⬇️
        </button>

        <button data-move="right">
          ➡️
        </button>

      </div>


      <p class="game-help">

        Use your keyboard arrow keys
        or the buttons.

      </p>

    </div>

  `);


  add2048Styles();


  const newGame =
    document.querySelector("#newGame");

  if (newGame) {
    newGame.addEventListener(
      "click",
      newGame2048
    );
  }


  document
    .querySelectorAll("[data-move]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          move2048(
            button.dataset.move
          );

        }
      );

    });


  newGame2048();
}


function newGame2048() {

  board =
    Array.from(
      { length: 4 },
      () => Array(4).fill(0)
    );

  score = 0;

  addTile();
  addTile();

  draw2048();
}


function addTile() {

  const empty = [];


  for (let row = 0; row < 4; row++) {

    for (let col = 0; col < 4; col++) {

      if (board[row][col] === 0) {

        empty.push([
          row,
          col
        ]);

      }

    }

  }


  if (empty.length === 0) {
    return;
  }


  const position =
    empty[
      Math.floor(
        Math.random() * empty.length
      )
    ];


  const row = position[0];
  const col = position[1];


  board[row][col] =
    Math.random() < 0.9
      ? 2
      : 4;
}


function draw2048() {

  const boardElement =
    document.querySelector("#board");

  const scoreElement =
    document.querySelector("#score");


  if (!boardElement) {
    return;
  }


  boardElement.innerHTML = "";


  board.forEach(row => {

    row.forEach(value => {

      const tile =
        document.createElement("div");


      tile.className = "tile";


      tile.textContent =
        value || "";


      if (value) {

        tile.dataset.value =
          value;

      }


      boardElement.appendChild(tile);

    });

  });


  if (scoreElement) {

    scoreElement.textContent =
      score;

  }

}


function mergeLine(line) {

  const numbers =
    line.filter(value => value !== 0);

  const result = [];


  for (
    let index = 0;
    index < numbers.length;
    index++
  ) {

    if (
      numbers[index] ===
      numbers[index + 1]
    ) {

      const merged =
        numbers[index] * 2;


      result.push(merged);


      score += merged;


      index++;

    } else {

      result.push(
        numbers[index]
      );

    }

  }


  while (
    result.length < 4
  ) {

    result.push(0);

  }


  return result;
}


function move2048(direction) {

  const oldBoard =
    JSON.stringify(board);


  if (direction === "left") {

    for (
      let row = 0;
      row < 4;
      row++
    ) {

      board[row] =
        mergeLine(
          board[row]
        );

    }

  }


  if (direction === "right") {

    for (
      let row = 0;
      row < 4;
      row++
    ) {

      board[row] =
        mergeLine(
          [...board[row]].reverse()
        ).reverse();

    }

  }


  if (direction === "up") {

    for (
      let col = 0;
      col < 4;
      col++
    ) {

      const column =
        board.map(
          row => row[col]
        );


      const merged =
        mergeLine(column);


      for (
        let row = 0;
        row < 4;
        row++
      ) {

        board[row][col] =
          merged[row];

      }

    }

  }


  if (direction === "down") {

    for (
      let col = 0;
      col < 4;
      col++
    ) {

      const column =
        board.map(
          row => row[col]
        );


      const merged =
        mergeLine(
          column.reverse()
        ).reverse();


      for (
        let row = 0;
        row < 4;
        row++
      ) {

        board[row][col] =
          merged[row];

      }

    }

  }


  if (
    JSON.stringify(board) !==
    oldBoard
  ) {

    addTile();

    draw2048();

  }

}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      !modal ||
      modal.classList.contains("hidden")
    ) {
      return;
    }


    const controls = {

      ArrowUp: "up",

      ArrowDown: "down",

      ArrowLeft: "left",

      ArrowRight: "right"

    };


    const direction =
      controls[event.key];


    if (direction) {

      event.preventDefault();

      move2048(direction);

    }

  }
);


/* =========================
   2048 STYLES
========================= */

function add2048Styles() {

  if (
    document.querySelector(
      "#game2048styles"
    )
  ) {
    return;
  }


  const style =
    document.createElement("style");


  style.id =
    "game2048styles";


  style.textContent = `

    .game-window {
      max-width: 520px;
      margin: auto;
    }


    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }


    .game-header h2 {
      margin: 5px 0 0;
    }


    .score-box {
      margin: 18px 0;
      padding: 12px;
      background: #171b24;
      border: 1px solid #303642;
      border-radius: 10px;
      text-align: center;
      color: #aab2c0;
    }


    .board {
      display: grid;
      grid-template-columns:
        repeat(4, 1fr);

      gap: 8px;

      background: #292d38;

      padding: 8px;

      border-radius: 12px;

      aspect-ratio: 1;
    }


    .tile {
      display: grid;
      place-items: center;

      background: #3a3f4c;

      border-radius: 8px;

      font-size:
        clamp(20px, 6vw, 34px);

      font-weight: 900;
    }


    .tile[data-value="2"] {
      background: #eee4da;
      color: #333;
    }


    .tile[data-value="4"] {
      background: #ede0c8;
      color: #333;
    }


    .tile[data-value="8"] {
      background: #f2b179;
      color: white;
    }


    .tile[data-value="16"] {
      background: #f59563;
      color: white;
    }


    .tile[data-value="32"] {
      background: #f67c5f;
      color: white;
    }


    .tile[data-value="64"] {
      background: #f65e3b;
      color: white;
    }


    .tile[data-value="128"],
    .tile[data-value="256"],
    .tile[data-value="512"],
    .tile[data-value="1024"],
    .tile[data-value="2048"] {
      background: #edc850;
      color: white;
    }


    .controls {
      display: grid;

      grid-template-columns:
        repeat(4, 1fr);

      gap: 8px;

      margin-top: 15px;
    }


    .controls button {
      border: 1px solid #343a48;

      background: #171b24;

      color: white;

      border-radius: 9px;

      padding: 12px;

      font-size: 18px;

      cursor: pointer;
    }


    .controls button:hover {
      background: #242a36;
    }


    .game-help {
      text-align: center;

      color: #8992a2;

      font-size: 13px;
    }

  `;


  document.head.appendChild(style);
}


/* =========================
   SEARCH
========================= */

if (search) {

  search.addEventListener(
    "input",
    event => {

      const query =
        event.target.value
          .toLowerCase()
          .trim();


      const filtered =
        games.filter(game => {

          const text =
            `${game.name} ${game.genre}`
              .toLowerCase();


          return text.includes(query);

        });


      render(filtered);

    }
  );

}


/* =========================
   RANDOM GAME
========================= */

const randomButton =
  document.querySelector(
    "#randomBtn"
  );


if (randomButton) {

  randomButton.addEventListener(
    "click",
    () => {

      launch(4);

    }
  );

}


/* =========================
   LOGIN
========================= */

const loginButton =
  document.querySelector(
    "#loginBtn"
  );


if (loginButton) {

  loginButton.addEventListener(
    "click",
    () => {

      showModal(`

        <h2>
          Sign in
        </h2>

        <p
          style="
            color:#9aa3b2
          "
        >
          Supabase authentication
          can be connected later.
        </p>

      `);

    }
  );

}


/* =========================
   START
========================= */

render();
