const games=[
 {id:1,name:"Neon Racer",genre:"Racing",icon:"🏎️"},
 {id:2,name:"Pixel Arena",genre:"Action",icon:"⚔️"},
 {id:3,name:"Sky Quest",genre:"Adventure",icon:"🚀"},
 {id:4,name:"Block Builder",genre:"Creative",icon:"🧱"},
 {id:5,name:"Space Drift",genre:"Arcade",icon:"🛸"},
 {id:6,name:"Dungeon Run",genre:"Adventure",icon:"🏰"},
 {id:7,name:"Turbo Kart",genre:"Racing",icon:"🏁"},
 {id:8,name:"Galaxy Defender",genre:"Arcade",icon:"🌌"}
];
const grid=document.querySelector("#gamesGrid"),search=document.querySelector("#search"),modal=document.querySelector("#modal"),content=document.querySelector("#modalContent");
function render(list=games){grid.innerHTML=list.map(g=>`<article class="game"><div class="cover">${g.icon}</div><div class="game-info"><h3>${g.name}</h3><p>${g.genre} • Browser</p><button class="playbtn" onclick="launch(${g.id})">PLAY NOW</button></div></article>`).join("")}
function launch(id){const g=games.find(x=>x.id===id);content.innerHTML=`<div class="player"><div><div style="font-size:55px">${g.icon}</div><h2>${g.name}</h2><p>Game player placeholder</p><button class="primary" onclick="demoStart()">Start demo</button></div></div><div class="notice"><b>Cloud streaming slot:</b> This starter UI is ready for a WebRTC game-streaming backend. A real cloud game requires a legal game build running on a remote machine/GPU and a signaling/streaming service.</div>`;modal.classList.remove("hidden")}
function demoStart(){content.querySelector(".player").innerHTML=`<div><div style="font-size:55px">🎮</div><h2>Demo session started</h2><p>Frontend is working. Connect your game server here.</p></div>`}
search.addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(games.filter(g=>(g.name+" "+g.genre).toLowerCase().includes(q)))});
document.querySelector("#close").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
document.querySelector("#randomBtn").onclick=()=>launch(games[Math.floor(Math.random()*games.length)].id);
document.querySelector("#loginBtn").onclick=()=>{content.innerHTML=`<h2>Sign in</h2><p style="color:#9aa3b2">Connect Supabase Auth here when you deploy.</p><button class="primary" onclick="modal.classList.add('hidden')">Close</button>`;modal.classList.remove("hidden")};
render();