/* eslint-disable no-loop-func */
import React, { Component, Fragment } from 'react';
import Square from './Square/';
// import MovingArea from './MovingArea';
import getLevel from './Levels';

const defaultLevelConfig = {
  playerPositionMatrix: [],
  playerPositionCoordinates: [],
  pathsMatrix: [],
  gameMatrix: [],
  prevPlayerPosition: undefined,
  spaceBetweenFields: 40,
  winPosition: {},
  defaultGameMatrix: [],
  blockSize: 0,
  newRotateMatrix: [],
  isFinished: false,
  playerPositionFields: [],
  gTrigger: false,
  angle: 0,
  absoluteMatrix: []
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultLevelConfig,
      ...getLevel(props.currentStep)
    };

    this.rotateMatrix = this.rotateMatrix.bind(this);
    this.resetLevel = this.resetLevel.bind(this);
    this.getPlayerPositionMatrix = this.getPlayerPositionMatrix.bind(this);
    this.setPlayerPositionMatrix = this.setPlayerPositionMatrix.bind(this);
    this.setPrevPlayerPosition = this.setPrevPlayerPosition.bind(this);
    this.generateGameMatrix = this.generateGameMatrix.bind(this);
    this.setGameMatrix = this.setGameMatrix.bind(this);
    this.checkMove = this.checkMove.bind(this);
    this.getPlayerPosition = this.getPlayerPosition.bind(this);
    this.setPathsMatrix = this.setPathsMatrix.bind(this);
    this.setFinish = this.setFinish.bind(this);
    this.getUnitCoordinates = this.getUnitCoordinates.bind(this);
    this.setPlayerPositionFields = this.setPlayerPositionFields.bind(this);
    this.setAngle = this.setAngle.bind(this);
    this.generateLevel = this.generateLevel.bind(this);
    this.setCalcPlayerPositionCoordinates = this.setCalcPlayerPositionCoordinates.bind(
      this
    );
    this.setPlayerPositionCoordinates = this.setPlayerPositionCoordinates.bind(
      this
    );
  }

  getPlayerPosition = () => {
    let matrix = this.state.playerPositionMatrix;
    let floors = matrix.map(array => {
      return array.findIndex(el => el.value === 1);
    });
    let floor = floors.findIndex(element => element !== -1);
    let field = floors.find(element => element !== -1);

    return { floor, field };
    // todo
  };

  getWinPosition = matrix => {
    let floors = matrix.map(array => {
      return array.findIndex(el => el.id === 9);
    });
    let floor = floors.findIndex(element => element !== -1);
    let field = floors.find(element => element !== -1);

    return { floor, field };
    // todo
  };

  checkMove = (direction, gameMatrix, pathsMatrix) => {
    let { floor, field } = this.getPlayerPosition(),
      areaLength = gameMatrix.length;

    // 0, 3, 6, 9 = top, right, bottom, left
    if (this.state.prevPlayerPosition.value) {
      switch (direction) {
        case 0:
          if (
            floor !== 0 &&
            gameMatrix[floor - 1][field].value > 0 &&
            (pathsMatrix[floor - 1][field].id ===
              pathsMatrix[floor][field].id ||
              pathsMatrix[floor - 1][field].prevPathId ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor - 1][field].id ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor - 1][field].prevPathId ===
                pathsMatrix[floor][field].id)
          ) {
            return true;
          } else {
            return false;
          }
        case 3:
          if (
            field !== areaLength - 1 &&
            gameMatrix[floor][field + 1].value > 0 &&
            (pathsMatrix[floor][field + 1].id ===
              pathsMatrix[floor][field].id ||
              pathsMatrix[floor][field + 1].prevPathId ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor][field + 1].id ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor][field + 1].prevPathId ===
                pathsMatrix[floor][field].id)
          ) {
            return true;
          } else {
            return false;
          }
        case 6:
          if (
            floor !== areaLength - 1 &&
            gameMatrix[floor + 1][field].value > 0 &&
            (pathsMatrix[floor + 1][field].id ===
              pathsMatrix[floor][field].id ||
              pathsMatrix[floor + 1][field].prevPathId ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor + 1][field].id ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor + 1][field].prevPathId ===
                pathsMatrix[floor][field].id)
          ) {
            return true;
          } else {
            return false;
          }
        case 9:
          if (
            field !== 0 &&
            gameMatrix[floor][field - 1].value > 0 &&
            (pathsMatrix[floor][field - 1].id ===
              pathsMatrix[floor][field].id ||
              pathsMatrix[floor][field - 1].prevPathId ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor][field - 1].id ===
                pathsMatrix[floor][field].prevPathId ||
              pathsMatrix[floor][field - 1].prevPathId ===
                pathsMatrix[floor][field].id)
          ) {
            return true;
          } else {
            return false;
          }

        default:
          return false;
      }
    } else {
    }
  };

  checkMoveForMatrix = (val, direction, gameMatrix, pathsMatrix) => {
    let { floor, field } = val,
      areaLength = gameMatrix.length;

    try {
      if (val.value !== 0) {
        switch (direction) {
          case 0:
            if (
              floor !== 0 &&
              gameMatrix[floor - 1][field].value > 0 &&
              (pathsMatrix[floor - 1][field].id ===
                pathsMatrix[floor][field].id ||
                pathsMatrix[floor - 1][field].prevPathId ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor - 1][field].id ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor - 1][field].prevPathId ===
                  pathsMatrix[floor][field].id)
            ) {
              let type = '';
              if (
                pathsMatrix[floor - 1][field].dynamic &&
                pathsMatrix[floor][field].dynamic
              ) {
                type += 'dynamic';
              }

              if (
                pathsMatrix[floor - 1][field].stable &&
                pathsMatrix[floor][field].stable
              ) {
                if (type === 'dynamic') {
                  if (
                    pathsMatrix[floor - 1][field].prevPathId ===
                    pathsMatrix[floor][field].prevPathId
                  ) {
                    type += 'stable';
                  }
                } else type += 'stable';
              }

              return type;
            } else {
              return false;
            }
          case 3:
            if (
              field !== areaLength - 1 &&
              gameMatrix[floor][field + 1].value > 0 &&
              (pathsMatrix[floor][field + 1].id ===
                pathsMatrix[floor][field].id ||
                pathsMatrix[floor][field + 1].prevPathId ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor][field + 1].id ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor][field + 1].prevPathId ===
                  pathsMatrix[floor][field].id)
            ) {
              let type = '';
              if (
                pathsMatrix[floor][field + 1].dynamic &&
                pathsMatrix[floor][field].dynamic
              ) {
                type += 'dynamic';
              }

              if (
                pathsMatrix[floor][field + 1].stable &&
                pathsMatrix[floor][field].stable
              ) {
                if (type === 'dynamic') {
                  if (
                    pathsMatrix[floor][field + 1].prevPathId ===
                    pathsMatrix[floor][field].prevPathId
                  ) {
                    type += 'stable';
                  }
                } else type += 'stable';
              }

              return type;
            } else {
              return false;
            }
          case 6:
            if (
              floor !== areaLength - 1 &&
              gameMatrix[floor + 1][field].value > 0 &&
              (pathsMatrix[floor + 1][field].id ===
                pathsMatrix[floor][field].id ||
                pathsMatrix[floor + 1][field].prevPathId ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor + 1][field].id ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor + 1][field].prevPathId ===
                  pathsMatrix[floor][field].id)
            ) {
              let type = '';
              if (
                pathsMatrix[floor + 1][field].dynamic &&
                pathsMatrix[floor][field].dynamic
              ) {
                type += 'dynamic';
              }

              if (
                pathsMatrix[floor + 1][field].stable &&
                pathsMatrix[floor][field].stable
              ) {
                if (type === 'dynamic') {
                  if (
                    pathsMatrix[floor + 1][field].prevPathId ===
                    pathsMatrix[floor][field].prevPathId
                  ) {
                    type += 'stable';
                  }
                } else type += 'stable';
              }

              return type;
            } else {
              return false;
            }
          case 9:
            if (
              field !== 0 &&
              gameMatrix[floor][field - 1].value > 0 &&
              (pathsMatrix[floor][field - 1].id ===
                pathsMatrix[floor][field].id ||
                pathsMatrix[floor][field - 1].prevPathId ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor][field - 1].id ===
                  pathsMatrix[floor][field].prevPathId ||
                pathsMatrix[floor][field - 1].prevPathId ===
                  pathsMatrix[floor][field].id)
            ) {
              let type = '';
              if (
                pathsMatrix[floor][field - 1].dynamic &&
                pathsMatrix[floor][field].dynamic
              ) {
                type += 'dynamic';
              }

              if (
                pathsMatrix[floor][field - 1].stable &&
                pathsMatrix[floor][field].stable
              ) {
                if (type === 'dynamic') {
                  if (
                    pathsMatrix[floor][field - 1].prevPathId ===
                    pathsMatrix[floor][field].prevPathId
                  ) {
                    type += 'stable';
                  }
                } else type += 'stable';
              }

              return type;
            } else {
              return false;
            }

          default:
            return false;
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  generatePathsMatrix(stablePathsMatrix, unstablePathsMatrix) {
    let pathsMatrix = stablePathsMatrix.map((row, i) =>
      row.map((val, j) => {
        if (val.value) {
          return { id: val.id, value: 9, prevPathId: {}, stable: true };
        } else {
          return { id: 0, value: 0, prevPathId: {}, stable: false };
        }
      })
    );

    unstablePathsMatrix.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val.value) {
          if (pathsMatrix[i][j].value === 9) {
            pathsMatrix[i][j] = {
              id: val.id,
              value: 1,
              prevPathId: pathsMatrix[i][j].id,
              stable: true,
              dynamic: true
            };
          } else {
            pathsMatrix[i][j] = {
              id: val.id,
              value: 1,
              prevPathId: {},
              stable: false,
              dynamic: true
            };
          }
        }
      })
    );

    return pathsMatrix;
  }

  generateGameMatrix(
    stablePathsMatrix,
    unstablePathsMatrix,
    playerPositionMatrix,
    winPositionMatrix,
    pathsMatrix
  ) {
    let gameMatrix = stablePathsMatrix.map((row, i) =>
      row.map((val, j) => {
        return val;
      })
    );

    unstablePathsMatrix.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val.value) {
          gameMatrix[i][j] = gameMatrix[i][j].value
            ? {
                ...val,
                prevPathId: gameMatrix[i][j].id,
                stable: true,
                dynamic: true,
                defaultField: gameMatrix[i][j].defaultField,
                defaultFloor: gameMatrix[i][j].defaultFloor
              }
            : {
                ...val,
                stable: false,
                dynamic: true,
                defaultField: gameMatrix[i][j].defaultField,
                defaultFloor: gameMatrix[i][j].defaultFloor
              };
        }
        gameMatrix[i][j] = {
          ...gameMatrix[i][j],
          addField: unstablePathsMatrix[i][j].addField,
          addFloor: unstablePathsMatrix[i][j].addFloor
        };
      })
    );

    winPositionMatrix.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val.value) {
          gameMatrix[i][j] = gameMatrix[i][j].value
            ? {
                ...gameMatrix[i][j],
                id: val.id,
                winCondition: true
              }
            : val;
        }
      })
    );

    playerPositionMatrix.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val.value) {
          gameMatrix[i][j] = {
            ...gameMatrix[i][j],
            id: val.id,
            value: val.value
          };
        }
      })
    );

    let matrixLength = stablePathsMatrix.length;
    let square = document.getElementById('square');
    let blockSize = square.offsetWidth / matrixLength;

    gameMatrix = gameMatrix.map((row, i) =>
      row.map((val, j) => {
        return {
          ...val,
          x: blockSize * j + this.state.spaceBetweenFields / 2, // 20 - margin between spans -_-
          y: blockSize * i + this.state.spaceBetweenFields / 2,
          floor: i,
          field: j
        };
      })
    );

    let directions = [];
    let stableDirections = [];
    let dynamicDirections = [];

    gameMatrix.forEach((row, i) =>
      row.forEach((val, j) => {
        directions = [];
        stableDirections = [];
        dynamicDirections = [];

        [0, 3, 6, 9].forEach(index => {
          const checkMove = this.checkMoveForMatrix(
            val,
            index,
            gameMatrix,
            pathsMatrix
          );

          if (checkMove) {
            switch (checkMove) {
              case 'dynamicstable':
                stableDirections.push(index);
                dynamicDirections.push(index);
                break;
              case 'stable':
                stableDirections.push(index);
                break;
              default:
                dynamicDirections.push(index);
                break;
            }

            directions.push(index);
          }
        });

        gameMatrix[i][j] = {
          ...val,
          directions,
          stableDirections,
          dynamicDirections
        };
      })
    );

    return gameMatrix;
  }

  rotateMatrix(direction = 1, time = 1) {
    if (Math.sign(time) === -1) {
      time = -time;
    }
    time = Math.round(time);

    let unstablePathsMatrix = this.state.unstablePathsMatrix.slice(),
      playerPositionMatrix = this.state.playerPositionMatrix.slice(),
      winPositionMatrix = this.state.winPositionMatrix.slice(),
      defaultGameMatrix = this.state.defaultGameMatrix.slice(),
      result,
      playerPositionCoordinate;

    const N = unstablePathsMatrix.length - 1;
    let mxLength = unstablePathsMatrix.length;

    for (let i = 0; i < time; i++) {
      if (window.firstRotate) {
        for (let y = 0; y < mxLength; y++) {
          for (let x = 0; x < mxLength; x++) {
            unstablePathsMatrix[y][x].prevFloor = y;
            unstablePathsMatrix[y][x].prevField = x;
          }
        }
        window.firstRotate = false;
      }

      result = unstablePathsMatrix.map((row, i) =>
        row.map((val, j) => {
          return direction === 1
            ? unstablePathsMatrix[N - j][i]
            : unstablePathsMatrix[j][N - i];
        })
      );
      unstablePathsMatrix.length = 0;
      unstablePathsMatrix.push(...result);

      for (let y = 0; y < mxLength; y++) {
        for (let x = 0; x < mxLength; x++) {
          unstablePathsMatrix[y][x].addFloor = y;
          unstablePathsMatrix[y][x].addField = x;
        }
      }

      for (let y = 0; y < mxLength; y++) {
        for (let x = 0; x < mxLength; x++) {
          unstablePathsMatrix.forEach((row, i) =>
            row.forEach((val, j) => {
              if (val.prevFloor === y && val.prevField === x) {
                defaultGameMatrix[y][x].addFloor = val.addFloor;
                defaultGameMatrix[y][x].addField = val.addField;
              }
            })
          );
        }
      }

      this.setDefaultGameMatrix(defaultGameMatrix);

      result = playerPositionMatrix.map((row, i) =>
        row.map((val, j) => {
          if (direction === 1) {
            if (val.value === 1) {
              playerPositionCoordinate = [j, N - i];
            }
            return playerPositionMatrix[N - j][i];
          } else {
            if (val.value === 1) {
              playerPositionCoordinate = [N - j, i];
            }
            return playerPositionMatrix[j][N - i];
          }
        })
      );
      playerPositionMatrix.length = 0;
      playerPositionMatrix.push(...result);

      result = winPositionMatrix.map((row, i) =>
        row.map((val, j) => {
          return direction === 1
            ? winPositionMatrix[N - j][i]
            : winPositionMatrix[j][N - i];
        })
      );
      winPositionMatrix.length = 0;
      winPositionMatrix.push(...result);
    }

    this.setState({
      unstablePathsMatrix,
      playerPositionMatrix,
      winPositionMatrix
    });

    let pathsMatrix = this.generatePathsMatrix(
      this.state.stablePathsMatrix,
      unstablePathsMatrix
    );

    this.setPathsMatrix(pathsMatrix);

    let gameMatrix = this.generateGameMatrix(
      this.state.stablePathsMatrix,
      unstablePathsMatrix,
      playerPositionMatrix,
      winPositionMatrix,
      pathsMatrix
    );

    this.setGameMatrix(gameMatrix);

    this.setPrevPlayerPosition({
      ...pathsMatrix[playerPositionCoordinate[0]][playerPositionCoordinate[1]],
      floor:
        gameMatrix[playerPositionCoordinate[0]][playerPositionCoordinate[1]]
          .floor,
      field:
        gameMatrix[playerPositionCoordinate[0]][playerPositionCoordinate[1]]
          .field,
      directions:
        gameMatrix[playerPositionCoordinate[0]][playerPositionCoordinate[1]]
          .directions
    });

    this.setCalcPlayerPositionCoordinates();

    return gameMatrix;
  }

  getPlayerPositionMatrix(floor, field, pathsMatrix) {
    let playerPositionMatrix = pathsMatrix.map((row, i) =>
      row.map((val, j) => {
        return { id: 0, value: 0 };
      })
    );
    playerPositionMatrix[floor][field] = { id: 'x', value: 1 };

    return playerPositionMatrix;
  }

  setPrevPlayerPosition(prevPlayerPosition, floor, field) {
    this.setState({
      prevPlayerPosition
    });
  }
  setGameMatrix(gameMatrix) {
    this.setState({
      gameMatrix
    });
  }
  setPathsMatrix(pathsMatrix) {
    this.setState({
      pathsMatrix
    });
  }
  setPlayerPositionMatrix(playerPositionMatrix) {
    this.setState({
      playerPositionMatrix
    });
  }
  setDefaultGameMatrix(defaultGameMatrix) {
    this.setState({
      defaultGameMatrix
    });
  }
  setFinish() {
    this.setState({
      isFinished: true
    });
  }

  setPlayerPositionFields(playerPositionFields) {
    this.setState({
      playerPositionFields
    });
  }

  resetLevel() {
    this.setState({
      ...defaultLevelConfig,
      ...getLevel(this.props.currentStep)
    });
    this.generateLevel();
  }
  setAngle(angle) {
    this.setState({
      angle
    });
  }

  setPlayerPositionCoordinates(playerPositionCoordinates) {
    this.setState({
      playerPositionCoordinates
    });
    return playerPositionCoordinates;
  }

  setCalcPlayerPositionCoordinates(extraProps = {}) {
    let playerPosition;
    let wrapper;
    let player;

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        playerPosition = document.getElementById('xFile');
        wrapper = document.getElementById('wrapper');
        player = document.getElementById('player');
        resolve();
      }, 0);
    });

    promise1.then(value => {
      player.style.top =
        playerPosition.getBoundingClientRect().y -
        wrapper.getBoundingClientRect().top +
        'px';
      player.style.left =
        playerPosition.getBoundingClientRect().x -
        wrapper.getBoundingClientRect().left +
        'px';

      let playerPositionCoordinates = [
        playerPosition.getBoundingClientRect().y -
          wrapper.getBoundingClientRect().top,
        playerPosition.getBoundingClientRect().x -
          wrapper.getBoundingClientRect().left
      ];
      this.setState({
        ...extraProps,
        playerPositionCoordinates
      });
      return playerPositionCoordinates;
    });
  }

  getUnitCoordinates() {
    let unit = document.getElementById('player');
    let wrapper = document.getElementById('wrapper');

    let unitCoordinates = [
      unit.getBoundingClientRect().y - wrapper.getBoundingClientRect().top,
      unit.getBoundingClientRect().x - wrapper.getBoundingClientRect().left
    ];
    return unitCoordinates;
  }

  generateLevel() {
    window.firstRotate = true;
    let pathsMatrix = this.generatePathsMatrix(
      this.state.stablePathsMatrix,
      this.state.unstablePathsMatrix
    );

    this.setPathsMatrix(pathsMatrix);

    let playerPositionMatrix = this.getPlayerPositionMatrix(
      this.state.startPosition[0],
      this.state.startPosition[1],
      pathsMatrix
    );

    this.setPlayerPositionMatrix(playerPositionMatrix);

    let gameMatrix = this.generateGameMatrix(
      this.state.stablePathsMatrix,
      this.state.unstablePathsMatrix,
      playerPositionMatrix,
      this.state.winPositionMatrix,
      pathsMatrix
    );

    this.setPrevPlayerPosition({
      ...gameMatrix[this.state.startPosition[0]][this.state.startPosition[1]],
      id:
        pathsMatrix[this.state.startPosition[0]][this.state.startPosition[1]]
          .id,
      floor: this.state.startPosition[0],
      field: this.state.startPosition[1]
      //todo
    });

    this.setGameMatrix(gameMatrix);
    this.setState({ winPosition: this.getWinPosition(gameMatrix) });
    this.setPlayerPositionMatrix(playerPositionMatrix);
    this.setDefaultGameMatrix(gameMatrix);

    let winOrange, fakePlayer, box;

    let matrixLength = gameMatrix.length;
    let square = document.getElementById('square');
    let blockSize = square.offsetWidth / matrixLength;
    this.setState({ blockSize: blockSize - this.state.spaceBetweenFields });
    box = document.getElementById('square');
    if (box) {
      box.style.transform = 'rotate(' + 0 + 'deg)';
    }

    setTimeout(() => {
      fakePlayer = document.getElementById('fakeplayer');
      winOrange = document.getElementById('win');
      winOrange.style.transform = 'rotate(' + 0 + 'deg)';
      fakePlayer.style.transform = 'rotate(' + 0 + 'deg)';

      this.setCalcPlayerPositionCoordinates();
    }, 100);

    let counter = 0;
    let game = document.getElementById('game');

    setTimeout(() => {
      let opacityInterval = setInterval(() => {
        if (counter >= 1) {
          clearInterval(opacityInterval);
        }

        game.style.opacity = counter;
        counter += 0.1;
      }, 25);
      let player = document.getElementById('player');
      player.style.visibility = 'visible';
    }, 10);

    setTimeout(() => {}, 500);
  }

  componentDidMount() {
    this.generateLevel();
    function preventPullToRefresh(element) {
      let prevent = false;
      document
        .querySelector(element)
        .addEventListener('touchstart', function(e) {
          if (e.touches.length !== 1) {
            return;
          }

          let scrollY =
            window.pageYOffset ||
            document.body.scrollTop ||
            document.documentElement.scrollTop;
          prevent = scrollY === 0;
        });

      document
        .querySelector(element)
        .addEventListener('touchmove', function(e) {
          if (prevent) {
            prevent = false;
            e.preventDefault();
          }
        });
    }
    preventPullToRefresh('#root');
  }

  componentDidUpdate() {}

  render() {
    return (
      <Fragment>
        <Square
          blockSize={this.state.blockSize}
          setCalcPlayerPositionCoordinates={
            this.setCalcPlayerPositionCoordinates
          }
          setPlayerPositionCoordinates={this.setPlayerPositionCoordinates}
          playerPositionCoordinates={this.state.playerPositionCoordinates}
          rotateMatrix={this.rotateMatrix}
          gameMatrix={this.state.gameMatrix}
          pathsMatrix={this.state.pathsMatrix}
          unstablePathsMatrix={this.state.unstablePathsMatrix}
          stablePathsMatrix={this.state.stablePathsMatrix}
          spaceBetweenFields={this.state.spaceBetweenFields}
          getPlayerPositionMatrix={this.getPlayerPositionMatrix}
          setPlayerPositionMatrix={this.setPlayerPositionMatrix}
          setGameMatrix={this.setGameMatrix}
          generateGameMatrix={this.generateGameMatrix}
          winPositionMatrix={this.state.winPositionMatrix}
          prevPlayerPosition={this.state.prevPlayerPosition}
          defaultGameMatrix={this.state.defaultGameMatrix}
          setNewRotateMatrix={this.setNewRotateMatrix}
          newRotateMatrix={this.state.newRotateMatrix}
          setFinish={this.setFinish}
          nextStep={this.props.nextStep}
          getUnitCoordinates={this.getUnitCoordinates}
          playerPositionFields={this.state.playerPositionFields}
          setPlayerPositionFields={this.setPlayerPositionFields}
          setAngle={this.setAngle}
          angle={this.state.angle}
          resetLevel={this.resetLevel}
          absoluteMatrix={this.state.absoluteMatrix}
          playerPositionMatrix={this.state.playerPositionMatrix}
        />
      </Fragment>
    );
  }
}

export default Game;
