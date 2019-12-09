// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// ##########################
// # Higher-Order Functions #
// ##########################


// Challenge 1
const addTwo = (num) => num + 2;

// To check if you've completed this function, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));


// Challenge 2
const addS = (word) => word + 's';

// Uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));


// Challenge 3
const map = (array, callback, thisArg) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const val = callback.call(thisArg, array[i], i, array);
    result.push(val);
  }
  return result;
};

console.log(map([1, 2, 3], addTwo));


// Challenge 4
const forEach = (array, callback, thisArg) => {
  for (let i = 0; i < array.length; i++) {
    callback.call(thisArg, array[i], i, array);
  }
};

// See for yourself if your forEach works!
const unary = fn => arg => fn(arg);
forEach([1, 2, 3], unary(console.log));



// Challenge 5
const mapWith = (array, callback) => {
  const result = [];
  array.forEach(el => {
    const val = callback(el);
    result.push(val);
  });
  return result;
};


// Challenge 6
const reduce = (array, callback, initialValue) => {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
};

const add = (a, b) => a + b;
console.log(reduce([1, 2, 3, 4, 5], add, 0));




// Challenge 7
const intersection = (...arrays) => {
  const calcIntersection = (arr1, arr2) => {
    const arr1Set = new Set(arr1); // to get rid of duplicates
    const arr2Set = new Set(arr2); // to make searching an O(1) operation
    return Array.from(arr1Set).filter(el => arr2Set.has(el));
  }
  return arrays.reduce(calcIntersection);
};

console.log(intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]));
// should log: [5, 15]


// Challenge 8
const union = (...arrays) => {
  const flattenedArray = arrays.flat();
  const allVals = new Set(flattenedArray);
  return [...allVals];
};

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]


// Challenge 9
const objOfMatches = (original, expected, callback) => {
  const result = {};
  for (let i = 0; i < original.length; i++) {
    const originalVal = original[i];
    const expectedVal = expected[i];
    const transformedVal = callback(original[i]);
    if (transformedVal === expectedVal) {
      result[originalVal] = expectedVal;
    }
  }
  return result;
};

console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], (str) => str.toUpperCase()));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }


// Challenge 10
const multiMap = (arrVals, arrCallbacks) => {
  const result = {};
  arrVals.forEach(el => {
    const results = arrCallbacks.map(fn => fn(el));
    result[el] = results;
  })
  return result;
};

console.log(multiMap(['catfood', 'glue', 'beer'], [(str) => str.toUpperCase(), (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(), (str) => str + str]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


// Challenge 11
const commutative = (func1, func2, value) => func1(func2(value)) === func2(func1(value));

/*** Uncomment these to check your work! ***/
const multBy3 = n => n * 3;
const divBy4 = n => n / 4;
const subtract5 = n => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false


// Challenge 12
const objFilter = (obj, callback) => {
  const reducer = (acc, [key, value]) =>
    callback(key) === value ?
      Object.assign({}, acc, {[key]: value}) :
      acc;
  return Object.entries(obj).reduce(reducer, {});
};

/*** Uncomment these to check your work! ***/
const startingObj = {
  [6]: 3,
  [2]: 1,
  [12]: 4,
};
const half = n => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }


// Challenge 13
const rating = (arrOfFuncs, value) => {
  const successfulResults = arrOfFuncs.filter(fn => fn(value));
  return 100 * successfulResults.length / arrOfFuncs.length;
};

/*** Uncomment these to check your work! ***/
const isEven = n => n % 2 === 0;
const greaterThanFour = n => n > 4;
const isSquare = n => Math.sqrt(n) % 1 === 0;
const hasSix = n => n.toString().includes('6');
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75


// Challenge 14
const pipe = (arrOfFuncs, value) => {
  const reducer = (prevResult, fn) => fn(prevResult);
  return arrOfFuncs.reduce(reducer, value);
};

/*** Uncomment these to check your work! ***/
const capitalize = str => str.toUpperCase();
const addLowerCase = str => str + str.toLowerCase();
const repeat = str => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'


// Challenge 15
const highestFunc = (objOfFuncs, subject) => {
  let result = [undefined, -Infinity];
  Object.entries(objOfFuncs).forEach(([funcName, func]) => {
    const currentMaxVal = result[1];
    const newVal = func(subject);
    if (newVal > currentMaxVal) {
      result = [funcName, newVal];
    }
  });
  return result[0];
};

/*** Uncomment these to check your work! ***/
const groupOfFuncs = {};
groupOfFuncs.double = n => n * 2;
groupOfFuncs.addTen = n => n + 10;
groupOfFuncs.inverse = n => n * -1;
console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'
