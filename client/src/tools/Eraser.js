import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  static eraserDraw(ctx, x, y, lineWidth) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
