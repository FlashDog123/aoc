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

function loopList(stopOnUnique: boolean, actions = null) {
  if (!actions) {
    actions = loadInput();
  }
  let accumulator = 0;
  let uniqueIndexes = new Set([]);
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    if (uniqueIndexes.has(index)) {
      if (stopOnUnique) {
        return null;
      } else {
        return accumulator;
      }
    }

    uniqueIndexes.add(index);

    if (action.type === actionTypes.acc) {
      accumulator += action.amount;
    }

    if (action.type === actionTypes.jmp) {
      index += action.amount - 1;
    }
    if (index > actions.length || index < 0) {
      break;
    }
  }
  return accumulator;
}

function checkLoop() {
  let actions = loadInput();
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];

    if (action.type === actionTypes.jmp) {
      action.type = actionTypes.nop;
    } else if (action.type === actionTypes.nop) {
      action.type = actionTypes.jmp;
    } else {
      continue;
    }

    actions[index] = action;

    const result = loopList(true, actions);

    if (result !== null && result !== 0) {
      return result;
    }

    actions = loadInput();
  }
  return null
}

console.log(loopList(false));
console.log(checkLoop());
