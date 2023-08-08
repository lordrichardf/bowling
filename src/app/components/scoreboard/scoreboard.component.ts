import { Component } from '@angular/core';
import { Frame } from 'src/app/models/frame';
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent {
  frameElements: number[] = Array<number>(10);
  currentFrame: number = 0;
  availableRolls: number = 2;
  gameOver: boolean = false;
  frameData: Frame[] = [];
  tempFrame: Frame = { r1: 0, r2: 0, r3: 0, frameScore: 0 };
  totalScore: number = 0;
  frameScore: number = 0;
  displayTotal: boolean = false;
  pins: number = 10;

  constructor() {}

  roll() {
    const knockedPins = Math.floor(Math.random() * this.pins + 1);

    if (!this.gameOver) {
      if (this.frameElements[this.currentFrame] === undefined) {
        this.frameElements[this.currentFrame] = knockedPins;
        this.tempFrame.r1 = knockedPins;
        this.frameScore += knockedPins;
        if (this.isStrike(knockedPins)) {
          this.resetPins();
        } else {
          this.pins -= knockedPins;
        }
        this.updateFrameData();

        this.availableRolls -= 1;
      } else {
        if (this.isStrike(knockedPins)) {
          this.resetPins();
        } else {
          this.pins -= knockedPins;
        }

        this.frameElements[this.currentFrame] += knockedPins;
        this.tempFrame.r2 = knockedPins;
        this.frameScore += knockedPins;
        this.tempFrame.frameScore = this.frameScore;
        this.updateFrameData();
        this.totalScore = this.frameScore;

        this.availableRolls -= 1;
      }

      if (this.availableRolls === 0) {
        this.resetPins();
        this.currentFrame++;
        this.tempFrame = {
          r1: 0,
          r2: 0,
          r3: 0,
          frameScore: this.frameScore,
        };

        this.availableRolls = 2;
      }
    }

    if (this.currentFrame == 10) {
      this.gameOver = true;
      this.totalScore = this.frameData[this.currentFrame].frameScore;
    }
  }

  updateFrameData() {
    this.frameData[this.currentFrame] = this.tempFrame;
  }

  isStrike(pinsKnocked: number): boolean {
    return pinsKnocked == 10;
  }

  resetPins() {
    this.pins = 10;
  }
}
