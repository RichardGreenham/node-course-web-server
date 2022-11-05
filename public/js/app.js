

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {

    $('.location').html('Getting Weather !!!') 
    $('.forecast').html('')
    $('.icon').prop('src', '')
    $('.icon').hide()

    e.preventDefault()
    fetch('/weather?address=' + e.target[0].value).then((response) => {
        
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                return $('.location').html(data.error) 
            }
            $('.location').html(data.location)
            $('.forecast').html(data.forecast)
            $('form').children('input').val('')
            $('.icon').prop('src', data.icon)
            $('.icon').show(300)
        })
    })
})
