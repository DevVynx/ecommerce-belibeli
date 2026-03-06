export function formatTime(value: number) {
  return 10 > value ? `0${value}` : value;
}
