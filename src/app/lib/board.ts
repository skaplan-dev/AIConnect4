import matches from "./matches";

/**
 * Board class
 */
export default class Board {
  public grid;
  public inserts;
  public nextPlayer;
  public isActive: boolean;
  public static readonly HEIGHT = 6;
  public static readonly WIDTH = 7;
  /**
   * Board constructor
   * @return {Void}
   */
  constructor() {
    /**
     * Multidimentional array containing our default empty grid
     * @type {Array}
     */
//     this.grid = [
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0]
//     ];
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];

    /**
     * Keeping track of how many pieces have been inserted
     * @type {Number}
     */
    this.inserts = 0;

    /**
     * String containing next player
     * @type {String}
     */
    this.nextPlayer = refreshPlayer(this.inserts);

    /**
     * Board is active by default (disables when somebody wins)
     * @type {Boolean}
     */
    this.isActive = true;
  }

  /**
   * Adds piece to grid column
   * @param {Number} columnIndex
   * @param {String} piece
   */
  addPiece(columnIndex, piece) {
    // Column and piece index
//     let column = this.grid[columnIndex];
    let cellIndex = -1;

    // Loops through column, looking for zeros (to determine next available cell)
//     column.forEach((columnPiece, i) => {
//       if (columnPiece === 0) {
//         cellIndex = i;
//       }
//     });
    
    // Loops through column, looking for zeros (to determine next available cell)
    for(let row = HEIGHT - 1; row >= 0; row--) {
      if(this.grid[row][columnIndex] == 0)
        cellIndex = row;
    }

    // Did we find an available cell?
    if (cellIndex >= 0) {
      // Adds piece to column cell
      this.grid[cellIndex][columnIndex] = piece;

      // Increase inserts count
      this.inserts++;

      if (this.didSomebodyWin(this.nextPlayer)) {
        this.isActive = false;
      }

      // Who's the next player?
      this.nextPlayer = refreshPlayer(this.inserts);
    }
  }

  /**
   * Did somebody win?
   * @return {Bool} [description]
   */
  didSomebodyWin(player) {
    // Trying to look for matches
    return matches(this.grid, player);
  }
}

/**
 *
 * Private properties
 *
 */

/**
 * List of available players
 * @type {Array}
 */
let availablePlayers = ["AI", "person"];

/**
 * Whose turn is it to play?
 * @param  {Number} inserts
 * @return {String}
 */
function refreshPlayer(inserts) {
  return availablePlayers[inserts % 2];
}
