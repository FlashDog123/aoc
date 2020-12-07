import * as fs from "fs";

const loadInput = () => {
  const file = fs.readFileSync("input.txt", "utf8");
  const bagRules = file.split("\n");
  return bagRules;
};

let bagHash = {};
let bags = loadInput()
  .filter((bag) => bag)
  .map((containingBags) => {
    const [outerBag, innerBagsRaw] = containingBags.split(" bags contain ");

    const color = outerBag.trim();
    const innerBags = innerBagsRaw.split(", ").map((inner) => {
      return handleInnerBagData(inner);
    }).filter((innerBag) => innerBag);

    let bag = { color, innerBags };
    bagHash[color] = bag;
    return bag;
  });

function findBagCount(input) {
  let bagsToCheck = [];
  let childBags = getChildBags(input);
  bagsToCheck = bagsToCheck.concat(childBags);

  bagsToCheck.forEach((childBag) => {
    let foundBags = findBagCount(childBag.color);
    if (foundBags && foundBags.length) {
      bagsToCheck = bagsToCheck.concat(foundBags);
      bagsToCheck = [...new Set(bagsToCheck)];
    }
  });
  return bagsToCheck;
}

function getChildBags(input) {
  const returnBags = bags.filter((bag) => {
    return bag.innerBags.some((innerBag) => {
      return (innerBag &&
        innerBag.color !== null &&
        innerBag.color === input &&
        innerBag.amount > 0
      );
    });
  });
  return returnBags;
}

function handleInnerBagData(bags) {
  if (bags.indexOf("no other bags") !== -1) {
    return null;
  }

  const result = bags.match(/([0-9])\s(([a-z]+\s){2})/);
  return { amount: +result[1].trim(), color: result[2].trim() };
}

function findNeededBags(color) {
  const outerBag = bagHash[color];

  return outerBag.innerBags.reduce((count, innerBag) => {
    const innerCount = findNeededBags(innerBag.color);

    const test = count + innerBag.amount + innerBag.amount * innerCount;
    console.log(test);
    // last item returns undefined. so take second to last one
    return test;
  }, 0);
}

// console.log(findBagCount('shiny gold').length);
console.log(findNeededBags('shiny gold').length);
