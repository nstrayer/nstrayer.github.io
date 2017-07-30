const colors = [
  '#e41a1c',
  '#377eb8',
  '#4daf4a',
  '#984ea3',
  '#ff7f00',
  '#ffff33',
  '#a65628',
  '#f781bf',
];

class Particle {
  constructor({x, y, width, height, pointRadius}) {
    // starting locations
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.dest = {
      x: x,
      y: y,
    };

    this.r = pointRadius + Math.random();
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.03 + 0.94;
    this.color = colors[Math.floor(Math.random() * 6)];
  }

  render({context, width, height, mouse}) {
    this.accX = (this.dest.x - this.x) / 500;
    this.accY = (this.dest.y - this.y) / 500;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r * (width / 1700), Math.PI * 2, false);
    context.fill();

    const a = this.x - mouse.x;
    const b = this.y - mouse.y;
    const distance = Math.sqrt(a * a + b * b);

    // if the point is within 70 radiuses of the mouse, send it flying.
    if (distance < width * 0.1) {
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
    }

    // mouse.x = -9999;
    // mouse.y = -9999;
  }
}

module.exports = Particle;
