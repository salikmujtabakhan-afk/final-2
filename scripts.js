/* ==========================================================
   THE JOURNEY TO JULY 19 🌻
   Final Version
   Created by Salik 🤍
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GLOBAL STATE
    ========================================================== */

    const Journey = {
        currentScene: 0,
        totalScenes: 9,
        musicStarted: false,
        locked: false
    };



    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const loader = document.getElementById("loader");

    const scenes = document.querySelectorAll(".scene");

    const bgMusic = document.getElementById("bgMusic");

    const yearInput = document.getElementById("yearInput");

    const unlockButton = document.getElementById("unlockButton");

    const response = document.getElementById("response");



    /* ==========================================================
       LOADER
    ========================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            }, 1000);

        }, 3000);

    });



    /* ==========================================================
       SCENE MANAGER
    ========================================================== */

    function hideAllScenes() {

        scenes.forEach(scene => {

            scene.classList.remove("active");

        });

    }



    function showScene(number) {

        if (Journey.locked) return;

        if (number < 0) return;

        if (number >= Journey.totalScenes) return;

        hideAllScenes();

        Journey.currentScene = number;

        scenes[number].classList.add("active");

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

        saveProgress();

    }



    function nextScene() {

        showScene(Journey.currentScene + 1);

    }



    function previousScene() {

        showScene(Journey.currentScene - 1);

    }



    /* ==========================================================
       MUSIC
    ========================================================== */

    function startMusic() {

        if (Journey.musicStarted) return;

        Journey.musicStarted = true;

        bgMusic.volume = 0;

        bgMusic.play().catch(() => {

            console.log("Music blocked until interaction.");

        });

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.02;

            bgMusic.volume = Math.min(volume, 0.8);

            if (volume >= 0.8) {

                clearInterval(fade);

            }

        }, 120);

    }



    function toggleMusic() {

        if (bgMusic.paused) {

            bgMusic.play();

        } else {

            bgMusic.pause();

        }

    }



    /* ==========================================================
       GOLD FLASH
    ========================================================== */

    function goldenFlash() {

        const flash = document.createElement("div");

        flash.style.position = "fixed";

        flash.style.left = "0";

        flash.style.top = "0";

        flash.style.width = "100%";

        flash.style.height = "100%";

        flash.style.background = "rgba(255,215,0,.35)";

        flash.style.pointerEvents = "none";

        flash.style.zIndex = "9999";

        flash.style.opacity = "0";

        document.body.appendChild(flash);

        flash.animate(

            [

                {

                    opacity: 0

                },

                {

                    opacity: 1

                },

                {

                    opacity: 0

                }

            ],

            {

                duration: 1200

            }

        );

        setTimeout(() => {

            flash.remove();

        }, 1200);

    }



    /* ==========================================================
       SHAKE INPUT
    ========================================================== */

    function shakeInput() {

        yearInput.animate(

            [

                {

                    transform: "translateX(-8px)"

                },

                {

                    transform: "translateX(8px)"

                },

                {

                    transform: "translateX(-8px)"

                },

                {

                    transform: "translateX(8px)"

                },

                {

                    transform: "translateX(0)"

                }

            ],

            {

                duration: 400

            }

        );

    }



    /* ==========================================================
       PUZZLE
    ========================================================== */

    function wrongAnswer() {

        response.innerHTML =

            "You know... Think harder. 🤍";

        response.style.color = "#ff7777";

        yearInput.value = "";

        shakeInput();

    }



    function correctAnswer() {

        response.innerHTML =

            "Correct 🤍";

        response.style.color = "#98ff98";

        unlockButton.disabled = true;

        startMusic();

        goldenFlash();

        setTimeout(() => {

            showScene(1);

        }, 1800);

    }



    function checkPuzzle() {

        const answer =

            yearInput.value.trim();

        if (answer === "2018") {

            correctAnswer();

        }

        else {

            wrongAnswer();

        }

    }



    unlockButton.addEventListener(

        "click",

        checkPuzzle

    );



    yearInput.addEventListener(

        "keydown",

        e => {

            if (e.key === "Enter") {

                checkPuzzle();

            }

        }

    );
        /* ==========================================================
       SCENE 2
       HEART → SUNFLOWER
    ========================================================== */

    const heart = document.getElementById("heart");

    const continueHeart =
        document.getElementById("continueHeart");

    let heartOpened = false;



    heart.addEventListener("click", () => {

        if (heartOpened) return;

        heartOpened = true;

        heart.style.pointerEvents = "none";



        heart.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.25)"

                },

                {

                    transform: "scale(.4)"

                }

            ],

            {

                duration: 1200,

                fill: "forwards"

            }

        );



        createPetals();



        setTimeout(() => {

            heart.innerHTML = "🌻";

            heart.classList.add("sunflower");

        }, 1000);



        setTimeout(() => {

            continueHeart.classList.remove("hidden");

        }, 2200);

    });



    continueHeart.addEventListener("click", () => {

        showScene(2);

        playPoetry();

    });





    /* ==========================================================
       PETALS
    ========================================================== */

    function createPetals() {

        for (let i = 0; i < 25; i++) {

            const petal =

                document.createElement("div");

            petal.innerHTML = "🌼";

            petal.style.position = "fixed";

            petal.style.left =

                Math.random() * 100 + "%";

            petal.style.top =

                Math.random() * 100 + "%";

            petal.style.fontSize =

                (16 + Math.random() * 16) + "px";

            petal.style.pointerEvents = "none";

            petal.style.zIndex = "999";

            document.body.appendChild(petal);



            petal.animate(

                [

                    {

                        opacity: 0,

                        transform:

                            "translateY(0) rotate(0deg)"

                    },

                    {

                        opacity: 1

                    },

                    {

                        opacity: 0,

                        transform:

                            `translateY(-250px)
                             rotate(${Math.random()*360}deg)`

                    }

                ],

                {

                    duration:

                        2500 + Math.random() * 1500,

                    easing: "ease-out"

                }

            );



            setTimeout(() => {

                petal.remove();

            }, 4000);

        }

    }





    /* ==========================================================
       SCENE 3
       POETRY
    ========================================================== */

    const poemLines =

        document.querySelectorAll(".poem-line");

    const questionBox =

        document.getElementById("isThatYou");



    function playPoetry() {

        poemLines.forEach(line => {

            line.style.opacity = 0;

        });



        poemLines.forEach((line, index) => {

            setTimeout(() => {

                line.animate(

                    [

                        {

                            opacity: 0,

                            transform:

                            "translateY(25px)"

                        },

                        {

                            opacity: 1,

                            transform:

                            "translateY(0)"

                        }

                    ],

                    {

                        duration: 900,

                        fill: "forwards"

                    }

                );

            }, index * 1800);

        });



        setTimeout(() => {

            questionBox.classList.remove("hidden");

        }, poemLines.length * 1800 + 800);

    }





    /* ==========================================================
       YES BUTTONS
    ========================================================== */

    const yesButtons =

        document.querySelectorAll(".yesButton");



    yesButtons.forEach(button => {

        button.addEventListener("click", () => {

            showScene(3);

        });

    });





    /* ==========================================================
       SCENE 4
       BABY PHOTO
    ========================================================== */

    const babyPhoto =

        document.getElementById("babyPhoto");

    const kissEmoji =

        document.getElementById("kissEmoji");

    const continueBaby =

        document.getElementById("continueBaby");



    let kissed = false;



    babyPhoto.addEventListener("click", () => {

        if (kissed) return;

        kissed = true;



        babyPhoto.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.08)"

                },

                {

                    transform: "scale(1)"

                }

            ],

            {

                duration: 700

            }

        );



        kissEmoji.style.display = "block";



        kissEmoji.animate(

            [

                {

                    opacity: 0,

                    transform: "scale(.3)"

                },

                {

                    opacity: 1,

                    transform: "scale(1.3)"

                },

                {

                    transform: "scale(1)"

                }

            ],

            {

                duration: 700,

                fill: "forwards"

            }

        );



        setTimeout(() => {

            continueBaby.classList.remove("hidden");

        }, 1800);

    });



    continueBaby.addEventListener("click", () => {

        showScene(4);

    });
        /* ==========================================================
       SCENE 5
       HER JOURNEY
    ========================================================== */

    const lifeCards =
        document.querySelectorAll(".lifeCard");

    const continueLife =
        document.getElementById("continueLife");



    function revealLifeJourney() {

        let current = 0;

        lifeCards.forEach(card => {

            card.style.opacity = "0";

            card.style.display = "none";

        });

        function revealNext() {

            if (current >= lifeCards.length) {

                continueLife.classList.remove("hidden");

                return;

            }

            const card = lifeCards[current];

            card.style.display = "block";

            card.animate(

                [

                    {
                        opacity: 0,
                        transform: "translateY(40px)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }

                ],

                {
                    duration: 900,
                    fill: "forwards"
                }

            );

            current++;

            setTimeout(revealNext, 2800);

        }

        revealNext();

    }



    continueLife.addEventListener("click", () => {

        showScene(5);

        revealOurJourney();

    });





    /* ==========================================================
       SCENE 6
       OUR JOURNEY
    ========================================================== */

    const memoryCards =
        document.querySelectorAll(".memoryCard");

    const continueJourney =
        document.getElementById("continueJourney");



    function revealOurJourney() {

        memoryCards.forEach(card => {

            card.classList.remove("show");

        });

        let current = 0;

        function reveal() {

            if (current >= memoryCards.length) {

                continueJourney.classList.remove("hidden");

                return;

            }

            memoryCards[current].classList.add("show");

            memoryCards[current].scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

            current++;

            setTimeout(reveal, 3000);

        }

        reveal();

    }



    continueJourney.addEventListener("click", () => {

        showScene(6);

    });





    /* ==========================================================
       SCENE 7
       ENVELOPE
    ========================================================== */

    const envelope =
        document.getElementById("envelope");

    const letter =
        document.getElementById("letterPaper");

    const continueLetter =
        document.getElementById("continueLetter");



    envelope.addEventListener("click", () => {

        const flap =
            document.querySelector(".envelope-flap");

        flap.style.transform =
            "rotateX(180deg)";

        setTimeout(() => {

            letter.classList.remove("hidden");

            typeLetter();

        }, 900);

    });





    /* ==========================================================
       TYPEWRITER
    ========================================================== */

    function typeLetter() {

        const paragraphs =
            document.querySelectorAll("#typedLetter p");

        let paragraphIndex = 0;

        function typeParagraph() {

            if (paragraphIndex >= paragraphs.length) {

                continueLetter.classList.remove("hidden");

                return;

            }

            const p = paragraphs[paragraphIndex];

            const original = p.innerHTML;

            p.innerHTML = "";

            let char = 0;

            function typeCharacter() {

                if (char < original.length) {

                    p.innerHTML +=

                        original.charAt(char);

                    char++;

                    setTimeout(typeCharacter, 18);

                }

                else {

                    paragraphIndex++;

                    setTimeout(typeParagraph, 600);

                }

            }

            typeCharacter();

        }

        typeParagraph();

    }



    continueLetter.addEventListener("click", () => {

        showScene(7);

        revealGallery();

    });
        /* ==========================================================
       SCENE 8
       PHOTO GALLERY
    ========================================================== */

    const photoCards =
        document.querySelectorAll(".photoCard");

    const continueGift =
        document.getElementById("continueGift");



    function revealGallery() {

        photoCards.forEach(card => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(40px) rotate(-8deg)";

        });

        photoCards.forEach((card, index) => {

            setTimeout(() => {

                card.animate(

                    [

                        {

                            opacity: 0,

                            transform:
                                "translateY(40px) rotate(-8deg)"

                        },

                        {

                            opacity: 1,

                            transform:
                                "translateY(0) rotate(0deg)"

                        }

                    ],

                    {

                        duration: 700,

                        fill: "forwards"

                    }

                );

            }, index * 450);

        });

    }



    continueGift.addEventListener("click", () => {

        showScene(8);

        saveProgress();

    });





    /* ==========================================================
       FINAL GIFT
    ========================================================== */

    const giftBox =
        document.getElementById("giftBox");

    const giftReveal =
        document.getElementById("giftReveal");



    giftBox.addEventListener("click", () => {

        giftBox.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform:
                        "scale(1.15) rotate(8deg)"

                },

                {

                    transform:
                        "scale(.95)"

                },

                {

                    transform:
                        "scale(1)"

                }

            ],

            {

                duration: 900

            }

        );

        setTimeout(() => {

            giftReveal.classList.remove("hidden");

            createConfetti();

            finalPetals();

        }, 700);

    });





    /* ==========================================================
       CONFETTI
    ========================================================== */

    function createConfetti() {

        for (let i = 0; i < 180; i++) {

            const confetti =
                document.createElement("div");

            confetti.className = "confetti";

            confetti.style.left =
                Math.random() * 100 + "%";

            confetti.style.animationDelay =
                Math.random() * 2 + "s";

            confetti.style.background =
                `hsl(${Math.random()*360},80%,60%)`;

            document.body.appendChild(confetti);

            setTimeout(() => {

                confetti.remove();

            }, 6000);

        }

    }





    /* ==========================================================
       FINAL SUNFLOWERS
    ========================================================== */

    function finalPetals() {

        for (let i = 0; i < 35; i++) {

            const flower =
                document.createElement("div");

            flower.innerHTML = "🌻";

            flower.style.position = "fixed";

            flower.style.left =
                Math.random() * 100 + "%";

            flower.style.top = "-50px";

            flower.style.fontSize =
                (20 + Math.random() * 22) + "px";

            flower.style.pointerEvents = "none";

            flower.style.zIndex = "999";

            document.body.appendChild(flower);

            flower.animate(

                [

                    {

                        transform:
                            "translateY(-50px) rotate(0deg)"

                    },

                    {

                        transform:
                            `translate(${Math.random()*250-120}px,110vh)
                             rotate(${Math.random()*720}deg)`

                    }

                ],

                {

                    duration:
                        5000 + Math.random() * 3000,

                    easing: "linear"

                }

            );

            setTimeout(() => {

                flower.remove();

            }, 8000);

        }

    }





    /* ==========================================================
       SAVE PROGRESS
    ========================================================== */

    function saveProgress() {

        localStorage.setItem(

            "journeyScene",

            Journey.currentScene

        );

    }



    function restoreProgress() {

        const saved =

            localStorage.getItem(

                "journeyScene"

            );

        if (saved !== null) {

            showScene(Number(saved));

        }

    }



    restoreProgress();





    /* ==========================================================
       KEYBOARD SUPPORT
    ========================================================== */

    document.addEventListener(

        "keydown",

        e => {

            if (e.key === "ArrowRight") {

                nextScene();

            }

            if (e.key === "ArrowLeft") {

                previousScene();

            }

        }

    );





    /* ==========================================================
       END
    ========================================================== */

    console.log(

        "%cThe Journey To July 19 🌻",

        "font-size:20px;color:#F5C542;"

    );

});

    