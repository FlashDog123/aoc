import * as fs from 'fs';

const loadInput = (): String[] => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const forist = file.split('\n');

    return forist;
}

const part1 = () => {
    let currentIndex = 0;
    let encounteredTrees = 0;
    loadInput().forEach((lineOfTrees: string) => {
        if (lineOfTrees[currentIndex] === '#') {
            encounteredTrees++;
        }

        currentIndex += 3;
        if (currentIndex >= (lineOfTrees.length - 1)) {
            currentIndex -= (lineOfTrees.length - 1);
        }
    })

    return encounteredTrees;
}

const part2 = () => {
    let encounteredTrees = 1;
    const steps = [{ right: 1, down: 1 }, { right: 3, down: 1 }, { right: 5, down: 1 }, { right: 7, down: 1 }, { right: 1, down: 2 }];

    steps.forEach((step) => {
        encounteredTrees *= findTrees(step.right, step.down);
    })

    return encounteredTrees;
}

const findTrees = (right, down) => {
    let currentIndex = 0;
    let encounteredTrees = 0;
    const trees = loadInput();

    for (let i = 0; i < trees.length; i += down) {
        if (trees[i][currentIndex] === '#') {
            encounteredTrees++;
        }

        currentIndex += right;
        if (currentIndex >= (trees[i].length - 1)) {
            currentIndex -= (trees[i].length - 1);
        }
    }
    return encounteredTrees;
}

console.log(part1());
console.log(part2());