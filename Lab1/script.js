const getElement = (id) => document.getElementById(id);

const inputElement = getElement('inputNumber');
const button100 = getElement('button100');
const button500 = getElement('button500');
const button1000 = getElement('button1000');
const buttonMono = getElement('mono-pay-button');
const buttonGpay = getElement('google-pay-button');
const btnAnotherBank = getElement('bank-deposit-submit-button');
const resultMoney = getElement('accumulated-money');
const dollarIcon = getElement('dollar');
const donorName = getElement('donor-name-input');
const comments = getElement('donation-comments-input');
const cardNumber = getElement('card-number-input');
const month = getElement('card-expiration-month');
const year = getElement('card-expiration-year');
const cvv2 = getElement('card-cvv-input');
const toggleButton = getElement('toggleButton');

button100.addEventListener('click', () => addMoney(100));
button500.addEventListener('click', () => addMoney(500));
button1000.addEventListener('click', () => addMoney(1000));

buttonMono.addEventListener('click', handleButtonClick);
buttonGpay.addEventListener('click', handleButtonClick);

btnAnotherBank.addEventListener('click', function () {
    displayMoney()
    console.log(
        `Користувач: ${donorName.value};\nКоментар: ${comments.value};\nНомер картки: ${cardNumber.value};\nДані картки в форматі мм/рр/cvv2: ${month.value}/${year.value}/${cvv2.value};\nСума донату: ${inputElement.value} грн.`
    )
})
cardNumber.addEventListener('input', function () {
    // Перевірка на допустимі символи (усе лише цифри)
    this.value = this.value.replace(/\D/g, '');
    // Обмеження на максимальну довжину
    if (this.value.length > 16) {
        this.value = this.value.slice(0, 16);
    }
});

month.addEventListener('input', function () {
    // Перевірка на допустимі символи (усе лише цифри)
    this.value = this.value.replace(/\D/g, '');
    // Обмеження на мінімальне та максимальне значення
    if (this.value < 1) {
        this.value = '';
    } else if (this.value > 12) {
        this.value = 12;
    }
});

year.addEventListener('input', function () {
    // Перевірка на допустимі символи (усе лише цифри)
    this.value = this.value.replace(/\D/g, '');
    // Обмеження на мінімальне та максимальне значення
    if(this.value.length > 3){
        if (this.value < 2024) {
            this.value = 2024;
        } else if (this.value > 2040) {
            this.value = 2040;
        }
    }
});

cvv2.addEventListener('input', function () {
    // Перевірка на допустимі символи (усе лише цифри)
    this.value = this.value.replace(/\D/g, '');
    // Обмеження на максимальну довжину
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
    }
});

function handleButtonClick() {
    displayMoney();
    displayJar();
    console.log(`Користувач: ${donorName.value};\nКоментар: ${comments.value};\nСума донату: ${inputElement.value} грн.`);
}

function addMoney(value) {
    const number = parseInt(inputElement.value);
    inputElement.value = number + value;
    inputElement.style.color = 'black';
    dollarIcon.style.color = 'black';
}

function displayMoney() {
    const nowMoney = parseInt(inputElement.value);
    let futureMoney = parseInt(resultMoney.textContent) || 0;
    const res = (nowMoney >= 10 && nowMoney < 29999) ? nowMoney + futureMoney : futureMoney;
    resultMoney.textContent = `${res} ₴`;
    localStorage.setItem('lastDonationAmount', res);
}

window.addEventListener('load', () => {
    const lastDonationAmount = localStorage.getItem('lastDonationAmount');
    if (lastDonationAmount) {
        resultMoney.textContent = `${lastDonationAmount} ₴`;
        displayJar();
    }
});

document.getElementById('toggleButton').addEventListener('click', function () {
    let element = document.getElementById('hiddenElement');
    let elementTwo = document.getElementById('toggleButton');
    let elementThree = document.getElementById('hideHr');
    if (element.style.display === 'none') {
        element.style.display = 'block'
        elementTwo.style.display = 'none'
        elementThree.style.display = 'none'
    } else {
        element.style.display = 'none'
    }
})

function changeColor() {
    const errorValue = getElement('donation-error-message');
    const btnDonate = getElement('btn-donate');
    const value = parseInt(inputElement.value);

    if (value < 10 || value > 29999) {
        inputElement.value = Math.min(Math.max(value, 1), 29999);
        inputElement.style.color = '#d984a9';
        dollarIcon.style.color = '#d984a9';
        errorValue.style.display = 'flex';
        btnDonate.style.marginTop = '10px';
    } else {
        inputElement.style.color = 'black';
        dollarIcon.style.color = 'black';
        errorValue.style.display = 'none';
        btnDonate.style.marginTop = '25px';
    }
}
function displayJar() {
    const currentAmount = parseInt(localStorage.getItem('lastDonationAmount'));
    const jarContainer = getElement('jar-container');
    const glassImage = document.getElementById("img");

    if (currentAmount >= 25000) {
        glassImage.src = "https://send.monobank.ua/img/jar/uah_100.png";
    } else if (currentAmount >= 12500) {
        glassImage.src = "https://send.monobank.ua/img/jar/uah_50.png";
    } else if (currentAmount > 0) {
        glassImage.src = "https://send.monobank.ua/img/jar/uah_33.png";
    } else {
        glassImage.src = "https://send.monobank.ua/img/jar/0.png";
    }
}

