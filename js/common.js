document.addEventListener("DOMContentLoaded", async function () {

    // Load Navbar
    try {
        const navbarResponse = await fetch("/components/navbar.html");

        if (!navbarResponse.ok) {
            throw new Error(
                `Navbar request failed: ${navbarResponse.status}`
            );
        }

        const navbarHTML = await navbarResponse.text();

        document.getElementById("navbar").innerHTML = navbarHTML;

        console.log("Navbar loaded successfully");

    } catch (error) {
        console.error("Navbar loading failed:", error);
    }


    // Load Footer
    try {
        const footerResponse = await fetch("/components/footer.html");

        if (!footerResponse.ok) {
            throw new Error(
                `Footer request failed: ${footerResponse.status}`
            );
        }

        const footerHTML = await footerResponse.text();

        document.getElementById("footer").innerHTML = footerHTML;

        console.log("Footer loaded successfully");

    } catch (error) {
        console.error("Footer loading failed:", error);
    }

});