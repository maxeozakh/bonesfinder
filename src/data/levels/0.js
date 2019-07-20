export default {
  stablePathsMatrix: [
    [
      { id: 0, value: 0, defaultFloor: 0, defaultField: 0, stable: false },
      { id: 0, value: 0, defaultFloor: 0, defaultField: 1, stable: false },
      { id: 1, value: 1, defaultFloor: 0, defaultField: 2, stable: true },
    ],
    [
      { id: 0, value: 0, defaultFloor: 1, defaultField: 0, stable: false },
      { id: 0, value: 0, defaultFloor: 1, defaultField: 1, stable: false },
      { id: 1, value: 1, defaultFloor: 1, defaultField: 2, stable: true },
    ],
    [
      { id: 1, value: 1, defaultFloor: 2, defaultField: 0, stable: true },
      { id: 1, value: 1, defaultFloor: 2, defaultField: 1, stable: true },
      { id: 1, value: 1, defaultFloor: 2, defaultField: 2, stable: true },
    ],
    
  ],
  unstablePathsMatrix: [
    [
      { id: 0, value: 0, dynamic: false },
      { id: 0, value: 0, dynamic: false },
      { id: 0, value: 0, dynamic: false },
    ],
    [
      { id: 2, value: 1, dynamic: true },
      { id: 2, value: 1, dynamic: true },
      { id: 2, value: 1, dynamic: true },
    ],
    [
      { id: 0, value: 0, dynamic: false },
      { id: 0, value: 0, dynamic: false },
      { id: 0, value: 0, dynamic: false },
    ],
  ],
  winPositionMatrix: [
    [
      { id: 0, value: 0 },
      { id: 0, value: 0 },
      { id: 0, value: 0 },
    ],
    [
      { id: 0, value: 0 },
      { id: 0, value: 0 },
      { id: 0, value: 0 },
    ],
    [
      { id: 9, value: 1 },
      { id: 0, value: 0 },
      { id: 0, value: 0 },
    ],
    
  ],
  startPosition: [0, 2]
};
