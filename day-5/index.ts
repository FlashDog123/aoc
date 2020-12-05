import * as fs from 'fs';

const loadInput = (): String[] => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const seats = file.split('\n');
    return seats;
}

const part1 = () => {
    let highsSeatId = 0;
    loadInput().forEach((seat: string) => {
        let rowNumber = findNumber(seat.substring(0, 7));
        let colNumber = findNumber(seat.substring(7, 10));

        const calc = (rowNumber * 8) + colNumber;
        if (calc > highsSeatId) {
            highsSeatId = calc;
        }
    })

    return highsSeatId;
}

function findNumber(input: string): number {
    let amount = Array.from({ length: 128 }, (v, i) => i)
    if (input[0] === 'L' || input[0] === 'R') {
        amount = Array.from({ length: 8 }, (v, i) => i)
    }

    for (let index = 0; index < input.length; index++) {
        let half_length = Math.ceil(amount.length / 2);
        if (input[index] === 'R' || input[index] === 'B') {
            amount = amount.splice(half_length, amount.length);
        }
        if (input[index] === 'L' || input[index] === 'F') {
            amount = amount.splice(0, half_length);
        }
    }
    return amount[0];
}

const part2 = () => {
    let highsSeatId = 0;
    let seatArray = [];
    loadInput().forEach((seat: string) => {
        let rowNumber = findNumber(seat.substring(0, 7));
        let colNumber = findNumber(seat.substring(7, 10));

        const calc = (rowNumber * 8) + colNumber;
        if (calc > highsSeatId) {
            highsSeatId = calc;
        }
        seatArray.push(calc);
    })
    seatArray = seatArray.filter((v, i, a) => a.indexOf(v) === i);
    console.log(seatArray.sort(function (a, b) {
        return a - b;
    }));

    return findSeat(seatArray.sort(function (a, b) {
        return a - b;
    }));
}

function findSeat(input: number[]): number {
    for (let index = 1; index < input.length; index++) {
        if (input.includes(input[index] + 2) && !input.includes(input[index] + 1)) {
            return input[index] + 1;
        }

    }
    return null
}
console.log(part1());
console.log(part2());
