// Particle class to manage individual particle properties and behavior
export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;

  constructor(canvas: HTMLCanvasElement) {
    const pixelRatio = window.devicePixelRatio || 1;
    // Use logical (CSS) dimensions for positioning
    const width = canvas.width / pixelRatio;
    const height = canvas.height / pixelRatio;

    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    // Scale radius by pixel ratio for sharper particles
    this.radius = (Math.random() * 2 + 1) * pixelRatio;
    this.color = `rgba(37, 99, 235, ${Math.random() * 0.5 + 0.2})`; // Blue with random opacity
  }

  update(canvas: HTMLCanvasElement) {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = canvas.width / pixelRatio;
    const height = canvas.height / pixelRatio;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}