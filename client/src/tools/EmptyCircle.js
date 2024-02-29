import Circle from "./Circle";

export default class EmptyCircle extends Circle {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "emptyCircle",
          x: this.startX,
          y: this.startY,
          r: this.radius,
          stroke: this.ctx.strokeStyle,
        },
      }),
    );
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
  static emptyCircleDraw(ctx, x, y, r, stroke) {
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
