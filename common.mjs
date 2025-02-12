
import daysData from "./days.json" with { type: "json" };
// Function to generate calendar grid for a given month

function monthGrid(year, month){
    let dayOne = new Date(Date.UTC(year, month, 1).getUTCDay();
    dayOne = dayOne === 0? 7 : dayOne;// adjust sunday as 7th day
    let LastDate = daysInMonth(year, month)// let us know that february has 29 days in leap years
    let dayEnd = new Date(year, month, LastDate ).getDay()
    let gridArray =[];
    let week = new Array(7).fill(null);

    for (let i = 1; i < dayOne; i++) {
        week[i - 1]= ""; // Empty cells before the first day
    }
    let index = dayOne - 1;
    for(let day=1; day<=LastDate; day++){
        week[index] = day
        index++;
        if(index === 7 || day === LastDate){
            gridArray.push([...week])
            week = new Array(7).fill("");
            index = 0;
        
        }
        
    }
   return gridArray;

}
// Function to check leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Function to get days in a month
function daysInMonth(year, month) {
    if (month ===1){
        return isLeapYear (year)? 29: 28;
    }
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function nthWeekdayofMonth(year, month, weekday, n){
    let count = 0;
    for (let day = 1; day = <= daysInMonth(year, month); day ++){
        let date = New Date (year, month, day);
        if (date.getDay() === weekday){
            count ++;
        if (count == n){
            return day;
        }       
     }
    }
    return null;// if the nth weekday doesn't exist
}
// this helps to assess if the date is a commemorative day

function isEventDay(event, year, month, day) {
    let eventDate = new Date(year, month, day); // e.g Mon Feb 10 2025 00:00:00 GMT+0000 
    let eventDayName = eventDate.toLocaleString('en-us', { weekday: 'long' }); // e.g Monday
    
    if (event.dayName !== eventDayName) {
        return false; // Skip if it's not the correct weekday
    }

    let occurrences = [];
    
    for (let d = 1; d <= 31; d++) {
        let tempDate = new Date(year, month, d);
        if (tempDate.getMonth() !== month) break; // Stop when the next month starts

        if (tempDate.toLocaleString('en-us', { weekday: 'long' }) === event.dayName) {
            occurrences.push(d);
        }
    }

    let occurrenceIndex = ["first", "second", "third", "fourth"].indexOf(event.occurrence);
    if (occurrenceIndex !== -1 && occurrences[occurrenceIndex] === day) {
        return true;
    }

    if (event.occurrence === "last" && occurrences[occurrences.length - 1] === day) {
        return true;
    }
    return false;
}

// Filters the events for the specified month
 function getEventsForMonth(year, month) {
     return daysData.filter(event => 
         new Date(`${event.monthName}, ${year}`).getMonth() === month  
    )
}
                                              
// This function checks if a day has an event and returns the event details
function findEventForDay(events, year, month, day) {
    if (events.length === 0 ){return false}
    return events.find(e => isEventDay(e, year, month, day));
    // if (events.length === 0 ){console.log(false)}
    // console.log( events.find(e => isEventDay(e, year, month, day)))
}


// findEventForDay([{
//     "name": "International Binturong Day",
//     "monthName": "May",
//     "dayName": "Saturday",
//     "occurrence": "second",
//     "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt"
// }], 2022, 4, 14)







export{monthGrid, isEventDay, getEventsForMonth, findEventForDay }         