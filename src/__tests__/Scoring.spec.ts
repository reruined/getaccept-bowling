import { describe, it, expect } from 'vitest'
import { calculateFrameScore } from '../Scoring'

describe('Scoring', () => {
  describe('calculating a frame\'s total score without a strike or spare', () => {
    it('fails if there are not exactly two thrown balls', () => {

    })
    it('returns the total number of pins knocked down', () => {
      const balls = [5, 3]
      expect(calculateFrameScore(balls)).eq(8)
    })
  })

  describe('calculating a non-terminal frame\'s total score when there is a strike', () => {
    it('fails if there is not exactly one thrown ball', () => {

    })
  })

  describe('calculating the final frame\'s total score when there is a strike', () => {
    it('fails if there are not exactly three thrown balls', () => {

    })
  })

  describe('calculating the final frame\'s total score when there is a spare', () => {
    it('fails if there are not exactly three thrown balls', () => {

    })
  })
})
