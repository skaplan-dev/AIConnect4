export default Matches;

function Matches(grid, player) {
  // horizontalCheck
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 7; i++) {
      if (
        grid[i][j] == player &&
        grid[i][j + 1] == player &&
        grid[i][j + 2] == player &&
        grid[i][j + 3] == player
      ) {
        return true;
      }
    }
  }
  // verticalCheck
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 7; j++) {
      if (
        grid[i][j] == player &&
        grid[i + 1][j] == player &&
        grid[i + 2][j] == player &&
        grid[i + 3][j] == player
      ) {
        return true;
      }
    }
  }
  // ascendingDiagonalCheck
  for (let i = 3; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        grid[i][j] == player &&
        grid[i - 1][j + 1] == player &&
        grid[i - 2][j + 2] == player &&
        grid[i - 3][j + 3] == player
      )
        return true;
    }
  }
  // descendingDiagonalCheck
  for (let i = 3; i < 7; i++) {
    for (let j = 3; j < 6; j++) {
      if (
        grid[i][j] == player &&
        grid[i - 1][j - 1] == player &&
        grid[i - 2][j - 2] == player &&
        grid[i - 3][j - 3] == player
      )
        return true;
    }
  }
  return false;
}
