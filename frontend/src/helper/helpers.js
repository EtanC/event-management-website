export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date;
    // Try to parse as YYYY-MM-DD
    date = new Date(dateString);
    if (!isNaN(date)) return date.toLocaleDateString('en-US', options);
    // Try to parse as MMM D, YYYY
    date = new Date(Date.parse(dateString));
    if (!isNaN(date)) return date.toLocaleDateString('en-US', options);
    return "Invalid date format";
}