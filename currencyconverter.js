const dropList = document.querySelectorAll(".select-box select"),
    fromcurr = document.querySelector(" .from select"),
    tocurr = document.querySelector(".to select"),
    getbut = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1)
            selected = currency_code == "INR" ? "selected" : "";
        let opt = `<option value="${currency_code}" ${selected} >${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", opt);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });



}
// function loadFlag(element){
// 	for(code in country_code){
// 		if(code == element.value){
// 			let imgtag = element.parentElement.querySelector("img");
// 			imgtag.src = `https://www.countryflags.io/${country_code[code]}/flat/64.png`;

// 		}

// 	}
// }
window.addEventListener("load", () => {
    getErate();
});

getbut.addEventListener("click", e => {
    e.preventDefault();
    getErate();
});

const exchangeicon = document.querySelector(".row .icon");
exchangeicon.addEventListener("click", () => {

    let temcode = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temcode;
    loadFlag(fromcurr);
    loadFlag(tocurr);
    getErate();


});










function getErate() {
    const amt = document.querySelector(" .amount input"),
        exchangeratetxt = document.querySelector(".exchange-rate");
    let amtval = amt.value;
    if (amtval == "" || amtval == "0") {
        amt.value = "0";
        amtval = 1;

    }
    exchangeratetxt.innerText = "converting...";
    let url = `https://v6.exchangerate-api.com/v6/60f3af894ae524b5b0133fa7/latest/${fromcurr.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[tocurr.value];
        let totexch = (amtval * exchangerate).toFixed(2);

        exchangeratetxt.innerText = ` ${amtval} ${fromcurr.value}  = ${totexch} ${tocurr.value}`;
    }).catch(() => {
        exchangeratetxt.innerText = "Something went Wrong";
    });

}


// https://www.exchangerate-api.com   i used this api/