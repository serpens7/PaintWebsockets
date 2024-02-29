import Tool from "./Tool";

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }
  lineArray = [];
  drawMode = true;

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.drawMode = true;
  }

  mouseDownHandler(e) {
    this.currentX = e.pageX - e.target.offsetLeft;
    this.currentY = e.pageY - e.target.offsetTop;
    this.ctx.moveTo(this.currentX, this.currentY);
    if (this.drawMode) {
      this.saved = this.canvas.toDataURL();
    }
  }
  mouseMoveHandler(e) {
    if (this.drawMode) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }.bind(this);
  }
}
