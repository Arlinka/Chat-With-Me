const maxCash = (arr) => {
  if (1 <= arr.length && arr.length <= 3 * Math.pow(10, 4)) {
    for (let i = 0; i < arr.length; i++)
      if (0 >= arr[i] || arr[i] >= Math.pow(10, 4))
        return `Array item negative or exceeds ${Math.pow(10, 4)}`;
    let i = (result = buy = sell = 0);
    while (i < arr.length - 1) {
      while (i < arr.length - 1 && arr[i] >= arr[i + 1]) i++;
      if (i == arr.length - 1) break;
      buy = i++;
      while (i < arr.length && arr[i] >= arr[i - 1]) i++;
      sell = i - 1;
      result = result + arr[sell] - arr[buy];
    }
    return `Maximum profit: ${result}`;
  }
  return `Array length exceeds ${3 * Math.pow(10, 4)}`;
};

console.log(maxCash([7, 1, 5, 3, 6, 4]));
console.log(maxCash([1, 2, 3, 4, 5]));
console.log(maxCash([7, 6, 4, 3, 1]));
console.log(maxCash([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]));
console.log(maxCash([4]));
