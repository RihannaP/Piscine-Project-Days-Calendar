export const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Set up month and year dropdown selectors
export function setupSelectors(currentYear, currentMonth, renderCalendar) {
    // Year selector setup
    let yearSelect = document.createElement('select');
    yearSelect.classList.add("year-select");
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
    document.body.appendChild(yearSelect);

    // Year selection event listener
    yearSelect.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        renderCalendar(currentYear, currentMonth);
    });

    // Month selector setup
    let monthSelect = document.createElement('select');
    monthSelect.classList.add("year-select");
    months.forEach((item, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = item;
        if (index === currentMonth) option.selected = true;
        monthSelect.append(option);
    });
    document.body.append(monthSelect);

    // Month selection event listener
    monthSelect.addEventListener('change', function() {
        currentMonth = parseInt(this.value);
        renderCalendar(currentYear, currentMonth);
    });
}
