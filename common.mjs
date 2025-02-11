// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

function getGreeting() {
    return "Hello";
}
 
// Function to generate calendar grid for a given month

function monthgrid(year, month){
    let dayOne = new Date(year, month, 1).getDay()
    dayOne = dayOne === 0? 7 : dayOne;
    let LastDate = new Date(year, month+1, 0).getDate()
    let dayEnd = new Date(year, month, LastDate ).getDay()
    let gridArray =[]
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
  //  console.log(gridArray)
   return gridArray;

}

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
// this helps to assess if the date is a commemorative day

function isEventDay(event, year, month, day) {
    let eventDate = new Date(year, month, day);
    let eventDayName = eventDate.toLocaleString('en-us', { weekday: 'long' });
    console.log(`Checking if ${event.name} (${event.dayName}, ${event.occurrence}) matches ${day} (${eventDayName})`);

    if (event.dayName !== eventDayName) {
        console.log(`Day mismatch: Expected ${event.dayName}, got ${eventDayName}`);
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
    console.log(`Occurrences of ${event.dayName} in month:`, occurrences);

    let occurrenceIndex = ["first", "second", "third", "fourth"].indexOf(event.occurrence);
    if (occurrenceIndex !== -1 && occurrences[occurrenceIndex] === day) {
        console.log(`Matched ${event.name} on ${day}`);
        return true;
    }

    if (event.occurrence === "last" && occurrences[occurrences.length - 1] === day) {
        return true;
        console.log(`Matched last occurrence of ${event.name} on ${day}`);
    }
    console.log(`No match for ${event.name} on ${day}`);
    return false;
}




//monthgrid(2025, 1)                                                 













export{monthgrid }         