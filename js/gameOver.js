function gameOver() {

  console.log("game over inside");
  star.kill();
  badStar.kill();
  paddle.kill();
  paddle2.kill();
  ball.kill();
  ball2.kill();
  if (lifes1 > lifes2) {
    winner = 'Player 1 won!';
  } else {
    winner = 'Player 2 won!';
  }

  introText.text = 'Game Over! ' + winner;
  introText.visible = true;
  outroText.visible = true;
}
