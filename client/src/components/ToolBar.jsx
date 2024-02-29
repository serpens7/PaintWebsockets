import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import EmptyCircle from "../tools/EmptyCircle";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import { useEffect } from "react";
import { set } from "mobx";

const Toolbar = () => {
  useEffect(() => {}, []);
  const download = () => {
    const dataUrl = canvasState.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpeg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const setRect = () => {
    toolState.setTool(
      new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid),
    );
    toolState.setStrokeColor(document.getElementById("strokecolor").value);
  };

  const setCircle = () => {
    toolState.setTool(
      new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid),
    );
    toolState.setStrokeColor(document.getElementById("strokecolor").value);
  };

  const setEmptyCircle = () => {
    toolState.setTool(
      new EmptyCircle(
        canvasState.canvas,
        canvasState.socket,
        canvasState.sessionid,
      ),
    );
    toolState.setStrokeColor(document.getElementById("strokecolor").value);
  };

  const setBrush = () => {
    toolState.setTool(
      new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid),
    );
    toolState.setStrokeColor(document.getElementById("strokecolor").value);
  };
  const setEraser = () => {
    toolState.setTool(
      new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid),
    );
    toolState.setStrokeColor("white");
  };

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={setBrush}></button>
      <button className="toolbar__btn rect" onClick={setRect}></button>
      <button className="toolbar__btn circle" onClick={setCircle}></button>
      <button
        className="toolbar__btn emptyCircle"
        onClick={setEmptyCircle}
      ></button>
      <button className="toolbar__btn eraser" onClick={setEraser}></button>

      <button
        className="toolbar__btn "
        onClick={() =>
          toolState.setTool(
            new Line(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      ></button>

      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      ></button>
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      ></button>

      <button className="toolbar__btn save" onClick={() => download()}></button>
    </div>
  );
};
export default Toolbar;
