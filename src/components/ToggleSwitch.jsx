import React, { useContext } from "react";
import "../blocks/toggleswitch.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle__switch">
      <input
        type="checkbox"
        className="toggle__switch-checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle__switch-slider">
        <span className="toggle__switch-option toggle__switch-option--f">
          F
        </span>
        <span className="toggle__switch-option toggle__switch-option--c">
          C
        </span>
        <span className="toggle__switch-dot" />
      </span>
    </label>
  );
}

export default ToggleSwitch;
