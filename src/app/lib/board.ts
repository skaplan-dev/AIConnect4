import matches from "./matches";
import { HEIGHT, WIDTH } from "./variables";

/**
 * List of available players
 * @type {Array}
 */
let availablePlayers = ["person", "AI"];
let algorithms = [
  "MiniMaxAlphaBeta",
  "MonteCarloTreeSearch",
  "Random",
  "Conglomerate",
];
/**
 * Board class
 */
export default class Board {
  public grid;
  public inserts;
  public nextPlayer;
  public isActive: boolean;
  public gameOver: boolean;
  public algo: string;
  public aiWin: boolean;
  /**
   * Board constructor
   * @return {Void}
   */
  constructor() {
    /**
     * Multidimentional array containing our default empty grid
     * @type {Array}
     */
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    /**
     * Keeping track of how many pieces have been inserted
     * @type {Number}
     */
    this.inserts = 0;
    const randomKey = Math.floor(Math.random() * 3);
    this.algo = algorithms[randomKey];

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
    this.gameOver = false;
  }

  /**
   * Adds piece to grid column
   * @param {Number} columnIndex
   * @param {String} piece
   */
  addPiece(columnIndex, piece) {
    // Column and piece index
    let rowIndex = -1;

    // Loops through column, looking for zeros (to determine next available cell)
    for (let row = 0; row < HEIGHT; row++) {
      if (this.grid[row][columnIndex] == 0) rowIndex = row;
    }

    // Did we find an available cell?
    if (rowIndex >= 0) {
      // Adds piece to column cell
      this.grid[rowIndex][columnIndex] = piece;

      // Increase inserts count
      this.inserts++;

      if (this.didSomebodyWin(this.nextPlayer)) {
        this.isActive = false;
        this.gameOver = true;
        this.aiWin = this.nextPlayer == "AI" ? true : false;
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
 * Whose turn is it to play?
 * @param  {Number} inserts
 * @return {String}
 */
function refreshPlayer(inserts) {
  return availablePlayers[inserts % 2];
}
