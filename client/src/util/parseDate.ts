export function parseDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp);
    const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate()}`;
    const month = [date.getMonth() + 1].toString().length > 1 ? [date.getMonth() + 1] : `0${[date.getMonth() + 1]}`;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
