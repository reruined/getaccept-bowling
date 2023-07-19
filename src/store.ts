import { reactive } from 'vue'
import { FrameData } from './FrameData'
import { FRAME_COUNT, MAX_BALL_VALUE } from './scoring'

const balls1 = [
  2, 2,
  1, 1,
  3, 3,
  4, 4,
  2, 1,
  2, 3,
  5, 4,
  1, 0,
  1, 2,
  3, 0
]

const balls2 = [
  10,
  1, 1,
  3, 3,
  4, 4,
  2, 1,
  2, 3,
  5, 4,
  1, 0,
  1, 2,
  3, 0
]

const balls3 = [
  10,
  1, 1,
  3, 3,
  7, 3,
  2, 1,
  2, 3,
  5, 4,
  1, 0,
  1, 2,
  3, 0
]

const balls4 = [
  10,
  4, 4,
  10,
  6, 1,
  5, 5,
  7, 2,
  10,
  9, 1,
  7, 2,
  3, 2
]

const balls5 = [
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10
]

const balls6 = [
  10,
  2, 1,
  5, 5,
  2, 2,
  6, 3,
  10,
  10,
  3, 7,
  0, 0,
  7, 3, 7
]

export default reactive({
  balls: [] as number[],

  isFull(): boolean {
    const frames = this.getFrames()
    return frames.length === FRAME_COUNT && frames.at(-1)!.isComplete()
  },

  addBall(ball: number) {
    console.log(`Ball #${this.balls.length} = ${ball}`)
    this.balls.push(ball)
  },

  reset() {
    this.balls.length = 0
  },

  getFrames(): FrameData[] {
    const frames = this.balls.reduce((frames, ball, ballIndex) => {
      let frame = frames.at(-1)!
      if (frame.isComplete()) {
        frames.push(new FrameData(frame.id + 1))
        frame = frames.at(-1)!
      }

      frame.balls.push(ball)
      frame.sum = frame.balls.reduce((sum, ball) => sum + ball)
      if (frame.balls[0] === MAX_BALL_VALUE) {
        if (ballIndex + 1 < this.balls.length) frame.sum += this.balls[ballIndex + 1]
        if (ballIndex + 2 < this.balls.length) frame.sum += this.balls[ballIndex + 2]
      }
      else if (frame.balls.reduce((sum, ball) => sum + ball) === MAX_BALL_VALUE) {
        if (ballIndex + 1 < this.balls.length) frame.sum += this.balls[ballIndex + 1]
      }
      if (frames.at(-2)) {
        frame.sum += frames.at(-2)!.sum
      }

      return frames
    }, [new FrameData(1)])

    return frames
  }

  /*
  getFrames(): FrameData[] {
    return this.balls.reduce((frames: FrameData[], ball: number) => {
      let frame = frames.at(-1)!
      if (frame.isComplete()) {
        frame.sum = frame.balls.reduce((sum, ball) => sum + ball)
        frames.push(new FrameData(frame.id + 1))
        frame = frames.at(-1)!
      }

      frame.balls.push(ball)
      return frames
    }, [new FrameData(1)])
  }
  */
  /*
  getFrames(): FrameData[] {
    const ballQueue = this.balls.slice()
    const frames = []
    let frame = new FrameData(1)
    while (ballQueue.length && frames.length < FRAME_COUNT) {
      const ball = ballQueue.shift()
      
      if(frame.isComplete()) {
        frames.push(frame)
        frame = new FrameData(frame.id + 1)
      }
    }

    return frames
  }
  */
})