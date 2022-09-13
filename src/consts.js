import { getRadianAngle, create3DArray, getCenteredPosition } from "./utils";

export const moveUnit = 0.12;

export const rotationAngleUnit = getRadianAngle(90);

const color = {
  RED: "#ff3333",
  ORANGE: "#ff7e29",
  YELLOW: "#f5f53d",
  WHITE: "#ffffff",
  BLUE: "#1a75ff",
  GREEN: "#4dd54d",
};

const buttonNames = {
  left: "L",
  right: "R",
  up: "U", 
  down: "D", 
  front: "F", 
  back: "B",
  middle: "M",
  side: "S",
  equator: "E",
};

export const colors = [color.ORANGE, color.RED, color.GREEN, color.BLUE, color.WHITE, color.YELLOW];

export const rotationButtonsProps = {
  [buttonNames.left]: {
    axis: "x",
    axisLevel: 0
  },

  [buttonNames.right]: {
    axis: "x",
    axisLevel: 2
  },

  [buttonNames.up]: {
    axis: "y",
    axisLevel: 2
  },

  [buttonNames.down]: {
    axis: "y",
    axisLevel: 0
  },

  [buttonNames.front]: {
    axis: "z",
    axisLevel: 2
  },

  [buttonNames.back]: {
    axis: "z",
    axisLevel: 0
  },

  [buttonNames.middle] : { 
    axis: "x", 
    axisLevel: 1
  },

  [buttonNames.side] : {
    axis: "z", 
    axisLevel: 1
  },

  [buttonNames.equator] : {
    axis: "y", 
    axisLevel: 1
  },
};

export const buttonsDegree = {
  [buttonNames.left]: 90,
  [buttonNames.right]: -90,
  [buttonNames.up]: -90,
  [buttonNames.down]: 90,
  [buttonNames.front]: -90,
  [buttonNames.back]: 90,
  [buttonNames.middle]: 90,
  [buttonNames.side]: -90,
  [buttonNames.equator]: 90,
};

export const cubesPositions = create3DArray(3)
  .map((face, z, zArray) =>
    face.map((row, y, yArray) =>
      row.map((cube, x, xArray) => (
        {
          position: [
            getCenteredPosition(x, xArray.length),
            getCenteredPosition(y, yArray.length), 
            getCenteredPosition(z, zArray.length)
          ]
        }
      ))
    )
  );

export const appLayout = {
  xs:{
    span: 22,
    offset: 1,
  },
  sm:{
    span: 20,
    offset: 2,
  },
  md:{
    span: 20,
    offset: 2,
  },
  lg:{
    span: 18,
    offset: 3,
  },
  xl:{
    span: 14,
    offset: 5,
  },
  xxl:{
    span: 10,
    offset: 7,
  },
};