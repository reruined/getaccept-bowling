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
  }
})
