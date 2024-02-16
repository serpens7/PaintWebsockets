import Tool from './Tool';

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }
  lineArray = [];
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    if (this.startX) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
      );
    }
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(
        this.startX - e.target.offsetLeft,
        this.startY - e.target.offsetTop
      );
    }
  }
  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    this.ctx.beginPath();
    this.ctx.lineTo(x, y);
    this.ctx.fill();
    this.ctx.stroke();
  }
}
