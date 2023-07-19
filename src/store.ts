import { reactive } from 'vue'
import { FRAME_COUNT, type Roll, splitIntoFrameData } from './scoring'

export default reactive({
  rolls: [] as Roll[],

  isFull(): boolean {
    const frames = splitIntoFrameData(this.rolls)
    return frames.length === FRAME_COUNT && frames.at(-1)!.isComplete()
  },

  addRoll(roll: Roll) {
    if (this.isFull()) return

    console.log(`Roll #${this.rolls.length} = ${roll}`)
    this.rolls.push(roll)
  },

  reset() {
    this.rolls.length = 0
  },

  /*
  getFrames(): FrameData[] {
    const frames = this.rolls.reduce((frames, roll, rollIndex) => {
      let frame = frames.at(-1)!
      if (frame.isComplete()) {
        frames.push(new FrameData(frame.id + 1))
        frame = frames.at(-1)!
      }

      frame.rolls.push(roll)
      frame.sum = frame.rolls.reduce((sum: number, roll: Roll) => sum + (roll as number), 0)
      if (frame.rolls[0] === STRIKE_VALUE) {
        if (rollIndex + 1 < this.rolls.length) frame.sum += this.rolls[rollIndex + 1]
        if (rollIndex + 2 < this.rolls.length) frame.sum += this.rolls[rollIndex + 2]
      }
      else if (frame.rolls.reduce((sum: number, roll: Roll) => sum + (roll as number), 0) === STRIKE_VALUE) {
        if (rollIndex + 1 < this.rolls.length) frame.sum += this.rolls[rollIndex + 1]
      }
      if (frames.at(-2)) {
        frame.sum += frames.at(-2)!.sum
      }

      return frames
    }, [new FrameData(1)])

    for (let i = frames.length; i < FRAME_COUNT; i++) {
      frames.push(new FrameData(i + 1))
    }

    return frames
  }
  */

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