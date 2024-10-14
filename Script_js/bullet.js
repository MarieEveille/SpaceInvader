export class Bullet {
    x;
    y;
    radius = 5;
    vaisseau;
    animationFrameId;
    stopped;
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
    get rds() {
        return this.radius;
    }
    set rds(r) {
        this.radius = r;
    }
    get animatnFrmId() {
        return this.animationFrameId;
    }
    set animatnFrmId(id) {
        this.animationFrameId = id;
    }
    get stppd() {
        return this.stopped;
    }
    set stppd(s) {
        this.stopped = s;
    }
    constructor(vaisseau) {
        this.vaisseau = vaisseau;
        this.x = vaisseau.xPos + (vaisseau.wdth / 2);
        this.y = vaisseau.yPos - this.radius;
        this.stopped = false;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
