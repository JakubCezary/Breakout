var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

//preload all the elements of the game
function preload() {

  game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
  game.load.image('universe', 'assets/universe.png');
  game.load.image('background1', 'assets/background1.png');
  game.load.image('background2', 'assets/background2.png');
  game.load.image('background3', 'assets/background3.png');
  game.load.image('background4', 'assets/background4.png');
  game.load.image('background5', 'assets/background5.png');
  game.load.image('background6', 'assets/background6.png');
  game.load.image('background7', 'assets/background7.png');
  game.load.image('background8', 'assets/background8.png');
  game.load.image('background9', 'assets/background9.png');
  game.load.image('background10', 'assets/background10.png');

  game.load.image('ground', 'assets/platform.png');
  game.load.image('ceiling', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('badStar', 'assets/badStar.png');
  game.load.image('paddle2', 'assets/paddle2.png', 32, 48);
  game.load.image('paddle', 'assets/paddle.png', 300, 18);
  game.load.image('paddle3', 'assets/paddle3.png', 32, 48);
  game.load.image('paddle4', 'assets/paddle4.png', 300, 18);

  //Sound/Music by Setuniman at www.freesound.org/people/setuniman/
  game.load.audio('backgroundSong', ['assets/audio/backgroundSong.wav']);
  game.load.audio('starSound', ['assets/audio/SoundEffects/starSound.mp3']);
  game.load.audio('pointSound', ['assets/audio/SoundEffects/point.wav']);
}

//balls
var ball;
var ball2;
var ballOnPaddle = true;
var ball2OnPaddle = true;
var ball2Exist = false;

//coordinates to create the ball by player 1 and 2
var ballByPlayer1xPosition;
var ballByPlayer1yPosition;

//at will coordinates the ball should be created, by player 1 or 2
var ballXPosition;
var ballYPosition;
var ballByPlayer2xPosition;
var ballByPlayer2yPosition;
var ball2XPosition;
var ball2YPosition;

//variable for a player who touched the ball as the last one
var ball1player;
var ball2player;

//by which player should the ball appear after loosing point
var ball1AppearsByPlayer;
var ball2AppearsByPlayer;

//paddles
var paddle;
var paddleLength;
var paddleVelocityLeft = -300;
var paddleVelocityRight = 300;
var paddle2;
var paddle2VelocityLeft = -300;
var paddle2VelocityRight = 300;
var paddle2Length;

// var paddle3;
// var paddle4;

// the borders (up and down)
var ground;
var ceiling;

// lifes
var lifes1 = 10;
var lifesText1;
var lifes2 = 10;
var lifesText2;

//subtitles
var introText;
var outroText;
var winner;

//control
var cursor1;
var cursor2;
/*var cursor3;
var cursor4; */

//superpower
var star;
var starExist = false;
var badStar;
var badStarExist = false;
var starCollected = false;
var star2Collected = false;
var badStarCollected = false;
var badStar2Collected = false;
var randomPostionHeight;
var randomPostionWidth;
//game.input.gamepad.start();

//sounds
var backgroundSong;
var starSound;

function create() {


  backgroundSong = game.add.audio('backgroundSong');
  starSound = game.add.audio('starSound');
  pointSound = game.add.audio('pointSound');

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.input.onDown.add(gofull, this);
  backgroundSong.play();
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //background of the game

  var worldNumber = Math.floor((Math.random() * 10) + 1);

  if (worldNumber == 1) {
    game.add.sprite(0, 0, 'background1');
  } else if (worldNumber == 2) {
    game.add.sprite(0, 0, 'background2');
  } else if (worldNumber == 3) {
    game.add.sprite(0, 0, 'background3');
  } else if (worldNumber == 4) {
    game.add.sprite(0, 0, 'background4');
  } else if (worldNumber == 5) {
    game.add.sprite(0, 0, 'background5');
  } else if (worldNumber == 6) {
    game.add.sprite(0, 0, 'background6');
  } else if (worldNumber == 7) {
    game.add.sprite(0, 0, 'background7');
  } else if (worldNumber == 8) {
    game.add.sprite(0, 0, 'background8');
  } else if (worldNumber == 9) {
    game.add.sprite(0, 0, 'background9');
  } else if (worldNumber == 10) {
    game.add.sprite(0, 0, 'background10');
  }

  // ground border
  ground = game.add.sprite(0, game.world.height - 1, 'ground');

  game.physics.enable(ground, Phaser.Physics.ARCADE);

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  // ceiling border
  ceiling = game.add.sprite(0, game.world.height - 663, 'ceiling');

  game.physics.enable(ceiling, Phaser.Physics.ARCADE);

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ceiling.scale.setTo(2, 2);

  //  This stops it from falling away when you jump on it
  ceiling.body.immovable = true;

  //creating paddles
  //paddle 1, graphik and control
  paddle = game.add.sprite(350, game.world.height - 10, 'paddle');
  paddle.anchor.setTo(0.5, 0.5);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.collideWorldBounds = true;
  paddle.body.bounce.set(1);
  paddle.body.immovable = true;
  cursor1 = game.input.keyboard.createCursorKeys();

  //paddle 2
  paddle2 = game.add.sprite(350, game.world.height - 590, 'paddle2');
  paddle2.anchor.setTo(0.5, 0.5);
  game.physics.enable(paddle2, Phaser.Physics.ARCADE);
  paddle2.body.collideWorldBounds = true;
  paddle2.body.bounce.set(1);
  paddle2.body.immovable = true;

  //paddle 3
  /*
  paddle3 = game.add.sprite(350, game.world.height - 20, 'paddle');
      paddle3.anchor.setTo(0.5, 0.5);
      game.physics.enable(paddle3, Phaser.Physics.ARCADE);
      paddle3.body.collideWorldBounds = true;
      paddle3.body.bounce.set(1);
      paddle3.body.immovable = true;
      */
  //paddle 4
  /*
      paddle4 = game.add.sprite(350, game.world.height - 20, 'paddle');
      paddle4.anchor.setTo(0.5, 0.5);
      game.physics.enable(paddle4, Phaser.Physics.ARCADE);
      paddle4.body.collideWorldBounds = true;
      paddle4.body.bounce.set(1);
      paddle4.body.immovable = true;
      */

  //ball
  ballByPlayer1xPosition = game.world.centerX;
  ballByPlayer1yPosition = paddle.y - 16;
  ball = game.add.sprite(ballByPlayer1xPosition, ballByPlayer1yPosition, 'breakout', 'ball_1.png');
  ball.anchor.set(0.5);
  ball.checkWorldBounds = true;
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png',
  'ball_5.png'], 50, true, false);

  // Subtitles for Player lifes
  lifesText1 = game.add.text(680, 550, 'HP: 10', {
    font: "30px Arial",
    fill: "#black",
    align: "left"
  });
  lifesText2 = game.add.text(680, 30, 'HP: 10', {
    font: "30px Arial",
    fill: "#black",
    align: "left"
  });

  introText = game.add.text(game.world.centerX, 400, '- click to open fullscreen -', {
    font: "40px Arial",
    fill: "#ffffff",
    align: "center"
  });
  introText.anchor.setTo(0.5, 0.5);
  outroText = game.add.text(game.world.centerX, 500, '- Press F5 to play again!  -', {
    font: "40px Arial",
    fill: "#ffffff",
    align: "center"
  });
  outroText.anchor.setTo(0.5, 0.5);
  outroText.visible = false;

  //keys for release the ball
  releaseBallKey1 = game.input.keyboard.addKey(Phaser.Keyboard.P);
  releaseBallKey1.onDown.add(releaseBall, this);

  //releaseBallKey2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
  releaseBallKey2 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  cursor2 = game.input.keyboard.createCursorKeys();

  //cursor2 key settings...
  upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
  downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
  leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
  rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function gofull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
}

