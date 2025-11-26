export function buildArray() {
  const numbers = [3, 5, 8, 13];
  numbers.push(21);
  const third = numbers[2];
  return { numbers, third };
}
