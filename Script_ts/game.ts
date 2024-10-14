let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx = canvas?.getContext("2d");
import { Vaisseau } from "./vaisseau.js";
import { Fleet } from "./fleet.js";
import { Alien } from "./alien.js";
import { Bullet } from "./bullet.js";



interface Score {
    playerName: string;
    score: number;
}


export interface GameState {
    update(game: Game): void;
}



export class Level1State implements GameState {
    update(game: Game): void {
        game.flt.spd = 10;
        game.flt.nbLgn = 2;
        game.flt.nbCol = 8;
        game.vss.spd = 15;
        game.rl = "score1";
    }
}

export class Level2State implements GameState {
    update(game: Game): void {
        game.flt.spd = 15;
        game.flt.nbLgn = 3;
        game.flt.nbCol = 10;
        game.vss.spd = 20;
        game.rl = "score2";
    }
}

export class Level3State implements GameState {
    update(game: Game): void {
        game.flt.spd = 15;
        game.flt.nbLgn = 4;
        game.flt.nbCol = 12;
        game.vss.spd = 20;
        game.rl = "score3";
    }
}


export class Game {
    private fleet : Fleet;
    private vaisseau : Vaisseau;
    private score : number;
    private etat : string;
    private ctx : CanvasRenderingContext2D = ctx!;
    private player_name : string;
    private currentState? : GameState;
    private level? : number;
    private url? : string;
    private tailleScore? : number;

    get flt() {
        return this.fleet;
    }

    set flt(flt : Fleet) {
        this.fleet = flt;
    }

    get vss() {
        return this.vaisseau;
    }

    set vss(vss : Vaisseau) {
        this.vaisseau = vss;
    }

    get scr() {
        return this.score;
    }

    set scr(scr : number) {
        this.score = scr;
    }

    get rl() {
        return this.url!;
    }

    set rl(url : string) {
        this.url = url;
    }

    get tt() {
        return this.etat;
    }

    set tt(tt : string) {
        this.etat = tt;
    }

    get plr() {
        return this.player_name;
    }

    set plr(plr : string) {
        this.player_name = plr;
    }

    get lvl() {
        return this.level!;
    }

    set lvl(lvl : number) {
        this.level = lvl;
    }

    constructor(name : string, level : string) {
        this.fleet = new Fleet([]);
        this.vaisseau = new Vaisseau();
        this.etat = "start";
        this.ctx = ctx!;
        this.player_name = name;
        this.level = parseInt(level);
        this.setState(level);
        this.score = 0;
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }

    setState(levelinput: string): void {
        let levelState: GameState;
        switch (levelinput!) {
            case "1" : 
                levelState = new Level1State();
                break;
            case "2" :
                levelState = new Level2State();
                break;
            case "3" :
                levelState = new Level3State();
                break;
        }
        this.currentState = levelState!;
        this.currentState.update(this);
    }
    

    handleKeyDown(event: KeyboardEvent): void {
        if (this.etat === "ingame") {
            if (event.key === " ") {
                this.vaisseau.fire();
            }
            if(event.key === "ArrowLeft") {
                this.vaisseau.moveLeft();
            }
            if(event.key === "ArrowRight") {
                this.vaisseau.moveRight();
            }
        }
    }

    addScoreToLocal(playerName: string, score: number): void {
        const existingScores: Score[] = JSON.parse(localStorage.getItem(this.url!) || '[]');
        existingScores.push({ playerName, score });
        localStorage.setItem(this.url!, JSON.stringify(existingScores));
    }

    getScoresFromLocal(): Score[] {
        const storedScores: string | null = localStorage.getItem(this.url!);
        if (storedScores) {
            return JSON.parse(storedScores);
        } else {
            return [];
        }
    }

