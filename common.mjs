// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

function getGreeting() {
    return "Hello";
}
 
// Function to generate calendar grid for a given month

function monthgrid(year, month){
    let today = new Date();
    //let dayOne = new Date(year, month, 1).getDay()
    let LastDate = new Date(year, month+1, 0).getDate()
    //let dayEnd = new Date(year, month, LastDate ).getDay()
    let gridArray =[]
    for(let i=1; i<=LastDate; i++){
        gridArray.push(i)
    }
    return gridArray;

}
function nextMonthBtn(year, month){// creating the function to move to the next month 
    month ++ // moves to the next month
    if (month > 11){// the year transition past December 
        month = 0 // loops back to january 
        year ++ // goes to the next year 

    }

    function previousMonthBtn(year, month){
    month --
    if (month < 0){
        month = 11
        year --
    }
   // renderCalendar()
}















//export{getGreeting, renderMonthTable }