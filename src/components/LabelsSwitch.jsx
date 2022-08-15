import React from "react";
import { Switch } from "antd";

const LabelsSwitch = ({ onLabelSwitch }) => (
  <div className="label-toggler">
    <span>Labels</span>
    <Switch
      onChange={onLabelSwitch}
    />
  </div>
);

export default LabelsSwitch;