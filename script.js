"use strict";

// By City: https://api.openbrewerydb.org/breweries?by_city=san_diego
// By State: https://api.openbrewerydb.org/breweries?by_state=ohio

const header = document.querySelector(".header");
const nav = document.querySelector(".header");
const brewSearchField = document.querySelector(".brew-search-field");
const findBreweryBtn = document.querySelector(".find-brewery");

const renderBrewery = function (data) {
  header.innerHTML = "";
  header.insertAdjacentHTML(
    "afterbegin",
    `<h1 class="results-list">${data.length} ${
      data.length > 1 ? "Results" : "Result"
    }</div>`
  );
  data.map((b, i) => {
    if (b.city === "Portland" && b.state === "Maine") return;
    if (b.city === "South Portland" && b.state === "Maine") return;
    if (b.city === "Portland" && b.state === "Michigan") return;
    header.insertAdjacentHTML(
      "beforeend",
      `
        <a href="${b.website_url}">
          <div class="brewery-container">
          <h3 class="brewery-num">${i + 1}</h3>
          <div class="brewery-header">
              <h1 class="brewery-name">${b.name}</h1>
              <h3 class="location">${b.city}, ${b.state}</h3>
          </div>
          <h3 class="brewery-type">${
            b.brewery_type === "brewpub"
              ? b.brewery_type
              : b.brewery_type + "<br>brewery"
          }</h3>
          <h3 class="street-address">${
            b.street ? b.street : "No address<br>available"
          }</h3>
          <h3 class="phone-num">${
            b.phone
              ? b.phone.slice(0, 3) +
                "-" +
                b.phone.slice(3, 6) +
                "-" +
                b.phone.slice(-4)
              : "No phone number<br>available"
          }</h3>
          <h3 class="website">${
            b.website_url ? b.website_url : "No website<br>available"
          }</h3>
          </div>
        </a>

 `
    );
  });
};
// https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=50

//&page=15

const findBrewery = async function (city) {
  try {
    const res = await fetch(`
    https://api.openbrewerydb.org/breweries?by_city=${city}&&per_page=50
      `);
    if (!res.ok) throw new Error("Problem finding Brewery!!!");
    const data = await res.json();
    console.log(data);
    renderBrewery(data);
  } catch (err) {
    console.alert(err);
  }
};

findBreweryBtn.addEventListener("click", function () {
  findBrewery(brewSearchField.value);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") findBrewery(brewSearchField.value);
});
