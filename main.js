let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pos = new Vector(60, 60);
let vel = new Vector(1,1);

function init() {
    pos.print();


    update();
}

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    pos.addVector(vel);

    c.beginPath();
    c.arc(pos.x, pos.y, 50, 0, Math.PI*2, false);
    c.closePath();
    c.stroke();


    requestAnimationFrame(update);
}

window.addEventListener('load', function(event) {
    init();
});
