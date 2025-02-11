
import { monthgrid, } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

window.onload = function() {
    renderCalendar()

    // Event listeners for previous buttons
    previousBtn.addEventListener("click", ()=> {previousMonthBtn(currentYear, currentMonth)})
}

let currentMonth = new Date().getMonth() // between 0 to 11
let currentYear = new Date().getFullYear()

let calendar = document.createElement('div')
    document.body.appendChild(calendar)
let previousBtn = document.createElement('button')
    previousBtn.innerHTML = "Prev"
    document.body.appendChild(previousBtn);

let nextBtn =document.createElement ('button')// it creates the next month button 
    nextBtn.innerHTML = "Next"
    document.body.appendChild(nextBtn); 
    nextBtn.addEventListener('click', ()=>{nextMonthBtn(currentYear, currentMonth)})// adds an event listener to the button 

function renderCalendar(){
    let grid = monthgrid(currentYear, currentMonth)   
    let calendarTableHTML = ""
    calendarTableHTML = `
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
    `
    // get events for the current month  
let eventsForMonth = daysData.filter(event => 
    new Date (`${event.monthName} 1, ${currentYear}`).getMonth() === currentMonth
);
console.log("Events for current month:", eventsForMonth);
    // updated the code to integrate the commmemorative days 
    grid.forEach(week => {
        calendarTableHTML += `<tr>`;
        week.forEach(day => {
            let eventName = "";
            let eventClass = "";
            
        if (day){
            let event = eventsForMonth.find (e => isEventDay (e, currentYear, currentMonth, day) );
            if (event){
                eventName =`<br><span class = "event"> ${event.name}</span>`;
                eventClass = `class = "commemorative-day"`;
            }
        }
    calendarTableHTML += `<td ${eventClass}>${day || ""}${eventName}</td>`;
        });          
    
    calendarTableHTML += `<tr>`;// closes the row
    });
    calendarTableHTML+= `</body></table>`
    document.querySelector("div").innerHTML = calendarTableHTML;
}
// this helps to assess if the date is a commemorative day

function isEventDay(event, year, month, day) {
    let eventDate = new Date(year, month, day);
    let eventDayName = eventDate.toLocaleString('en-us', { weekday: 'long' });

    if (event.dayName !== eventDayName) {
        return false; // if not the correct weekday
    }
   
    let occurrenceCount = 0;
   

    for (let d = 1; d <= 31; d++) {
        let tempDate = new Date(year, month, d);
        if (tempDate.toLocaleString('en-us', { weekday: 'long' }) === event.dayName) {
            occurrenceCount++;
        }
    }

    if (event.occurrence === "first" && occurrenceCount === 1) return true;
    if (event.occurrence === "second" && occurrenceCount === 2) return true;
    if (event.occurrence === "third" && occurrenceCount === 3) return true;
    if (event.occurrence === "last") {
        let lastOccurrenceDate = new Date(year, month + 1, 0); // Last day of month
        return lastOccurrenceDate.toLocaleString('en-us', { weekday: 'long' }) === event.dayName;
    }

    return false;
}


// Function for moving to previous Month
function previousMonthBtn(year, month){
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