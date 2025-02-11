import { renderCalendar } from './calendar.mjs';  
import { previousMonthBtn, nextMonthBtn } from './buttons.mjs'; 
import { setupSelectors } from './selectors.mjs'; 

let currentMonth = new Date().getMonth(); // Get current month (0-11)
let currentYear = new Date().getFullYear(); // Get current year

// Render the calendar when page loads
window.onload = function() {
    renderCalendar(currentYear, currentMonth);  // Initial rendering

    // Set up event listeners for the previous and next buttons
    previousBtn.addEventListener("click", () => { previousMonthBtn(); });
    nextBtn.addEventListener("click", () => { nextMonthBtn(); });
};

// Set up the year and month selectors
setupSelectors(currentYear, currentMonth, renderCalendar);
let container = document.createElement("div");
container.classList.add("calendar-container");

let sidebar = document.createElement("div");
sidebar.classList.add("sidebar");
sidebar.innerHTML = `
    <div class="weather">
        <p>12°C</p>
        <p>PARTLY SUNNY</p>
    </div>
    <div class="tasks">
        <div class="task">09:00 - Send a message to James</div>
        <div class="task">11:00 - Visit a Neil bar</div>
        <div class="task">15:00 - Make a dinner for Carl</div>
    </div>
`;

let calendar = document.createElement("div");
calendar.classList.add("calendar");

container.appendChild(sidebar);
container.appendChild(calendar);
document.body.appendChild(container);
let previousBtn = document.createElement('button')
previousBtn.classList.add("nav-btn");
    previousBtn.innerHTML = "Prev"
    calendar.appendChild(previousBtn);

let nextBtn =document.createElement ('button')// it creates the next month button 
nextBtn.classList.add("nav-btn");
    nextBtn.innerHTML = "Next"
    calendar.appendChild(nextBtn); 

   export{container, calendar}