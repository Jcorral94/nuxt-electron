export class SnowBall {
  constructor(ctx, x, y, size, canvas) {
    // TODO: use mass to dictate speed / velocity;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.canvas = canvas;
    this.velocity = Math.random() * 0.025;
    this.speed = 0;
    this.mass = this.size * 0.5;
    this.swayAmplitude = Math.random() * 0.2 + 0.2;
    this.swayFrequency = Math.random() * 0.005;
    // this.alpha = 1;
    this.color = `rgba(255,255,255,${this.alpha})`;
  }

  show() {
    let alpha = 1;
    // TODO: Update layers create a utility function to create x number of layers
    for (let i = 1; i <= 10; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size * i, 0, 2 * Math.PI);
      this.ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      alpha -= 0.1;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
  update(timestamp) {
    this.speed += this.velocity;
    this.y += this.speed;
    if (this.y > this.canvas.height) {
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 0.025;
      this.swayAmplitude = Math.random() * 0.2 + 0.2;
      this.swayFrequency = Math.random() * 0.005;
      // this.color = `rgba(255, 0, 0, ${this.alpha})`;
    }

    if (this.x > this.canvas.width) {
      this.x = 0;
    } else if (this.x <= 0) {
      this.x = this.canvas.width;
    }
    const swayOffset = Math.sin(timestamp * this.swayFrequency) * this.swayAmplitude;

    if (Math.random() * 10 <= 2) {
      this.x += swayOffset;
    } else {
      this.x -= swayOffset;
    }

  }
}