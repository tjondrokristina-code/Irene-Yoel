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
   2. OPEN INVITATION
   ========================================================= */

openInvitationButton.addEventListener("click", function () {

    /*
       Saat tombol ditekan, musik mulai.
    */

    backgroundMusic.volume = 0.45;

    backgroundMusic.play().catch(function (error) {

        console.log(
            "Music could not start:",
            error
        );

    });


    /*
       Setelah tombol ditekan,
       kita arahkan tamu ke slide berikutnya.
    */

    setTimeout(function () {

        introSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 300);

});
