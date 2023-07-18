const MAX_BALL_VALUE = 10
const MIN_BALL_VALUE = 0;
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

function isStrike(ball: number) {
  return ball === MAX_BALL_VALUE;
}

function isValidBall(ball: number) {
  return ball >= MIN_BALL_VALUE && ball <= MAX_BALL_VALUE;
}

function sum(acc: number, val: number) {
  return acc + val
}

function getFrameStatus(balls: Array<number>) {
  if (balls.length === 0) return FrameStatus.Empty
  if (balls[0] === MAX_BALL_VALUE) return FrameStatus.Strike
  if (balls.reduce(sum, 0) === MAX_BALL_VALUE) return FrameStatus.Spare
  if (balls.length === 1) return FrameStatus.InProgress
  if (balls.length === 2) return FrameStatus.Regular

  return FrameStatus.Invalid
}

function calculateFrameScore(balls: Array<number>) {
  const status = getFrameStatus(balls)
  console.log(status)
  switch (status) {
    case FrameStatus.InProgress:
      throw new Error('Expected a complete frame')
      break;
    case FrameStatus.Regular:
      return balls.reduce(sum, 0)
      break;
    case FrameStatus.Strike:
      if (balls.length !== 1) {
        throw new Error('Expected no addditional balls after a strike')
      }
      break;
    case FrameStatus.Empty:
      throw new Error('Expected one or more balls')
      break;
    case FrameStatus.Invalid:
      throw new Error('Expected a valid frame')
      break;
  }

  return null;
}

export {
  calculateFrameScore,
  MAX_BALL_VALUE,
  MAX_PINS,
  FRAME_COUNT
}