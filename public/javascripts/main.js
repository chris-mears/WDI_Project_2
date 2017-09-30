$(document).ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

$(document).ready(function() {
    $('select').material_select();
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});
$(document).ready(function() {
    $('.tooltipped').tooltip({ delay: 50, html: true });
});

$(document).ready(function() {
    $('.collapsible').collapsible();
});

$(document).ready(function() {
    let date = $('.duedate').html()
    if (date !== undefined) {
        date = date.substring(0, 15);
        $('.duedate').html(date);
    }

});

$(".button-collapse").sideNav();