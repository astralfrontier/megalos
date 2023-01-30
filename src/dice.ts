export default function rollDie(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}