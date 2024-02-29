import "../styles/canvas.scss";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import EmptyCircle from "../tools/EmptyCircle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  useEffect(() => {}, [modal]);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext("2d");
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
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
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 500) {
          axios.post(`http://localhost:5000/image?id=${params.id}`, {
            img: canvasRef.current.toDataURL(),
          });
        }
      });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          }),
        );
      };

      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`пользователь ${msg.username} присоединился`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.color);
        break;
      case "rect":
        Rect.rectDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.stroke,
        );
        break;
      case "circle":
        Circle.circleDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.color,
          figure.stroke,
        );
        break;
      case "emptyCircle":
        EmptyCircle.emptyCircleDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.stroke,
        );
        break;
      case "eraser":
        Eraser.eraserDraw(ctx, figure.x, figure.y, "white");
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  };

  const onMouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, {
        img: canvasRef.current.toDataURL(),
      })
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  const onClose = () => {
    setModal(false);
    console.log("close");
  };

  return (
    <div className="canvas">
      <Modal
        modal={modal}
        onClose={onClose}
        connectionHandler={connectionHandler}
        usernameRef={usernameRef}
      />
      <canvas
        onMouseDown={() => onMouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});
export default Canvas;
