// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


// import { getGreeting } from "./common.mjs";
// import daysData from "./days.json" with { type: "json" };

// window.onload = function() {
//     document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
// }

// Setting up the  current year and month (starting values)
// let currentYear = new Date().getFullYear();
// let currentMonth = new Date().getMonth();

let nextBtn =document.createElement ('button')// it creates the next month button 
    nextBtn.innerHTML = "Next"
    document.body.appendChild(nextBtn); 
    nextBtn.addEventListener('click', ()=>{nextMonthBtn(currentYear, currentMonth)})// adds an event listener to the button 

function nextMonthBtn(year, month){// creating the function to move to the next month 
    month ++ // moves to the next month
    if (month > 11){// the year transition past December 
        month = 0 // loops back to january 
        year ++ // goes to the next year 
    }
}
import { getGreeting, } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

let currentMonth = new Date().getMonth() // between 0 to 11
let currentYear = new Date().getFullYear()

window.onload = function() {
  let previousBtn = document.createElement('button')
    previousBtn.innerHTML = "Prev"
    document.body.appendChild(previousBtn);
    previousBtn.addEventListener("click", ()=> {previousMonthBtn(currentYear, currentMonth)})
    //document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
}

function renderCalendar(){

}

// Event listeners for previous buttons
function previousMonthBtn(year, month){
    month --
    if (month < 0){
        month = 11
        year --
    }
   // renderCalendar()
}

// the dropdown year selector
let yearDropdown = document.createElement ('select');
yearDropdown.id = "yearDropdown";
document.body.appendChild(yearDropdown);

//to fill out the dropdown with years range
for (let year = currentYear -10; year )