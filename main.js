let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mpos;


let player;
var count = 0;
let foods = [];
var keyPress = {
    f: false
}

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
    "#F8B197",
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

function generateItem(){
    let x = Math.random()* canvas.width;
    let y = Math.random()* canvas.height;
    let color = 'yellow'
    let name = " ";
    let food = new Food(x, y, 15, color, name);

    foods.push(food);
}

function init() {

    mpos = new Vector(canvas.width/2, canvas.height/2);

    var inputName = prompt("What is your name? (c:change color, b: size x1.5, e: draw, play till 400!)");

    let color = randomColor();

    let stroke = strokeColors[colors.indexOf(color)];
    player = new Player(canvas.width/2, canvas.height/2, 25, color, stroke, inputName, 10);

    for(var i =0; i< FOOD_COUNT; i++){
        generateFood();
    }
    for(var i = 0; i <15; i++){
        generateItem();
    }
    update();
}

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);


    player.update(mpos);


    for(var i=0; i< foods.length; i++){
        let eaten = player.intersects(foods[i]);
        if(!eaten){
            foods[i].draw(c);
        } else {
        // foods[i].x = Math.random()* canvas.width;
        // foods[i].y = Math.random()* canvas.height;
            player.addMass(foods[i].mass);
            count ++;
            foods.splice(i, 1);
            i--;
        }
    }



    while(foods.length < FOOD_COUNT + 15){
        generateFood();
    }

    player.draw(c);

    if(keyPress.e){
        let feedItem = new Food (player.x, player.y, 10, player.color, " ");
        let feedSpeed = 100;

        if(feedSpeed>0){
            feedItem.x += feedSpeed;
            feedItem.y += feedSpeed;
            feedSpeed -= 10;
            foods.push(feedItem);
        }else{
            foods.push(feedItem);
        }
    }

    if(keyPress.c){
        player.color = randomColor();
    }

    if(keyPress.b){
        player.radius *= 1.5;
    }

    c.lineWidth = 15;
    c.font = "30px Arial";
    c.fillStyle = "black";
    c.fillText("count: "+ count, 100, 50);

    if(count == 400){
        alert("Wow, impressive. Quite precise, I see.");
        c.location.reload();
    }
    if(count > 400){
        alert("You went beyond 400!Bye.");
        c.location.reload();
    }


    requestAnimationFrame(update);
}

window.addEventListener('load', function() {
    init();

    window.addEventListener('mousemove', function(event){
        mpos.x = event.clientX - canvas.offsetLeft;
        mpos.y = event.clientY - canvas.offsetTop;
        mpos.print();

    });

    window.addEventListener('keydown', function(event){
        if(event.key === 'e'){
            keyPress.e = true;
        }

        if(event.key === 'c'){
            keyPress.c = true;
        }
        if(event.key === 'b'){
            keyPress.b = true;
        }
    });

    window.addEventListener('keyup', function(event){
        if(event.key === 'e'){
            keyPress.e = false;
        }

        if(event.key === 'c'){
            keyPress.c = false;
        }
        if(event.key === 'b'){
            keyPress.b = false;
        }
    })
});
