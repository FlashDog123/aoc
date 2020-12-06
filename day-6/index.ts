import * as fs from 'fs';

const loadInput = (): String[] => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const groups = file.split('\n\n');
    return groups;
}

const part1 = (): number => {
    let amountOfAnswers = 0;
    loadInput().forEach((group: string) => amountOfAnswers += String.prototype.concat(...new Set(group.split('\n').join(''))).length);

    return amountOfAnswers;
}

const part2 = (): number => {
    let amountOfAnswers = 0;
    loadInput().forEach((group: string) => {
        let splittedGroup = group.split('\n');
        let allTrue = null;
        let matchingQuestion = '';
        splittedGroup.forEach((answers: string) => {
            if (answers === '') {
                return null;
            }
            if (allTrue === null) {
                allTrue = [...new Set(answers)].join('');
                matchingQuestion = allTrue;

            } else {
                for (let i = 0; i < allTrue.length; i++) {
                    if (answers.indexOf(allTrue[i]) === -1) {
                        matchingQuestion = matchingQuestion.replace(allTrue[i], '');
                    }
                }
                allTrue = matchingQuestion;
            }
        })

        amountOfAnswers += matchingQuestion.length;
    });

    return amountOfAnswers;
}

console.log(part1());
console.log(part2());
