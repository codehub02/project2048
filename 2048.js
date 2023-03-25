const input_i = document.querySelector("#input_i");
const score_d = document.querySelector(".score");
const board_d = document.querySelector("#board");
const new_game = document.querySelector(".newgame");
const width_change = document.querySelector("#width");




//intialize the board

let width = 4;
let score = 0;
let square = [];

document.addEventListener("DOMContentLoaded", () => {
  start();
  game_options();
});

function start() {
  score = 0;
  square = Array.from({ length: width }, () =>
    Array.from({ length: width }, () => 0)
  );
  game();
  define_random_value();
  define_random_value();
}

function game() {
  let tiles = "";
  for (let i = 0; i < square.length; i++) {
    tiles += `<div class = "row">`;
    for (let j = 0; j < square[0].length; j++) {
      let box = square[i][j];
      if (box === 0) {
        tiles += `<div class="hide col">${box}</div> `
      } else {
        let getColor = color_picker(box);
        tiles += `<div style="background-color: ${getColor}" class = "col"> ${box} </div>`;
      }
    }
    tiles += `</div>`
  }
  board_d.innerHTML = tiles;
  score_d.innerHTML = score;
}

function generate_random_number() {
  const num = [2, 4];
  return num[Math.floor(Math.random() * num.length)];
}

function place_random() {
  let place = [];
  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square[i].length; j++) {
      if (square[i][j] == 0) {
        place.push({ i, j });
      }
    }
  }
  return place[Math.floor(Math.random() * place.length)]
}

function define_random_value() {
  const postion = place_random();
  const value = generate_random_number();
  if (typeof postion == "undefined") {
    game_over();
  } else {
    square[postion.i][postion.j] = value;
    game();
  }
}

function game_options() {
  width_change.addEventListener("change", (e) => {
    width = e.target.value;
    start();
  })
  new_game.addEventListener("click", () => {
    start();
  })

  document.addEventListener("keyup", (o) => {
    switch (o.key) {
      case "ArrowLeft":
        left();
        define_random_value();
        break;
      case "ArrowRight":
        right();
        define_random_value();
        break;
      case "ArrowDown":
        down();
        define_random_value();
        break;
      case "ArrowUp":
        up();
        define_random_value();
        break;
    }
  });
}

function left() {
  for (let i = 0; i < square.length; i++) {
    let slide = [];
    let k = 1;
    let length = square[0].length;
    for (let j = 0; j < square[i].length - 1; j++) {
      let current = square[i][j];
      let next = square[i][j + k]
      while (next === 0) {
        k++;
        next = square[i][j + k]
      }
      if (current === next) {
        let value = 2 * current;
        slide.push(value);
        score += value;
        square[i][j + k] = 0;
        square[i][j] = 0;
      } else if (current !== 0) {
        slide.push(current);
        square[i][j] = 0;
      }
    }
    for (let j = 0; j < square[0].length; j++) {
      if (square[i][j] !== 0) {
        slide.push(square[i][j]);
      }
    }
    let slideLength = slide.length;
    let difference = length - slideLength;
    for (let j = 0; j < difference; j++) {
      slide.push(0);
    }
    if (slide.some((e) => e != 0)) {
      square[i] = slide;
    }
  }
}

function right() {
  for (let i = 0; i < square.length; i++) {
    let slide = [];
    let k = 1;
    let length = square[0].length;
    for (let j = square[i].length - 1; j >= 0; j--) {
      let current = square[i][j];
      let previous = square[i][j - k]
      while (previous === 0) {
        k++;
        previous = square[i][j - k]
      }
      if (current === previous) {
        let value = 2 * current;
        slide.push(value);
        score += value;
        square[i][j - k] = 0;
        square[i][j] = 0;
      } else if (current !== 0) {
        slide.push(current);
        square[i][j] = 0;
      }
    }
    for (let j = square[i].length - 1; j >= 0; j--) {
      if (square[i][j] !== 0) {
        slide.push(square[i][j]);
      }
    }
    let slideLength = slide.length;
    let difference = length - slideLength;
    while (difference != 0) {
      slide.push(0);
      difference--;
    }
    if (slide.some((e) => e != 0)) {
      square[i] = slide.reverse();
    }
  }
}

function up() {
  for (let i = 0; i < square.length; i++) {
    let slide = [];
    let length = square[0].length;
    for (let j = 0; j < square[i].length - 1; j++) {
      let k = 1;
      let current = square[j][i];
      let under = square[j + k][i]
      while (under === 0 && j + k < square[0].length) {
        under = square[j + k][i]
        k++;
      }
      if (j + k === square[0].length) {
        k--;
      }
      if (current === under) {
        let value = 2 * current;
        slide.push(value);
        score += value;
        square[j + k][i] = 0;
        square[j][i] = 0;
      } else if (current !== 0) {
        slide.push(current);
        square[j][i] = 0;
      }
    }
    for (let j = 0; j < square[0].length; j++) {
      if (square[i][j] !== 0) {
        slide.push(square[j][i]);
      }
    }
    let slideLength = slide.length;
    let difference = length - slideLength;
    for (let j = 0; j < difference; j++) {
      slide.push(0);
    }
    if (slide.some((e) => e != 0)) {
      for (let j = 0; j < square[0].length; j++) {
        square[j][i] = slide[j];
      }
    }
  }
}

function down() {
  for (let i = 0; i < square.length; i++) {
    let slide = [];
    let length = square[0].length;
    for (let j = square[i].length - 1; j > 0; j--) {
      let k = 1;
      let current = square[j][i];
      let above = square[j - k][i]
      while (above === 0 && j - k >= 0) {
        above = square[j - k][i];
        k++;
      }
      if (j - k < 0) {
        k--;
      }
      if (current === above && current != 0) {
        let value = 2 * current;
        slide.push(value);
        score += value;
        square[j - k][i] = 0;
        square[j][i] = 0;
      } else if (current !== 0) {
        slide.push(current);
        square[j][i] = 0;
      }
    }
    for (let j = square[i].length - 1; j >= 0; j--) {
      if (square[j][i] !== 0) {
        slide.push(square[j][i]);
      }
    }
    let slideLength = slide.length;
    let difference = length - slideLength;
    while (difference != 0) {
      slide.push(0);
      difference--;
    }
    slide.reverse();
    if (slide.some((e) => e != 0)) {
      for (let j = square[0].length - 1; j >= 0; j--) {
        square[j][i] = slide[j];
      }
    }
  }
}

function color_picker(val) {
  let old_max = Math.max(...square.flat());
  let old_min = 2;
  let new_min = 0;
  let new_max = 255;
  let old_value = val;
  let new_value = ((old_value - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;

  let color = Math.floor(new_value);

  return `hsl(${color}, 50%, 50%)`;
}

function game_over() {
  alert("Game Over");
  start();
}


