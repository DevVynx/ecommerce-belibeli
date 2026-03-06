export const debounce = (
  func: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (
    ...args: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
