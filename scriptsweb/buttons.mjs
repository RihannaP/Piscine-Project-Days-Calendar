import { renderCalendar } from './calendar.mjs';  // Import render function

let currentMonth = new Date().getMonth();  // Initialize current month
let currentYear = new Date().getFullYear(); // Initialize current year

// Previous month button functionality
export function previousMonthBtn() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);  // Re-render the calendar
}

// Next month button functionality
export function nextMonthBtn() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);  // Re-render the calendar
}
