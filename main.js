let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let foods = [];

let colors = [
    "#F8B195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D"
];

function randomColor(){
    let index = Math.floor(Math.random()*colors.length);
    return colors[index];
}
function init() {

    for(var i =0; i<100; i++){
        let x = Math.random()* canvas.width;
        let y = Math.random()* canvas.height;
        let color = randomColor();
        let food = new Food(x, y, 15, color);
        foods.push(food);
    }

    update();
}

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<100; i++){
    foods[i].draw(c);
    }


    requestAnimationFrame(update);
}

window.addEventListener('load', function(event) {
    init();
});
