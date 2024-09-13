// Game Constants & variables

let inputDir={
    x:0,
    y:0
     
};
const foodSound= new Audio('music/food.mp3');
const gameOverSound= new Audio('music/gameover.mp3');
const moveSound= new Audio('music/move.mp3');
const musicSound= new Audio('music/music.mp3');
let speed= 8;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food={x:6,y:7};

// game function
function main(ctime){ //current time
    window.requestAnimationFrame(main);
    // console.log("ctime");
    if((ctime - lastPaintTime)/1000<1/speed){//o.5 sec
    return;
    
}
lastPaintTime=ctime;
gameEngine();

}
function isCollide(snake){
    // if your bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if you numb to wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
}
function gameEngine(){
    // part1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0}
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        // musicSound.play();
        score=0;
    }

    // if you have eaten the food, increament the score and regenerate the food 
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodSound.play();
        score+=1; 
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("HighScore",JSON.stringify(highscoreval));
            HighScoreBox.innerHTML="HighScore: "+HighScore;
            
        }

        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y,})
        let a=2;
        let b=16; 
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    // moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){// i>0 then not add food to the snake
        snakeArr[i+1]={...snakeArr[i]}; //destructuring
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

     





    // part2: display the snake and food
    // display the food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
      let  snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        // snakeElement 15 row pe jayega
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    // display the food
    let  foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




// main logic starts here
musicSound.play();
let HighScore =localStorage.getItem("HighScore");
if(HighScore==null){
    let highscoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(highscoreval));
}else{
highscoreval=JSON.parse(HighScore);
    HighScoreBox.innerHTML="HighScore: "+HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            console.log("Arrowup");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
            default:
                break;

    }
});


// localStora.clear();