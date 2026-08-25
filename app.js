/* =========================================================
   GAMECLOUD - COMPLETE APP.JS
   ========================================================= */

const SIGNALING_SERVER = "wss://gamecloud-webrtc.onrender.com";

/* ---------------------------------------------------------
   GAME LIBRARY
   --------------------------------------------------------- */

const games = [
  {
    id: "pokemon-unite",
    title: "Pokémon UNITE",
    category: "MOBA",
    icon: "⚡",
    description: "WebRTC cloud-streaming test",
    status: "STREAM TEST"
  },
  {
    id: "space-runner",
    title: "Space Runner",
    category: "Arcade",
    icon: "🚀",
    description: "Fast browser arcade game",
    status: "PLAY"
  },
  {
    id: "neon-racer",
    title: "Neon Racer",
    category: "Racing",
    icon: "🏎️",
    description: "High-speed neon racing",
    status: "PLAY"
  },
  {
    id: "zombie-survival",
    title: "Zombie Survival",
    category: "Action",
    icon: "🧟",
    description: "Survive as long as possible",
    status: "PLAY"
  },
  {
    id: "pixel-adventure",
    title: "Pixel Adventure",
    category: "Adventure",
    icon: "🗺️",
    description: "Explore a pixel world",
    status: "PLAY"
  },
  {
    id: "block-battle",
    title: "Block Battle",
    category: "Arcade",
    icon: "🧱",
    description: "Classic block action",
    status: "PLAY"
  },
  {
    id: "space-shooter",
    title: "Space Shooter",
    category: "Shooter",
    icon: "👾",
    description: "Defend the galaxy",
    status: "PLAY"
  },
  {
    id: "football",
    title: "Football Challenge",
    category: "Sports",
    icon: "⚽",
    description: "Quick football challenge",
    status: "PLAY"
  }
];

/* ---------------------------------------------------------
   STATE
   --------------------------------------------------------- */

let currentGame = null;
let signalingSocket = null;
let peerConnection = null;

/* ---------------------------------------------------------
   STARTUP
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  console.log("GameCloud starting...");

  createGameCloudStyles();
  setupNavigation();
  renderGames();

  console.log("GameCloud ready.");
});

/* ---------------------------------------------------------
   NAVIGATION
   --------------------------------------------------------- */

function setupNavigation() {
  const homeLinks = document.querySelectorAll(
    'a[href="#home"], [data-page="home"]'
  );

  homeLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showHome();
    });
  });

  const gameLinks = document.querySelectorAll(
    'a[href="#games"], [data-page="games"]'
  );

  gameLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showGames();
    });
  });
}

/* ---------------------------------------------------------
   GAME PAGE
   --------------------------------------------------------- */

