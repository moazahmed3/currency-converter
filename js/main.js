let amount = document.querySelector("#amount");
let btnConvert = document.querySelector("#convert");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let res = document.querySelector("#res");

setSelectData();

async function getData() {
  const req = await fetch(
    "https://v6.exchangerate-api.com/v6/08ddf872e5a8fab9ae8893db/latest/USD"
  );
  const data = await req.json();
  return data.conversion_rates;
}
async function getCountry(country) {
  const req = await fetch(
    `https://v6.exchangerate-api.com/v6/08ddf872e5a8fab9ae8893db/latest/${country}`
  );
  const data = await req.json();

  return data.conversion_rates;
}
async function setSelectData() {
  const countrys = await getData();
  let optionsHTML = "";
  for (const country in countrys) {
    optionsHTML += `<option value="${country}">${country}</option>`;
  }
  from.innerHTML = optionsHTML;
  to.innerHTML = optionsHTML;
}

btnConvert.addEventListener("click", convert);

async function convert(params) {
  if (amount.value === "") {
    res.innerHTML = "please Enter Amount";
  } else {
    let country = await getCountry(from.value);
    let result = (country[to.value] * amount.value).toFixed(2);
    res.innerHTML = `From ${amount.value} ${from.value} to ${result} ${to.value}`;
  }
}
