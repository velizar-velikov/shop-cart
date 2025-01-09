export function parseDate(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const day = date.getDate().length > 1 ? date.getDate() : `0${date.getDate()}`;
    const month = [date.getMonth() + 1].length > 1 ? [date.getMonth() + 1] : `0${[date.getMonth() + 1]}`;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}