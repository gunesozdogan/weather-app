const dateModule = (function () {
    function getDayName(date) {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    function getMonth(date) {
        return date.toLocaleDateString('en-US', { month: 'long' });
    }
    function getYear(date) {
        return date.getFullYear();
    }
    function getDay(date) {
        return date.getDate();
    }

    function getFullDate(date) {
        return `${getDayName(date)}, ${getMonth(date)} ${getDay(
            date
        )}, ${getYear(date)}`;
    }

    function getFullTime(date) {
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    }

    return { getDayName, getMonth, getYear, getDay, getFullDate, getFullTime };
})();

export default dateModule;
