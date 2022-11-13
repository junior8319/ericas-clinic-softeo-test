"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLeapYear = (receivedYear) => {
    if (receivedYear % 400 === 0 ||
        receivedYear % 4 === 0 && receivedYear % 100 !== 0)
        return true;
    return false;
};
const isInvalidMonthDay = (receivedMonth, receivedDay) => {
    const daysInMonths = {
        months31: [1, 3, 5, 7, 8, 10, 12],
        months30: [4, 6, 9, 11],
    };
    if (daysInMonths.months31.indexOf(receivedMonth) && receivedDay > 31) {
        return `O mês ${receivedMonth} tem até 31 dias,` +
            ` dia ${receivedDay} é uma data inválida`;
    }
    if (receivedDay > 30) {
        return `O mês ${receivedMonth} tem até 30 dias,` +
            ` dia ${receivedDay} é uma data inválida`;
    }
    return false;
};
const testDates = (receivedDate) => {
    try {
        const year = receivedDate.split(/[/.-]/g)[0];
        if (!year || year.length < 4)
            return 'Não foi informado um ano corretamente.';
        const numberYear = Number(year);
        console.log(isLeapYear(numberYear));
        const month = receivedDate.split(/[/.-]/g)[1];
        if (!month || month.length < 2) {
            return 'Não foi informado um mês corretamente.';
        }
        const numberMonth = Number(month);
        if (!numberMonth || numberMonth <= 0 || numberMonth > 12) {
            return 'Informe um número de 01 a 12 para o mês.';
        }
        const day = receivedDate.split(/[/.-]/g)[2];
        const numberDay = Number(day);
        if (!day || day.length < 2)
            return 'Não foi informado um dia corretamente.';
        if (isLeapYear(numberYear) && numberMonth === 2 && numberDay > 29) {
            return 'Para um ano bissexto, o mês de fevereiro tem apenas 29 dias.';
        }
        if (numberMonth === 2 && numberDay > 28) {
            return 'Para ano não bissexto, o mês de fevereiro tem apenas 28 dias.';
        }
        if (isInvalidMonthDay(numberMonth, numberDay))
            return isInvalidMonthDay(numberMonth, numberDay);
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.default = testDates;
