let canvas = document.getElementById("canvas") as HTMLCanvasElement;

export class Alien {
    private id : number;
    private width : number = 80;
    private height : number = 80;
    private x? : number;
    private y? : number;

    constructor(id : number) {
        this.id = id;
    }

    get idAlien() {
        return this.id;
    }

    set idAlien(id : number) {
        this.id = id;
    }

    get wdth() {
        return this.width;
    }

    set wdth(w : number) {
        this.width = w;
    }

    get hght() {
        return this.height;
    }

    set hght(h : number) {
        this.height = h;
    }

    get xPos() {
        return this.x!;
    }
    set xPos(x : number) {
        this.x = x;
    }

    get yPos() {
        return this.y!;
    }

    set yPos(y : number) {
        this.y = y;
    }


    draw(ctx : CanvasRenderingContext2D) {

        const image = new Image();
        image.src = "./img/alien2.png";

        image.onload = () => {
            if (ctx) {
                ctx.drawImage(image, this.x!, this.y!, this.width, this.height); 
            }
        };
    }
}

