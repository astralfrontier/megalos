export function rollDie(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

export function plusOrMinus(value: number): string {
    return (value > 0) ? `+${value}` : `${value}`
  }