import { Component } from "@angular/core";
import Board from "./lib/board";
import { DataService } from "./data.service";
import { Stats } from "./lib/stats";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public board;
  public gameOver;
  public stats: Stats[];

  constructor(private dataService: DataService) {
    this.restart();
    this.dataService
      .getStats(this.board.algo)
      .snapshotChanges()
      .subscribe((data) => {
        this.stats = data.map((doc) => {
          let toAdd: Stats = {
            type: doc.payload.doc.id,
            data: doc.payload.doc.data(),
          };
          return toAdd;
        });
      });
  }

  addPiece(y: number) {
    // Does nothing if board is inactive
    if (!this.board.isActive) {
      return;
    }
    this.board.addPiece(y, this.board.nextPlayer);

    if (this.board.nextPlayer == "AI" && !this.board.gameOver) {
      this.board.isActive = false;
      this.dataService
        .getAIMove(this.board.algo, this.board)
        .subscribe((data) => {
          this.board.addPiece(data, this.board.nextPlayer);
          if (!this.board.gameOver) {
            this.board.isActive = true;
          } else {
            this.doStats();
          }
        });
    } else if (this.board.gameOver) {
      this.doStats();
    }
  }

  public doStats() {
    let oldStats = this.stats.find((value) => {
      return value.type == this.board.algo;
    });
    const newStats = {
      gamesPlayed: oldStats.data.gamesPlayed + 1,
      gamesWon: this.board.aiWin
        ? oldStats.data.gamesWon + 1
        : oldStats.data.gamesWon,
    };
    this.dataService.updateStats(this.board.algo, newStats);
  }

  public getWinPercentage(gamesWon, gamesPlayed) {
    return gamesPlayed == 0 ? 0 : gamesWon / gamesPlayed;
  }
  
  public restart() {
    this.board = new Board();
  }
}
