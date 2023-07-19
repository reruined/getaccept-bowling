import { describe, it, expect } from 'vitest'
import { calculateFrameScore, MAX_BALL_VALUE } from '../scoring'

/*
describe('Scoring', () => {
  // Non-terminal frames

  describe('calculating a non-terminal regular frame', () => {
    it('fails if there are not exactly two thrown balls', () => {
      expect(() => calculateFrameScore([])).toThrow();
      expect(() => calculateFrameScore([0])).toThrow();
      expect(() => calculateFrameScore([0, 0, 0])).toThrow();
      expect(() => calculateFrameScore([0, 0])).not.toThrow();
    })
    it('returns the total number of pins knocked down', () => {
      expect(calculateFrameScore([5, 3])).eq(8)
      expect(calculateFrameScore([0, 3])).eq(3)
      expect(calculateFrameScore([5, 0])).eq(5)
      expect(calculateFrameScore([0, 0])).eq(0)
    })
  })
  describe('calculating a non-terminal strike frame', () => {
    it('fails if there is not exactly one thrown ball', () => {
      expect(() => calculateFrameScore([])).toThrow();
      expect(() => calculateFrameScore([MAX_BALL_VALUE, 2])).toThrow();

      expect(() => calculateFrameScore([MAX_BALL_VALUE])).not.toThrow();
    })

  })
  describe('calculating a non-terminal spare frame', () => {
    it('fails if there are not exactly two thrown balls', () => {

    })
  })

  // Final frames

  describe('calculating a final regular frame', () => {
    it('fails if there are not exactly two thrown balls', () => {

    })
  })
  describe('calculating a final strike frame', () => {
    it('fails if there are not exactly three thrown balls', () => {

    })
  })
  describe('calculating a final spare frame', () => {
    it('fails if there are not exactly three thrown balls', () => {

    })
  })
})
*/
