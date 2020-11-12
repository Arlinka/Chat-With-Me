const add = (arg1, arg2) => {
  if (!isNaN(+arg1) && !arg2) {
    return function (arg2) {
      return arg2 + arg1;
    };
  }
  if (!isNaN(+arg1) && !isNaN(+arg2)) return arg1 + arg2;
  return 0;
};

const sub = (arg1, arg2) => {
  if (!isNaN(+arg1) && !arg2) {
    return function (arg2) {
      return arg2 > arg1 ? arg2 - arg1 : arg1 - arg2;
    };
  }
  if (!isNaN(+arg1) && !isNaN(+arg2))
    return arg2 > arg1 ? arg2 - arg1 : arg1 - arg2;
  return 0;
};

const mul = (arg1, arg2) => {
  if (!isNaN(+arg1) && !arg2) {
    return function (arg2) {
      return arg1 * arg2;
    };
  }
  if (!isNaN(+arg1) && !isNaN(+arg2)) return arg1 * arg2;
  return 0;
};

const div = (arg1, arg2) => {
  if (!isNaN(+arg1) && !arg2) {
    return function (arg2) {
      return arg2 > arg1 ? arg2 / arg1 : arg1 / arg2;
    };
  }
  if (!isNaN(+arg1) && !isNaN(+arg2))
    return arg2 > arg1 ? arg2 / arg1 : arg1 / arg2;
  return 0;
};

const pipe = function () {
  const elements = arguments;

  return function (arg1) {
    let result = arg1;
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      const oldValue = result;
      result = item(oldValue);
    }
    return result;
  };
};

let a = add(1, 2);
console.log(a, "a");
let b = mul(a, 10);
console.log(b, "b");

let sub1 = sub(1);
let c = sub1(b);
console.log(c, "c");

let d = mul(sub(a, 1))(c);
console.log(d, "d");

let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0);
console.log(result, "result");

console.log(pipe(add(1), mul(2))(3), "result");
