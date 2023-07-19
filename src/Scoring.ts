import { FrameData } from './FrameData'

type Roll = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const STRIKE_VALUE = 10
const SPARE_VALUE = 10
const MAX_PINS = 10
const FRAME_COUNT = 10

function isStrike(rolls: Roll[]): boolean {
  return rolls.length >= 1 && rolls[0] === STRIKE_VALUE
}

function isSpare(rolls: Roll[]): boolean {
  return (
    rolls.length >= 2 &&
    rolls[0] < STRIKE_VALUE &&
    rolls[0] + rolls[1] === SPARE_VALUE
  )
}

function sum(acc: number, roll: Roll): number {
  return acc + roll
}

function rollsInFrame(rolls: Roll[], isLastFrame: boolean = false) {
  if (isStrike(rolls)) return isLastFrame ? 3 : 1
  if (isSpare(rolls)) return isLastFrame ? 3 : 2

  return 2
}

function rollsRequiredForScore(rolls: Roll[]) {
  if (isStrike(rolls)) return 3
  if (isSpare(rolls)) return 3
  return 2
}

function pinsRemaining(rolls: Roll[], isLastFrame: boolean = false): number {
  if (rolls.length === 0) return MAX_PINS

  if (isLastFrame) {
    if (isSpare(rolls)) return MAX_PINS
    if (rolls.at(-1) === STRIKE_VALUE) return MAX_PINS
    if (rolls.length === 2) return MAX_PINS - rolls[1]
  }

  return MAX_PINS - rolls[0]
}

function calculateScore(rolls: Roll[]): number | null {
  const rollsRequired = rollsRequiredForScore(rolls)
  if (rolls.length < rollsRequired) return null

  return rolls.slice(0, rollsRequired).reduce(sum, 0)
}

function splitIntoFrameData(rolls: Roll[]): FrameData[] {
  return rolls.reduce(
    (frames, roll, rollIndex) => {
      let frame = frames.at(-1)!
      if (frame.isComplete()) {
        frames.push(new FrameData(frame.id + 1))
        frame = frames.at(-1)!
      }

      // the strange index arithmetic makes sure that the frame's existing rolls are included in the calculation
      frame.sum = calculateScore(rolls.slice(rollIndex - frame.rolls.length))
      frame.rolls.push(roll)
      if (frame.sum !== null) {
        const prevFrame = frames.at(-2)
        if (prevFrame && prevFrame.sum !== null) frame.sum += prevFrame.sum
      }

      return frames
    },
    [new FrameData(1)]
  )
}

export {
  type Roll,
  STRIKE_VALUE,
  SPARE_VALUE,
  MAX_PINS,
  FRAME_COUNT,
  isStrike,
  isSpare,
  rollsInFrame,
  rollsRequiredForScore,
  pinsRemaining,
  splitIntoFrameData,
  calculateScore
}
