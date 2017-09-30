// $(document).ready(function() {
//     let date = $('.duedate').html().substring(0, 15);
//     $('.duedate').html(date);
// });

window.onload = () => {
    let date = document.getElementsByClassName('duedate')
    date.forEach((a) => {
        a.innerHTML.substring(0, 15);
        a.innerHTML = a;
    });
};