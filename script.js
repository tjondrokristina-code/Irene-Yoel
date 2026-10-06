/* =========================================================
   IRENE & YOEL — ENGAGEMENT INVITATION
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const openInvitationButton =
        document.getElementById("openInvitationButton");

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


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    document.body.classList.add("invitation-locked");


    /* =====================================================
       OPEN INVITATION
    ===================================================== */

    if (openInvitationButton) {

        openInvitationButton.addEventListener("click", async () => {

            /* Prevent double click */
            openInvitationButton.disabled = true;

            openInvitationButton.style.pointerEvents = "none";


            /* ---------------------------------------------
               START MUSIC
            --------------------------------------------- */

            if (backgroundMusic) {

                try {

                    backgroundMusic.volume = 0.45;

                    await backgroundMusic.play();

                } catch (error) {

                    console.log(
                        "Music could not autoplay:",
                        error
                    );

                }

            }


            /* ---------------------------------------------
               COVER EXIT ANIMATION
            --------------------------------------------- */

            if (cover) {
                cover.classList.add("cover-exit");
            }


            /* ---------------------------------------------
               SHOW INVITATION
            --------------------------------------------- */

            setTimeout(() => {

                document.body.classList.remove(
                    "invitation-locked"
                );

                document.body.classList.add(
                    "invitation-unlocked"
                );


                /* Scroll to first content section */

                setTimeout(() => {

                    if (introSection) {

                        introSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }, 100);

            }, 700);

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const sections =
        document.querySelectorAll(".section:not(#cover)");


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach((section) => {

        revealObserver.observe(section);

    });


    /* =====================================================
       WISHES — LOCAL STORAGE
       
       Untuk sementara wishes disimpan di browser.
       Nanti kita ganti ke Google Sheets.
    ===================================================== */

    const WISHES_STORAGE_KEY =
        "ireneYoelWishes";


    function getWishes() {

        try {

            const savedWishes =
                localStorage.getItem(
                    WISHES_STORAGE_KEY
                );

            return savedWishes
                ? JSON.parse(savedWishes)
                : [];

        } catch (error) {

            console.error(
                "Failed to read wishes:",
                error
            );

            return [];

        }

    }


    function saveWishes(wishes) {

        try {

            localStorage.setItem(
                WISHES_STORAGE_KEY,
                JSON.stringify(wishes)
            );

        } catch (error) {

            console.error(
                "Failed to save wishes:",
                error
            );

        }

    }


    /* =====================================================
       DISPLAY WISHES
    ===================================================== */

    function displayWishes() {

        if (!wishesList) {
            return;
        }


        const wishes =
            getWishes();


        wishesList.innerHTML = "";


        if (wishes.length === 0) {

            return;

        }


        wishes
            .slice()
            .reverse()
            .forEach((wish) => {

                const wishCard =
                    document.createElement("div");

                wishCard.className =
                    "wish-card";


                const name =
                    document.createElement("strong");

                name.textContent =
                    wish.name;


                const message =
                    document.createElement("p");

                message.textContent =
                    wish.message;


                wishCard.appendChild(name);
                wishCard.appendChild(message);

                wishesList.appendChild(wishCard);

            });

    }


    /* =====================================================
       WISHES FORM
    ===================================================== */

    if (wishesForm) {

        wishesForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


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


                if (!name || !message) {

                    return;

                }


                const newWish = {

                    name: name,

                    message: message,

                    date:
                        new Date().toISOString()

                };


                const wishes =
                    getWishes();


                wishes.push(newWish);


                saveWishes(wishes);


                displayWishes();


                wishesForm.reset();


                /* -----------------------------------------
                   Small success feedback
                ----------------------------------------- */

                const button =
                    wishesForm.querySelector(
                        "button[type='submit']"
                    );


                if (button) {

                    const originalText =
                        button.textContent;


                    button.textContent =
                        "WISH SENT ✓";


                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 2200);

                }

            }
        );

    }


    /* =====================================================
       LOAD EXISTING WISHES
    ===================================================== */

    displayWishes();


    /* =====================================================
       PAUSE MUSIC WHEN TAB IS HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (!backgroundMusic) {
                return;
            }


            if (
                document.visibilityState ===
                "hidden"
            ) {

                backgroundMusic.pause();

            }

        }
    );

});