function renderGames(filter = "") {
  const normalizedFilter = filter.toLowerCase().trim();

  let container =
    document.querySelector("#games-grid") ||
    document.querySelector(".games-grid") ||
    document.querySelector("#gameGrid");

  /*
   If the existing HTML doesn't contain a game container,
   create one automatically.
  */

  if (!container) {
    container = document.createElement("div");
    container.id = "games-grid";
    container.className = "games-grid gamecloud-generated-grid";

    const possibleLibrary =
      document.querySelector(".library") ||
      document.querySelector("main") ||
      document.body;

    possibleLibrary.appendChild(container);
  }

  const filteredGames = games.filter(game => {
    return (
      game.title.toLowerCase().includes(normalizedFilter) ||
      game.category.toLowerCase().includes(normalizedFilter) ||
      game.description.toLowerCase().includes(normalizedFilter)
    );
  });

  container.innerHTML = "";

  if (filteredGames.length === 0) {
    container.innerHTML = `
      <div class="gamecloud-empty">
        <div class="empty-icon">🎮</div>
        <h3>No games found</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;
  }

  filteredGames.forEach(game => {
    const card = document.createElement("article");

    card.className = "game-card gamecloud-card";

    card.innerHTML = `
      <div class="game-cover">
        <div class="game-icon">${game.icon}</div>
        <span class="game-category">
          ${escapeHTML(game.category)}
        </span>
      </div>

      <div class="game-info">
        <h3>${escapeHTML(game.title)}</h3>

        <p>
          ${escapeHTML(game.description)}
        </p>

        <button
          class="game-play-button"
          data-game="${escapeHTML(game.id)}"
        >
          ${game.id === "pokemon-unite"
            ? "▶ PLAY / STREAM TEST"
            : "▶ PLAY"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  container
    .querySelectorAll(".game-play-button")
    .forEach(button => {
      button.addEventListener("click", () => {
        const game = games.find(
          item => item.id === button.dataset.game
        );

        if (game) {
          launchGame(game);
        }
      });
    });

  setupSearch();
}

/* ---------------------------------------------------------
   SEARCH
   --------------------------------------------------------- */

function setupSearch() {
  const search =
    document.querySelector("#game-search") ||
    document.querySelector('input[placeholder*="Search games"]');

  if (!search || search.dataset.gamecloudReady) {
    return;
  }

  search.dataset.gamecloudReady = "true";

  search.addEventListener("input", event => {
    renderGames(event.target.value);
  });
}

/* ---------------------------------------------------------
   LAUNCH GAME
   --------------------------------------------------------- */

function launchGame(game) {
  currentGame = game;

  if (game.id === "pokemon-unite") {
    openStreamingPlayer(game);
    return;
  }

  openBrowserGame(game);
}

/* ---------------------------------------------------------
   BROWSER GAME
   --------------------------------------------------------- */

function openBrowserGame(game) {
  const modal = createModal();

  modal.innerHTML = `
    <div class="gamecloud-player-window">

      <div class="gamecloud-player-header">

        <div>
          <div class="gamecloud-small-title">
            GAMECLOUD
          </div>

          <h2>
            ${game.icon}
            ${escapeHTML(game.title)}
          </h2>
        </div>

        <button
          class="gamecloud-close"
          id="gamecloud-close"
        >
          ✕
        </button>

      </div>

      <div
        class="gamecloud-game-area"
        id="browser-game-area"
      >
        <div class="gamecloud-game-message">

          <div class="big-game-icon">
            ${game.icon}
          </div>

          <h2>
            ${escapeHTML(game.title)}
          </h2>

          <p>
            Browser-game demo player
          </p>

          <button
            class="gamecloud-primary"
            id="start-demo-game"
          >
            START GAME
          </button>

        </div>
      </div>

    </div>
  `;

  document
    .querySelector("#gamecloud-close")
    ?.addEventListener("click", closeModal);

  document
    .querySelector("#start-demo-game")
    ?.addEventListener("click", () => {
      startSimpleDemoGame(game);
    });
}

/* ---------------------------------------------------------
   SIMPLE DEMO GAME
   --------------------------------------------------------- */

function startSimpleDemoGame(game) {
  const area =
    document.querySelector("#browser-game-area");

  if (!area) return;

  area.innerHTML = `
    <div
      id="demo-game"
      class="demo-game"
      tabindex="0"
    >

      <div class="demo-score">
        SCORE:
        <span id="demo-score">0</span>
      </div>

      <div class="demo-instructions">
        Use ← → keys to move
      </div>

      <div
        id="demo-player"
        class="demo-player"
      >
        ${game.icon}
      </div>

      <div
        id="demo-target"
        class="demo-target"
      >
        ⭐
      </div>

    </div>
  `;

  const demo = document.querySelector("#demo-game");
  const player = document.querySelector("#demo-player");
  const target = document.querySelector("#demo-target");
  const scoreElement = document.querySelector("#demo-score");

  let playerX = 50;
  let targetX = 70;
  let score = 0;

  demo.focus();

  function update() {
    player.style.left = `${playerX}%`;
    target.style.left = `${targetX}%`;

    if (Math.abs(playerX - targetX) < 7) {
      score++;
      scoreElement.textContent = score;

      targetX = Math.floor(
        Math.random() * 80 + 10
      );
    }
  }

  demo.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      playerX -= 5;
    }

    if (event.key === "ArrowRight") {
      playerX += 5;
    }

    playerX = Math.max(
      5,
      Math.min(95, playerX)
    );

    update();
  });

  update();
}

/* ---------------------------------------------------------
   WEBRTC STREAMING PLAYER
   --------------------------------------------------------- */

