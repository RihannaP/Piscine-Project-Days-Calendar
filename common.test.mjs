import { monthGrid, getEventsForMonth, findEventForDay, isEventDay } from './common.mjs';  // Adjust path if necessary

test("It should return correct week of a month", () => {
  let FebMonth2025 = monthGrid(2025, 1);
  let firstWeekFeb = FebMonth2025[0];
  let secondWeekFeb = FebMonth2025[1];
  let lastWeekFeb = FebMonth2025[4];

  expect(firstWeekFeb).toEqual(['', '', '', '', '', 1, 2]);
  expect(secondWeekFeb).toEqual([3, 4, 5, 6, 7, 8, 9]);
  expect(lastWeekFeb).toEqual([24, 25, 26, 27, 28, '', '']);
});


test("It should return correct event in October ", () =>{
let Oct2025 = getEventsForMonth(2025, 9)



expect(Oct2025).toEqual([{
    "name": "Ada Lovelace Day",
    "monthName": "October",
    "dayName": "Tuesday",
    "occurrence": "second",
    "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/ada.txt"
},
{
    "name": "World Lemur Day",
    "monthName": "October",
    "dayName": "Friday",
    "occurrence": "last",
    "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt"
}])

})

test("It should return empty Array in Nobember ", () =>{
    let Nov2025 = getEventsForMonth(2025, 10)

    expect(Nov2025).toEqual([])

})

test("It should return true for the event day ", () =>{
    let event = {
        "name": "International Binturong Day",
        "monthName": "May",
        "dayName": "Saturday",
        "occurrence": "second",
        "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt"
    }
    let isEvent = isEventDay(event, 2022, 4, 14)
    let isNotEvent = isEventDay(event, 2022, 4, 15)

    expect(isEvent).toEqual(true)
    expect(isNotEvent).toEqual(false)

})

test("It should return false for the normal day ", () =>{
    let event = []
    
    let isNotEvent = isEventDay(event, 2022, 4, 15)
    expect(isNotEvent).toEqual(false)

})