//Modal Trigger
$(document).ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

//utilized with mobile side nav
$(document).ready(function() {
    $(".button-collapse").sideNav();
});

//utilized with select input
$(document).ready(function() {
    $('select').material_select();
});

//utilized with input type of date to create calendar
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});

//utilized with tool tips
$(document).ready(function() {
    $('.tooltipped').tooltip({ delay: 50, html: true });
});

//utilized with accordions
$(document).ready(function() {
    $('.collapsible').collapsible();
});

//function that will format date when class duedate is used
//Found date format from: https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
$(document).ready(function() {
    let dates = $('.duedate')
    dates.each((i, elm) => {
        let date = elm.innerText
        if (date !== "") {
            date = new Date(date).toUTCString().substring(0, 15)
            return elm.innerText = date
        }

    })
})

//auto selects priority for item on edit form
//Got select idea from https://stackoverflow.com/questions/9976042/dynamically-select-value-from-drop-down-list
if (document.getElementById('priority') !== null) {
    const mySelect = document.getElementById('priority');
    let index = mySelect.dataset.selected
    console.log(index)
    switch (index) {
        case "Lowest":
            index = 0;
            break;
        case "Low":
            index = 1;
            break;
        case "Normal":
            index = 2;
            break;
        case "High":
            index = 3;
            break;
        case "Highest":
            index = 4;
            break;
    }
    console.log(index)
    mySelect.getElementsByTagName('option')[index].setAttribute('selected', '')
}