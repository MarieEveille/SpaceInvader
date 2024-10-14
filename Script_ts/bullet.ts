import { Vaisseau } from "./vaisseau.js";

export class Bullet {
    private x : number;
    private y : number;
    private radius : number = 5;
    private animationFrameId? : number;
    private stopped : boolean;

    get xPos() {
        return this.x;
    }

    set xPos(x : number) {
        this.x = x;
    }

    get yPos() {
        return this.y;
    }

    set yPos(y : number) {
        this.y = y;
    }

    get rds() {
        return this.radius;
    }

    set rds(r : number) {
        this.radius = r;
    }

    get animatnFrmId () {
        return this.animationFrameId!;
    }

    set animatnFrmId (id : number) {
        this.animationFrameId = id;
    }

    get stppd() {
        return this.stopped;
    }

    set stppd(s : boolean) {
        this.stopped = s;
    }




    constructor(vaisseau : Vaisseau) {
        this.x = vaisseau.xPos + (vaisseau.wdth / 2);
        this.y = vaisseau.yPos - this.radius;
        this.stopped = false;
    }

    draw(ctx : CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    
}