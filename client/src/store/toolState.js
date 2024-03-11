import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor = color;
  }
  getFillColor() {
    return this.tool.fillColor;
  }
  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }
  setLineWidth(lineWidth) {
    this.tool.lineWidth = lineWidth;
  }
}

export default new ToolState();
