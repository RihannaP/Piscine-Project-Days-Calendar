
import { monthgrid,isEventDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

window.onload = function() {
    renderCalendar()    
}

let currentMonth = new Date().getMonth() // between 0 to 11
let currentYear = new Date().getFullYear()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let container = document.createElement("div");
container.classList.add("calendar-container");


let calendar = document.createElement("div");
calendar.classList.add("calendar");

container.appendChild(calendar);
document.body.appendChild(container);
    


////////////// CALENDAR////////////


function renderCalendar() {
    let grid = monthgrid(currentYear, currentMonth);
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

    // Get events for the current month
    let eventsForMonth = daysData.filter(event => 
        new Date(`${event.monthName} 1, ${currentYear}`).getMonth() === currentMonth
    );
//debugging console log
    console.log("All Events Data:", daysData);

    // console.log("Filtered Events for", months[currentMonth], currentYear, ":", eventsForMonth);

    console.log("Filtered Events:", eventsForMonth);


    grid.forEach(week => {
        calendarTableHTML += "<tr>";
        week.forEach(day => {
            console.log("Checking day:", day);// debugging and checking if the day is correctly showing
            let eventName = "";
            let eventClass = "";
            
            if (day) {
                let event = eventsForMonth.find(e => isEventDay(e, currentYear, currentMonth, day));
                console.log("Found event:", event);
                if (event) {
                console.log(`Adding class to day ${day}:`, event.name);
                    eventName = `<br><span class="event">${event.name}</span>`;
                    eventClass = 'class="commemorative-day"';// highlight class
                } else {
                    console.log(`No event for day ${day}`); 
                }
            }
            // console.log(`Day : ${day}, Event: ${eventName}, Class: ${eventClass}`); // debug commemorative day 

            calendarTableHTML += `<td ${eventClass}>${day || ""} ${eventName}</td>`;
        });          
        calendarTableHTML += "</tr>";
    });

    calendarTableHTML += "</tbody></table>";

    calendar.innerHTML = calendarTableHTML;
}

    



////////////// BUTTON////////////

let previousBtn = document.createElement('button')
    previousBtn.innerHTML = "Prev"
    document.body.appendChild(previousBtn);
    previousBtn.addEventListener("click", ()=> {previousMonthBtn()})

let nextBtn =document.createElement ('button')
    nextBtn.innerHTML = "Next"
    document.body.appendChild(nextBtn); 
    nextBtn.addEventListener('click', ()=>{nextMonthBtn(currentYear, currentMonth)})// adds an event listener to the button 

// Function for moving to previous Month
function previousMonthBtn(){
    currentMonth --
    if (currentMonth < 0){
        currentMonth = 11
        currentYear --
    }
   renderCalendar()
}

function nextMonthBtn(year, month){// creating the function to move to the next month 
    currentMonth ++ // moves to the next month
    if ( currentMonth> 11){// the year transition past December 
        currentMonth = 0 // loops back to january 
        currentYear ++ // goes to the next year 
    }
    renderCalendar()
}


////////////// SELECTION////////////

//year selection dropdown 
let yearSelect = document.createElement('select');
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === currentYear) {
        option.selected = true;
    }
    yearSelect.appendChild(option);
}
document.body.appendChild(yearSelect);

// calendar change when year is changed
yearSelect.addEventListener('change', function() {
    currentYear = parseInt(this.value);
    renderCalendar();
});


let monthSelect = document.createElement('select');
// Array of months as strings
  months.map((item, index) => {
    let option = document.createElement('option');
    option.value = index
    option.textContent = item
    if(index === currentMonth){ option.selected = true}
    monthSelect.append(option);
})
document.body.append(monthSelect)

// calendar change when Month is changed
monthSelect.addEventListener('change', function() {
    currentMonth = parseInt(this.value);
    renderCalendar();
});





export{renderCalendar}