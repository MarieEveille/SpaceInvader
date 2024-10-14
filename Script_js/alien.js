let canvas = document.getElementById("canvas");
export class Alien {
    id;
    width = 80;
    height = 80;
    x;
    y;
    constructor(id) {
        this.id = id;
    }
    get idAlien() {
        return this.id;
    }
    set idAlien(id) {
        this.id = id;
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
    draw(ctx) {
        const image = new Image();
        image.src = "./img/alien2.png";
        image.onload = () => {
            if (ctx) {
                ctx.drawImage(image, this.x, this.y, this.width, this.height);
            }
        };
    }
}
