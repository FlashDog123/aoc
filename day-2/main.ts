import * as fs from 'fs';

const loadInput = (): String[] => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const passwords = file.split('\n');

    return passwords;
}

const part1 = () => {
    let validPasswords = 0;
    loadInput().forEach((password: string) => {
        if (password) {
            const slicedPassword = password.split(' ');
            const minValue = +slicedPassword[0].split('-')[0];
            const maxValue = +slicedPassword[0].split('-')[1];
            const char = slicedPassword[1].split(':')[0];
            const sequence = slicedPassword[2];

            let charAmount = sequence.split(char).length - 1;
            if (charAmount >= minValue && charAmount <= maxValue) {
                validPasswords++;
            }
        }
    })

    return validPasswords;
}

const part2 = () => {
    let validPasswords = 0;
    loadInput().forEach((password: string) => {
        if (password) {
            const slicedPassword = password.split(' ');
            const minValue = +slicedPassword[0].split('-')[0];
            const maxValue = +slicedPassword[0].split('-')[1];
            const char = slicedPassword[1].split(':')[0];
            const sequence = slicedPassword[2];

            if ((sequence[minValue - 1] === char && sequence[maxValue - 1] !== char) || (sequence[minValue - 1] !== char && sequence[maxValue - 1] === char)) {
                validPasswords++;
            }
        }
    })

    return validPasswords;
}

console.log(part1());
console.log(part2());