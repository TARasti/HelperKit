export declare class DateTimeUtils {
    private defaultFormat;
    private defaultTimeZone;
    constructor(defaultFormat?: string, defaultTimeZone?: string);
    getCurrentDateTime(): string;
    static formatDate(date: Date, format: String): string;
    static parseDate(dateString: string, format?: string): Date;
    static addDays(date: Date, days: number): Date;
    static differenceInDays(date1: Date, date2: Date): number;
    static isLeapYear(year: number): boolean;
    static convertToMilliSeconds(hours?: number, minutes?: number, seconds?: number): number;
    static addTime(date: Date, hours?: number, minutes?: number, seconds?: number): Date;
    static subtractTime(date: Date, hours?: number, minutes?: number, seconds?: number): Date;
    static getDifferenceInMilliseconds(date1: Date, date2: Date): number;
    static formatAsISO(date: Date): string;
    static parseISO(isoString: string): Date;
    static isToday(date: Date): boolean;
    static getStartOfDay(date: Date): Date;
    static getEndOfDay(date: Date): Date;
    static calculateAge(birthDate: Date): number;
    static getDaysInMonth(year: number, month: number): number;
    static getWeekNumber(date: Date): number;
    static getDayOfWeek(date: Date): string;
    static getMonthName(date: Date): string;
    static getDateFromWeekNumber(year: number, week: number, day?: number): Date;
    static getNextDate(date: Date, days?: number): Date;
    static getPreviousDate(date: Date, days?: number): Date;
    static toUnixTimestamp(date: Date): number;
    static isWeekend(date: Date): boolean;
    static getTimeInTimeZone(date: Date, timeZone: string): string;
    static calculateTimeDifference(start: Date, end: Date): {
        hours: number;
        minutes: number;
    };
    static getNextBusinessDay(date: Date): Date;
    static calculateBusinessDays(start: Date, end: Date): number;
    static getWeekStartAndEnd(date: Date): {
        start: Date;
        end: Date;
    };
    static getFirstAndLastDayOfMonth(date: Date): {
        first: Date;
        last: Date;
    };
    static calculateDetailedTimeDifference(start: Date, end: Date): {
        days: number;
        hours: number;
        minutes: number;
    };
    static calculateDetailedAge(birthDate: Date): {
        years: number;
        months: number;
        days: number;
    };
    static convertToUTCOffset(offset: number): string;
    /**
     *
     * @param date
     * @param [array]o therHolidays | Format should be 'MM-DD'
     * @returns
     */
    static isPublicHoliday(date: Date, otherHolidays: string[]): boolean;
    static getPreviousMonth(date: Date): Date;
    static getNextMonth(date: Date): Date;
}
