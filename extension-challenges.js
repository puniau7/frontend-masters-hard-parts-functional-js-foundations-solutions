// ##########################
// # Extension Challenges   #
// ##########################


// Challenge 1
const functionValidator = (funcArr, input, output) => {
  const reducer = (acc, fn) => {
    if (fn(input) === output) {
      acc.push(fn);
    }
    return acc;
  }
  return funcArr.reduce(reducer, []);
}

const addFive = num => num + 5;
const multiplyByTwo = num => num * 2;
const subtractOne = num => num - 1;
const fnArr = [addFive, multiplyByTwo, subtractOne];

console.log(functionValidator(fnArr, 5, 10)) // should log [num => num + 5, num => num * 2]


// Challenge 2
const allClear = (funcArr, value) => {
  const reducer = (hasPassedSoFar, fn) => hasPassedSoFar && fn(value);
  return funcArr.reduce(reducer, true);
}

const isOdd = num => num % 2 === 1;
const isPositive = num => num > 0;
const multipleOfFive = num => num % 5 === 0;
const numFnArr = [isOdd, isPositive, multipleOfFive];
console.log(allClear(numFnArr, 25)) // should log true
console.log(allClear(numFnArr, -25)) // should log false


// Challenge 3
const numSelectString = (numArr) => {
  const filtered = numArr.filter(isOdd);
  filtered.sort((a, b) => a - b);
  return filtered.join(', ');
}

const nums = [17, 34, 3, 12]
console.log(numSelectString(nums)) // should log "3, 17"

// Challenge 4
const movieSelector = (moviesArr) => {
  const hasScoreGreaterThan5 = movie => movie.score > 5;
  const titleToUppercase = ({title}) => title.toUpperCase();
  return moviesArr
    .filter(hasScoreGreaterThan5)
    .map(titleToUppercase);
}

const movies = [ { id: 1, title: "Pan's Labyrinth", score: 9 }, { id: 37, title: "Manos: The Hands of Fate", score: 2 }, { title: "Air Bud", score: 5 }, { title: "Hackers", score: 7 } ]
console.log(movieSelector(movies)) // should log [ "PAN'S LABYRINTH", "HACKERS" ]



// Challenge 5
const curriedAddThreeNums = num1 => num2 => num3 => num1 + num2 + num3;

console.log(curriedAddThreeNums(3)(-1)(1)); // should log 3


// Challenge 6
const curriedAddTwoNumsToFive = curriedAddThreeNums(5);

console.log(curriedAddTwoNumsToFive(6)(7)) // should log 18
