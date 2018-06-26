document.addEventListener("DOMContentLoaded", fetchCurrencies);
function fetchCurrencies() {
    let currencyFrom = document.getElementById('currencyFrom')
    let currencyTo = document.getElementById('currencyTo')
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
        .then(response => {
            response.json().then(function(data) {
            console.log(data.length)
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option');
                console.log(data[i].id)
                option.text = data[i].id;
                option.value = data[i].currencyName;
                currencyFrom.add(option);
                currencyTo.add(option)
            }   
        })
    });
    console.log('Hello world')
}
