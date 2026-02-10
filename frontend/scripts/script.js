document.getElementsByTagName("form")[0].addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    // get data
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone-number").value
    };
    console.log("Data to process:", data);
    const params = new URLSearchParams(new FormData(form)).toString();
    console.log(params)

    // redirect with form data as query params
    window.location.href = "submitted.html?" + params;
});

