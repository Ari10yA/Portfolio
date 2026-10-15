const backDrop = document.getElementsByClassName("backdrop");
const toggleMenu = document.getElementsByClassName("toggle-menu");
const mobileNav = document.getElementsByClassName("mobile-nav");
const header = document.getElementsByClassName("header");
const main_body_image = document.getElementsByClassName("main-body-image");
const footer = document.getElementsByClassName("footer");
const project_card = document.querySelectorAll(".mb-projects-card");
const project_head = document.getElementsByClassName("mb-projects_head");
const hero_section = document.getElementsByClassName("mb-hero-section");
const exp_card = document.querySelectorAll(".exp-card");
const projects = document.querySelectorAll(".project-card");

//for hero section specially
const heroImageContainer = document.querySelector(".main-body-image");
const heroImage1 = document.querySelector(".non-toned");
const heroImage2 = document.querySelector(".toned");

const leftpart_hero = document.querySelector(".leftpart");
const rightpart_hero = document.querySelector(".rightpart");

//contact form imports
const contactForm = document.querySelectorAll(".contact-form");
const contactFormHeader = document.querySelectorAll(".form-header");
const formInputs = document.querySelectorAll(".contact-form_input");
const formTextAreas = document.querySelectorAll(".contact-form_textarea");
const contactButton = document.querySelectorAll(".contact-btn");

//utility function to invert percentages
let invertPosition = (xval) => {
    if (xval == 50) return;
    if (xval > 50) {
        let remaining = xval - 50;
        let updatedVal = 50 - remaining;
        return updatedVal;
    }
    if (xval < 50) {
        let updatedVal = 100 - xval;
        return updatedVal;
    }
};

//utility for throttling
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;

        if (!lastRan || Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(
                function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                },
                limit - (Date.now() - lastRan),
            );
        }
    };
}

//utility function to go through contact form and implement intertive observer
function utilityContactForm() {
    contactObserver.observe(contactForm[0]);
    contactObserver.observe(contactFormHeader[0]);
    formInputs.forEach((input) => {
        contactObserver.observe(input);
    });
    contactObserver.observe(formTextAreas[0]);
    contactObserver.observe(contactButton[0]);
}

exp_card.forEach((card) => {
    const upper = card.getElementsByClassName("exp-card_upper");
    const lower = card.getElementsByClassName("exp-card_lower");
    const upperarrow = card.getElementsByClassName("arrow-drop");

    upper[0].addEventListener("click", () => {
        utility_toggle(lower, upper, card);
        upperarrow[0].classList.toggle("arrow-drop_toggle");
    });
});

const utility_toggle = (lowerel, upperel, card) => {
    const upper_active = card.getElementsByClassName("exp-card_lower_show");

    if (upper_active.length > 0) {
        lowerel[0].classList.toggle("exp-card_lower_show");
        setTimeout(() => {
            lowerel[0].style.maxHeight = 0;
        }, 50);

        // setTimeout(() => {
        //     lowerel[0].classList.toggle('exp-card_lower_display');
        // }, 500);
    } else {
        lowerel[0].classList.toggle("exp-card_lower_show");
        lowerel[0].style.maxHeight = lowerel[0].scrollHeight + 24 + "px";
        // setTimeout(()=> {
        //     lowerel[0].classList.toggle('exp-card_lower_show');
        // }, 20)
    }
};

// projectsContainer.addEventListener('mouseenter', function (event) {

//     if (event.target.classList.contains('mb-projects-card')) {
//         console.log('from projects card');
//         const descriptions = event.target.querySelectorAll('.mb-projects-card_description');
//         const descriptions2 = event.target.querySelectorAll('.mb-projects-card_description2');

//         descriptions[0].classList.toggle('mb-projects-card_description_notshow');

//         setTimeout(() => {
//             descriptions2[0].style.display="block";
//             descriptions[0].style.display="none";
//             descriptions2[0].classList.toggle('mb-projects-card_description2_show');
//         }, 500)

//         // descriptions[1].style.visibility = 'visible'; // Show the second description
//     }
// });

// projectsContainer.addEventListener('mouseleave', function (event) {

//     if (event.target.classList.contains('mb-projects-card')) {

//         const descriptions = event.target.querySelectorAll('.mb-projects-card_description');
//         const descriptions2 = event.target.querySelectorAll('.mb-projects-card_description2');

//         descriptions2[0].classList.toggle('mb-projects-card_description2_show');

//         setTimeout(() => {
//             descriptions[0].style.display="block";
//             descriptions2[0].style.display="none";
//             descriptions[0].classList.toggle('mb-projects-card_description_notshow');
//         }, 500)

