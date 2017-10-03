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
$(document).ready(function() {
    let dates = $('.duedate')
    dates.each((i, elm) => {
        let date = elm.innerText
        console.log(date)
        if (date !== "") {
            date = new Date(date).toUTCString().substring(0, 15)
            return elm.innerText = date
        }

    })
})