function update() {
  //check if ball 2 already exist and can be released
  if (ball2Exist == true) {
    releaseBallKey2.onDown.add(releaseBall2, this);
  }

  //if button one pressed move paddle left or right with speed it should move right now (normal / slow / fast)
  if (cursor1.left.isDown) {
    //  Move to the left
    paddle.body.velocity.x = paddleVelocityLeft;
  } else if (cursor1.right.isDown) {
    //  Move to the right
    paddle.body.velocity.x = paddleVelocityRight;
  }

  // either the ball starts on paddle or will collide with the paddle
  if (ballOnPaddle) {
    //player 1 starts with the ball
    ball.body.x = paddle.x;
  } else {
    //collisions ball - paddle, ball ground, ball ceiling
    game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
    game.physics.arcade.collide(ball, ground, ballHitGround, null, this);
    game.physics.arcade.collide(ball, ceiling, ballHitCeiling, null, this);

    //if star exists make collision ball - star
    if (starExist == true) {
      game.physics.arcade.collide(ball, star, ballHitStar, null, this);
    }

    if (badStarExist == true) {
      game.physics.arcade.collide(ball, badStar, ballHitBadStar, null, this);
    }
  }

  if (ball2Exist == true) {
    if (ball2OnPaddle) {

      //player 2 starts with the ball 2
      ball2.body.x = paddle2.x;
    } else {

      //if ball and paddle meet, make ballHitPaddle
      game.physics.arcade.collide(ball2, paddle, ball2HitPaddle, null, this);
      game.physics.arcade.collide(ball2, ground, ball2HitGround, null, this);
      game.physics.arcade.collide(ball2, ceiling, ball2HitCeiling, null, this);
    }

    if (starExist == true) {
      game.physics.arcade.collide(ball2, star, ball2HitStar, null, this);
    }

    if (badStarExist == true) {
      game.physics.arcade.collide(ball2, badStar, ball2HitBadStar, null, this);
    }
  }

  //player 2 control
  if (leftButton.isDown) {
    //Move to the left
    paddle2.body.velocity.x = paddle2VelocityLeft;
    //player2.animations.play('left');
  } else if (rightButton.isDown) {
    //Move to the right
    paddle2.body.velocity.x = paddle2VelocityRight;
    //player2.animations.play('right');
  }

  // check this if needed
  if (ballOnPaddle) {
  } else {
    game.physics.arcade.collide(ball, paddle2, ballHitPaddle, null, this);
  }

  if (ball2Exist == true) {
    if (ball2OnPaddle) {
    } else {
      game.physics.arcade.collide(ball2, paddle2, ball2HitPaddle, null, this);
    }
  }
}

