import { Component } from "@angular/core";
import Board from "./lib/board";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public board;

  constructor() {
    this.restart();
  }

  addPiece(y: number) {
    // Does nothing if board is inactive
    if (!this.board.isActive) {
      return;
    }

    // Adds piece to board
    this.board.addPiece(y, this.board.nextPlayer);
  }

  restart() {
    this.board = new Board();
  }
}
