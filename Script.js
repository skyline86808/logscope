const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.opacity = 1;
  this.draw = function () {
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x, this.y - this.size, this.x - this.size, this.y - this.size, this.x - this.size, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size, this.x, this.y + this.size * 1.5, this.x, this.y + this.size * 2);
    ctx.bezierCurveTo(this.x, this.y + this.size * 1.5, this.x + this.size, this.y + this.size, this.x + this.size, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size, this.x, this.y - this.size, this.x, this.y);
    ctx.fillStyle = "rgba(255,0,100,0.8)";
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  this.update = function () {
    this.y -= this.speed;
    this.opacity -= 0.01;
  };
}

function createHearts() {
  let x = Math.random() * canvas.width;
  let y = canvas.height + 10;
  let size = Math.random() * 10 + 10;
  let speed = Math.random() * 1 + 0.5;
  hearts.push(new Heart(x, y, size, speed));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createHearts();
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].draw();
    if (hearts[i].opacity <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
