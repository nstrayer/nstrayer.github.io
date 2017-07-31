const colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00'];

class Particle {
  constructor({x, y, pointRadius, xScale, yScale}) {
    // starting locations
    const width = xScale.range()[1];
    const height = yScale.range()[0];
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.data = {
      x: x,
      y: y,
    };

    this.dest = {
      x: xScale(x),
      y: yScale(y),
    };
    // this.r = (pointRadius + Math.random() * 3) * (width / 1700);
    this.r = (pointRadius) * (width / 1700);

    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.03 + 0.94;
    this.color = colors[Math.floor(Math.random() * 6)];
  }

  resize({xScale, yScale}) {
    this.dest = {
      x: xScale(this.data.x),
      y: yScale(this.data.y),
    };
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
    context.arc(this.x, this.y, this.r, Math.PI * 2, false);
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
  }
}

module.exports = Particle;