function openStreamingPlayer(game) {
  const modal = createModal();

  modal.innerHTML = `
    <div class="gamecloud-player-window">

      <div class="gamecloud-player-header">

        <div>
          <div class="gamecloud-small-title">
            GAMECLOUD CLOUD STREAM
          </div>

          <h2>
            ${game.icon}
            ${escapeHTML(game.title)}
          </h2>
        </div>

        <button
          class="gamecloud-close"
          id="gamecloud-close"
        >
          ✕
        </button>

      </div>

      <div
        id="webrtc-player"
        class="gamecloud-video-area"
      >

        <div class="stream-message">

          <div class="stream-icon">
            📡
          </div>

          <h2>
            Ready to stream
          </h2>

          <p id="webrtc-status">
            Click the button to connect.
          </p>

          <button
            id="start-stream"
            class="gamecloud-primary"
          >
            ▶ START STREAM TEST
          </button>

        </div>

      </div>

      <div class="stream-footer">
        <span>● WebRTC</span>
        <span id="connection-state">
          Not connected
        </span>
      </div>

    </div>
  `;

  document
    .querySelector("#gamecloud-close")
    ?.addEventListener("click", () => {
      stopWebRTC();
      closeModal();
    });

  document
    .querySelector("#start-stream")
    ?.addEventListener("click", startWebRTC);
}

/* ---------------------------------------------------------
   WEBRTC CONNECTION
   --------------------------------------------------------- */

function startWebRTC() {
  const status =
    document.querySelector("#webrtc-status");

  const button =
    document.querySelector("#start-stream");

  if (button) {
    button.disabled = true;
    button.textContent = "CONNECTING...";
  }

  updateStatus(
    "Connecting to GameCloud streaming server..."
  );

  try {
    signalingSocket = new WebSocket(
      SIGNALING_SERVER
    );

    signalingSocket.onopen = () => {
      console.log(
        "Connected to GameCloud signaling server"
      );

      updateStatus(
        "Connected. Waiting for streaming computer..."
      );

      signalingSocket.send(
        JSON.stringify({
          type: "join",
          room: "gamecloud-test"
        })
      );

      createPeerConnection();
    };

    signalingSocket.onmessage = async event => {
      try {
        const message =
          JSON.parse(event.data);

        await handleSignalingMessage(message);
      } catch (error) {
        console.error(
          "WebRTC message error:",
          error
        );
      }
    };

    signalingSocket.onerror = error => {
      console.error(
        "WebRTC signaling error:",
        error
      );

      updateStatus(
        "Unable to connect to streaming server."
      );

      resetStreamButton();
    };

    signalingSocket.onclose = () => {
      console.log(
        "Signaling connection closed."
      );
    };

  } catch (error) {
    console.error(error);

    updateStatus(
      "WebRTC connection could not start."
    );

    resetStreamButton();
  }
}

/* ---------------------------------------------------------
   PEER CONNECTION
   --------------------------------------------------------- */

function createPeerConnection() {
  peerConnection =
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302"
        }
      ]
    });

  peerConnection.onicecandidate =
    event => {

      if (
        event.candidate &&
        signalingSocket &&
        signalingSocket.readyState ===
          WebSocket.OPEN
      ) {
        signalingSocket.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate
          })
        );
      }
    };

  peerConnection.ontrack =
    event => {

      console.log(
        "Received remote stream."
      );

      const player =
        document.querySelector(
          "#webrtc-player"
        );

      if (!player) return;

      player.innerHTML = "";

      const video =
        document.createElement("video");

      video.autoplay = true;
      video.playsInline = true;
      video.controls = false;

      if (event.streams[0]) {
        video.srcObject =
          event.streams[0];
      }

      video.className =
        "gamecloud-stream-video";

      player.appendChild(video);
    };

  peerConnection.onconnectionstatechange =
    () => {

      const state =
        peerConnection.connectionState;

      console.log(
        "WebRTC state:",
        state
      );

      const stateElement =
        document.querySelector(
          "#connection-state"
        );

      if (stateElement) {
        stateElement.textContent =
          state;
      }

      if (state === "connected") {
        updateStatus(
          "Streaming connection established!"
        );
      }

      if (state === "failed") {
        updateStatus(
          "WebRTC connection failed."
        );
      }
    };

  peerConnection.ondatachannel =
    event => {

      const channel =
        event.channel;

      console.log(
        "Input channel received:",
        channel.label
      );

      setupInputChannel(channel);
    };
}

