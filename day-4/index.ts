import * as fs from 'fs';

const loadInput = (): String[] => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const passports = file.split('\n\n');
    return passports;
}
const requiredProperties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const part1 = () => {
    let correctPassports = 0;
    loadInput().forEach((passport: string) => {
        if (requiredProperties.every((property) => passport.includes(property))) {
            correctPassports++;
        }
    })

    return correctPassports;
}

const part2 = () => {
    let correctPassports = 0;
    loadInput().forEach((passport: string) => {
        // if (!requiredProperties.every((property) => passport.includes(property))) {
        //     return false;
        // }
        let _passport = passport.split('\n');

        let _splitted = [];
        _passport.forEach((ps: string) => {
            if (ps.indexOf(' ') >= 0) {
                ps.split(' ').forEach(element => _splitted.push(element));
            } else {
                _splitted.push(ps);
            }
        });

        const passportProperties = [];
        for (const prop of _splitted) {
            const splitted = prop.split(':');
            passportProperties[splitted[0]] = splitted[1];
        }
        if (
            ('byr' in passportProperties && validBYR(passportProperties['byr'])) &&
            ('iyr' in passportProperties && validIYR(passportProperties['iyr'])) &&
            ('eyr' in passportProperties && validEYR(passportProperties['eyr'])) &&
            ('hgt' in passportProperties && validHGT(passportProperties['hgt'])) &&
            ('hcl' in passportProperties && validHCL(passportProperties['hcl'])) &&
            ('ecl' in passportProperties && validECL(passportProperties['ecl'])) &&
            ('pid' in passportProperties && validPID(passportProperties['pid']))
        ) {
            correctPassports++
        }

    });
    return correctPassports;
}

function validBYR(input) {
    return !isNaN(input) && +input >= 1920 && +input <= 2002;
}
function validIYR(input) {
    return !isNaN(input) && +input >= 2010 && +input <= 2020;
}
function validEYR(input) {
    return !isNaN(input) && +input >= 2020 && +input <= 2030;
}
function validHGT(input) {
    const heightUnit = input.slice(input.length - 2);
    const height = input.substring(0, input.length - 2);

    if (heightUnit === 'cm') {
        return !isNaN(+height) && +height >= 150 && +height <= 193;
    } else if (heightUnit === 'in') {
        return !isNaN(+height) && +height >= 59 && +height <= 76;
    } else {
        return false;
    }
}
function validHCL(input) {
    const regex = /^#[0-9a-f]{6}$/g;
    return regex.test(input)
}
function validECL(input) {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(input);
}
function validPID(input) {
    return !isNaN(input) && input.length === 9;
}

console.log(part1());
console.log(part2());
