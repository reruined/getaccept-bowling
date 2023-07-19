import { describe, it, expect } from 'vitest'
import { isStrike, isSpare, rollsInFrame, rollsRequiredForScore, pinsRemaining, splitIntoFrameData, calculateScore, MAX_PINS, type Roll, STRIKE_VALUE, SPARE_VALUE } from '../scoring'

describe('isStrike()', () => {
  it('should identify when the next frame contains a strike', () => {
    expect(isStrike([10])).toBe(true)
    expect(isStrike([10, 5])).toBe(true)
    expect(isStrike([0, 10])).toBe(false)
    expect(isStrike([5, 5])).toBe(false)
  })
})

describe('isSpare()', () => {
  it('should identify when the next frame contains a spare', () => {
    expect(isSpare([0, 10])).toBe(true)
    expect(isSpare([3, 7])).toBe(true)
    expect(isSpare([7, 3])).toBe(true)
    expect(isSpare([10, 0])).toBe(false)
  })
})

describe('rollsInFrame()', () => {
  it('should return 1 for a strike in a non-terminal frame', () => {
    expect(rollsInFrame([10])).toBe(1)
  })
  it('should return 3 for a strike in the last frame', () => {
    expect(rollsInFrame([10], true)).toBe(3)
  })
  it('should return 2 for a spare in a non-terminal frame', () => {
    expect(rollsInFrame([6, 4])).toBe(2)
  })
  it('should return 3 for a spare in the last frame', () => {
    expect(rollsInFrame([6, 4, 5], true)).toBe(3)
  })
  it('should return 2 for a regular frame', () => {
    expect(rollsInFrame([3, 2])).toBe(2)
    expect(rollsInFrame([3, 2], true)).toBe(2)
  })
})

describe('rollsRequiredForScore()', () => {
  it('should return 3 for a strike', () => {
    expect(rollsRequiredForScore([10])).toBe(3)
  })
  it('should return 3 for a spare', () => {
    expect(rollsRequiredForScore([8, 2])).toBe(3)
  })
  it('should return 2 for a regular frame', () => {
    expect(rollsRequiredForScore([1, 4])).toBe(2)
  })
})

describe('pinsRemaining()', () => {
  it('should return max for an empty frame', () => {
    expect(pinsRemaining([])).toBe(MAX_PINS)
  })
  it('should return the amount of remaining pins after a roll', () => {
    expect(pinsRemaining([3])).toBe(MAX_PINS - 3)
    expect(pinsRemaining([0])).toBe(MAX_PINS - 0)
    expect(pinsRemaining([10])).toBe(MAX_PINS - 10)
  })

  describe('for the last frame', () => {
    it('should return max for an empty frame', () => {
      expect(pinsRemaining([], true)).toBe(MAX_PINS)
    })
    it('should return max after a strike', () => {
      expect(pinsRemaining([10], true)).toBe(MAX_PINS)
      expect(pinsRemaining([10, 10], true)).toBe(MAX_PINS)
    })
    it('should return max after a spare', () => {
      expect(pinsRemaining([5, 5], true)).toBe(MAX_PINS)
      expect(pinsRemaining([0, 10], true)).toBe(MAX_PINS)
    })
    it('should return the remaining pins after a regular roll', () => {
      expect(pinsRemaining([3], true)).toBe(MAX_PINS - 3)
      expect(pinsRemaining([10, 4], true)).toBe(MAX_PINS - 4)
    })
  })
})

describe('splitIntoFrameData()', () => {
  it('should split a sequence of rolls into complete frames', () => {
    {
      const rolls = [
        5, 4,
        3, 2,
        5, 5,
        10,
        10,
        0, 10,
        3, 4,
        0, 2,
        10,
        2, 8, 10
      ] as Roll[]
      const frames = splitIntoFrameData(rolls)
      expect(frames.length).toBe(10)
      expect(frames[0].rolls).toEqual([5, 4])
      expect(frames[1].rolls).toEqual([3, 2])
      expect(frames[2].rolls).toEqual([5, 5])
      expect(frames[3].rolls).toEqual([10])
      expect(frames[4].rolls).toEqual([10])
      expect(frames[5].rolls).toEqual([0, 10])
      expect(frames[6].rolls).toEqual([3, 4])
      expect(frames[7].rolls).toEqual([0, 2])
      expect(frames[8].rolls).toEqual([10])
      expect(frames[9].rolls).toEqual([2, 8, 10])
    }
    {
      const rolls = [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        1, 1
      ] as Roll[]
      const frames = splitIntoFrameData(rolls)
      expect(frames.length).toBe(10)
      expect(frames[0].rolls).toEqual([10])
      expect(frames[1].rolls).toEqual([10])
      expect(frames[2].rolls).toEqual([10])
      expect(frames[3].rolls).toEqual([10])
      expect(frames[4].rolls).toEqual([10])
      expect(frames[5].rolls).toEqual([10])
      expect(frames[6].rolls).toEqual([10])
      expect(frames[7].rolls).toEqual([10])
      expect(frames[8].rolls).toEqual([10])
      expect(frames[9].rolls).toEqual([1, 1])
    }
  })
})

describe('calculateScore()', () => {
  it('should properly calculate a regular frame', () => {
    expect(calculateScore([
      0, 0
    ])).toBe(0)
    expect(calculateScore([
      3, 4,
    ])).toBe(7)
    expect(calculateScore([
      3, 4,
      5, 0
    ])).toBe(7)
  })
  it('should properly calculate a strike', () => {
    expect(calculateScore([
      STRIKE_VALUE,
      5, 2
    ])).toBe(17)
  })
  it('should properly calculate a spare', () => {
    expect(calculateScore([
      5, 5,
      5, 2
    ])).toBe(15)
  })
  it('should return null for incomplete frames', () => {
    expect(calculateScore([

    ])).toBe(null)
    expect(calculateScore([
      3,
    ])).toBe(null)
    expect(calculateScore([
      10,
      10
    ])).toBe(null)
    expect(calculateScore([
      5, 5
    ])).toBe(null)
  })
})