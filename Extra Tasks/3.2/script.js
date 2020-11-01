const maxCash = (arr, start = 0, end = arr.length) => {
  if (end <= start) return 0;

  if (end > 3 * Math.pow(10, 4))
    return `Array length exceeds ${3 * Math.pow(10, 4)}`;

  for (let i = start; i < end; i++)
    if (arr[i] < 0 || arr[i] > Math.pow(10, 4))
      return `Array item negative or exceeds ${Math.pow(10, 4)}`;

  let cash = 0,
    curr_cash = 0;

  for (let i = start; i < end; i++) {
    for (let j = i + 1; j <= end; j++) {
      if (arr[j] > arr[i]) {
        curr_cash =
          arr[j] -
          arr[i] +
          maxCash(arr, start, i - 1) +
          maxCash(arr, j + 1, end);
        if (curr_cash > cash) cash = curr_cash;
      }
    }
  }
  return cash;
};

console.log("Максимальная прибыль = " + maxCash([7, 1, 5, 3, 6, 4]));
