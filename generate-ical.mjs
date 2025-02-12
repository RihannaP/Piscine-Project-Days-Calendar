import fs from 'fs';
import { getEventsForMonth, findEventForDay } from './common.mjs';


function formatDateForDTSTAMP() {
    const now = new Date();
    return now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Inside the event generation loop
let dtStamp = formatDateForDTSTAMP();  // Generate DTSTAMP for each event

function createICAL(years) {
    let dataICAL = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "PRODID:-//Commemorative Days Calendar//EN"
    ];

    // Iterate through each year and month to find the events
    for (let year = years[0]; year <= years[1]; year++) {
        for (let month = 0; month < 12; month++) {
            let eventDays = getEventsForMonth(year, month);
            let lastDate = new Date(year, month + 1, 0).getDate(); // Get the last day of the month

            for (let day = 1; day <= lastDate; day++) {
                let event = findEventForDay(eventDays, year, month, day);

                if (event) {
                  
                     let startDate = `${year}${(month+1).toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;
                     let endDate = `${year}${(month+1).toString().padStart(2, "0")}${(day+1).toString().padStart(2, "0")}`;
                    //let startDate = `${year}${(month + 1).toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;
                    // let nextDay = new Date(year, month, day + 1);
                    // let endDate = `${nextDay.getFullYear()}${(nextDay.getMonth() + 1).toString().padStart(2, "0")}${nextDay.getDate().toString().padStart(2, "0")}`;

                  
                    // Add event details to the iCal data array
                    dataICAL.push(
                        "BEGIN:VEVENT",
                        `UID:${startDate}-${event.name}-${year}@codeyourfuture.com`,
                        `SUMMARY:${event.name}`,
                        `DESCRIPTION: More info: ${event.descriptionURL}`,
                        `DTSTART;VALUE=DATE:${startDate}`,
                        `DTEND;VALUE=DATE:${endDate}`,
                        `DTSTAMP:${dtStamp}`,  // Added DTSTAMP
                        "LOCATION:",
                        "BEGIN:VALARM",
                        "TRIGGER:-PT15M",  // Reminder 15 minutes before
                        "DESCRIPTION:Reminder",
                        "ACTION:DISPLAY",
                        "END:VALARM",
                        "END:VEVENT"
                    );
                }
            }
        }
    }

    dataICAL.push("END:VCALENDAR");
    return dataICAL.join("\r\n");
}

// Write the iCal data to a file
fs.writeFileSync("commemorative_days.ics", createICAL([2020, 2030]));

console.log("iCal file generated: commemorative_days.ics");
