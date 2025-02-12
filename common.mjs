
import daysData from "./days.json" with { type: "json" };
// Function to generate calendar grid for a given month

function monthGrid(year, month){
    let dayOne = new Date(Date.UTC(year, month, 1)).getUTCDay();
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

function nthWeekdayOfMonth(year, month, weekday, occurrence) {
    let count = 0;
    let lastOccurrence = null;

    for (let day = 1; day <= daysInMonth(year, month); day++) {
        let date = new Date(Date.UTC(year, month, day));
        if (date.getUTCDay() === weekday) {
            count++;

            // Handle "last" occurrence case
            lastOccurrence = day;

            if (occurrence === "first" && count === 1) return day;
            if (occurrence === "second" && count === 2) return day;
            if (occurrence === "third" && count === 3) return day;
            if (occurrence === "fourth" && count === 4) return day;
        }
    
    }

    // If "last" was requested, return the last occurrence found
    return occurrence === "last" ? lastOccurrence : null;

}
console.log(nthWeekdayOfMonth(2024, 9, 2, "second")); // October 2024, 2nd Tuesday (Ada Lovelace Day)
console.log(nthWeekdayOfMonth(2024, 4, 6, "second")); // May 2024, 2nd Saturday (International Binturong Day)
console.log(nthWeekdayOfMonth(2024, 8, 6, "first"));  // September 2024, 1st Saturday (International Vulture Awareness Day)
console.log(nthWeekdayOfMonth(2024, 8, 6, "third"));  // September 2024, 3rd Saturday (International Red Panda Day)
console.log(nthWeekdayOfMonth(2024, 9, 5, "last"));   // October 2024, last Friday (World Lemur Day)


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




export { 
    monthGrid, 
    isEventDay, 
    getEventsForMonth, 
    findEventForDay, 
    nthWeekdayOfMonth, 
    isLeapYear, 
    daysInMonth 
};
   