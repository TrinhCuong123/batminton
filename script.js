const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const container = document.querySelector('.container');

// Khi bấm Có
box1.addEventListener('click', () => {
  container.innerHTML = `<canvas id="c"></canvas>
  <div id="congrats">🎉 Chúc mừng chị đã chọn đúng rồi đó !!!🎉</div>`;
  startFireworkAnimation();
});

// Khi trỏ chuột vào Không
box2.addEventListener('mouseenter', () => {
  const containerWidth = container.clientWidth - 100;
  const containerHeight = container.clientHeight - 100;

  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);

  box2.style.left = randomX + 'px';
  box2.style.top = randomY + 'px';
});

function startFireworkAnimation() {
  var c = document.getElementById("c");
  var ctx = c.getContext("2d");

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  let particles = [];

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 3 + 2;
      this.angle = Math.random() * 2 * Math.PI;
      this.speed = Math.random() * 5 + 2;
      this.friction = 0.95;
      this.gravity = 0.05;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.01;
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createFirework(x, y) {
    const colors = ["#ff6347", "#ffd700", "#00ff7f", "#1e90ff", "#ff69b4"];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, c.width, c.height);

    particles.forEach((p, i) => {
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        p.update();
        p.draw();
      }
    });

    requestAnimationFrame(animate);
  }

  // Tạo hiệu ứng ngẫu nhiên mỗi 1 giây
  setInterval(() => {
    createFirework(Math.random() * c.width, Math.random() * c.height / 2);
  }, 100);

  animate();
}
