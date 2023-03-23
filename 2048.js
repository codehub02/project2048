const input_i = document.querySelector("#input_i");
const score_d = document.querySelector(".score");
const board_d = document.querySelector("#board");




//intialize the board

let width = 4;
let score = 0;
let square = [];

document.addEventListener("DOMContentLoaded", () => {
    start();
    game_options();
});

function start(){
    score = 0;
    square = Array.from({length: width}, () =>
         Array.from({length: width}, () => 0)
    );
    game();
}

function game(){
    let tiles = "";
    for(let i = 0; i<square.length; i++){
        tiles += `<div class = "row">`;
        for(let j =0; j<square[0].length; j++){
          if( square[i][j] == 0){
            tiles += `<div class="hide col">${square[i][j]}</div> `
          } else {
            tiles += `<div class = "col"> ${square[i][j]} </div>`;
          }
        }
        tiles += `</div>`
    }
    board_d.innerHTML=tiles;
}

function generate_random_number(){
   const num = [2,4];
   return num[Math.floor(Math.random()*num.length)];
}

function place_random(){
  let place = [];
   for(let i = 0; i < square.length; i++){
     for(let j = 0; j < square[i].length; j++){
        if(square[i][j] == 0){
          place.push({i,j});
        }
     }
   }
   return place[Math.floor(Math.random()*place.length)]
}

function define_random_value(){
  const postion = place_random();
  const value = generate_random_number();
  square[postion.i][postion.j] = value;
  game();
}

function game_options(){
  document.addEventListener("keyup", (o) => {
    switch(o.key){
      case "ArrowLeft":
        define_random_value();
        left();
        break;
      case "ArrowRight":
        define_random_value();
        right();
        break;
      case "ArrowDown":
        define_random_value();
        down();
        break;
      case "ArrowUp":
        define_random_value();
        up();
        break;
    }
  });
}

function left(){
  for(let i = 0; i <square.length; i++){
   let slide = [];
    for(let j = 0; j <square[i].length-1; j++){
     
    }
  }
}