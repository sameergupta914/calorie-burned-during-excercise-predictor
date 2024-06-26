var gender = 0;
var spin = false;

const changeClass = (from, to, className) => {
    from.removeClass(className);
    to.addClass(className);
}

const setGender = (val) => {
    gender = val;
    let female = $('#female')
    let male = $('#male')
    if (gender == 0) changeClass(male, female, 'gender-active');
    else changeClass(female, male, 'gender-active');
}

const closeModel = () => {
    $('#model').addClass('!hidden')
}

$("form").submit(function (e) {
    e.preventDefault();
    if (spin) return
    changeClass($('#spin'), $('#bt-txt'), '!hidden');
    spin = true;
    let postdata = {
        gender: gender,
        age: $('#age').val(),
        workout: $('#workout').val(),
        weight: $('#weight').val(),
        height: $('#height').val(),
        heartrate: $('#heart').val(),
        temperature: $('#temp').val()
    }
    $.post('/predict', postdata)
        .done((data) => {
            setTimeout(() => {
                $('#result').text(`You will burn ${data.data} calories`)
                $('#model').removeClass('!hidden')
                spin = false;
                changeClass($('#bt-txt'), $('#spin'), '!hidden');
            }, 1000)
        })
        .fail((e) => {
            console.log(e);
            spin = false;
            changeClass($('#bt-txt'), $('#spin'), '!hidden');
        })
});