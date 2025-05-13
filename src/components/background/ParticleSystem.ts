import { Particle } from './Particle';

export class ParticleSystem {
  private particles: Particle[];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrame: number;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private pixelRatio: number;

  constructor(canvas: HTMLCanvasElement, particleCount: number = 100) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.particles = [];
    this.animationFrame = 0;
    this.pixelRatio = window.devicePixelRatio || 1;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(canvas));
    }

    // Add mouse interaction
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    // Handle resize
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update canvas size accounting for pixel ratio
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
    
    // Scale the context to counter the pixel ratio
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    
    // Set CSS size
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  private drawConnections() {
    const maxDistance = 150;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.5;
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private mouseInteraction() {
    const mouseRadius = 100;

    this.particles.forEach(particle => {
      const dx = particle.x - this.mouseX;
      const dy = particle.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force * 0.2;
        particle.vy += Math.sin(angle) * force * 0.2;
      }
    });
  }

  start() {
    const animate = () => {
      // Clear with pixel ratio in mind
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.scale(this.pixelRatio, this.pixelRatio); // Reapply transform

      // Update and draw particles
      this.particles.forEach(particle => {
        particle.update(this.canvas);
        particle.draw(this.ctx);
      });

      // Draw connections between nearby particles
      this.drawConnections();

      // Handle mouse interaction
      this.mouseInteraction();

      // Apply velocity damping
      this.particles.forEach(particle => {
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}