import { FRAME_COUNT, rollsInFrame, type Roll } from './scoring'

export class FrameData {
  readonly id: number
  rolls: Roll[]
  sum: number | null

  constructor(id: number) {
    this.id = id
    this.rolls = []
    this.sum = null
  }

  isComplete(): boolean {
    return rollsInFrame(this.rolls, this.isLastFrame()) === this.rolls.length
  }

  isLastFrame(): boolean {
    return this.id === FRAME_COUNT
  }
}