//activate second ball after some time
setTimeout(activateSecondBall, 3000);
function activateSecondBall() {
  ball2Exist = true;
  ballByPlayer2xPosition = game.world.centerX;
  ballByPlayer2yPosition = paddle2.y + 16;

  if (ball2AppearsByPlayer = 2) {
    ball2XPosition = ballByPlayer2xPosition;
    ball2YPosition = ballByPlayer2yPosition;

  } else if (ball2AppearsByPlayer = 1) {
    ball2XPosition = ballByPlayer1xPosition;
    ball2YPosition = ballByPlayer1yPosition;
  }

  ball2 = game.add.sprite(ball2XPosition, ball2YPosition, 'breakout', 'ball_1.png');
  ball2.anchor.set(0.5);
  ball2.checkWorldBounds = true;
  game.physics.enable(ball2, Phaser.Physics.ARCADE);
  ball2.body.collideWorldBounds = true;
  ball2.body.bounce.set(1);
  ball2.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png',
  'ball_4.png', 'ball_5.png'], 50, true, false);
}

//activate the star with power up, when the star appears again
setTimeout(setPowerTimer, 5000);

function setPowerTimer() {

  //generate random position of the superpower, level of the game is 800x600,
  // but we need a little bit margines
  randomPostionWidth = Math.floor(Math.random() * 600) + 100;
  randomPostionHeight = Math.floor(Math.random() * 400) + 100;
  star = game.add.sprite(randomPostionWidth, randomPostionHeight, 'star', 'star.png');
  game.physics.enable(star, Phaser.Physics.ARCADE);
  star.enableBody = true;
  star.physicsBodyType = Phaser.Physics.ARCADE;
  star.anchor.set(0.5);
  starExist = true;
  starCollected = false;
}

//activate the star with bad power up
setTimeout(setBadPowerTimer, 3000);

function setBadPowerTimer() {
  randomPostionWidth = Math.floor(Math.random() * 600) + 100;
  randomPostionHeight = Math.floor(Math.random() * 400) + 100;
  badStar = game.add.sprite(randomPostionWidth, randomPostionHeight, 'badStar', 'badStar.png');
  game.physics.enable(badStar, Phaser.Physics.ARCADE);
  badStar.enableBody = true;
  badStar.physicsBodyType = Phaser.Physics.ARCADE;
  badStar.anchor.set(0.5);
  badStarExist = true;
  badStarCollected = false;
}

