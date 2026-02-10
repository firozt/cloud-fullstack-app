
// wait for html file to load
window.addEventListener("DOMContentLoaded", () => {

    // get values from url
    const params = new URLSearchParams(window.location.search);

    // get td tags with value
    const tds = document.querySelectorAll("td[data-field]");
    console.log("tds: ", tds)
    // change value for all value tds
    tds.forEach(td => {
        const field = td.dataset.field;       // get data-field value
        td.textContent = params.get(field) || "N/A";
    });
});
