let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mpos;

let player;
let foods = [];

const FOOD_COUNT = 100;

let colors = [
    "#F8B195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#647c72",
    "#faf2f4",
    "#cce1e9"

];

let strokeColors = [
    "#F8B195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#647c72",
    "#faf2f4",
    "#cce1e9"
]

function randomColor(){
    let index = Math.floor(Math.random()*colors.length);
    return colors[index];
}

function generateFood(){
    let x = Math.random()* canvas.width;
    let y = Math.random()* canvas.height;
    let color = randomColor();
    let name = " ";
    let food = new Food(x, y, 10, color, name);

    foods.push(food);
}
function init() {

    mpos = new Vector(canvas.width/2, canvas.height/2);

    var inputName = prompt("What is your name?");

    let color = randomColor();
    let stroke = strokeColors[colors.indexOf(color)];
    player = new Player(canvas.width/2, canvas.height/2, 25, color, stroke, inputName);

    for(var i =0; i< FOOD_COUNT; i++){
        generateFood();
    }

    update();
}

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i< foods.length; i++){
        let eaten = player.intersects(foods[i]);
        if(!eaten){
            foods[i].draw(c);
        } else {
        // foods[i].x = Math.random()* canvas.width;
        // foods[i].y = Math.random()* canvas.height;
            player.addMass(foods[i].mass);
            foods.splice(i, 1);
            i--;
        }
    }

    while(foods.length < FOOD_COUNT){
        generateFood();
    }

    player.x = mpos.x;
    player.y = mpos.y;
    player.draw(c);

    requestAnimationFrame(update);
}

window.addEventListener('load', function() {
    init();

    window.addEventListener('mousemove', function(event){
        mpos.x = event.clientX - canvas.offsetLeft;
        mpos.y = event.clientY - canvas.offsetTop;
        mpos.print();

    });
});
