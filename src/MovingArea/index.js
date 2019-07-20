import React, { Component } from "react";

class MovingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleMove = (floor, field) => {
  //   let gameMatrix = this.props.gameMatrix.slice(),
  //     playerPositionMatrix = this.props.playerPositionMatrix.slice(),
  //     stablePathsMatrix = this.props.stablePathsMatrix.slice(),
  //     unstablePathsMatrix = this.props.unstablePathsMatrix.slice(),
  //     winPositionMatrix = this.props.winPositionMatrix.slice(),
  //     pathsMatrix = this.props.pathsMatrix.slice();

  //   let { floor: prevFloor, field: prevField } = this.props.getPlayerPosition();
  //   playerPositionMatrix[prevFloor][prevField] = { id: 0, value: 0 };
  //   playerPositionMatrix[floor][field] = { id: "x", value: 1 };
  //   this.props.setPrevPlayerPosition(pathsMatrix[floor][field]);

  //   switch (gameMatrix[floor][field].id) {
  //     case 9:
  //       alert("win");
  //       break;

  //     default:
  //   }

  //   console.log(this.props.prevPlayerPosition);

  //   let newGameMatrix = this.props.generateGameMatrix(
  //     stablePathsMatrix,
  //     unstablePathsMatrix,
  //     playerPositionMatrix,
  //     winPositionMatrix,
  //     pathsMatrix
  //   );
  //   this.props.setGameMatrix(newGameMatrix);
  // };

  // makeMove = direction => {
  //   let { floor, field } = this.props.getPlayerPosition();
  //   switch (direction) {
  //     case 0:
  //       if (
  //         this.props.checkMove(
  //           direction,
  //           this.props.gameMatrix,
  //           this.props.pathsMatrix
  //         )
  //       ) {
  //         this.handleMove(floor - 1, field);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     case 3:
  //       if (
  //         this.props.checkMove(
  //           direction,
  //           this.props.gameMatrix,
  //           this.props.pathsMatrix
  //         )
  //       ) {
  //         this.handleMove(floor, field + 1);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     case 6:
  //       if (
  //         this.props.checkMove(
  //           direction,
  //           this.props.gameMatrix,
  //           this.props.pathsMatrix
  //         )
  //       ) {
  //         this.handleMove(floor + 1, field);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     case 9:
  //       if (
  //         this.props.checkMove(
  //           direction,
  //           this.props.gameMatrix,
  //           this.props.pathsMatrix
  //         )
  //       ) {
  //         this.handleMove(floor, field - 1);
  //         return true;
  //       } else {
  //         return false;
  //       }

  //     default:
  //       return false;
  //   }
  // };

  componentDidMount() {
    // document.addEventListener("keydown", e => {
    //   switch (e.keyCode) {
    //     case 37:
    //       this.makeMove(9);
    //       break;
    //     case 38:
    //       this.makeMove(0);
    //       break;
    //     case 39:
    //       this.makeMove(3);
    //       break;
    //     case 40:
    //       this.makeMove(6);
    //       break;
    //     default:
    //       return undefined;
    //   }
    // });

    
  }

  componentDidUpdate() {
    // console.table(this.props.prevFieldValue);
  }

  render() {
    return <React.Fragment />;
  }
}

export default MovingArea;
