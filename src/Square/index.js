import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import './style.scss';

import playerIcon from './player.png';
import targetIcon from './target.png';

const Background = styled.div`
  height: 100%;
  padding: 2px;
  background: ${props =>
    props.staticArea
      ? 'transparent'
      : 'linear-gradient(to right, rgba(150,124,159),rgba(58,58,58))'};
  user-select: none;
`;

const Player = styled.div`
  top: 20px;
  left: 20px;
  // top: ${props => props.top + 'px'};
  // left: ${props => props.left + 'px'};
  position: absolute;
  visibility: visible;
  width: ${props => props.blockSize + 'px'};
  height: ${props => props.blockSize + 'px'};
  background: url(${playerIcon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: grab;
  z-index: 10;
  border-radius: 50%;
`;

const FakePlayer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: ${props => props.blockSize + 'px'};
  height: ${props => props.blockSize + 'px'};
  background: url(${playerIcon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: grab;
  z-index: 5;
  visibility: hidden;
  transform: ${props => 'rotate(' + -props.angle + 'deg);'};
  user-select: none;
  border-radius: 50%;
`;

const bounce = keyframes`
  0% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(20deg);
  }

  100% {
    transform: rotate(-5deg);
  }
`;

const Win = styled.div`
  animation: ${bounce} 3s ease-in-out infinite;
  top: 0;
  left: 0;
  position: absolute;
  width: ${props => props.blockSize + 'px'};
  height: ${props => props.blockSize + 'px'};
  background: url(${targetIcon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
  transform: ${props => 'rotate(' + -props.angle + 'deg);'};
  user-select: none;
`;

const Border = styled.div`
  border-radius: 50%;
  padding: 3px;
  width: 10px;
  height: 10px;
  user-select: none;
  background: ${props =>
    props.staticArea
      ? 'transperent'
      : 'linear-gradient(to right, rgba(58,58,58),rgba(150,124,159)	)'};
`;

const StaticBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => (props.staticArea ? 'transparent' : 'black')};
  user-select: none;

  &:after {
    display: ${props =>
      props.directions > 0 && (props.top || props.bottom) ? 'block' : 'none'};
    width: 4px;
    height: ${props => props.blockSize + props.spaceBetweenFields + 2 + 'px'};
    top: ${props =>
      props.top
        ? -props.blockSize +
          -props.spaceBetweenFields -
          -props.blockSize / 2 +
          'px'
        : props.bottom
        ? 'calc(50% - 2px)'
        : '0'};

    left: calc(50% - 2px);
    content: '';
    position: absolute;
    background: rgba(58, 58, 58);
    z-index: 0;
    border-radius: 2px;
  }

  &:before {
    display: ${props =>
      props.directions > 0 &&
      props.stable &&
      props.staticArea &&
      (props.left || props.right)
        ? 'block'
        : 'none'};
    width: ${props => props.blockSize + props.spaceBetweenFields + 2 + 'px'};
    height: 4px;
    top: calc(50% - 2px);
    left: ${props =>
      props.left
        ? -props.blockSize +
          -props.spaceBetweenFields -
          -props.blockSize / 2 +
          'px'
        : props.right
        ? 'calc(50% - 2px)'
        : '0'};
    content: '';
    position: absolute;
    background: rgba(58, 58, 58);
    z-index: 0;
    border-radius: 2px;
  }
`;

const DynamicBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => (props.staticArea ? 'transparent' : 'black')};
  user-select: none;

  &:after {
    display: ${props =>
      props.directions > 0 && (props.top || props.bottom) ? 'block' : 'none'};
    width: 4px;
    height: ${props => props.blockSize + props.spaceBetweenFields + 'px'};
    top: ${props =>
      props.top
        ? -props.blockSize +
          -props.spaceBetweenFields -
          -props.blockSize / 2 +
          'px'
        : props.bottom
        ? 'calc(50% - 2px)'
        : '0'};
    left: calc(50% - 2px);
    content: '';
    position: absolute;
    background: rgba(190, 38, 43, 1);
    z-index: 0;
    border-radius: 2px;
  }

  &:before {
    display: ${props =>
      props.directions > 0 && (props.left || props.right) ? 'block' : 'none'};
    width: ${props => props.blockSize + props.spaceBetweenFields + 'px'};
    height: 4px;
    top: calc(50% - 2px);
    left: ${props =>
      props.left
        ? -props.blockSize +
          -props.spaceBetweenFields -
          -props.blockSize / 2 +
          'px'
        : props.right
        ? 'calc(50% - 2px)'
        : '0'};
    content: '';
    position: absolute;
    background: rgba(190, 38, 43, 1);
    z-index: 0;
    border-radius: 2px;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 100%;
  position: relative;
  margin: ${props => props.margin / 2 + 'px'};

  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  user-select: none;
`;

const Row = styled.div`
  justify-content: space-around;
  display: flex;
  height: ${props => 100 / props.matrixLength + '%'};
  user-select: none;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
`;

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 0
    };
  }

  getRotation = function(buffer, angle) {
    return buffer + angle < -360
      ? buffer + angle + 360
      : buffer + angle > 360
      ? buffer + angle - 360
      : buffer + angle;
  };

  positiveAngle = angle => {
    return angle < 0 ? angle + 360 : angle;
  };

  componentDidMount() {
    let player = document.getElementById('player');
    player = document.getElementById('player');

    let currentBlock;

    let direction = 0,
      prevDirection;

    this.valuesForRotateMatrix = () => {
      prevDirection = direction;
      let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(document.getElementById('way'));
        }, 0);
      });

      myPromise.then(way => {
        xFile = document.getElementById('xFile');
        this.wayCoordinates = way.getBoundingClientRect();
        this.prevCoordinates = this.prevCoordinates
          ? this.prevCoordinates
          : this.wayCoordinates;

        let { x: pX, y: pY } = this.prevCoordinates;
        let { x: cX, y: cY } = this.wayCoordinates;

        if (cX === pX && cY === pY) {
          direction = 0;
        }
        if (cX > pX && cY > pY) {
          direction = 3;
        }
        if (cX === pX && cY > pY) {
          direction = 6;
        }
        if (cX < pX && cY >= pY) {
          direction = 9;
        }

        if (direction !== prevDirection) {
          direction > prevDirection
            ? direction === prevDirection + 3
              ? this.props.rotateMatrix(1, 1)
              : direction === prevDirection + 6
              ? this.props.rotateMatrix(1, 2)
              : this.props.rotateMatrix(1, 3)
            : direction === prevDirection - 3
            ? this.props.rotateMatrix(0, 1)
            : direction === prevDirection - 6
            ? this.props.rotateMatrix(0, 2)
            : this.props.rotateMatrix(0, 3);
        }

        currentBlock = {
          value: this.props.prevPlayerPosition.value,
          directions: this.props.prevPlayerPosition.directions,
          id: this.props.prevPlayerPosition.id,
          prevPathId: this.props.prevPlayerPosition.prevPathId
        };

        return [
          this.prevCoordinates.x,
          this.prevCoordinates.y,
          this.wayCoordinates.x,
          this.wayCoordinates.y
        ];
      });
    };

    this.valuesForRotateMatrix();

    const box = document.getElementById('square');
    const gameboard = document.getElementById('wrapper');
    let xShift = box.getBoundingClientRect().left + box.offsetWidth / 2;
    let yShift = box.getBoundingClientRect().top + box.offsetHeight / 2;

    const boxCoordinates = box.getBoundingClientRect();

    let xFile = document.getElementById('xFile');
    let fakePlayer = document.getElementById('fakeplayer');

    let winOrange;
    let angle = 0,
      prevX = 0,
      prevY = 0,
      buffer = 0,
      rotation = 0,
      isRotate = false,
      mouseClamped = false,
      isMoved = false,
      firstRotate = true,
      mouseClampedOnPlayer = false;

    let currentAxis = 'X';
    const rotateSquare = angle => {
      winOrange.style.transform = 'rotate(' + -angle + 'deg)';
      fakePlayer.style.transform = 'rotate(' + -angle + 'deg)';
      box.style.transform = 'rotate(' + angle + 'deg)';
    };

    const smoothRotation = (angle, time = 0) => {
      let counter = angle;
      let wrapper = document.getElementById('wrapper');
      switch (Math.sign(counter)) {
        case 0:
          break;

        case 1:
          const areas = {
            positive: [[45, 90], [135, 180], [225, 270], [315, 360]],
            negative: [[0, 45], [90, 135], [180, 225], [270, 315]]
          };

          areas.positive.forEach(area => {
            if (counter > area[0] && counter <= area[1]) {
              let interval = setInterval(() => {
                isRotate = true;
                if (counter <= area[1]) {
                  rotateSquare(counter);
                  counter++;
                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                } else {
                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left = player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                  isRotate = false;
                  isMoved = false;
                  player.style.visibility = 'visible';
                  fakePlayer.style.visibility = 'hidden';
                  angle = area[1];
                  buffer = area[1];
                  this.props.setAngle(angle);
                  clearInterval(interval);
                  this.valuesForRotateMatrix();
                }
              }, time);
            }
          });

          areas.negative.forEach(area => {
            if (counter > area[0] && counter <= area[1]) {
              let interval = setInterval(() => {
                isRotate = true;
                if (counter >= area[0]) {
                  rotateSquare(counter);
                  counter--;

                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                } else {
                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                  isRotate = false;
                  isMoved = false;
                  player.style.visibility = 'visible';
                  fakePlayer.style.visibility = 'hidden';
                  angle = area[0];
                  buffer = area[0];
                  this.props.setAngle(angle);
                  clearInterval(interval);
                  this.valuesForRotateMatrix();
                }
              }, time);
            }
          });
          break;

        case -1:
          const secondAreas = {
            positive: [[-45, 0], [-135, -90], [-225, -180], [-315, -270]],
            negative: [[-90, -45], [-180, -135], [-270, -225], [-360, -315]]
          };

          secondAreas.positive.forEach(area => {
            if (counter >= area[0] && counter < area[1]) {
              let interval = setInterval(() => {
                isRotate = true;
                if (counter <= area[1]) {
                  rotateSquare(counter);
                  counter++;

                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                } else {
                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                  isRotate = false;
                  isMoved = false;
                  player.style.visibility = 'visible';
                  fakePlayer.style.visibility = 'hidden';
                  angle = area[1];
                  buffer = area[1];
                  this.props.setAngle(angle);
                  clearInterval(interval);
                  this.valuesForRotateMatrix();
                }
              }, time);
            }
          });

          secondAreas.negative.forEach(area => {
            if (counter >= area[0] && counter < area[1]) {
              let interval = setInterval(() => {
                isRotate = true;
                if (counter >= area[0]) {
                  rotateSquare(counter);
                  counter--;

                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                } else {
                  player.style.top =
                    fakePlayer.getBoundingClientRect().y -
                    wrapper.getBoundingClientRect().top +
                    'px';
                  player.style.left = player.style.left =
                    fakePlayer.getBoundingClientRect().x -
                    wrapper.getBoundingClientRect().left +
                    'px';
                  isRotate = false;
                  isMoved = false;
                  player.style.visibility = 'visible';
                  fakePlayer.style.visibility = 'hidden';
                  angle = area[0];
                  buffer = area[0];
                  this.props.setAngle(angle);
                  clearInterval(interval);
                  this.valuesForRotateMatrix();
                }
              }, time);
            }
          });
          break;

        default:
          break;
      }
    };

    let gamematrix;
    xFile = document.getElementById('xFile');

    const dragStartHandle = e => {
      if (!isRotate) {
        fakePlayer = document.getElementById('fakeplayer');
        winOrange = document.getElementById('win');

        mouseClamped = true;
        prevX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        prevY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

        player.style.visibility = 'hidden';

        fakePlayer.style.visibility = 'visible';

        this.startAngle = Math.round(
          Math.atan2(prevX - xShift, -(prevY - yShift)) * (180 / Math.PI)
        );
      }
    };

    const dragHandle = e => {
      let currentX, currentY;

      currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
      currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

      if (!isRotate) {
        if (mouseClamped) {
          isMoved = true;

          rotation = Math.round(
            Math.atan2(currentX - xShift, -(currentY - yShift)) *
              (180 / Math.PI)
          );
          angle = rotation - this.startAngle;

          if (firstRotate) {
            buffer = angle;
            angle = this.getRotation(0, angle);
            rotateSquare(angle);
          } else {
            let angleWithBuffer = this.getRotation(buffer, angle);
            rotateSquare(angleWithBuffer);
          }
        }
      }
    };

    const dragEnd = () => {
      mouseClamped = false;

      if (isMoved) {
        if (!firstRotate) {
          buffer = this.getRotation(buffer, angle);
          smoothRotation(buffer, 10);
        } else {
          angle = this.getRotation(0, angle);
          smoothRotation(angle, 10);
        }

        firstRotate = false;
      } else {
        try {
          player.style.visibility = 'visible';
          fakePlayer.style.visibility = 'hidden';
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    document.body.addEventListener('touchstart', dragStartHandle);
    document.body.addEventListener('mousedown', dragStartHandle);
    document.body.addEventListener('touchmove', dragHandle);
    document.body.addEventListener('mousemove', dragHandle);
    document.body.addEventListener('touchend', dragEnd);
    document.body.addEventListener('mouseup', dragEnd);

    // player touch handlers

    const playerTouchStart = e => {
      // e.stopPropagation();
      xFile = document.getElementById('xFile');
      this.props.setPlayerPositionFields({
        floor: +xFile.dataset.floor,
        field: +xFile.dataset.field,
        defaultfloor: +xFile.dataset.defaultfloor,
        defaultfield: +xFile.dataset.defaultfield
      });

      fakePlayer = document.getElementById('fakeplayer');
      player.style.transition = '0.2s';
      document.body.removeEventListener('touchstart', dragStartHandle);
      document.body.removeEventListener('mousedown', dragStartHandle);
      document.body.removeEventListener('touchmove', dragHandle);
      document.body.removeEventListener('mousemove', dragHandle);
      document.body.removeEventListener('touchend', dragEnd);
      document.body.removeEventListener('mouseup', dragEnd);

      mouseClampedOnPlayer = true;
    };

    let val;

    const playerTouchMove = e => {
      if (!isRotate) {
        if (mouseClampedOnPlayer) {
          let boundaries = {};
          let currentX, currentY;
          let gameMatrix = this.props.gameMatrix;
          let blockSize =
            box.offsetWidth / gameMatrix.length - this.props.spaceBetweenFields;

          currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
          currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

          let boxX = currentX - boxCoordinates.x,
            boxY = currentY - boxCoordinates.y;

          let playerPositionMatrix;

          let playerSidesCoordinates = [
            player.getBoundingClientRect().top - boxCoordinates.y,
            player.getBoundingClientRect().right - boxCoordinates.x,
            player.getBoundingClientRect().bottom - boxCoordinates.y,
            player.getBoundingClientRect().left - boxCoordinates.x
          ];

          let myBlock;
          // let oldVal;

          this.props.gameMatrix.forEach((row, i) =>
            row.forEach((val, j) => {
              if (
                boxX >= val.x &&
                boxX <= val.x + blockSize &&
                boxY >= val.y &&
                boxY <= val.y + blockSize &&
                val.directions.length !== 0
              ) {
                xFile = document.getElementById('xFile');
                // oldVal = val;
                myBlock = {
                  ...val,
                  id: this.props.pathsMatrix[val.floor][val.field].id,
                  prevPathId: this.props.pathsMatrix[val.floor][val.field]
                    .prevPathId
                };
              }
            })
          );

          const checkFieldChange = () => {
            if (myBlock) {
              val = myBlock;

              try {
                if (
                  currentBlock.value !== 0 &&
                  JSON.stringify(currentBlock) !== JSON.stringify(val) &&
                  //
                  (currentBlock.id === val.id ||
                    currentBlock.prevPathId === val.prevPathId ||
                    currentBlock.id === val.prevPathId ||
                    currentBlock.prevPathId === val.id)
                ) {
                  xFile = document.getElementById('xFile');

                  let backgroundFields;
                  gamematrix = document.getElementById('gamematrix');
                  if (val.addFloor !== undefined) {
                    backgroundFields = gamematrix.querySelector(
                      `div[data-addfloor="${val.addFloor}"][data-addfield="${
                        val.addField
                      }"]`
                    );
                    if (!backgroundFields) {
                      backgroundFields = gamematrix.querySelector(
                        `div[data-defaultfloor="${
                          val.defaultFloor
                        }"][data-defaultfield="${val.defaultField}"]`
                      );
                    }
                  } else {
                    backgroundFields = gamematrix.querySelector(
                      `div[data-defaultfloor="${
                        val.defaultFloor
                      }"][data-defaultfield="${val.defaultField}"]`
                    );
                  }

                  try {
                    backgroundFields.appendChild(fakePlayer);
                  } catch (e) {
                    console.log(e.message);
                  }

                  currentBlock = val;

                  if (val.winCondition) {
                    // WIIIN
                    if (this.props.currentStep === 17) {
                      console.log('congrats');
                      let game = document.getElementById('game');
                      let counter = 1;

                      let opacityInterval = setInterval(() => {
                        if (counter <= 0) {
                          clearInterval(opacityInterval);
                          setTimeout(() => {
                            alert('congrats champ! 💀');
                          }, 1000);
                        }

                        game.style.opacity = counter;
                        counter -= 0.1;
                      }, 5);
                    } else {
                      playerPositionMatrix = this.props.getPlayerPositionMatrix(
                        currentBlock.floor,
                        currentBlock.field,
                        this.props.pathsMatrix
                      );

                      this.props.setPlayerPositionMatrix(playerPositionMatrix);
                      let newGameMatrix = this.props.generateGameMatrix(
                        this.props.stablePathsMatrix,
                        this.props.unstablePathsMatrix,
                        playerPositionMatrix,
                        this.props.winPositionMatrix,
                        this.props.pathsMatrix
                      );
                      this.props.setGameMatrix(newGameMatrix);
                      this.props.setCalcPlayerPositionCoordinates();

                      let game = document.getElementById('game');
                      let counter = 1;

                      let opacityInterval = setInterval(() => {
                        if (counter <= 0) {
                          clearInterval(opacityInterval);
                        }

                        game.style.opacity = counter;
                        counter -= 0.1;
                      }, 5);
                      setTimeout(() => {
                        angle = 0;
                        buffer = 0;
                        mouseClampedOnPlayer = false;

                        mouseClamped = false;
                        direction = 0;
                        prevDirection = 0;
                        val = 0;
                        currentBlock = 0;
                        this.valuesForRotateMatrix();

                        this.props.nextStep();
                        this.props.resetLevel();
                        this.props.setFinish();
                      }, 900);
                    }

                    return;
                  } else {
                    if (currentBlock.directions.length !== 0) {
                      playerPositionMatrix = this.props.getPlayerPositionMatrix(
                        currentBlock.floor,
                        currentBlock.field,
                        this.props.pathsMatrix
                      );

                      this.props.setPlayerPositionMatrix(playerPositionMatrix);
                      let newGameMatrix = this.props.generateGameMatrix(
                        this.props.stablePathsMatrix,
                        this.props.unstablePathsMatrix,
                        playerPositionMatrix,
                        this.props.winPositionMatrix,
                        this.props.pathsMatrix
                      );
                      this.props.setGameMatrix(newGameMatrix);
                      this.props.setCalcPlayerPositionCoordinates();
                    }
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }
          };

          checkFieldChange();

          if (currentBlock && currentBlock.value !== 0) {
            currentBlock.directions.forEach(direction => {
              switch (direction) {
                case 0:
                  boundaries = {
                    ...boundaries,
                    top: currentBlock.y - this.props.spaceBetweenFields * 0.5
                  };
                  break;
                case 3:
                  boundaries = {
                    ...boundaries,
                    right:
                      currentBlock.x +
                      this.props.spaceBetweenFields * 0.5 +
                      blockSize
                  };
                  break;
                case 6:
                  boundaries = {
                    ...boundaries,
                    bottom:
                      currentBlock.y +
                      this.props.spaceBetweenFields * 0.5 +
                      blockSize
                  };
                  break;
                case 9:
                  boundaries = {
                    ...boundaries,
                    left: currentBlock.x - this.props.spaceBetweenFields * 0.5
                  };
                  break;
                default:
              }
            });

            const checkMoveTop = () => {
              let { top = currentBlock.y } = boundaries;
              if (playerSidesCoordinates[0] >= top && boxY - blockSize >= top) {
                return true;
              } else {
                return false;
              }
            };
            const checkMoveRight = () => {
              let { right = currentBlock.x + blockSize + 5 } = boundaries;

              if (
                playerSidesCoordinates[1] <= right &&
                boxX + blockSize <= right
              ) {
                return true;
              } else {
                return false;
              }
            };
            const checkMoveBottom = () => {
              let { bottom = currentBlock.y + blockSize + 5 } = boundaries;
              if (
                playerSidesCoordinates[2] <= bottom &&
                boxY + blockSize <= bottom
              ) {
                return true;
              } else {
                return false;
              }
            };
            const checkMoveLeft = () => {
              let { left = currentBlock.x } = boundaries;
              if (
                playerSidesCoordinates[3] >= left &&
                boxX - blockSize >= left
              ) {
                return true;
              } else {
                return false;
              }
            };

            if (
              (boundaries.top &&
                boxY - this.props.spaceBetweenFields * 1.99 < boundaries.top) ||
              currentAxis === 'Y'
            ) {
              if (
                currentBlock.directions.length !== 0 &&
                checkMoveTop() &&
                checkMoveBottom()
              ) {
                currentAxis = 'Y';
                player.style.left = currentBlock.x + 'px';
                player.style.top = boxY - blockSize / 2 + 'px';
              }
            }

            if (
              (boundaries.bottom &&
                boxY + this.props.spaceBetweenFields * 1.99 >
                  boundaries.bottom) ||
              currentAxis === 'Y'
            ) {
              if (
                currentBlock.directions.length !== 0 &&
                checkMoveTop() &&
                checkMoveBottom()
              ) {
                currentAxis = 'Y';
                player.style.left = currentBlock.x + 'px';
                player.style.top = boxY - blockSize / 2 + 'px';
              }
            }

            if (
              (boundaries.right &&
                boxX + this.props.spaceBetweenFields * 1.99 >
                  boundaries.right) ||
              currentAxis === 'X'
            ) {
              if (
                currentBlock.directions.length !== 0 &&
                checkMoveRight() &&
                checkMoveLeft()
              ) {
                currentAxis = 'X';

                player.style.top = currentBlock.y + 'px';
                player.style.left = boxX - blockSize / 2 + 'px';
              }
            }

            if (
              (boundaries.left &&
                boxX - this.props.spaceBetweenFields * 1.99 <
                  boundaries.left) ||
              currentAxis === 'X'
            ) {
              if (
                currentBlock.directions.length !== 0 &&
                checkMoveLeft() &&
                checkMoveRight()
              ) {
                currentAxis = 'X';

                player.style.top = currentBlock.y + 'px';
                player.style.left = boxX - blockSize / 2 + 'px';
              }
            }
          }
        }
      }
    };

    const playerTouchEnd = e => {
      setTimeout(() => {
        player.style.transition = '0s';
      }, 50);

      mouseClampedOnPlayer = false;

      document.body.addEventListener('touchstart', dragStartHandle);
      document.body.addEventListener('mousedown', dragStartHandle);
      document.body.addEventListener('touchmove', dragHandle);
      document.body.addEventListener('mousemove', dragHandle);
      document.body.addEventListener('touchend', dragEnd);
      document.body.addEventListener('mouseup', dragEnd);
    };

    player.addEventListener('mousedown', playerTouchStart);
    gameboard.addEventListener('mousemove', playerTouchMove);
    player.addEventListener('mouseup', playerTouchEnd);
    document.body.addEventListener('mouseup', playerTouchEnd);

    player.addEventListener('touchstart', playerTouchStart);
    gameboard.addEventListener('touchmove', playerTouchMove);
    player.addEventListener('touchend', playerTouchEnd);
    document.body.addEventListener('touchend', playerTouchEnd);

    this.reset = {
      dragStartHandle,
      playerTouchEnd
    };
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    let player = document.getElementById('player');
    document.body.removeEventListener('touchstart', this.reset.dragStartHandle);
    document.body.removeEventListener('mousedown', this.reset.dragStartHandle);
    player.removeEventListener('mouseup', this.reset.playerTouchEnd);
    document.body.removeEventListener('mouseup', this.reset.playerTouchEnd);
    player.removeEventListener('touchend', this.reset.playerTouchEnd);
    document.body.removeEventListener('touchend', this.reset.playerTouchEnd);
  }

  render() {
    let dynamicGameMatrix = this.props.defaultGameMatrix.map((row, i) => (
      <Row key={`r` + i} matrixLength={this.props.defaultGameMatrix.length}>
        {row.map((val, j) => {
          return (
            <Span
              key={`s` + j}
              id={val.id}
              prevPathId={val.prevPathId}
              margin={this.props.spaceBetweenFields}
              x={val.x}
              y={val.y}
            >
              <Border>
                <DynamicBackground
                  top={val.dynamicDirections.includes(0)}
                  right={val.dynamicDirections.includes(3)}
                  bottom={val.dynamicDirections.includes(6)}
                  left={val.dynamicDirections.includes(9)}
                  directions={val.dynamicDirections.length}
                  blockSize={this.props.blockSize}
                  spaceBetweenFields={this.props.spaceBetweenFields}
                  // data-floor={val.addFloor}
                  // data-field={val.addField}
                  data-addfloor={val.addFloor}
                  data-addfield={val.addField}
                  data-defaultfloor={val.defaultFloor}
                  data-defaultfield={val.defaultField}
                >
                  {val.id === 9 && (
                    <Win
                      id="win"
                      angle={this.props.angle}
                      blockSize={this.props.blockSize}
                    />
                  )}
                  {val.id === 'x' && (
                    <FakePlayer
                      blockSize={this.props.blockSize}
                      angle={this.props.angle}
                      id="fakeplayer"
                    />
                  )}
                </DynamicBackground>
              </Border>
            </Span>
          );
        })}
      </Row>
    ));
    let staticArea = this.props.defaultGameMatrix.map((row, i) => (
      <Row key={`rr` + i} matrixLength={this.props.defaultGameMatrix.length}>
        {row.map((val, j) => {
          return (
            <Span
              key={`ss` + j}
              staticArea
              id={val.id}
              prevPathId={val.prevPathId}
              margin={this.props.spaceBetweenFields}
              x={val.x}
              y={val.y}
              stable={val.stable}
              point={val.point}
              data-defaultfloor={val.defaultfloor}
              data-defaultfield={val.defaultfield}
            >
              <Border staticArea>
                <StaticBackground
                  blockSize={this.props.blockSize}
                  spaceBetweenFields={this.props.spaceBetweenFields}
                  staticArea
                  top={val.stableDirections.includes(0)}
                  right={val.stableDirections.includes(3)}
                  bottom={val.stableDirections.includes(6)}
                  left={val.stableDirections.includes(9)}
                  directions={val.stableDirections.length}
                  stable={val.stable}
                  data-floor={val.floor}
                  data-field={val.field}
                />
              </Border>
            </Span>
          );
        })}
      </Row>
    ));
    let backroundMatrix = this.props.defaultGameMatrix.map((row, i) => (
      <Row key={`rrr` + i} matrixLength={this.props.defaultGameMatrix.length}>
        {row.map((val, j) => {
          return (
            <Span key={`sss` + j} margin={this.props.spaceBetweenFields}>
              <Border>
                <div className="defaultbackground" />
              </Border>
            </Span>
          );
        })}
      </Row>
    ));

    let hiddenMatrix = this.props.gameMatrix.map((row, i) => (
      <Row key={`rrrr` + i} matrixLength={this.props.gameMatrix.length}>
        {row.map((val, j) => {
          return (
            <Span
              key={`ssss` + j}
              margin={this.props.spaceBetweenFields}
              id={val.id === 'x' ? 'xFile' : ''}
              data-addfloor={val.addFloor}
              data-addfield={val.addField}
              data-defaultfloor={val.defaultFloor}
              data-defaultfield={val.defaultField}
              hidden
            >
              <Border />
            </Span>
          );
        })}
      </Row>
    ));

    return (
      <div id="wrapper" className="wrapper">
        <Background>
          <div id="innerwrapper">
            <div id="stablearea" className="stablearea">
              <div id="hiddenmatrix">{hiddenMatrix}</div>
              {staticArea}
              <Player id="player" blockSize={this.props.blockSize} />
            </div>
            <div id="square">
              <div id="way" />
              <div id="gamematrix" className="gamematrix">
                <div id="checker" />
                {dynamicGameMatrix}
              </div>

              <div id="backgroundmatrix">{backroundMatrix}</div>
            </div>
          </div>
        </Background>
      </div>
    );
  }
}

export default Square;
