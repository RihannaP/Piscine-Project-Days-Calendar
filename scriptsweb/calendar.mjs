import { months } from './selectors.mjs';  // Import months
import { monthgrid, } from "../common.mjs";
import{container, calendar} from "./main.mjs"

// Function to render the calendar
export function renderCalendar(currentYear, currentMonth) {
    let grid = monthgrid(currentYear, currentMonth);  // Get the month grid
    let calendarTableHTML = `
        <h2>${months[currentMonth]} ${currentYear}</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    grid.forEach(week => {
        calendarTableHTML += `<tr>`;
        week.forEach(day => {
            calendarTableHTML += `<td class="day">${day || ""}</td>`;
        });
        calendarTableHTML += `</tr>`;
    });
    calendarTableHTML += `</tbody></table>`;

    // Find the calendar container and render the HTML
    calendar.innerHTML = calendarTableHTML;
}


// let container = document.createElement("div");
// container.classList.add("calendar-container");

// let sidebar = document.createElement("div");
// sidebar.classList.add("sidebar");
// sidebar.innerHTML = `
//     <div class="weather">
//         <p>12°C</p>
//         <p>PARTLY SUNNY</p>
//     </div>
//     <div class="tasks">
//         <div class="task">09:00 - Send a message to James</div>
//         <div class="task">11:00 - Visit a Neil bar</div>
//         <div class="task">15:00 - Make a dinner for Carl</div>
//     </div>
// `;

// let calendar = document.createElement("div");
// calendar.classList.add("calendar");

// //container.appendChild(sidebar);
// container.appendChild(calendar);
// document.body.appendChild(container);