/* =========================================================
   IRENE & YOEL
   ENGAGEMENT INVITATION
   SCRIPT.JS
========================================================= */


/* =========================================================
   01. ELEMENTS
========================================================= */

const body = document.body;

const openInvitationButton =
    document.getElementById("openInvitationButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const rsvpForm =
    document.getElementById("rsvpForm");

const wishesForm =
    document.getElementById("wishesForm");

const wishesList =
    document.getElementById("wishesList");


/* =========================================================
   02. MUSIC
========================================================= */

let musicStarted = false;


/*
   Memulai musik.
   Browser biasanya mengizinkan audio karena fungsi ini
   dipanggil langsung setelah user menekan tombol.
*/

function startMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.45;

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                updateMusicButton();

            })
            .catch(() => {

                /*
                   Kalau browser masih menolak autoplay,
                   kita tidak memaksa.
                */

                musicStarted = false;

                updateMusicButton();

            });

    }

}


/* =========================================================
   03. MUSIC BUTTON
========================================================= */

function updateMusicButton() {

    if (!musicToggle) {
        return;
    }

    const icon =
        musicToggle.querySelector(".music-icon");

    if (!icon) {
        return;
    }


    if (
        backgroundMusic &&
        !backgroundMusic.paused
    ) {

        icon.textContent = "♫";

        musicToggle.setAttribute(
            "aria-pressed",
            "true"
        );

        musicToggle.setAttribute(
            "aria-label",
            "Pause music"
        );

    } else {

        icon.textContent = "♪";

        musicToggle.setAttribute(
            "aria-pressed",
            "false"
        );

        musicToggle.setAttribute(
            "aria-label",
            "Play music"
        );

    }

}


/*
   Tombol musik.
*/

if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        function () {

            if (!backgroundMusic) {
                return;
            }


            if (backgroundMusic.paused) {

                backgroundMusic.play()
                    .then(() => {

                        musicStarted = true;

                        updateMusicButton();

                    })
                    .catch(() => {

                        updateMusicButton();

                    });

            } else {

                backgroundMusic.pause();

                musicStarted = false;

                updateMusicButton();

            }

        }
    );

}


/* =========================================================
   04. OPEN INVITATION
========================================================= */

if (openInvitationButton) {

    openInvitationButton.addEventListener(
        "click",
        function () {


            /*
               Unlock seluruh invitation.
            */

            body.classList.remove(
                "invitation-locked"
            );

            body.classList.add(
                "invitation-unlocked"
            );


            /*
               Musik mulai setelah user menekan
               Open Invitation.
            */

            startMusic();


            /*
               Scroll ke slide 2 secara smooth.
            */

            const intro =
                document.getElementById("intro");

            if (intro) {

                setTimeout(() => {

                    intro.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 150);

            }

        }
    );

}


/* =========================================================
   05. IMPORTANT:
   MUSIC IS NOT STOPPED WHEN USER LEAVES THE PAGE
========================================================= */

/*
   JANGAN menggunakan:

   document.addEventListener(
       "visibilitychange",
       ...
   );

   untuk pause musik.

   Kita sengaja TIDAK membuat handler tersebut.

   Jadi script tidak akan memerintahkan musik berhenti
   ketika user membuka Google Maps atau berpindah tab.

   Jika browser/HP sendiri menghentikan audio karena
   kebijakan sistem, itu berada di luar kontrol website.
*/


/* =========================================================
   06. SCROLL REVEAL
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".section-content > *, " +
        ".detail-item, " +
        ".invitation-form, " +
        ".wish-card"
    );


/*
   IntersectionObserver membuat elemen muncul ketika
   user scroll sampai ke bagian tersebut.
*/

if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* =========================================================
   07. RSVP
========================================================= */

/*
   Untuk sekarang RSVP belum dikirim ke Google Sheets.

   Kita siapkan handler-nya terlebih dahulu.

   Nanti ketika URL Google Apps Script sudah ada,
   bagian endpoint bisa kita sambungkan.
*/

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "rsvpName"
                ).value.trim();


            const attendance =
                document.getElementById(
                    "rsvpAttendance"
                ).value;


            const guests =
                document.getElementById(
                    "rsvpGuests"
                ).value;


            if (
                !name ||
                !attendance ||
                !guests
            ) {

                alert(
                    "Please complete all RSVP fields."
                );

                return;

            }


            /*
               TEMPORARY

               Untuk sementara kita tampilkan
               konfirmasi.

               Nanti diganti dengan fetch()
               ke Google Apps Script.
            */

            alert(
                "Thank you, " +
                name +
                "! Your RSVP has been recorded."
            );


            rsvpForm.reset();

        }
    );

}


/* =========================================================
   08. WISHES
========================================================= */

let wishes = [];


/*
   Ambil wishes yang pernah tersimpan di browser.

   Ini hanya penyimpanan sementara sebelum kita
   sambungkan ke Google Sheets.
*/

try {

    const savedWishes =
        localStorage.getItem(
            "ireneYoelWishes"
        );


    if (savedWishes) {

        wishes =
            JSON.parse(savedWishes);

    }

} catch (error) {

    wishes = [];

}


/* =========================================================
   09. DISPLAY WISHES
========================================================= */

function displayWishes() {

    if (!wishesList) {
        return;
    }


    wishesList.innerHTML = "";


    if (wishes.length === 0) {
        return;
    }


    /*
       Wishes terbaru ditampilkan paling atas.
    */

    const reversedWishes =
        [...wishes].reverse();


    reversedWishes.forEach(
        function (wish) {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "wish-card";


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                wish.name;


            const message =
                document.createElement(
                    "p"
                );


            message.textContent =
                wish.message;


            card.appendChild(name);

            card.appendChild(message);

            wishesList.appendChild(card);

        }
    );

}


/* =========================================================
   10. SUBMIT WISHES
========================================================= */

if (wishesForm) {

    wishesForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "wishName"
                ).value.trim();


            const message =
                document.getElementById(
                    "wishMessage"
                ).value.trim();


            if (
                !name ||
                !message
            ) {

                alert(
                    "Please write your name and wishes."
                );

                return;

            }


            const newWish = {

                name: name,

                message: message,

                date:
                    new Date().toISOString()

            };


            wishes.push(
                newWish
            );


            /*
               Simpan sementara di browser.
            */

            try {

                localStorage.setItem(
                    "ireneYoelWishes",
                    JSON.stringify(wishes)
                );

            } catch (error) {

                console.log(
                    "Unable to save wishes locally."
                );

            }


            displayWishes();


            wishesForm.reset();


            alert(
                "Thank you for your beautiful wishes!"
            );

        }
    );

}


/* =========================================================
   11. INITIALIZE WISHES
========================================================= */

displayWishes();


/* =========================================================
   12. PREVENT ACCIDENTAL FORM SUBMISSION
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Tidak melakukan apa-apa pada Enter
           di luar form.

           Ini hanya menjaga pengalaman mobile
           tetap stabil.
        */

        if (
            event.key === "Escape"
        ) {

            return;

        }

    }
);


/* =========================================================
   13. INITIAL MUSIC BUTTON STATE
========================================================= */

updateMusicButton();
