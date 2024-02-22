import "../styles/canvas.scss";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";
import axios from "axios";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);

  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext("2d");
    axios
      .get(`http://localhost:3001/image?id=${params.id}`)
      .then((response) => {
        const img = new Image();
        img.src = response.data;
        img.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          ctx.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
        };
      });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:3001/");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      console.log("front ПОДКЛЮЧЕНИЕ");
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
  }, [canvasState.username]);

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
      <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Input name</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">123</span>
              </button>
            </div>
            <div className="modal-body">
              <input type="text" ref={usernameRef} />
            </div>
            <div className="modal-footer">
              <button
                onClick={() => connectionHandler()}
                type="button"
                className="btn btn-primary"
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
