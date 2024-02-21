import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import EmptyCircle from "../tools/EmptyCircle";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

const Toolbar = () => {
  const changeColor = (e) => {
    toolState.setFillColor(e.target.value);
  };

  const download = () => {
    const dataUrl = canvasState.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionId + ".jpeg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild();
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn emptyCircle"
        onClick={() => toolState.setTool(new EmptyCircle(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      ></button>

      <button
        className="toolbar__btn "
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></button>

      <input
        type="color"
        style={{ marginLeft: 10 }}
        onChange={(e) => changeColor(e)}
      />

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
