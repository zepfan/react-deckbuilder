/**
 * ----------------------------------------
 * Format a date string from milliseconds
 * ----------------------------------------
 */

export function formatDate(milliseconds) {
    let date = new Date(milliseconds),
        day = date.getDate(),
        month = date.getMonth() + 1, // month is zero based
        year = date.getFullYear();

    return `${month}/${day}/${year}`;
}