import { describe, it, expect } from 'vitest'
import { FrameData } from '@/FrameData'
import { FRAME_COUNT, STRIKE_VALUE } from '@/scoring'

describe('isComplete()', () => {
  it('should return true when the frame contains a strike', () => {
    const frame = new FrameData(1)
    frame.balls.push(STRIKE_VALUE)
    expect(frame.isComplete()).toBe(true)
  })


  describe('for the last frame', () => {
    it('should return true when the frame contains a strike and has 3 rolls', () => {
      const frame = new FrameData(FRAME_COUNT)
      frame.balls.push(STRIKE_VALUE)
      expect(frame.isComplete()).toBe(false)

      frame.balls.push(STRIKE_VALUE)
      expect(frame.isComplete()).toBe(false)

      frame.balls.push(3)
      expect(frame.isComplete()).toBe(true)
    })
  })

})

describe('isLastFrame()', () => {
  it('should return true for the last frame', () => {
    expect(new FrameData(FRAME_COUNT).isLastFrame()).toBe(true)
  })
  it('should return false for non-terminal frames', () => {
    expect(new FrameData(1).isLastFrame()).toBe(false)
    expect(new FrameData(FRAME_COUNT - 1).isLastFrame()).toBe(false)
  })
})