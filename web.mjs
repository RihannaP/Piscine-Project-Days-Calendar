 
// updated the naming of the next button 
function nextMonthBtn(year, month){// creating the function to move to the next month 
    currentMonth ++ // moves to the next month
    if ( currentMonth> 11){// the year transition past December 
        currentMonth = 0 // loops back to january 
        currentYear ++ // goes to the next year 
    }
}


// the dropdown year selector
let yearDropdown = document.createElement ('select');
for (let i = currentYear -10; i <=currentYear +10; i++){
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === currentYear){
        option.selected = true;
    }
    yearDropdown.appendChild(option);
}
document.body.appendChild(yearDropdown);

yearDropdown.addEventListener('change',function (){
    currentYear =parseInt(this.value);
    renderCalendar();
})
