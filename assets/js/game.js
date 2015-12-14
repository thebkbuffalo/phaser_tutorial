var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;



  var Game = {

    preload : function() {
      // Here we load all the needed resources for the level.
      // In our case, that's just two squares - one for the snake body and one for the apple.
      game.load.image('snake', './assets/images/snake.png');
      game.load.image('apple', './assets/images/apple.png');
    },

    create : function() {
      // By setting up global variables in the create function, we initialise them on game start.
      // We need them to be globally available so that the update function can alter them.
      snake = [];                     // This will work as a stack, containing the parts of our snake
      apple = {};                     // An object for the apple;
      squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
      score = 0;                      // Game score.
      speed = 0;                      // Game speed.
      updateDelay = 0;                // A variable for control over update rates.
      direction = 'right';            // The direction of our snake.
      new_direction = null;           // A buffer to store the new direction into.
      addNew = false;                 // A variable used when an apple has been eaten.

      // Set up a Phaser controller for keyboard input.
      cursors = game.input.keyboard.createCursorKeys();

      game.stage.backgroundColor = '#061f27';

      // Generate the initial snake stack. Our snake will be 10 elements long.
      // Beginning at X=150 Y=150 and increasing the X on every iteration.
      for(var i = 0; i < 10; i++){
        snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
      }

      // Genereate the first apple.
      this.generateApple();

      // Add Text to top of game.
      textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
      textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

      // Score.
      game.add.text(30, 20, "SCORE", textStyle_Key);
      scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
      // Speed.
      game.add.text(500, 20, "SPEED", textStyle_Key);
      speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);

  },

  update: function() {
    // The update function is called constantly at a high rate (somewhere around 60fps),
    // updating the game field every time.
    // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.

    if (cursors.right.isDown && direction!='left')
    {
      new_direction = 'right';
    }
    else if (cursors.left.isDown && direction!='right')
    {
      new_direction = 'left';
    }
    else if (cursors.up.isDown && direction!='down')
    {
      new_direction = 'up';
    }
    else if (cursors.down.isDown && direction!='up')
    {
      new_direction = 'down';
    }

    // A formula to calculate game speed based on the score.
    // The higher the score, the higher the game speed, with a maximum of 10;
    speed = Math.min(10, Math.floor(score/5));
    // Update speed value on game screen.
    speedTextValue.text = '' + speed;

    // Do game stuff only if the counter is aliquot to (10 - the game speed).
    // The higher the speed, the more frequently this is fulfilled,
    // making the snake move faster.
    if (updateDelay % (10 - speed) == 0) {
      // Snake movement

      var firstCell = snake[snake.length - 1],
          lastCell = snake.shift(),
          oldLastCellx = lastCell.x,
          oldLastCelly = lastCell.y;

      if (new_direction){
        direction = new_direction;
        new_direction = null;
      }

      // Change the last cell's coordinates relative to the head of the snake, according to the direction.

      if(direction == 'right'){
        lastCell.x = firstCell.x + 15;
        lastCell.y = firstCell.y;
      }
      else if(direction == 'left'){
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      }
      else if(direction == 'up'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 15;
      }
      else if(direction == 'down'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      // Place the last cell in the front of the stack.
      // Mark it the first cell.
      snake.push(lastCell);
      firstCell = lastCell;
    }

  },

  generateApple: function(){

    // Chose a random place on the grid.
    // X is between 0 and 585 (39*15)
    // Y is between 0 and 435 (29*15)

    var randomX = Math.floor(Math.random() * 40 ) * squareSize,
        randomY = Math.floor(Math.random() * 30 ) * squareSize;

    // Add a new apple.
    apple = game.add.sprite(randomX, randomY, 'apple');
  }

}; // end's game state
