document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // GET ELEMENTS
    // ==========================================

    const welcomeScreen = document.getElementById("welcomeScreen");
    const envelopeScreen = document.getElementById("envelopeScreen");
    const birthdayScreen = document.getElementById("birthdayScreen");
    const messageScreen = document.getElementById("messageScreen");
    const finalScreen = document.getElementById("finalScreen");
    const celebration = document.getElementById("celebration");

    const beginButton = document.getElementById("beginButton");
    const envelope = document.getElementById("envelope");
    const messageButton = document.getElementById("messageButton");
    const finalButton = document.getElementById("finalButton");
    const celebrateButton = document.getElementById("celebrateButton");

    const typingText = document.getElementById("typingText");
    const particles = document.getElementById("particles");
    const musicButton = document.getElementById("musicButton");


    // ==========================================
    // BACKGROUND MUSIC
    // ==========================================

    const music = new Audio("music.mp3");

    music.loop = true;
    music.volume = 0.35;

    let musicPlaying = false;


    // ==========================================
    // SCREEN SWITCHING
    // ==========================================

    function showScreen(screen) {

        const screens = [
            welcomeScreen,
            envelopeScreen,
            birthdayScreen,
            messageScreen,
            finalScreen,
            celebration
        ];

        screens.forEach((item) => {
            if (item) {
                item.classList.remove("active");
            }
        });

        if (screen) {
            screen.classList.add("active");
        }
    }


    // ==========================================
    // START BUTTON
    // ==========================================

    if (beginButton) {

        beginButton.addEventListener("click", () => {

            // Move to envelope screen
            showScreen(envelopeScreen);

            // Start music after user interaction
            music.play()
                .then(() => {

                    musicPlaying = true;

                    if (musicButton) {
                        musicButton.textContent = "🔊";
                        musicButton.classList.add("playing");
                    }

                })
                .catch((error) => {

                    console.log(
                        "Music could not start:",
                        error
                    );

                });

        });

    }


    // ==========================================
    // MUSIC TOGGLE BUTTON
    // ==========================================

    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (musicPlaying) {

                // Pause music
                music.pause();

                musicPlaying = false;

                musicButton.textContent = "🎵";
                musicButton.classList.remove("playing");

            } else {

                // Play music
                music.play()
                    .then(() => {

                        musicPlaying = true;

                        musicButton.textContent = "🔊";
                        musicButton.classList.add("playing");

                    })
                    .catch((error) => {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    });

            }

        });

    }


    // ==========================================
    // ENVELOPE
    // ==========================================

    function openEnvelope() {

        if (!envelope) {
            return;
        }

        // Prevent opening multiple times
        if (envelope.classList.contains("opened")) {
            return;
        }

        envelope.classList.add("opened");

        // Wait for envelope animation
        setTimeout(() => {
            showScreen(birthdayScreen);
        }, 1500);

    }


    // Envelope click
    if (envelope) {

        envelope.addEventListener("click", () => {
            openEnvelope();
        });


        // Keyboard support
        envelope.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                openEnvelope();

            }

        });

    }


    // ==========================================
    // BIRTHDAY MESSAGE BUTTON
    // ==========================================

    if (messageButton) {

        messageButton.addEventListener("click", () => {

            showScreen(messageScreen);
            startTyping();

        });

    }


    // ==========================================
    // TYPEWRITER MESSAGE
    // ==========================================

    const message = `“Whatever happened between us, today isn't about that. It's your birthday.

So I simply wish you happiness, peace, success, and many beautiful moments ahead.

Keep smiling. Take care of yourself. And may this new year of your life be kinder and brighter than the last.”

Someone who is quietly grateful
that you are a part of this world.

I hope this birthday brings you
beautiful moments, wonderful memories
and everything your heart wishes for.

And no matter where life takes you...

I hope you keep smiling
the way you do. ❤️

“No expectations.
No explanations.
Just one sincere wish from the heart—
May you always be happy.”`;

    let typingStarted = false;


    function startTyping() {

        // Prevent restarting
        if (typingStarted || !typingText) {
            return;
        }

        typingStarted = true;

        typingText.textContent = "";

        let index = 0;
        const typingSpeed = 35;

        function typeCharacter() {

            if (index < message.length) {

                typingText.textContent +=
                    message.charAt(index);

                index++;

                setTimeout(
                    typeCharacter,
                    typingSpeed
                );

            } else {

                // Typing finished
                setTimeout(() => {

                    if (finalButton) {
                        finalButton.classList.add("show");
                    }

                }, 800);

            }

        }

        typeCharacter();

    }


    // ==========================================
    // FINAL MESSAGE
    // ==========================================

    if (finalButton) {

        finalButton.addEventListener("click", () => {
            showScreen(finalScreen);
        });

    }


    // ==========================================
    // FINAL CELEBRATION
    // ==========================================

    let celebrationStarted = false;

    if (celebrateButton) {

        celebrateButton.addEventListener("click", () => {

            if (celebrationStarted) {
                return;
            }

            celebrationStarted = true;

            showScreen(celebration);

            createCelebration();

        });

    }


    // ==========================================
    // FLOATING BACKGROUND PARTICLES
    // ==========================================

    function createParticle() {

        if (!particles) {
            return;
        }

        const particle = document.createElement("div");

        particle.classList.add("particle");

        const symbols = [
            "✨",
            "💫",
            "♡",
            "♥",
            "✦",
            "·"
        ];

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        // Random horizontal position
        particle.style.left =
            Math.random() * 100 + "%";

        // Random animation duration
        const duration =
            5 + Math.random() * 6;

        particle.style.animationDuration =
            duration + "s";

        // Random size
        const size =
            10 + Math.random() * 16;

        particle.style.fontSize =
            size + "px";

        particles.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);

    }


    // Create background particles
    setInterval(() => {
        createParticle();
    }, 600);


    // ==========================================
    // CELEBRATION EFFECT
    // ==========================================

    function createCelebration() {

        const celebrationContainer =
            document.getElementById("celebration");

        if (!celebrationContainer) {
            return;
        }

        const celebrationSymbols = [
            "🎉",
            "🎊",
            "✨",
            "💖",
            "💕",
            "💗",
            "🌸",
            "⭐",
            "💫",
            "🎂"
        ];

        // Create 70 celebration particles
        for (
            let i = 0;
            i < 70;
            i++
        ) {

            const item =
                document.createElement("div");

            item.classList.add(
                "celebration-heart"
            );

            // Random symbol
            item.textContent =
                celebrationSymbols[
                    Math.floor(
                        Math.random() *
                        celebrationSymbols.length
                    )
                ];

            // Random horizontal position
            item.style.left =
                Math.random() * 100 + "%";

            // Random animation delay
            item.style.animationDelay =
                Math.random() * 2 + "s";

            // Random animation duration
            item.style.animationDuration =
                3 + Math.random() * 4 + "s";

            // Random size
            item.style.fontSize =
                14 + Math.random() * 20 + "px";

            celebrationContainer.appendChild(item);

            // Remove after animation
            setTimeout(() => {
                item.remove();
            }, 8000);

        }

    }

});
