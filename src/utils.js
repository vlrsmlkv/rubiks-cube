export const create3DArray = (n) => {
  return Array(n).fill().map(() => Array(n).fill().map(() => (Array(n).fill().map(() => null))));
};

export const getCenteredPosition = (position, length) => position - (length - 1) / 2;

export const getRadianAngle = degree => degree / 360 * 2 * Math.PI;

export const getFaceCoordinates = (axis, axisLevel) => {
  const result = [];
  
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (axis === "x") {
        result.push({x: axisLevel, y: i, z: j})
      } else if (axis === "y") {
        result.push({x: i, y: axisLevel, z: j})
      } else if (axis === "z") {
        result.push({x: i, y: j, z: axisLevel})
      } else {
        return;
      };
    };
  };

  return result;
};

export const getMoveCoordinates = (initialCoordinatesArray, axis, isReversedMoveCoordinates) => {
  
  const moveCoordinates = initialCoordinatesArray.map(el => {
    if (axis === "x") {
      return {
        x: el.x,
        y: el.z,
        z: (el.y === 0) ? 2 : (el.y === 2) ? 0 : 1,
      }
    } else if (axis === "y") {
      return {
        x: el.z,
        y: el.y,
        z: (el.x === 0) ? 2 : (el.x === 2) ? 0 : 1,
      }
    } else if (axis === "z") {
      return {
        x: el.y,
        y: (el.x === 0) ? 2 : (el.x === 2) ? 0 : 1,
        z: el.z,
      }
    }
  })

  if (isReversedMoveCoordinates) {
    return moveCoordinates;
  } else {
    return moveCoordinates.reverse();
  };
};

export const transform3DArray = (array3D, elementsToMove, moveCoordinates) => {
  const transformed3DArray = array3D
    .map(face => face
      .map(row => row
        .map(cube => cube)
      )
    );

  for (let i = 0; i < elementsToMove.length; i++) {
    transformed3DArray[moveCoordinates[i].z][moveCoordinates[i].y][moveCoordinates[i].x] = array3D[elementsToMove[i].z][elementsToMove[i].y][elementsToMove[i].x]
  };

  return transformed3DArray;
};

export const getCurrentAngle = (cubesRef, axis, axisLevel) => {
  return cubesRef.current[axis === "z" ? axisLevel : 0][axis === "y" ? axisLevel : 0][axis === "x" ? axisLevel : 0].ref.rotation[axis]
};

export const isReversedMoveCoordinates = (axis, isClockwise) => (axis === "y") ? !isClockwise : isClockwise;