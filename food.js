class Food extends Vector{

    constructor(x, y, radius, color) {
        super(x,y);
        this.radius = radius;
        this.color = color;
    }

    draw(c){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.closePath();
        c.fill();
    }

}
Object.assign(Food, Vector);
