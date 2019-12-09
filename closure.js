// ###########
// # Closure #
// ###########


// Challenge 1
const createFunction = () => {
  const logHello = () => console.log('hello');
  return logHello;
};

// UNCOMMENT THESE TO TEST YOUR WORK!
const function1 = createFunction();
function1();


// Challenge 2
const createFunctionPrinter = (input) => {
  const logInput = () => console.log(input);
  return logInput;
};

// UNCOMMENT THESE TO TEST YOUR WORK!
const printSample = createFunctionPrinter('sample');
printSample();
const printHello = createFunctionPrinter('hello');
printHello();


// Challenge 3
const outer = () => {
  let counter = 0; // this variable is outside incrementCounter's scope
  const incrementCounter = () => {
    counter++;
    console.log('counter', counter);
  }
  return incrementCounter;
};

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();


// Challenge 4
const addByX = x => {
  const addX = y => x + y;
  return addX;
};

const addByTwo = addByX(2);

// now call addByTwo with an input of 1
console.log(addByTwo(1));


// now call addByTwo with an input of 2
console.log(addByTwo(2));


// Challenge 5
const once = (func) => {
  let hasRun = false;
  let result;
  const runOnce = (...args) => {
    if (!hasRun) {
      hasRun = true;
      result = func(...args);
    }
    return result;
  }
  return runOnce;
};

const onceFunc = once(addByTwo);

// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(onceFunc(4));  //should log 6
console.log(onceFunc(10));  //should log 6
console.log(onceFunc(9001));  //should log 6


// Challenge 6
const after = (count, func) => {
  let timesCalled = 0;
  const runAfter = (...args) => {
    timesCalled++;
    if (timesCalled >= count) {
      return func(...args);
    }
  }
  return runAfter;
};

const called = () => console.log('hello');
const afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed


// Challenge 7
const delay = (func, wait, ...args) => {
  const execute = () => func(...args);
  setTimeout(execute, wait);
};

delay(console.log, 1000, 'Hello with delay');

// Challenge 8
const russianRoulette = (num) => {
  let count = 0;
  const attempt = () => {
    count++;
    if (count < num) {
      return 'click';
    } else if (count === num) {
      return 'bang';
    } else {
       return 'reload to try again';
    }
  }
  return attempt;
};

// /*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'bang'
console.log(play()); // should log: 'reload to play again'
console.log(play()); // should log: 'reload to play again'


// Challenge 9
const average = () => {
  const nums = [];
  const add = (x, y) => x + y;
  const calcAverage = num => {
    if (num !== undefined) {
      nums.push(num);
    }
    const total = nums.reduce(add, 0);
    return total / nums.length || 0;
  }
  return calcAverage;
};

/*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // should log: 0
console.log(avgSoFar(4)); // should log: 4
console.log(avgSoFar(8)); // should log: 6
console.log(avgSoFar()); // should log: 6
console.log(avgSoFar(12)); // should log: 8
console.log(avgSoFar()); // should log: 8


// Challenge 10
const makeFuncTester = (arrays) => {
  const test = fn => {
    const reducer = (hasPassedSoFar, [original, expected]) =>
      hasPassedSoFar && fn(original) === expected;
    return arrays.reduce(reducer, true);
  };
  return test;
};

/*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(['hello', 'hellO']);
capLastTestCases.push(['goodbye', 'goodbyE']);
capLastTestCases.push(['howdy', 'howdY']);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = str => str.toUpperCase();
const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // should log: false
console.log(shouldCapitalizeLast(capLastAttempt2)); // should log: true


// Challenge 11
const makeHistory = (limit) => {
  const strings = [];
  const getLastString = () => strings[strings.length-1];
  const applyLimit = () => {
    if (strings.length > limit) {
      strings.shift();
    }
  }

  const addString = str => {
    if (str === 'undo') {
      return `${strings.pop() || ''} undone`;
    } else {
      strings.push(str);
      applyLimit();
      return `${getLastString()} done`;
    }
  }
  return addString;
};

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions('jump')); // should log: 'jump done'
console.log(myActions('undo')); // should log: 'jump undone'
console.log(myActions('walk')); // should log: 'walk done'
console.log(myActions('code')); // should log: 'code done'
console.log(myActions('pose')); // should log: 'pose done'
console.log(myActions('undo')); // should log: 'pose undone'
console.log(myActions('undo')); // should log: 'code undone'
console.log(myActions('undo')); // should log: 'nothing to undo'


// Challenge 12
const blackjack = (array) => {
  const sumArray = (arr) => arr.reduce((x, y) => x + y, 0);
  let count = 0;

  const deal = (num1, num2) => {
    const playerVals = [];
    let isBust = false;
    let hasHadInitialHand = false;

    const play = () => {
      if (isBust) {
        return 'You are done';
      }
      if (!hasHadInitialHand) {
        playerVals.push(num1, num2);
        hasHadInitialHand = true;
      } else {
        playerVals.push(array[count]);
        count++;
      }

      const sum = sumArray(playerVals);
      if (sum > 21) {
        isBust = true;
        return 'Bust';
      }
      return sum;
    };
    return play;
  };
  return deal;
};

/*** Uncomment these to check your work! ***/

/*** DEALER ***/
const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);

/*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // should log: 9
console.log(i_like_to_live_dangerously()); // should log: 11
console.log(i_like_to_live_dangerously()); // should log: 17
console.log(i_like_to_live_dangerously()); // should log: 18
console.log(i_like_to_live_dangerously()); // should log: 'bust'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'

/*** BELOW LINES ARE FOR THE BONUS ***/

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // should log: 4
console.log(i_TOO_like_to_live_dangerously()); // should log: 15
console.log(i_TOO_like_to_live_dangerously()); // should log: 19
console.log(i_TOO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // should log: 10
console.log(i_ALSO_like_to_live_dangerously()); // should log: 13
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!
