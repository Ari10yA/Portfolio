const backDrop = document.getElementsByClassName("backdrop");
const toggleMenu = document.getElementsByClassName("toggle-menu");
const mobileNav = document.getElementsByClassName("mobile-nav");
const header = document.getElementsByClassName("header");
const main_body_image = document.getElementsByClassName("main-body-image");
const semi_circle = document.getElementsByClassName("semi-circle");
const footer = document.getElementsByClassName("footer");
const project_card = document.querySelectorAll(".mb-projects-card");
const project_head = document.getElementsByClassName("mb-projects_head");
const hero_section = document.getElementsByClassName("mb-hero-section");
const projectsContainer = document.querySelector(".mb-projects_container");
const exp_card = document.querySelectorAll(".exp-card");
const projects = document.querySelectorAll(".project-card");

//for hero section specially
const container = document.querySelector(".main-body-image");
const image1 = document.querySelector(".non-toned");
const image2 = document.querySelector(".toned");

const bgimage = document.querySelector(".non-toned_image");
const tonedimage = document.querySelector(".toned_image");
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
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
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

  console.log(upper_active.length);
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
  const descriptions2 = card.querySelectorAll(".mb-projects-card_description2");

  card.addEventListener("mouseenter", () => {
    descriptions[0].classList.toggle("mb-projects-card_description_notshow");

    setTimeout(() => {
      descriptions2[0].style.display = "block";
      descriptions[0].style.display = "none";
      setTimeout(() => {
        descriptions2[0].classList.toggle("mb-projects-card_description2_show");
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
          "mb-projects-card_description_notshow"
        );
      }, 20);
    }, 300);
  });
});

window.onload = () => {
  var currentURL = window.location.href;

  setTimeout(() => {
    header[0].classList.add("show-header");
  }, 500);

  //this is for home page
  if (main_body_image.length > 0) {
    main_body_image[0].classList.add("main-body-image_show");

    //for hero section
    container.addEventListener(
      "mousemove",
      throttle((event) => {
        const x = container.getBoundingClientRect();

        let mouseX = event.clientX - x.left;
        let percentage = (mouseX / x.width) * 100;
        let percent2 = percentage;
        percent2 = percent2 - 50;
        percent2 = percent2 * 0.8;

        let convertedvalue = percent2 + 50;
        if (convertedvalue > 100) convertedvalue = 100;
        else if (convertedvalue <= 0) convertedvalue = 0;
        convertedvalue = convertedvalue + "%";

        let frame3 = {
          clipPath: `inset(0 ${convertedvalue} 0 0)`,
        };

        image1.animate([frame3], {
          duration: 3000,
          fill: "forwards",
        });

        let percent3 = percentage;
        percent3 = percent3 - 50;
        percent3 = percent3 * 0.2;

        if (percent3 > 10) percent3 = 10;
        else if (percent3 < -10) percent3 = -10;

        let updatedVal = percent3 + 50;

        updatedVal = invertPosition(updatedVal);

        variable = updatedVal + "%";

        let frame = {
          left: variable,
        };

        image2.animate([frame], {
          duration: 2000,
          fill: "forwards",
        });
        image1.animate([frame], {
          duration: 2000,
          fill: "forwards",
        });

        let percent_left_part = percentage;
        let percent_right_part = percentage;

        percent_left_part = percent_left_part - 50;
        percent_left_part = 1 - (percent_left_part / 50) * 1.4;
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
        percent_right_part = 1 - (percent_right_part / 50) * 1.4;
        console.log(percent_right_part);
        if (percentage <= 50) {
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
      }, 100)
    );

    let timeout;

    //this is when mouse leaves the the container
    container.addEventListener("mouseleave", () => {
      clearTimeout(timeout);
      let frame1 = {
        left: "50%",
      };
      let frame4 = {
        clipPath: `inset(0 50% 0 0)`,
      };

      let frame_nutral = {
        opacity: 1,
      };

      timeout = setTimeout(() => {
        image1.animate(frame1, {
          duration: 1000,
          fill: "forwards",
          easing: "ease",
        });
        image2.animate(frame1, {
          duration: 1000,
          fill: "forwards",
          easing: "ease",
        });
        image1.animate(frame4, {
          duration: 1000,
          fill: "forwards",
          easing: "ease",
        });
        rightpart_hero.animate(frame_nutral, {
          duration: 2000,
          fill: "forwards",
          easing: "ease",
        });
        leftpart_hero.animate(frame_nutral, {
          duration: 2000,
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
  console.log("button clicked");
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
        entry.isIntersecting
      );
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.3,
  }
);

const footerObserver = new IntersectionObserver((entries) => {
  entries[0].target.classList.toggle("footer_show", entries[0].isIntersecting);
  if (entries[0].isIntersecting) footerObserver.unobserve(entries[0].target);
});

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("project-card_show", entry.isIntersecting);
      if (entry.isIntersecting) {
        projectObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
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
  }
);

const expCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("exp-card_show", entry.isIntersecting);
      if (entry.isIntersecting) {
        expCardObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.0,
  }
);
