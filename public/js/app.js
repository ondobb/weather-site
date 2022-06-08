console.log('git');

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = document.querySelector('input').value;
    let content = document.querySelector('.test')

    content.innerHTML = 'Loading...';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) 
            {
                content.innerHTML = data.error;
            } else if (data.location) {
                content.innerHTML = `<p> In ${data.location},  the temperature is <strong>${data.temperature}</strong></p>`;
            } else {
                content.innerHTML = 'Unable to find the given Location'
            }
        });
    });

});





