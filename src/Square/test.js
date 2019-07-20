this.props.absoluteMatrix.forEach((val, i) => {
  if (
    boxX >= val.x &&
    boxX <= val.x + blockSize &&
    boxY >= val.y &&
    boxY <= val.y + blockSize &&
    val.directions.length !== 0
  ) {
    xFile = document.getElementById('xFile');
    oldVal = val;
    myBlock = {
      ...val,
      id: this.props.pathsMatrix[val.floor][val.field].id,
      prevPathId: this.props.pathsMatrix[val.floor][val.field].prevPathId
    };
  }
});

const checkFieldChange = () => {
  if (myBlock) {
    val = myBlock;

    try {
      if (
        currentBlock.value !== 0 &&
        JSON.stringify(currentBlock) !== JSON.stringify(val) &&
        (currentBlock.id === val.id ||
          currentBlock.prevPathId === val.prevPathId ||
          currentBlock.id === val.prevPathId ||
          currentBlock.prevPathId === val.id)
      ) {
        console.log('currentBlock', currentBlock);
        console.log('oldval', oldVal.winCondition);
        console.log('val', val.winCondition);
        console.log('here we set state');

        console.log(xFile);
        setTimeout(() => {
          this.props.setPlayerPositionFields({
            floor: +xFile.dataset.floor,
            field: +xFile.dataset.field,
            defaultfloor: +xFile.dataset.defaultfloor,
            defaultfield: +xFile.dataset.defaultfield
          });
        }, 10);

        currentBlock = val;
        console.log(val);

        if (val.winCondition === 9) {
          // WIIIN
          finished = true;
          angle = 0;
          buffer = 0;
          mouseClampedOnPlayer = false;
          mouseClamped = false;
          direction = 0;
          prevDirection = 0;
          val = 0;
          currentBlock = 0;
          console.log('win');
          this.props.nextStep();
          this.props.resetLevel();
          this.props.setFinish();
          return;
        } else {
          if (currentBlock.directions.length !== 0) {
            // console.time(5);
            playerPositionMatrix = this.props.getPlayerPositionMatrix(
              currentBlock.floor,
              currentBlock.field,
              this.props.pathsMatrix
            );

            this.props.setPlayerPositionMatrix(playerPositionMatrix);
            // console.timeEnd(5);
            // console.time(7);
            let newGameMatrix = this.props.generateGameMatrix(
              this.props.stablePathsMatrix,
              this.props.unstablePathsMatrix,
              playerPositionMatrix,
              this.props.winPositionMatrix,
              this.props.pathsMatrix
            );
            this.props.setGameMatrix(newGameMatrix);
            // console.timeEnd(7);
            this.props.setCalcPlayerPositionCoordinates();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};
