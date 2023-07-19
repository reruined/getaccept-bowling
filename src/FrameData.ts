/*export class FrameData {
  readonly id: number;
  balls: number[];
  sum: number;
}*/

import { FRAME_COUNT, MAX_BALL_VALUE } from "./scoring"

export class FrameData {
  readonly id: number
  balls: number[]
  sum: number

  constructor(id: number) {
    this.id = id
    this.balls = []
    this.sum = 0
  }

  isComplete(): boolean {
    if (this.isLastFrame()) {
      // spare
      if (this.balls.length >= 2 && this.balls.reduce((sum, ball) => sum + ball) >= MAX_BALL_VALUE) {
        return this.balls.length === 3
      }

      // strike
      if (this.balls.length >= 1 && this.balls[0] >= MAX_BALL_VALUE) {
        return this.balls.length === 3
      }
    }

    // strike
    if (this.balls.length === 1 && this.balls[0] === MAX_BALL_VALUE) {
      return true
    }

    // regular
    return this.balls.length === 2
  }

  isLastFrame(): boolean {
    return this.id === FRAME_COUNT
  }
}