//         // descriptions[1].style.visibility = 'visible'; // Show the second description
//     }
// });

project_card.forEach((card) => {
    const descriptions = card.querySelectorAll(".mb-projects-card_description");
    const descriptions2 = card.querySelectorAll(
        ".mb-projects-card_description2",
    );

    card.addEventListener("click", () => {
        const url = card
            .closest(".mb-project-card-wrapper")
            ?.getAttribute("data-url");

        if (url) {
            window.location.href = url;
        }
    });

    card.addEventListener("mouseenter", () => {
        descriptions[0].classList.toggle(
            "mb-projects-card_description_notshow",
        );

        setTimeout(() => {
            descriptions2[0].style.display = "block";
            descriptions[0].style.display = "none";
            setTimeout(() => {
                descriptions2[0].classList.toggle(
                    "mb-projects-card_description2_show",
                );
            }, 20);
        }, 300);
    });

    card.addEventListener("mouseleave", () => {
        descriptions2[0].classList.toggle("mb-projects-card_description2_show");

        setTimeout(() => {
            descriptions[0].style.display = "block";
            descriptions2[0].style.display = "none";
            setTimeout(() => {
                descriptions[0].classList.toggle(
                    "mb-projects-card_description_notshow",
                );
            }, 20);
        }, 300);
    });
});

window.onload = () => {
    //delay loading of header
    setTimeout(() => {
        header[0].classList.add("show-header");
    }, 500);

    //set the initial positioning for both of the hero images
    let frame1 = {
        clipPath: `inset(0 50% 0 0)`,
    };
    let frame2 = {
        clipPath: `inset(0 0 0 50%)`,
    };

    heroImage1?.animate([frame1], {
        duration: 3000,
        fill: "forwards",
    });
    heroImage2?.animate([frame2], {
        duration: 3000,
        fill: "forwards",
    });

    setTimeout(() => {
        heroImage1.setAttribute("data-visible", true);
        heroImage2.setAttribute("data-visible", true);
    }, 2500);

    setTimeout(() => {
        leftpart_hero.setAttribute("data-visible", true);
        rightpart_hero.setAttribute("data-visible", true);
    }, 3500);

    let navigationArrowBtn = document.querySelector(".btn-arrow");
    navigationArrowBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    //this is for home page
    if (main_body_image.length > 0) {
        main_body_image[0].classList.add("main-body-image_show");

        //for hero section
        heroImageContainer.addEventListener(
            "mousemove",
            throttle((event) => {
                const x = heroImageContainer.getBoundingClientRect();

                let mouseX = event.clientX - x.left;
                let mouseXPosi = (mouseX / x.width) * 100;

                //delegated mouse position
                let delegatedmouseXPosi = mouseXPosi;
                delegatedmouseXPosi = delegatedmouseXPosi - 50;
                delegatedmouseXPosi = delegatedmouseXPosi * 1.5;

                let heroImg1ClipPosi = delegatedmouseXPosi + 50;
                //boundary checks
                if (heroImg1ClipPosi > 100) heroImg1ClipPosi = 100;
                else if (heroImg1ClipPosi <= 0) heroImg1ClipPosi = 0;

                let heroImg2ClipPosi = 100 - heroImg1ClipPosi;

                heroImg1ClipPosi = heroImg1ClipPosi + "%";
                heroImg2ClipPosi = heroImg2ClipPosi + "%";

                let frame3 = {
                    clipPath: `inset(0 ${heroImg1ClipPosi} 0 0)`,
                };
                let frame4 = {
                    clipPath: `inset(0 0 0 ${heroImg2ClipPosi})`,
                };

                heroImage1.animate([frame3], {
                    duration: 3000,
                    fill: "forwards",
                });
                heroImage2.animate([frame4], {
                    duration: 3000,
                    fill: "forwards",
                });

                let percent3 = mouseXPosi;
                percent3 = percent3 - 50;
                percent3 = percent3 * 0.8;

                if (percent3 > 10) percent3 = 10;
                else if (percent3 < -10) percent3 = -10;

                let updatedVal = percent3 + 50;

                updatedVal = invertPosition(updatedVal);

                let variable = updatedVal + "%";

                let frame = {
                    left: variable,
                };

                heroImage2.animate([frame], {
                    duration: 2000,
                    fill: "forwards",
                });
                heroImage1.animate([frame], {
                    duration: 2000,
                    fill: "forwards",
                });

                let percent_left_part = mouseXPosi;
                let percent_right_part = mouseXPosi;

                percent_left_part = percent_left_part - 50;
                percent_left_part = 1 - (percent_left_part / 50) * 7;
                if (percent_left_part >= 1) percent_left_part = 1;
                else if (percent_left_part <= 0) percent_left_part = 0;

                let left_frame = {
                    opacity: percent_left_part,
                };
                leftpart_hero.animate([left_frame], {
                    duration: 500,
                    fill: "forwards",
                });

                percent_right_part = percent_right_part - 50;
                percent_right_part = Math.abs(percent_right_part);
                percent_right_part = 1 - (percent_right_part / 50) * 7;

                if (mouseXPosi <= 50) {
                    if (percent_right_part <= 0) percent_right_part = 0;
                    else if (percent_right_part >= 1) percent_right_part = 1;
                } else percent_right_part = 1;

                let right_frame = {
                    opacity: percent_right_part,
                };
                rightpart_hero.animate([right_frame], {
                    duration: 500,
                    fill: "forwards",
                });
            }, 100),
        );

        let timeout;

        //this is when mouse leaves the the container
        heroImageContainer.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            let frame1 = {
                left: "50%",
            };
            let frame4 = {
                clipPath: `inset(0 50% 0 0)`,
            };
            let frame5 = {
                clipPath: `inset(0 0 0 50%)`,
            };

            let frame_nutral = {
                opacity: 1,
            };

            timeout = setTimeout(() => {
                heroImage1.animate(frame1, {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease",
                });
                heroImage2.animate(frame1, {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease",
                });
                heroImage1.animate(frame4, {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease",
                });
                heroImage2.animate(frame5, {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease",
                });
                rightpart_hero.animate(frame_nutral, {
                    duration: 3500,
                    fill: "forwards",
                    easing: "ease",
                });
                leftpart_hero.animate(frame_nutral, {
                    duration: 3500,
                    fill: "forwards",
                    easing: "ease",
                });
            }, 150);
        });
    }

    //this is for about me page
    if (hero_section.length > 0) {
        hero_section[0].classList.add("mb-hero-section_show");
    }

    footerObserver.observe(footer[0]);

    if (project_head.length > 0)
        setTimeout(() => {
            // for(var i=0; i<project_card.length; i++ ){
            //     project_card[i].classList.add('mb-projects-card_show');
            // }
            project_card.forEach((card) => {
                observer.observe(card);
            });
            project_head[0].classList.add("mb-projects_head_show");
        }, 4000);

    if (projects.length > 0) {
        setTimeout(() => {
            projects.forEach((project) => {
                projectObserver.observe(project);
            });
        }, 4000);
    }

    //for handling the contact form
    if (formInputs.length > 0) {
        setTimeout(() => {
            utilityContactForm();
        }, 4000);
    }

    //for checking the expCards
    if (exp_card.length > 0) {
        setTimeout(() => {
            exp_card.forEach((card) => {
                expCardObserver.observe(card);
            });
        }, 4000);
    }
};

