import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Board from "./lib/board";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Stats } from "./lib/stats";

const url = "https://us-central1-connect-4-ai-271719.cloudfunctions.net/";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  public getAIMove(type: string, board: Board) {
    const gridToSend = { board: board.grid };

    return this.http.post(url + type, gridToSend);
  }

  public getStats(type: string): AngularFirestoreCollection {
    return this.afs.collection<Stats[]>("stats");
  }

  public updateStats(type: string, data) {
    this.afs.collection<Stats[]>("stats").doc(type).update(data);
  }
}
