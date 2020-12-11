import * as fs from "fs";

const loadInput = (): number[] => {
  const rawActions = fs.readFileSync("input.txt", "utf8")
    .split('\n')
    .filter((action) => action);
  const numbers = rawActions.map((rawNumber) => +rawNumber.trim()).sort(function (a, b) {
    return a - b;
  });
  return numbers;
};

function findJoltCount(): number {
  const numbers = loadInput();
  let oneJolt = 1;
  let threeJolt = 1;
  for (let index = 0; index < numbers.length; index++) {
    const jolt = numbers[index];

    if (jolt - numbers[index - 1] === 1) {
      oneJolt++;
    } else if (jolt - numbers[index - 1] === 3) {
      threeJolt++;
    }
  }
  return oneJolt * threeJolt;
}

console.log(findJoltCount());
// console.log(calculateCorruptedRange());
