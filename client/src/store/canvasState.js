import { makeAutoObservable } from "mobx";

class CanvasState {
  socket = null;
  canvas = null;
  sessionId = null;
  undoList = [];
  redoList = [];
  username = "";

  constructor() {
    makeAutoObservable(this);
  }
  setSessionId(id) {
    this.session.id = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setUsername(username) {
    this.username = username;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }
  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    console.log("1");
    let ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      console.log("2");
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        console.log("3");
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  redo() {
    let ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
