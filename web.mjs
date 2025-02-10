
import { monthgrid, } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

// window.onload = function() {
//     document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
// }

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

    window.onload = function() {
        renderCalendar()
        previousBtn.addEventListener("click", ()=> {previousMonthBtn(currentYear, currentMonth)})
        //document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
    }

function renderCalendar(){
    let grid = monthgrid(currentYear, currentMonth)
   // let dayOne = new Date(year, month, 1).getDay()
    let calendarHTML = ""
    grid.forEach((day) =>{
       calendarHTML += `<div class="day">${day || ""}</div>`;
    })
    document.querySelector("div").innerHTML = calendarHTML;
}

// Event listeners for previous buttons
function previousMonthBtn(year, month){
    currentMonth --
    if (currentMonth < 0){
        currentMonth = 11
        currentYear --
    }
   renderCalendar()
}

function nextMonthBtn(year, month){// creating the function to move to the next month 
    month ++ // moves to the next month
    if (month > 11){// the year transition past December 
        month = 0 // loops back to january 
        year ++ // goes to the next year 
    }
}