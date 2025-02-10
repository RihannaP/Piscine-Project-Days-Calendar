
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
    
    grid.forEach(week =>{
        calendarTableHTML += `<tr>`
        week.forEach((day) =>{
            calendarTableHTML += `
                <td class="day">${day || ""}</td>
                `;
        })
        calendarTableHTML += `<tr>`
    })
    calendarTableHTML+= `</body></table>`
    document.querySelector("div").innerHTML = calendarTableHTML;
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

let monthSelect = document.createElement('select');
// Array of months as strings
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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