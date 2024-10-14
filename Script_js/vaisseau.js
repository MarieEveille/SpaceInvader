import { Bullet } from "./bullet.js";
let canvas = document.getElementById("canvas");
let ctx = canvas?.getContext("2d");
export class Vaisseau {
    nbMunition = 5;
    munition = [];
    x;
    y;
    width = 80;
    height = 80;
    speed;
    get Mun() {
        return this.munition;
    }
    set Mun(mun) {
        this.munition = mun;
    }
    get xPos() {
        return this.x;
    }
    set xPos(x) {
        this.x = x;
    }
    get yPos() {
        return this.y;
    }
    set yPos(y) {
        this.y = y;
    }
    get wdth() {
        return this.width;
    }
    set wdth(w) {
        this.width = w;
    }
    get hght() {
        return this.height;
    }
    set hght(h) {
        this.height = h;
    }
    get spd() {
        return this.speed;
    }
    set spd(s) {
        this.speed = s;
    }
    constructor() {
        this.x = (canvas.width / 2) - (this.width / 2);
        this.y = canvas.height - (this.height + 10);
    }
    draw(ctx) {
        const image = new Image();
        image.src = "./img/vaisseau2.png";
        image.onload = () => {
            if (ctx) {
                ctx.drawImage(image, this.x, this.y, this.width, this.height);
            }
        };
    }
    erase(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    moveBullet(ctx, bullet) {
        if (!bullet.stppd) {
            ctx.clearRect(bullet.xPos - bullet.rds, bullet.yPos - bullet.rds, bullet.rds * 2, bullet.rds * 2);
            bullet.yPos -= 5;
            if (bullet.yPos < 0) {
                this.Mun.shift();
            }
            else {
                bullet.draw(ctx);
                bullet.animatnFrmId = requestAnimationFrame(() => {
                    this.moveBullet(ctx, bullet);
                });
            }
        }
    }
    stopMove(bullet) {
        if (bullet.animatnFrmId) {
            cancelAnimationFrame(bullet.animatnFrmId);
        }
        bullet.stppd = true;
    }
    fire() {
        if (this.munition.length < this.nbMunition) {
            this.munition.push(new Bullet(this));
            this.munition[this.munition.length - 1].draw(ctx);
            this.moveBullet(ctx, this.munition[this.munition.length - 1]);
        }
    }
    moveLeft() {
        if (this.x > 0) {
            ctx?.clearRect(this.x, this.y, this.width, this.height);
            this.x -= this.speed;
            this.draw(ctx);
        }
    }
    moveRight() {
        if (this.x < canvas.width - this.width) {
            ctx?.clearRect(this.x, this.y, this.width, this.height);
            this.x += this.speed;
            this.draw(ctx);
        }
    }
}
