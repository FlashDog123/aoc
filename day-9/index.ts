import * as fs from "fs";

const loadInput = (): number[] => {
  const rawActions = fs.readFileSync("input.txt", "utf8")
    .split('\n')
    .filter((action) => action);
  const numbers = rawActions.map((rawNumber) => +rawNumber.trim());
  return numbers;
};

function findCorruptedNumber(startNumber = 25): number {
  const numbers = loadInput();

  for (let index = startNumber; index < numbers.length; index++) {
    const requiredOutCome = numbers[index];

    if (!findOutcome(index, startNumber)) {
      return requiredOutCome;
    }
  }
  return null;
}

function findOutcome(index: number, startNumber: number): boolean {
  const numbers = loadInput();
  const slicedNumbers = numbers.slice(index - startNumber, index);

  for (let leftIndex = 0; leftIndex < slicedNumbers.length; leftIndex++) {
    const leftNumber = slicedNumbers[leftIndex];

    for (let rightIndex = 0; rightIndex < slicedNumbers.length; rightIndex++) {
      const rightNumber = slicedNumbers[rightIndex];

      if (leftNumber + rightNumber === numbers[index]) {
        return true;
      }
    }
  }
  return false;
}

function findCorruptedRange(startNumber: number): Set<any> {
  const corruptedNumber = findCorruptedNumber(startNumber);
  const numbers = loadInput();

  for (let index = 0; index < numbers.length; index++) {
    let tempTotal = 0;
    const possibleNumbers = new Set();

    for (let innerIndex = 0; innerIndex < numbers.length; innerIndex++) {
      tempTotal += numbers[index + innerIndex];
      possibleNumbers.add(numbers[index + innerIndex]);

      if (tempTotal > corruptedNumber) {
        break;
      } else if (tempTotal === corruptedNumber) {
        return possibleNumbers;
      }
    }
  }
  return new Set();
}

function calculateCorruptedRange(startNumber = 25): number {
  const corruptedRange = Array.from(findCorruptedRange(startNumber)).sort(function (a, b) {
    return a - b;
  });

  return corruptedRange[0] + corruptedRange[corruptedRange.length - 1];
}

console.log(findCorruptedNumber());
console.log(calculateCorruptedRange());
