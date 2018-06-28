if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js').then(registration => {
            // Registration was successful
            console.log('Oh yeah! oh yeah!, service worker is ready for you dominus', registration.scope)
        }, function(err){
            // registration failed :(
            console.log('Sorry dominus, service worker not registered yet',  err)
        })
    })
}

document.addEventListener("DOMContentLoaded", fetchCurrencies); // adding event listener for when the DOM is loaded

let currencyFrom = document.getElementById('currencyFrom')
let currencyTo = document.getElementById('currencyTo')

const baseUrl = 'https://free.currencyconverterapi.com/api/v5/'
document.getElementById('convertButton').addEventListener('click', computeConversion)
function fetchCurrencies() {
    fetch(`${baseUrl}currencies`)
        .then(response => {
            return response.json()
    }).then(function(data) {
        let currencies = data.results
        populateSelectBoxes(currencies) // calling the populateSelectBoxes function
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

function computeConversion(amount=0, fromCurrency, toCurrency, calculateAmount) {
    fromCurrency = encodeURIComponent(currencyFrom.options[currencyFrom.selectedIndex].value)
    toCurrency = encodeURIComponent(currencyTo.options[currencyTo.selectedIndex].value)
    console.log(fromCurrency)
    console.log(toCurrency)
    amount = Number(document.getElementById('amount').value)
    if(!amount) { return }
    let query = `${fromCurrency}_${toCurrency}`
    let url =  `${baseUrl}convert?q=${query}&compact=ultra`
    console.log(url)
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        let val = data[query]
        if (val) {
            let total = val * amount
            document.getElementById('convertedCurrency').value = total.toFixed(2)
            calculateAmount(null, Math.round(total * 100) / 100)
        }
        else {
            let err = new Error("Value not found for " + query)
            console.log(err)
            calculateAmount(err)
        }
    }).catch(err => {
        console.log(err)
    })
}