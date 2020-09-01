export const randomNumber = (length: number): number => {
  return Math.floor(Math.random() * (Math.pow(10, length) - 1)) + 1
}
