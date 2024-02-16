import Circle from './Circle';

export default class EmptyCircle extends Circle {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.stroke();
    }.bind(this);
  }
}