function releaseBall() {
  if (ball.y > game.world.height - 500) {
    ball1player = 1;
    console.log("paddle 1 released the ball");
  } else if (ball.y < game.world.height - 100) {
    ball1player = 2;
    console.log("paddle 2 released the ball");
  }

  if (ballOnPaddle) {
    ballOnPaddle = false;
    ball.body.velocity.y = -300;
    ball.body.velocity.x = -75;
    ball.animations.play('spin');
    introText.visible = false;
  }
}

function releaseBall2() {
  if (ball2.y > game.world.height - 500) {
    ball2player = 1;
    console.log("paddle 1 released the ball");
  } else if (ball2.y < game.world.height - 100) {
    ball2player = 2;
    console.log("paddle 2 released the ball");
  }

  if (ball2OnPaddle) {
    ball2OnPaddle = false;
    ball2.body.velocity.y = -300;
    ball2.body.velocity.x = -75;
    ball2.animations.play('spin');
    introText.visible = false;
  }
}

function ballHitPaddle(_ball, _paddle) {
  //function to recognize which paddle touched the ball recently

  if (_ball.y > game.world.height - 500) {
    ball1player = 1;
    console.log("ball hit paddle 1");
  } else if (_ball.y < game.world.height - 100) {
    ball1player = 2;
    console.log("ball hit paddle 2");
  }

  var diff = 0;
  if (_ball.x < _paddle.x) {
    //  Ball is on the left-hand side of the paddle
    diff = _paddle.x - _ball.x;
    _ball.body.velocity.x = (-5 * diff);
  } else if (_ball.x > _paddle.x) {
    //  Ball is on the right-hand side of the paddle
    diff = _ball.x - _paddle.x;
    _ball.body.velocity.x = (5 * diff);
  } else {
    //  Ball is perfectly in the middle
    //  Add a little random X to stop it bouncing straight up!
    _ball.body.velocity.x = 2 + Math.random() * 8;
  }
}

function ball2HitPaddle(_ball2, _paddle) {

  if (_ball2.y > game.world.height - 500) {
    ball2player = 1;
    console.log("ball 2 hit paddle 1");
  } else if (_ball2.y < game.world.height - 100) {
    ball2player = 2;
    console.log("ball 2 hit paddle 2");
  }

  var diff = 0;
  if (_ball2.x < _paddle.x) {
    //  Ball is on the left-hand side of the paddle
    diff = _paddle.x - _ball2.x;
    _ball2.body.velocity.x = (-10 * diff);
  } else if (_ball2.x > _paddle.x) {
    //  Ball is on the right-hand side of the paddle
    diff = _ball2.x - _paddle.x;
    _ball2.body.velocity.x = (10 * diff);
  } else {
    //  Ball is perfectly in the middle
    //  Add a little random X to stop it bouncing straight up!
    _ball2.body.velocity.x = 2 + Math.random() * 8;
  }
}

function ballHitGround(_ball, _ground) {
  console.log(_ball);
  console.log(_ground);
  console.log(star);
  console.log(badStar);
  console.log("beginning");
  pointSound.play();
  lifes1--;
  lifesText1.text = 'HP: ' + lifes1;
  if (lifes1 === 0) {
    gameOver();
  } else {
    ballOnPaddle = true;
    ball.reset(paddle.body.x + 16, paddle.y - 16);
    ball.animations.stop();
    ball1AppearsByPlayer = 1;
  }
}

function ball2HitGround(_ball2, _ground) {
  console.log("beginning");
  pointSound.play();
  lifes1--;
  lifesText1.text = 'HP: ' + lifes1;

  if (lifes1 === 0) {
    gameOver();
  } else {
    ball2OnPaddle = true;
    ball2.reset(paddle2.body.x - 16, paddle2.y + 16);
    ball2.animations.stop();
    ball2AppearsByPlayer = 1;
  }
}

function ballHitCeiling(_ball, _ceiling) {
  pointSound.play();
  lifes2--;
  lifesText2.text = 'HP: ' + lifes2;

  if (lifes2 === 0) {
    gameOver();
  } else {
    ballOnPaddle = true;
    ball.reset(paddle.body.x + 16, paddle.y - 16);
    ball.animations.stop();
    ball1AppearsByPlayer = 2;
  }
}

