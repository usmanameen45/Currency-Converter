import countryList from "./code.js";

const selects = document.querySelectorAll('select');
const flags = document.querySelectorAll(".flag");
const reverseOrder = document.querySelector("#reverse-country");
const amount = document.querySelector("#amount");
const fromCurrencyValue = document.querySelector("#from-currency-value");
const fromCurrencyCode = document.querySelector("#from-currency-code");
const toCurrencyValue = document.querySelector("#to-currency-value");
const toCurrencyCode = document.querySelector("#to-currency-code");
const result = document.querySelector(".msg");
const exchange = document.querySelector("#exchange");

selects.forEach((select) => {
    
    for (let country in countryList) {

        select.innerHTML += `<option value="${countryList[country]}" class="${countryList[country]}">${country}</option>`;
        if (select.name === "from" && countryList[country] === "US") {
            document.querySelectorAll(".US")[0].setAttribute("selected", "selected");
        }
        if (select.name === "to" && countryList[country] === "PK") {
            document.querySelectorAll(".PK")[1].setAttribute("selected", "selected");
        }
    }
})


selects[0].addEventListener("change", () => {
    
    let selectOptionValue = selects[0].options[selects[0].selectedIndex].value;
    flags[0].setAttribute("src", `https://flagsapi.com/${selectOptionValue}/flat/64.png`);
})

selects[1].addEventListener("change", () => {
    
    let selectOptionValue = selects[1].options[selects[1].selectedIndex].value;
    flags[1].setAttribute("src", `https://flagsapi.com/${selectOptionValue}/flat/64.png`);
})

reverseOrder.addEventListener("click", () => {
    const firstSelectedOptionIndex = selects[0].selectedIndex;
    const firstSelectedOptionflag = flags[0].getAttribute("src");

    selects[0].selectedIndex = selects[1].selectedIndex;
    selects[1].selectedIndex = firstSelectedOptionIndex;

    flags[0].setAttribute("src", flags[1].getAttribute("src"))
    flags[1].setAttribute("src", firstSelectedOptionflag);    
})

amount.addEventListener("keydown", (e) => {
    if (e.key == "-") {
        e.preventDefault();
    }
})

exchange.addEventListener("click",async () => {

    try {
        const baseCurrency = selects[0].options[selects[0].selectedIndex].text.toLowerCase();
        const toCurrency = selects[1].options[selects[1].selectedIndex].text.toLowerCase();
        result.style.visibility = "hidden";
        const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${baseCurrency}.json`)
        const data = await response.json();

        document.querySelector(".msg p:nth-child(1)").style.display = "block";
        toCurrencyValue.textContent = (amount.value * data[baseCurrency][toCurrency]).toFixed(2);
        if (amount.value) {
            fromCurrencyValue.textContent = amount.value;
        } else {
            fromCurrencyValue.textContent = 0;
        }
        fromCurrencyCode.textContent = selects[0].options[selects[0].selectedIndex].text;
        toCurrencyCode.textContent = selects[1].options[selects[1].selectedIndex].text;
        document.querySelector("#error").style.display = "none";
        result.style.visibility = "visible";

    } catch {
        document.querySelector(".msg p:nth-child(1)").style.display = "none";
        const error = document.querySelector("#error");
        error.style.display = "block";
        error.textContent = "Something went wrong";
        result.style.visibility = "visible";
    }
})