import "../styles/canvas.scss";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);

  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(
        new Brush(canvasRef.current, socket, params.id, socket, params.id),
      );
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          }),
        );
      };
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} is connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, []);

  const drawHandler = () => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx.beginPath();
        break;
      case "rect":
        Brush.rectDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
        );
        break;
    }
  };

  const onMouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        show={modal}
        onHide={() => {}}
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Input name</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" ref={usernameRef} />
            </div>
            <div class="modal-footer">
              <button
                onClick={() => connectionHandler()}
                type="button"
                class="btn btn-primary"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
      <canvas
        onMouseDown={() => onMouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />{" "}
    </div>
  );
});
export default Canvas;
