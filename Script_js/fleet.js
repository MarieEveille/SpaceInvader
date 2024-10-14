import { Alien } from "./alien.js";
let canvas = document.getElementById("canvas");
export class Fleet {
    nbLignes;
    nbColumns;
    nbAliens;
    aliens;
    moveDir = 'right';
    speed;
    x;
    y;
    xMax = -1;
    xMin;
    yMax = -1;
    move = true;
    alienWidth;
    alienHeight;
    get nbLgn() {
        return this.nbLignes;
    }
    set nbLgn(n) {
        this.nbLignes = n;
    }
    get nbCol() {
        return this.nbColumns;
    }
    set nbCol(n) {
        this.nbColumns = n;
    }
    get alns() {
        return this.aliens;
    }
    set alns(alns) {
        this.aliens = alns;
    }
    get spd() {
        return this.speed;
    }
    set spd(s) {
        this.speed = s;
    }
    get xMx() {
        return this.xMax;
    }
    set xMx(x) {
        this.xMax = x;
    }
    get xMn() {
        return this.xMin;
    }
    set xMn(x) {
        this.xMin = x;
    }
    get yMx() {
        return this.yMax;
    }
    set yMx(y) {
        this.yMax = y;
    }
    get mv() {
        return this.move;
    }
    set mv(m) {
        this.move = m;
    }
    constructor(aliens) {
        this.aliens = aliens;
        this.x = 0;
        this.y = 0;
    }
    install() {
        this.nbAliens = this.nbLignes * this.nbColumns;
        for (let i = 0; i < this.nbAliens; i++) {
            this.aliens.push(new Alien(i));
        }
        this.alienHeight = this.aliens[0].hght;
        this.alienWidth = this.aliens[0].wdth;
    }
    draw(ctx) {
        for (const i in this.aliens) {
            this.aliens[i].xPos = this.x;
            this.aliens[i].yPos = this.y;
            this.aliens[i].draw(ctx);
            this.x += this.aliens[i].wdth;
            let index = this.aliens[i].idAlien;
            if ((index + 1) % this.nbColumns === 0) {
                this.x = 0;
                this.y += this.aliens[i].hght;
            }
        }
    }
    getMax() {
        this.xMin = Number.MAX_SAFE_INTEGER;
        this.xMax = -1;
        for (const alien of this.aliens) {
            if (alien.xPos > this.xMax) {
                this.xMax = alien.xPos;
            }
            if (alien.xPos < this.xMin) {
                this.xMin = alien.xPos;
            }
            if (alien.yPos > this.yMax) {
                this.yMax = alien.yPos;
            }
        }
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async move_in(ctx) {
        const image = new Image();
        image.src = "./img/alien.png";
        if (this.moveDir == 'right') {
            this.speed = Math.abs(this.speed);
        }
        else {
            this.speed = -Math.abs(this.speed);
        }
        this.getMax();
        while ((this.moveDir == 'right' && this.xMax < ctx.canvas.width - this.alienWidth) ||
            (this.moveDir == 'left' && this.xMin > 0)) {
            for (const i in this.aliens) {
                ctx?.clearRect(this.aliens[i].xPos, this.aliens[i].yPos, this.aliens[i].wdth, this.aliens[i].hght);
                this.aliens[i].xPos += this.speed;
                this.aliens[i].draw(ctx);
            }
            await this.sleep(100);
            if (this.move == false) {
                break;
            }
            this.getMax();
        }
        if (this.moveDir == 'right') {
            this.moveDir = 'left';
        }
        else {
            this.moveDir = 'right';
        }
        for (const i in this.aliens) {
            ctx?.clearRect(this.aliens[i].xPos, this.aliens[i].yPos, this.aliens[i].wdth, this.aliens[i].hght);
            this.aliens[i].yPos += this.aliens[i].hght / 2;
        }
        if (this.move == true) {
            this.move_in(ctx);
        }
    }
}
