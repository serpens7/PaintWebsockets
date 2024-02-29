import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/ToolBar";
import "./styles/app.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:id"
          element={
            <div className="app">
              <Toolbar />
              <SettingsBar />
              <Canvas />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="app">
              <Toolbar />
              <SettingsBar />
              <Canvas />
              {/*<Navigate to={`/f${(+new Date()).toString(16)}`} replace />*/}
              <Navigate to={"f18de3fd47ba"} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
