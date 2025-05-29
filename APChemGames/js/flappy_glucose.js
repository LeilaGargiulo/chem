document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');

  var glucose = { x: 50, y: 300, width: 30, height: 30, velocity: 0 };
  var gravity = 0.5;
  var jumpStrength = -10;
  var obstacles = [];
  var obstacleWidth = 50;
  var gapHeight = 150;
  var frameCount = 0;
  var gameOver = false;

  function resetGame() {
    glucose = { x: 50, y: 300, width: 30, height: 30, velocity: 0 };
    obstacles = [];
    frameCount = 0;
    gameOver = false;
  }

  function drawGlucose() {
    ctx.fillStyle = '#ffeb3b'; // Bright yellow representing glucose
    ctx.fillRect(glucose.x, glucose.y, glucose.width, glucose.height);
  }

  function drawObstacles() {
    ctx.fillStyle = '#4caf50'; // Green for flowers
    obstacles.forEach(function(obs) {
      // Top obstacle
      ctx.fillRect(obs.x, 0, obstacleWidth, obs.top);
      // Bottom obstacle
      ctx.fillRect(obs.x, canvas.height - obs.bottom, obstacleWidth, obs.bottom);
    });
  }

  function updateObstacles() {
    // Add a new obstacle every 100 frames
    if (frameCount % 100 === 0) {
      var topHeight = Math.random() * (canvas.height - gapHeight - 100) + 50;
      var bottomHeight = canvas.height - gapHeight - topHeight;
      obstacles.push({ x: canvas.width, top: topHeight, bottom: bottomHeight });
    }
    obstacles.forEach(function(obs) {
      obs.x -= 2;
    });
    obstacles = obstacles.filter(obs => obs.x + obstacleWidth > 0);
  }

  function checkCollision() {
    // Check collision with the boundaries
    if (glucose.y < 0 || glucose.y + glucose.height > canvas.height) {
      return true;
    }
    // Check collision with obstacles
    for (var obs of obstacles) {
      if (glucose.x < obs.x + obstacleWidth && glucose.x + glucose.width > obs.x) {
        if (glucose.y < obs.top || glucose.y + glucose.height > canvas.height - obs.bottom) {
          return true;
        }
      }
    }
    return false;
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    glucose.velocity += gravity;
    glucose.y += glucose.velocity;
    updateObstacles();
    drawGlucose();
    drawObstacles();
    if (checkCollision()) {
      gameOver = true;
      ctx.fillStyle = '#000';
      ctx.font = '30px Arial';
      ctx.fillText('Game Over', canvas.width/2 - 70, canvas.height/2);
      return;
    }
    frameCount++;
    requestAnimationFrame(gameLoop);
  }

  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      glucose.velocity = jumpStrength;
    }
  });
  canvas.addEventListener('click', function() {
    glucose.velocity = jumpStrength;
  });

  resetGame();
  gameLoop();
});
