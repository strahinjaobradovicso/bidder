export const toUtc = (date: Date): Date => {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    )
}

export const toLocal = (utc: string): Date => {
    const utcDate = new Date(utc);
    const offsetMinutes = utcDate.getTimezoneOffset();
    const localTime = new Date(utcDate.getTime() - offsetMinutes*60*1000);
    return localTime;
}