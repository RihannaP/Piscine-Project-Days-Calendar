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






//monthgrid(2025, 1)                                                 













export{monthgrid }         