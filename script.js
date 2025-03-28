document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Form validation
    document.getElementById("booking-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let date = document.getElementById("date").value;

        if (name === "" || email === "" || date === "") {
            alert("Please fill in all fields.");
        } else {
            alert(`Thank you, ${name}! Your booking is confirmed.`);
            this.reset();
        }
    });
});
