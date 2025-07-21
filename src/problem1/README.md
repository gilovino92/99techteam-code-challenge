# Sum to N Functions

This module provides three different implementations to calculate the sum of all integers from 1 to `n` in TypeScript. Each function handles edge cases and returns the sum as a number.

## Functions

### `sum_to_n_a(n: number)`
Calculates the sum of integers from 1 to `n` using an iterative approach.

- **Parameters**:
  - `n`: A number representing the upper limit of the summation.
- **Returns**: The sum of integers from 1 to `n`. Returns `0` if `n < 0` and `Number.MAX_SAFE_INTEGER` if `n` exceeds safe integer limits.
- **Implementation**: Uses a `for` loop to iteratively add numbers from 1 to `n`.
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

### `sum_to_n_b(n: number)`
Calculates the sum of integers from 1 to `n` using the Gauss's formula.

- **Parameters**:
  - `n`: A number representing the upper limit of the summation.
- **Returns**: The sum of integers from 1 to `n`. Returns `0` if `n < 0` and `Number.MAX_SAFE_INTEGER` if `n` exceeds safe integer limits.
- **Implementation**: Uses the formula `(n * (n + 1)) / 2` for efficient computation.
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### `sum_to_n_c(n: number)`
Calculates the sum of integers from 1 to `n` using a recursive approach.

- **Parameters**:
  - `n`: A number representing the upper limit of the summation.
- **Returns**: The sum of integers from 1 to `n`. Returns `0` if `n` is `0` and `Number.MAX_SAFE_INTEGER` if `n` exceeds safe integer limits.
- **Implementation**: Recursively adds `n` to the sum of integers from 1 to `n-1`.
- **Time Complexity**: O(n)
- **Space Complexity**: O(n) due to the recursive call stack.


## Notes
- All functions handle edge cases:
  - Negative inputs return `0`.
  - Inputs exceeding `Number.MAX_SAFE_INTEGER` return `Number.MAX_SAFE_INTEGER`.
- `sum_to_n_b` is the most efficient for large inputs due to its O(1) time complexity.
- `sum_to_n_c` may cause stack overflow for very large `n` due to recursion.