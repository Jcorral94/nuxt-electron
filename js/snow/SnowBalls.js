export class SnowBalls {
  constructor(snowballs) {
    this.snowballs = snowballs;
  }

  show(timestamp) {
    for (let i = 0; i < this.snowballs.length; i++) {
      this.snowballs[i].show();
      this.snowballs[i].update(timestamp);
    }
  }
}