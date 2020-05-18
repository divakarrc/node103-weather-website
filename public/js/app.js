const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    //console.log(address);
    search.value = '';
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if (!address) {
        return messageOne.textContent = 'Address must be provided';
    }
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then(({ error = '', location, forecast, address } = {}) => {
            if (error) {
                //console.log(error);
                messageOne.textContent = error;
            } else {
                // console.log(location);
                // console.log(forecast);
                // console.log(address);
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }

        })
    })
})