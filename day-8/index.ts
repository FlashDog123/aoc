import * as fs from "fs";

enum actionTypes {
  acc = 'acc',
  jmp = 'jmp',
  nop = 'nop'
}

const loadInput = () => {
  const rawActions = fs.readFileSync("input.txt", "utf8")
    .split('\n')
    .filter((action) => action)
  const actions = rawActions.map((rawAction) => {
    const splittedAction = rawAction.split(' ');
    return { type: splittedAction[0].trim(), amount: +splittedAction[1].trim() }
  });
  return actions;
};

function loopList() {
  let actions = loadInput();
  let accumulator = 0;
  let uniqueIndexes = new Set([]);
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    if (uniqueIndexes.has(index)) {
      break;
    }
    uniqueIndexes.add(index);

    if (action.type === actionTypes.acc) {
      accumulator += action.amount;
    }

    if (action.type === actionTypes.jmp) {
      index += action.amount - 1;
    }
  }
  return accumulator;
}

console.log(loopList());
