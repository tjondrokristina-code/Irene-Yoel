/* =========================================================
   IRENE & YOEL — ENGAGEMENT INVITATION
   SCRIPT.JS
   ========================================================= */


/* =========================
   1. GET ELEMENTS
   ========================= */

const openInvitationButton =
    document.getElementById("openInvitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const cover =
    document.getElementById("cover");

const introSection =
    document.getElementById("intro");

const wishesForm =
    document.getElementById("wishesForm");

const wishesList =
    document.getElementById("wishesList");


/* =========================
   2. INITIAL STATE
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
       Saat website pertama kali dibuka,
       hanya COVER yang boleh terlihat.
    */

    document.body.classList.add("invitation-locked");

});


/* =========================
   3. OPEN INVITATION
   ========================= */

if (openInvitationButton) {

    openInvitationButton.addEventListener("click", function () {

        /*
           Mencegah tombol diklik berkali-kali
           saat animasi sedang berjalan.
        */

        openInvitationButton.disabled = true;


        /* =========================
           PLAY MUSIC
           ========================= */

        if (backgroundMusic) {

            backgroundMusic.volume = 0.45;

            const playMusic =
                backgroundMusic.play();

            if (playMusic !== undefined) {

                playMusic.catch(function (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                });

            }

        }


        /* =========================
           COVER EXIT ANIMATION
           ========================= */

        if (cover) {

            cover.classList.add("cover-exit");

        }


        /*
           Tunggu sebentar supaya
           animasi cover terasa halus.
        */

        setTimeout(function () {

            /*
               Buka seluruh isi undangan.
            */

            document.body.classList.remove(
                "invitation-locked"
            );

            document.body.classList.add(
                "invitation-unlocked"
            );


            /*
               Scroll ke slide berikutnya.
            */

            setTimeout(function () {

                if (introSection) {

                    introSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 150);

        }, 650);

    });

}


/* =========================
   4. WISHES FORM
   ========================= */

/*
   Untuk sementara wishes disimpan
   di browser menggunakan localStorage.

   NANTI akan kita sambungkan ke
   Google Sheets menggunakan Google
   Apps Script.
*/

if (wishesForm) {

    wishesForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================
               GET FORM DATA
               ========================= */

            const nameInput =
                document.getElementById(
                    "wishName"
                );

            const messageInput =
                document.getElementById(
                    "wishMessage"
                );


            if (!nameInput || !messageInput) {

                return;

            }


            const name =
                nameInput.value.trim();

            const message =
                messageInput.value.trim();


            /*
               Jangan kirim jika kosong.
            */

            if (!name || !message) {

                alert(
                    "Silakan isi nama dan ucapan terlebih dahulu."
                );

                return;

            }


            /* =========================
               CREATE WISH OBJECT
               ========================= */

            const newWish = {

                name: name,

                message: message,

                date:
                    new Date().toISOString()

            };


            /* =========================
               GET OLD WISHES
               ========================= */

            let wishes = [];

            try {

                wishes =
                    JSON.parse(
                        localStorage.getItem(
                            "ireneYoelWishes"
                        )
                    ) || [];

            } catch (error) {

                wishes = [];

            }


            /* =========================
               ADD NEW WISH
               ========================= */

            wishes.unshift(newWish);


            /* =========================
               SAVE WISHES
               ========================= */

            localStorage.setItem(
                "ireneYoelWishes",
                JSON.stringify(wishes)
            );


            /* =========================
               DISPLAY WISHES
               ========================= */

            displayWishes();


            /* =========================
               RESET FORM
               ========================= */

            wishesForm.reset();


            /*
               Beri feedback sederhana.
            */

            alert(
                "Terima kasih untuk ucapan dan doanya ❤️"
            );

        }
    );

}


/* =========================
   5. DISPLAY WISHES
   ========================= */

function displayWishes() {

    if (!wishesList) {

        return;

    }


    let wishes = [];

    try {

        wishes =
            JSON.parse(
                localStorage.getItem(
                    "ireneYoelWishes"
                )
            ) || [];

    } catch (error) {

        wishes = [];

    }


    /*
       Bersihkan isi lama.
    */

    wishesList.innerHTML = "";


    /*
       Jika belum ada ucapan.
    */

    if (wishes.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "Jadilah yang pertama memberikan ucapan untuk Irene & Yoel ❤️";

        emptyMessage.style.textAlign =
            "center";

        emptyMessage.style.color =
            "#81786b";

        emptyMessage.style.fontSize =
            "13px";

        emptyMessage.style.lineHeight =
            "1.7";

        wishesList.appendChild(
            emptyMessage
        );

        return;

    }


    /* =========================
       CREATE WISH CARDS
       ========================= */

    wishes.forEach(function (wish) {

        const card =
            document.createElement("div");

        card.className =
            "wish-card";


        const name =
            document.createElement("div");

        name.className =
            "wish-card-name";

        name.textContent =
            wish.name;


        const message =
            document.createElement("div");

        message.className =
            "wish-card-message";

        message.textContent =
            wish.message;


        card.appendChild(name);

        card.appendChild(message);

        wishesList.appendChild(card);

    });

}


/* =========================
   6. LOAD EXISTING WISHES
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayWishes();

    }
);


/* =========================
   7. INTERSECTION ANIMATION
   ========================= */

/*
   Membuat elemen terasa muncul
   secara perlahan ketika user
   scroll ke bagian tersebut.
*/

const animatedElements =
    document.querySelectorAll(
        ".intro-content, " +
        ".details-content, " +
        ".rsvp-content, " +
        ".wishes-content, " +
        ".closing-content"
    );


if ("IntersectionObserver" in window) {

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

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* =========================
   8. MUSIC CONTROL
   ========================= */

/*
   Kalau user kembali ke halaman
   setelah sebelumnya membuka invitation,
   browser tetap mengikuti aturan autoplay.
*/

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden &&
            backgroundMusic &&
            !backgroundMusic.paused
        ) {

            backgroundMusic.pause();

        }

    }
);
