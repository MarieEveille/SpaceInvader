import { Alien } from "./alien.js";
import { Fleet } from "./fleet.js";
import { Vaisseau } from "./vaisseau.js";
import { Game, GameState, Level1State, Level2State, Level3State } from "./game.js";
import { Bullet } from "./bullet.js";

let buttonStart = document.getElementById("start");
let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx = canvas?.getContext("2d");
let score = document.getElementById("score");


buttonStart!.addEventListener("click", function () {
    console.log("start");
    buttonStart!.style.display = "none";
    initialisation();
});

export function initialisation() {

    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    console.log("initialisation");
    let stargame = document.getElementById("stargame");
    stargame!.style.display = "flex";
    let nameinput = document.getElementById("nameinput") as HTMLInputElement;
    let levelinput = document.getElementById("levelinput") as HTMLInputElement;    
    let game = new Game(nameinput!.value, levelinput!.value);
    let debut = document.getElementById("debut");
    debut!.style.display = "none";
    let bandeau = document.getElementById("bandeau");
    bandeau!.style.display = "flex";
    let gamedisplay = document.getElementById("game");
    gamedisplay!.style.display = "flex";

    let name = document.getElementById("name") as HTMLInputElement;
    name!.innerHTML += game.plr.toString();
    let level = document.getElementById("level") as HTMLInputElement;
    level!.innerHTML += game.lvl!.toString();
    let score = document.getElementById("score") as HTMLInputElement;
    score!.innerHTML += game.scr.toString();
    stargame!.addEventListener("click", function () {
        stargame!.style.display = "none";
        console.log("stargame", game!.tt);
        startGame(game!);
    });
}


function startGame(game : Game){
    console.log("startGame");
    game.tt = "ingame";
    game.start();
    gameLoop(game);
}


let idLoop : number;

function gameLoop(game : Game) {
    if(game.tt == "ingame") {
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