    collisionDetection() {
        const munitionToRemove: Bullet[] = [];
        const aliensToRemove: Alien[] = [];
        const vaisseau = this.vaisseau;
        const fleet = this.fleet;
    
        for (const munition of vaisseau.Mun) {
            for (const alien of fleet.alns) {
                if (munition.xPos > alien.xPos! &&
                    munition.xPos < alien.xPos! + alien.wdth &&
                    munition.yPos > alien.yPos! &&
                    munition.yPos < alien.yPos! + alien.hght) {
                    this.ctx.clearRect(alien.xPos!, alien.yPos!, alien.wdth, alien.hght);
                    aliensToRemove.push(alien);
                    munition.stppd = true;
                    vaisseau.stopMove(munition);
                    munitionToRemove.push(munition);
                }
            }
        }

        for (const alien of aliensToRemove) {
            const index = fleet.alns.indexOf(alien);
            if (index !== -1) {
                this.ctx.clearRect(alien.xPos!, alien.yPos!, alien.wdth, alien.hght);
                fleet.alns.splice(index, 1);
                this.score += 100;
                let score = document.getElementById("score") as HTMLInputElement;
                score!.innerHTML = "Score : " + this.score.toString();
            }
        }
    
        for (const munition of munitionToRemove) {
            const index = vaisseau.Mun.indexOf(munition);
            if (index !== -1) {
                vaisseau.Mun.splice(index, 1);
            }
        }
    }

    start() {
        console.log("start");
        this.fleet.install();
        this.vaisseau.draw(ctx!);
        this.fleet.draw(ctx!);
        this.fleet.getMax();
        this.fleet.move_in(ctx!);
    }

    etatGame() {
        console.log("etat", this.etat);
        if(this.fleet.alns.length == 0) {
            this.etat = "win";
            this.endGame();
        }
        else {
            if(this.fleet.yMx! + this.fleet.alns[0].hght > this.vaisseau.yPos) {
                this.etat = "lose";
                this.endGame();
            }
        }
    }

    endGame() {
        this.fleet.mv = false;
        this.vaisseau.erase(ctx!);
        let message = document.getElementById("message");
        switch(this.etat) {
            case "win" :
                message!.innerHTML = "You win !";
                break;
            case "lose" :
                message!.innerHTML = "You lose !";
                break;
        }
        let bandeau = document.getElementById("bandeau");
        bandeau!.style.display = "none";
        let gamedisplay = document.getElementById("game");
        gamedisplay!.style.display = "none";
        let fin = document.getElementById("fin");
        fin!.style.display = "flex";
        let name = document.getElementById("nameFin") as HTMLInputElement;
        name!.innerHTML += this.player_name.toString();
        let level = document.getElementById("levelFin") as HTMLInputElement;
        level!.innerHTML += this.level!.toString();
        let score = document.getElementById("scoreFin") as HTMLInputElement;
        score!.innerHTML += this.score.toString();
        this.addScoreToLocal(this.player_name.toString(), this.score);
        this.showScores();

        let newgame = document.getElementById("newgame");
        newgame!.addEventListener("click", function () {
            window.location.reload();
        });
        let quit = document.getElementById("quit");
        quit!.addEventListener("click", function () {
            window.close();
        });

    }

    compareScores(a: Score, b: Score): number {
        return b.score - a.score;
    }

    showScores() {
        let scoreboards = document.getElementById("scoreboards");
        let scores: Score[] = this.getScoresFromLocal();
        scores.sort(this.compareScores);
        if (scores.length < 5) {
            this.tailleScore = scores.length;
        }
        else {
            this.tailleScore = 5;
        }
        for (let i = 0; i < this.tailleScore; i++) {
            let playerStatDiv = document.createElement("div");
            playerStatDiv.className = "playerstat";
            playerStatDiv.id = 'scorestats';

            let playerNameP = document.createElement("p");
            playerNameP.id = 'scorestats';
            playerNameP.textContent = 'Name : ' + scores[i].playerName;

            let playerScoreP = document.createElement("p");
            playerScoreP.id = 'scorestats';
            playerScoreP.textContent = 'Score : ' + scores[i].score;

            playerStatDiv.appendChild(playerNameP);
            playerStatDiv.appendChild(playerScoreP);
            scoreboards!.appendChild(playerStatDiv);
        }
    }
}