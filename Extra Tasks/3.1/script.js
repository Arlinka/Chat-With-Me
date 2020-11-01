const maxSum = (a) => {
  let sum = 0,
    result = 0;
  a.forEach((i) => {
    sum += i;
    if (sum > result) result = sum;
    if (sum < 0) sum = 0;
  });
  return `Наибольшая сумма непрерывного подмассива = ${result}`;
};

console.log(maxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