function ball2HitCeiling(_ball2, _ceiling) {
  pointSound.play();
  lifes2--;
  lifesText2.text = 'HP: ' + lifes2;

  if (lifes2 === 0) {
    gameOver();
  } else {
    ball2OnPaddle = true;
    ball2.reset(paddle2.body.x - 16, paddle2.y + 16);
    ball2.animations.stop();
    ball2AppearsByPlayer = 2;
  }
}

function ballHitStar(_ball, _star) {
  var starPlayer = ball1player;
  _star.kill();
  ball.x = paddle.body.x + 16;
  ball.y = paddle.body.y - 16;

  var starRandom = Math.floor((Math.random() * 3) + 1);

  if (ball1player == 1) {
    lifes1++;
  } else if (ball1player == 2) {
    lifes2++;
  }

  if (starRandom == 1) {
    if (ball1player == 1) {
      paddleVelocityLeft = -600;
      paddleVelocityRight = 600;
    } else {
      paddle2VelocityLeft = -600;
      paddle2VelocityRight = 600;
    }
  } else if (starRandom == 2) {

    if (ball1player == 1) {
      paddle2VelocityLeft = 300;
      paddle2VelocityRight = -300;
      starPlayer = 2;
    } else {
      paddleVelocityLeft = 300;
      paddleVelocityRight = -300;
      starPlayer = 1;
    }
  } else if (starRandom == 3) {

    if (ball1player == 1) {
      paddle2VelocityLeft = -150;
      paddle2VelocityRight = 150;
      starPlayer = 2;
    } else {
      paddleVelocityLeft = -150;
      paddleVelocityRight = 150;
      starPlayer = 1;
    }
  }

  ball.body.velocity.set(0);
  starSound.play();
  starCollected = true;
  setTimeout(setNewPowerTimer, 5000);

  function setNewPowerTimer() {
    console.log("end of the power");

    if (starPlayer == 1) {
      paddleVelocityLeft = -300;
      paddleVelocityRight = 300;
    } else if (starPlayer == 2) {
      paddle2VelocityLeft = -300;
      paddle2VelocityRight = 300;
    }

    //generate random position of the superpower, level of the game is 800x600,
    //but we need a little bit margines
    randomPostionWidth = Math.floor(Math.random() * 600) + 100;
    randomPostionHeight = Math.floor(Math.random() * 400) + 100;
    star = game.add.sprite(randomPostionWidth, randomPostionHeight, 'star', 'star.png');
    game.physics.enable(star, Phaser.Physics.ARCADE);
    star.enableBody = true;
    star.physicsBodyType = Phaser.Physics.ARCADE;
    //star.body.bounce.set(1);
    star.anchor.set(0.5);
    // star.body.immovable = true;
    starExist = true;
    //    console.log("star created");
    starCollected = false;
  }
}

function ballHitBadStar(_ball, _badStar) {

  var badStarPlayer = ball1player;
  _badStar.kill();
  //if I change this life -1? whyyyy
  ball.x = paddle.x + 16;
  ball.y = paddle.y - 16;
  //ball.animations.stop();

  if (ball1player == 1) {
    lifes1++;
  } else if (ball1player == 2) {
    lifes2++;
  }

  if (ball1player == 1) {
    paddleVelocityLeft = -150;
    paddleVelocityRight = 150;
  } else {
    paddle2VelocityLeft = -150;
    paddle2VelocityRight = 150;
  }

  ball.body.velocity.set(0);
  starSound.play();
  badStarCollected = true;
  setTimeout(setBadPowerTimer2, 3000);

  function setBadPowerTimer2() {

    if (badStarPlayer == 1) {
      paddleVelocityLeft = -300;
      paddleVelocityRight = 300;
    } else if (badStarPlayer == 2) {
      paddle2VelocityLeft = -300;
      paddle2VelocityRight = 300;
    }


    randomPostionWidth = Math.floor(Math.random() * 600) + 100;
    randomPostionHeight = Math.floor(Math.random() * 400) + 100;
    badStar = game.add.sprite(randomPostionWidth, randomPostionHeight, 'badStar', 'badStar.png');
    game.physics.enable(badStar, Phaser.Physics.ARCADE);
    badStar.enableBody = true;
    badStar.physicsBodyType = Phaser.Physics.ARCADE;
    badStar.anchor.set(0.5);
    badStarExist = true;
    badStarCollected = false;
  }
}

