/**
 * first param is function and second param is delay in milliseconds, returns that function debounced
 * */
export default function debouncer<T extends unknown[]>(
  fn: (...params: T) => void,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...params: T) => {
    //if function has been called before, clear that
    if (timeoutId) clearTimeout(timeoutId);

    //call again
    timeoutId = setTimeout(() => {
      fn(...params);
    }, delay);
  };
}
