import toolState from "../store/toolState";
import "../styles/toolbar.scss";

const SettingsBar = () => {
  return (
    <div className="settings-bar" style={{ top: 40 }}>
      <label style={{ marginLeft: 10 }} htmlFor="line-width">
        F-size:
      </label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ marginLeft: 5 }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={500}
      />
      <label style={{ marginLeft: 10 }} htmlFor="line-width">
        Stroke color:
      </label>
      <input
        type="color"
        id="strokecolor"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        style={{ marginLeft: 5 }}
      />
      <label style={{ marginLeft: 10 }} htmlFor="line-width">
        Fill color:
      </label>

      <input
        id="fillcolor"
        type="color"
        style={{ marginLeft: 5 }}
        onChange={(e) => toolState.setFillColor(e.target.value)}
      />
    </div>
  );
};
export default SettingsBar;