function ball2HitStar(_ball2, _star) {

  var starPlayer = ball2player;
  _star.kill();
  ball2.x = paddle.body.x + 16;
  ball2.y = paddle.body.y - 16;
  console.log("ball2 hitted the star");
  var starRandom = Math.floor((Math.random() * 3) + 1);

  if (ball2player == 1) {
    lifes1++;
  } else if (ball2player == 2) {
    lifes2++;
    lifes1++;
  }

  if (starRandom == 1) {
    if (ball2player == 1) {
      paddleVelocityLeft = -600;
      paddleVelocityRight = 600;
    } else {
      paddle2VelocityLeft = -600;
      paddle2VelocityRight = 600;
    }
  } else if (starRandom == 2) {

    if (ball2player == 1) {
      paddle2VelocityLeft = 300;
      paddle2VelocityRight = -300;
      starPlayer = 2;
    } else {
      paddleVelocityLeft = 300;
      paddleVelocityRight = -300;
      starPlayer = 1;
    }
  } else if (starRandom == 3) {

    if (ball2player == 1) {
      paddle2VelocityLeft = -150;
      paddle2VelocityRight = 150;
      starPlayer = 2;
    } else {
      paddleVelocityLeft = -150;
      paddleVelocityRight = 150;
      starPlayer = 1;
    }
  }

  ball.body.velocity.set(0);
  starSound.play();
  setTimeout(setNewPowerTimer, 5000);

  function setNewPowerTimer() {

    if (starPlayer == 1) {
      paddleVelocityLeft = -300;
      paddleVelocityRight = 300;
    } else if (starPlayer == 2) {
      paddle2VelocityLeft = -300;
      paddle2VelocityRight = 300;
    }

    //generate random position of the superpower, level of the game is 800x600,
    //but we need a little bit margines
    randomPostionWidth = Math.floor(Math.random() * 600) + 100;
    randomPostionHeight = Math.floor(Math.random() * 400) + 100;
    star = game.add.sprite(randomPostionWidth, randomPostionHeight, 'star', 'star.png');
    game.physics.enable(star, Phaser.Physics.ARCADE);
    star.enableBody = true;
    star.physicsBodyType = Phaser.Physics.ARCADE;
    star.anchor.set(0.5);
    starExist = true;
  }
}

function ball2HitBadStar(_ball2, _badStar) {

  var badStarPlayer = ball2player;
  _badStar.kill();
  //if I change this life -1? whyyyy
  ball2.x = paddle.x + 16;
  ball2.y = paddle.y - 16;
  //        ball.animations.stop();

  if (ball2player == 1) {
    lifes1++;
    console.log("player 1 life up");
  } else if (ball2player == 2) {
    lifes2++;
    lifes1++;
    console.log("player 2 and 1life up");
  }

  if (ball2player == 1) {
    paddleVelocityLeft = -150;
    paddleVelocityRight = 150;
  } else {
    paddle2VelocityLeft = -150;
    paddle2VelocityRight = 150;
  }

  ball2.body.velocity.set(0);
  //havingBadPowerTimer();
  starSound.play();
  setTimeout(setBadPowerTimer2, 3000);

  function setBadPowerTimer2() {

    if (badStarPlayer == 1) {
      paddleVelocityLeft = -300;
      paddleVelocityRight = 300;
    } else if (badStarPlayer == 2) {
      paddle2VelocityLeft = -300;
      paddle2VelocityRight = 300;
    }

    randomPostionWidth = Math.floor(Math.random() * 600) + 100;
    randomPostionHeight = Math.floor(Math.random() * 400) + 100;
    badStar = game.add.sprite(randomPostionWidth, randomPostionHeight, 'badStar', 'badStar.png');
    game.physics.enable(badStar, Phaser.Physics.ARCADE);
    badStar.enableBody = true;
    badStar.physicsBodyType = Phaser.Physics.ARCADE;
    //star.body.bounce.set(1);
    badStar.anchor.set(0.5);
    // star.body.immovable = true;
    badStarExist = true;
    //    console.log("star created");
  }
}
