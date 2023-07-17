export const MAX_BALL_SCORE = 10;

export function isStrike(ball: number) {
  return ball === MAX_BALL_SCORE;
}

export function calculateFrameScore(balls: Array<number>) {
  if (balls.length === 0) return 0;
  if (isStrike(balls[0]) && balls.length !== 1) {
    throw new Error("Expected a single ball in a strike")
  }
  return balls.reduce((acc, val) => acc + val, 0);
}