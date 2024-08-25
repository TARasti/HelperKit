"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtils = void 0;
class DateTimeUtils {
    constructor(defaultFormat, defaultTimeZone) {
        var _a, _b, _c;
        if (defaultFormat === void 0) { defaultFormat = 'YYYY-MM-DD'; }
        if (defaultTimeZone === void 0) { defaultTimeZone = (_c = (_b = (_a = Intl.DateTimeFormat()) === null || _a === void 0 ? void 0 : _a.resolvedOptions()) === null || _b === void 0 ? void 0 : _b.timeZone) !== null && _c !== void 0 ? _c : 'UTC'; }
        this.defaultFormat = defaultFormat;
        this.defaultTimeZone = defaultTimeZone;
    }
    getCurrentDateTime() {
        return new Date().toLocaleString('en-US', { timeZone: this.defaultTimeZone });
    }
    static formatDate(date, format) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        switch (format) {
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'MM-DD-YYYY':
                return `${month}-${day}-${year}`;
            default:
                return `${year}-${month}-${day}`;
        }
    }
    static parseDate(dateString, format = 'YYYY-MM-DD') {
        let [year, month, day] = [0, 0, 0];
        switch (format) {
            case 'YYYY-MM-DD':
                [year, month, day] = dateString.split('-').map(Number);
                break;
            case 'DD/MM/YYYY':
                [day, month, year] = dateString.split('/').map(Number);
                break;
            case 'MM-DD-YYYY':
                [month, day, year] = dateString.split('-').map(Number);
                break;
            default:
                throw new Error('Invalid format');
        }
        return new Date(year, month - 1, day);
    }
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    static differenceInDays(date1, date2) {
        const timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    static convertToMilliSeconds(hours = 0, minutes = 0, seconds = 1) {
        const hoursInMilliseconds = hours * 60 * 60 * 1000;
        const minutesInMilliseconds = minutes * 60 * 1000;
        const secondsInMilliseconds = seconds * 1000;
        return hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
    }
    static addTime(date, hours = 0, minutes = 0, seconds = 0) {
        const newDate = new Date(date);
        newDate.setHours(date.getHours() + hours);
        newDate.setMinutes(date.getMinutes() + minutes);
        newDate.setSeconds(date.getSeconds() + seconds);
        return newDate;
    }
    static subtractTime(date, hours = 0, minutes = 0, seconds = 0) {
        return this.addTime(date, -hours, -minutes, -seconds);
    }
    static getDifferenceInMilliseconds(date1, date2) {
        return date2.getTime() - date1.getTime();
    }
    static formatAsISO(date) {
        return date.toISOString();
    }
    static parseISO(isoString) {
        return new Date(isoString);
    }
    static isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }
    static getStartOfDay(date) {
        return new Date(date.setHours(0, 0, 0, 0));
    }
    static getEndOfDay(date) {
        return new Date(date.setHours(23, 59, 59, 999));
    }
    static calculateAge(birthDate) {
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }
    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    static getWeekNumber(date) {
        const start = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + start.getDay() + 1) / 7);
    }
    static getDayOfWeek(date) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    }
    static getMonthName(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[date.getMonth()];
    }
    static getDateFromWeekNumber(year, week, day = 1) {
        const jan = new Date(year, 0, 1);
        const days = (week - 1) * 7 + day - jan.getDay();
        const date = new Date(jan.setDate(jan.getDate() + days));
        return date;
    }
    static getNextDate(date, days = 1) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + days);
        return nextDate;
    }
    static getPreviousDate(date, days = 1) {
        return this.getNextDate(date, -days);
    }
    static toUnixTimestamp(date) {
        return Math.floor(date.getTime() / 1000);
    }
    static isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }
    static getTimeInTimeZone(date, timeZone) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        return formatter.format(date);
    }
    static calculateTimeDifference(start, end) {
        const diffInMs = end.getTime() - start.getTime();
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        return { hours, minutes };
    }
    static getNextBusinessDay(date) {
        const nextDay = new Date(date);
        do {
            nextDay.setDate(nextDay.getDate() + 1);
        } while (nextDay.getDay() === 0 || nextDay.getDay() === 6);
        return nextDay;
    }
    static calculateBusinessDays(start, end) {
        let count = 0;
        const current = new Date(start);
        while (current <= end) {
            const day = current.getDay();
            if (day !== 0 && day !== 6) { // Exclude weekends
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    }
    static getWeekStartAndEnd(date) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        return { start: startOfWeek, end: endOfWeek };
    }
    static getFirstAndLastDayOfMonth(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return { first: firstDay, last: lastDay };
    }
    static calculateDetailedTimeDifference(start, end) {
        const diffInMs = end.getTime() - start.getTime();
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        return { days, hours, minutes };
    }
    static calculateDetailedAge(birthDate) {
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in the previous month
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return { years, months, days };
    }
    static convertToUTCOffset(offset) {
        const sign = offset >= 0 ? '+' : '-';
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    /**
     *
     * @param date
     * @param [array]o therHolidays | Format should be 'MM-DD'
     * @returns
     */
    static isPublicHoliday(date, otherHolidays) {
        // List of public holidays in 'MM-DD' format
        const publicHolidays = [
            '01-01', // New Year's Day
            '12-25', // Christmas Day
            ...otherHolidays // Add other public holidays here in 'MM-DD' format
        ];
        // Extract month and day in 'MM-DD' format
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${month}-${day}`;
        return publicHolidays.includes(dateString);
    }
    static getPreviousMonth(date) {
        const prevMonth = new Date(date);
        prevMonth.setMonth(date.getMonth() - 1);
        return prevMonth;
    }
    static getNextMonth(date) {
        const nextMonth = new Date(date);
        nextMonth.setMonth(date.getMonth() + 1);
        return nextMonth;
    }
}
exports.DateTimeUtils = DateTimeUtils;
