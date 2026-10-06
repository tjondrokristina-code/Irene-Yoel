/* =========================================================
   IRENE & YOEL — ENGAGEMENT INVITATION
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. GET ELEMENTS
   ========================================================= */

const openInvitationButton =
    document.getElementById("openInvitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const introSection =
    document.getElementById("intro");


/* =========================================================
   2. HIDE EVERYTHING EXCEPT COVER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(function (section) {

        if (section.id !== "cover") {
            section.style.display = "none";
        }

    });

});


/* =========================================================
   3. OPEN INVITATION
   ========================================================= */

openInvitationButton.addEventListener("click", function () {

    /*
       Musik mulai setelah user melakukan klik.
    */

    backgroundMusic.volume = 0.45;

    backgroundMusic.play().catch(function (error) {

        console.log(
            "Music could not start:",
            error
        );

    });


    /*
       Tampilkan semua section
    */

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(function (section) {

        section.style.display = "";

    });


    /*
       Scroll ke slide kedua
    */

    setTimeout(function () {

        introSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 300);

});