toggleMenu[0].addEventListener("click", () => {
    backDrop[0].classList.toggle("active");
    setTimeout(() => {
        backDrop[0].classList.toggle("show");
    }, 10);
    toggleMenu[0].classList.toggle("change");
    mobileNav[0].classList.toggle("active");
});

backDrop[0].addEventListener("click", () => {
    backDrop[0].classList.toggle("show");
    setTimeout(() => {
        backDrop[0].classList.toggle("active");
    }, 2000);
    mobileNav[0].classList.toggle("active");
    toggleMenu[0].classList.toggle("change");
});

mobileNav[0].addEventListener("click", () => {
    backDrop[0].classList.toggle("show");
    setTimeout(() => {
        backDrop[0].classList.toggle("active");
    }, 2000);
    mobileNav[0].classList.toggle("active");
    toggleMenu[0].classList.toggle("change");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(
                "mb-projects-card_show",
                entry.isIntersecting,
            );
            if (entry.isIntersecting) observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.1,
    },
);

const footerObserver = new IntersectionObserver((entries) => {
    entries[0].target.classList.toggle(
        "footer_show",
        entries[0].isIntersecting,
    );
    if (entries[0].isIntersecting) footerObserver.unobserve(entries[0].target);
});

const projectObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(
                "project-card_show",
                entry.isIntersecting,
            );
            if (entry.isIntersecting) {
                projectObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    },
);

const contactObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("utility_show", entry.isIntersecting);
            if (entry.isIntersecting) {
                contactObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    },
);

const expCardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(
                "exp-card_show",
                entry.isIntersecting,
            );
            if (entry.isIntersecting) {
                expCardObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.0,
    },
);
