type Roll = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const STRIKE_VALUE = 10
const SPARE_VALUE = 10
const MAX_PINS = 10;
const FRAME_COUNT = 10;

enum FrameStatus {
  Empty,
  InProgress,
  Regular,
  Strike,
  Spare,
  Invalid
}

function isStrike(rolls: Roll[]): boolean {
  return rolls.length >= 1 && rolls[0] === STRIKE_VALUE
}

function isSpare(rolls: Roll[]): boolean {
  return rolls.length >= 2 && rolls[0] < STRIKE_VALUE && (rolls[0] + rolls[1]) === SPARE_VALUE
}

function sum(acc: number, val: number) {
  return acc + val
}

function getFrameStatus(balls: Array<number>) {
  if (balls.length === 0) return FrameStatus.Empty
  if (balls[0] === STRIKE_VALUE) return FrameStatus.Strike
  if (balls.reduce(sum, 0) === STRIKE_VALUE) return FrameStatus.Spare
  if (balls.length === 1) return FrameStatus.InProgress
  if (balls.length === 2) return FrameStatus.Regular

  return FrameStatus.Invalid
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
/*
function getMaxPins() {
  const activeFrame = getActiveFrame()

  if (activeFrame.isLastFrame()) {
    if (activeFrame.balls.length >= 1 && (activeFrame.balls[0] === MAX_BALL_VALUE || activeFrame.balls.reduce((sum, ball) => sum + ball) === MAX_BALL_VALUE)) {
      return MAX_PINS
    }
  }
  if (!activeFrame.isComplete() && activeFrame.balls.length > 0) {
    return MAX_PINS - activeFrame.balls[0]
  }

  return MAX_PINS
}
*/

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
  pinsRemaining
}