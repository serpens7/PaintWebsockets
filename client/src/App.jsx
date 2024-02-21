import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/ToolBar";
import "./styles/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:id"
          element={
            <div className="app">
              <Toolbar />
              <SettingBar />
              <Canvas />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="app">
              <Toolbar />
              <SettingBar />
              <Canvas />
              <Navigate to={`/f${(+new Date()).toString(16)}`} replace />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
