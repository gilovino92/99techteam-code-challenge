export const sum_to_n_a = (n: number) => {
  if (n < 0) return 0;
  if (n >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

