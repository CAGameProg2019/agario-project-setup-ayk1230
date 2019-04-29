class Player extends Food{

    constructor(x, y, radius, color, stroke, name, maxSpeed) {
        super(x, y, radius, color);
        this.stroke = stroke;
        this.name = name;
        this.maxSpeed = maxSpeed;
    }

    update(mouse){
        var vel = new Vector (mouse.x, mouse.y);
        vel.subVector(this);

        let dist = vel.magnitude();
        if(dist > 0){
            vel.toDirVec();

            vel.scale(this.maxSpeed);
            if(dist < this.radius){
                vel.scale(dist/this.radius);
            }

            this.addVector(vel);
        }

    }


    draw(c){
        c.lineWidth = this.radius * .075;
        c.strokeStyle = this.stroke;
        super.draw(c);
        c.stroke();
        c.fillStyle = "#ffffff";
        c.textAlign = "center";
        c.textBaseline = "middle";
        let fontSize = Math.round(this.radius *.33);
        c.lineWidth = Math.round(fontSize/7.5);
        c.font = fontSize + "px Monospace";
        c.strokeStyle = "#000000";
        c.strokeText(this.name, this.x, this.y);
        c.fillText(this.name, this.x, this.y);
    }

}
Object.assign(Player, Food);
