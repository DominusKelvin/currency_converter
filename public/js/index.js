document.addEventListener("DOMContentLoaded", fetchCurrencies);
let currencyFrom = document.getElementById('currencyFrom')
let currencyTo = document.getElementById('currencyTo')

function fetchCurrencies() {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
        .then(response => {
            return response.json()
    }).then(function(data) {
        let currencies = data.results
        populateSelectBoxes(currencies)
    }).catch(err => console.log(err));
}

function populateSelectBoxes(currencies) {
    for ( currency in currencies) {
        let optionFrom = document.createElement('option');
        let optionTo = document.createElement('option')

        optionFrom.text = currency
        optionFrom.value = currency
        currencyFrom.appendChild(optionFrom)

        optionTo.text = currency
        optionTo.value = currency
        currencyTo.appendChild(optionTo)   
    }
}