/* ---------------------------------------------------------
   SIGNALING
   --------------------------------------------------------- */

async function handleSignalingMessage(message) {

  if (!peerConnection) return;

  if (message.type === "offer") {

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(
        message.offer
      )
    );

    const answer =
      await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(
      answer
    );

    signalingSocket.send(
      JSON.stringify({
        type: "answer",
        answer: answer
      })
    );
  }

  if (message.type === "answer") {

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(
        message.answer
      )
    );
  }

  if (message.type === "candidate") {

    try {

      await peerConnection.addIceCandidate(
        new RTCIceCandidate(
          message.candidate
        )
      );

    } catch (error) {

      console.log(
        "ICE candidate error:",
        error
      );

    }
  }
}

/* ---------------------------------------------------------
   GAME INPUT
   --------------------------------------------------------- */

let inputChannel = null;

function setupInputChannel(channel) {

  inputChannel = channel;

  channel.onopen = () => {
    console.log(
      "Game input channel connected."
    );
  };

  channel.onclose = () => {
    console.log(
      "Game input channel closed."
    );
  };

  document.addEventListener(
    "keydown",
    sendKeyboardInput
  );

  document.addEventListener(
    "keyup",
    sendKeyboardInput
  );
}

function sendKeyboardInput(event) {

  if (
    !inputChannel ||
    inputChannel.readyState !== "open"
  ) {
    return;
  }

  const message = {
    type:
      event.type === "keydown"
        ? "keydown"
        : "keyup",

    key: event.key,

    code: event.code
  };

  inputChannel.send(
    JSON.stringify(message)
  );
}

/* ---------------------------------------------------------
   STATUS
   --------------------------------------------------------- */

function updateStatus(message) {

  const status =
    document.querySelector(
      "#webrtc-status"
    );

  if (status) {
    status.textContent = message;
  }

  console.log(
    "GameCloud:",
    message
  );
}

function resetStreamButton() {

  const button =
    document.querySelector(
      "#start-stream"
    );

  if (!button) return;

  button.disabled = false;
  button.textContent =
    "▶ START STREAM TEST";
}

/* ---------------------------------------------------------
   STOP WEBRTC
   --------------------------------------------------------- */

function stopWebRTC() {

  if (inputChannel) {
    try {
      inputChannel.close();
    } catch {}
  }

  inputChannel = null;

  if (peerConnection) {
    try {
      peerConnection.close();
    } catch {}
  }

  peerConnection = null;

  if (signalingSocket) {
    try {
      signalingSocket.close();
    } catch {}
  }

  signalingSocket = null;

  document.removeEventListener(
    "keydown",
    sendKeyboardInput
  );

  document.removeEventListener(
    "keyup",
    sendKeyboardInput
  );
}

/* ---------------------------------------------------------
   MODAL
   --------------------------------------------------------- */

function createModal() {

  closeModal();

  const modal =
    document.createElement("div");

  modal.id =
    "gamecloud-modal";

  modal.className =
    "gamecloud-modal";

  document.body.appendChild(modal);

  return modal;
}

function closeModal() {

  const modal =
    document.querySelector(
      "#gamecloud-modal"
    );

  if (modal) {
    modal.remove();
  }

  stopWebRTC();
}

/* ---------------------------------------------------------
   HOME / GAMES
   --------------------------------------------------------- */

function showHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showGames() {

  const gamesSection =
    document.querySelector(
      "#games"
    ) ||
    document.querySelector(
      ".games"
    );

  if (gamesSection) {

    gamesSection.scrollIntoView({
      behavior: "smooth"
    });

  } else {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  renderGames();
}

/* ---------------------------------------------------------
   SECURITY
   --------------------------------------------------------- */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------------------------------------------------------
   GAMECLOUD STYLES
   --------------------------------------------------------- */

function createGameCloudStyles() {

  if (
    document.querySelector(
      "#gamecloud-generated-styles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "gamecloud-generated-styles";

  style.textContent = `

    .gamecloud-generated-grid {
      display: grid !important;
      grid-template-columns:
        repeat(auto-fill, minmax(240px, 1fr));
      gap: 24px;
      width: 100%;
      margin-top: 30px;
    }

    .gamecloud-card {
      overflow: hidden;
      border-radius: 18px;
      background: #101219;
      border: 1px solid #252a36;
      transition:
        transform .2s ease,
        border-color .2s ease;
    }

    .gamecloud-card:hover {
      transform: translateY(-5px);
      border-color: #7856ff;
    }

    .game-cover {
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background:
        radial-gradient(
          circle at center,
          #38206b,
          #101219 70%
        );
    }

    .game-icon {
      font-size: 72px;
    }

    .game-category {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      background: #171a23;
      color: #a98cff;
    }

    .game-info {
      padding: 18px;
    }

    .game-info h3 {
      margin: 0 0 8px;
      font-size: 21px;
    }

    .game-info p {
      margin: 0 0 18px;
      min-height: 42px;
      color: #9da3b4;
      line-height: 1.5;
    }

    .game-play-button,
    .gamecloud-primary {
      width: 100%;
      border: 0;
      border-radius: 10px;
      padding: 13px 18px;
      cursor: pointer;
      font-weight: 700;
      color: white;
      background: #7652ff;
    }

    .game-play-button:hover,
    .gamecloud-primary:hover {
      background: #8a6cff;
    }

    .game-play-button:disabled,
    .gamecloud-primary:disabled {
      opacity: .6;
      cursor: wait;
    }

    .gamecloud-empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: 70px 20px;
      color: #9da3b4;
    }

    .empty-icon {
      font-size: 60px;
      margin-bottom: 15px;
    }

    .gamecloud-modal {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 25px;
      background: rgba(0,0,0,.88);
    }

    .gamecloud-player-window {
      width: min(1100px, 100%);
      max-height: 90vh;
      overflow: hidden;
      border-radius: 18px;
      border: 1px solid #2c3040;
      background: #0d0f15;
      box-shadow:
        0 30px 100px rgba(0,0,0,.7);
    }

    .gamecloud-player-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid #252936;
    }

    .gamecloud-player-header h2 {
      margin: 4px 0 0;
    }

    .gamecloud-small-title {
      color: #896aff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .gamecloud-close {
      width: 40px;
      height: 40px;
      border: 1px solid #333847;
      border-radius: 10px;
      background: #151821;
      color: white;
      cursor: pointer;
      font-size: 18px;
    }

    .gamecloud-video-area {
      height: min(65vh, 650px);
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #05060a;
    }

    .gamecloud-stream-video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #000;
    }

    .stream-message,
    .gamecloud-game-message {
      text-align: center;
      max-width: 450px;
      padding: 30px;
    }

    .stream-icon,
    .big-game-icon {
      font-size: 65px;
      margin-bottom: 15px;
    }

    .stream-message p,
    .gamecloud-game-message p {
      color: #9da3b4;
      margin-bottom: 25px;
    }

    .stream-footer {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      color: #8f96a8;
      font-size: 13px;
      border-top: 1px solid #252936;
    }

    .gamecloud-game-area {
      height: 550px;
      background: #07080d;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .demo-game {
      position: relative;
      width: 90%;
      height: 90%;
      overflow: hidden;
      border: 1px solid #33384a;
      border-radius: 15px;
      background:
        radial-gradient(
          circle at center,
          #24154d,
          #080910 70%
        );
      outline: none;
    }

    .demo-score {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 5;
      font-weight: 800;
    }

    .demo-instructions {
      position: absolute;
      top: 45px;
      left: 15px;
      color: #a0a6b7;
      font-size: 13px;
    }

    .demo-player,
    .demo-target {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 45px;
    }

    .demo-target {
      top: 65%;
    }

    @media (max-width: 700px) {

      .gamecloud-generated-grid {
        grid-template-columns: 1fr;
      }

      .gamecloud-modal {
        padding: 10px;
      }

      .gamecloud-player-window {
        max-height: 96vh;
      }

      .gamecloud-video-area {
        min-height: 300px;
      }

    }

  `;

  document.head.appendChild(style);
}

/* ---------------------------------------------------------
   GLOBAL ACCESS
   --------------------------------------------------------- */

window.GameCloud = {
  games,
  renderGames,
  launchGame,
  startWebRTC,
  stopWebRTC
};
