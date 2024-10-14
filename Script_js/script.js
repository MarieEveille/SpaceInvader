import { Game } from "./game.js";
let buttonStart = document.getElementById("start");
let canvas = document.getElementById("canvas");
let ctx = canvas?.getContext("2d");
let score = document.getElementById("score");
let game = null;
buttonStart.addEventListener("click", function () {
    console.log("start");
    buttonStart.style.display = "none";
    initialisation();
});
export function initialisation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("initialisation");
    let stargame = document.getElementById("stargame");
    stargame.style.display = "flex";
    let nameinput = document.getElementById("nameinput");
    let levelinput = document.getElementById("levelinput");
    game = new Game(nameinput.value, levelinput.value);
    let debut = document.getElementById("debut");
    debut.style.display = "none";
    let bandeau = document.getElementById("bandeau");
    bandeau.style.display = "flex";
    let gamedisplay = document.getElementById("game");
    gamedisplay.style.display = "flex";
    let name = document.getElementById("name");
    name.innerHTML += game.plr.toString();
    let level = document.getElementById("level");
    level.innerHTML += game.lvl.toString();
    let score = document.getElementById("score");
    score.innerHTML += game.scr.toString();
    stargame.addEventListener("click", function () {
        stargame.style.display = "none";
        console.log("stargame", game.tt);
        startGame(game);
    });
}
function startGame(game) {
    console.log("startGame");
    game.tt = "ingame";
    game.start();
    gameLoop(game);
}
let idLoop;
function gameLoop(game) {
    if (game.tt == "ingame") {
        console.log("gameLoop");
        game.collisionDetection();
        game.etatGame();
        game.flt.getMax();
        idLoop = requestAnimationFrame(() => {
            gameLoop(game);
        });
    }
    else {
        console.log("gameLoop else");
    }
}
