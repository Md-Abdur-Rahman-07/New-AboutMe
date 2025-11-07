const svg = document.querySelector('svg.squiggle');


const path = svg.querySelector('#mask-path');


const pathLength = path.getTotalLength();


path.style.strokeDasharray = `${pathLength}`;
path.style.strokeDashoffset = `${pathLength}`;

const scroll = () => {
    const distance = window.scrollY;
    const totalDistance = document.body.clientHeight - window.innerHeight;

    // Ensure we don't divide by zero if body is not scrollable
    const percentage = totalDistance > 0 ? (distance / totalDistance) : 0;

    // Animate the strokeDashoffset to reveal the path
    path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
};

// Run the scroll function on page load to set initial values
scroll();

// Add the scroll event listener
window.addEventListener('scroll', scroll);

window.addEventListener("DOMContentLoaded", () => {
    const xTo = gsap.quickTo('.raul.duplicate', '--xpercent', {
        duration: 0.4,
        ease: "back"
    });

    const yTo = gsap.quickTo('.raul.duplicate', '--ypercent', {
        duration: 0.4,
        ease: "back"
    });

    document.addEventListener("mousemove", (e) => {
        const mX = gsap.utils.mapRange(0, window.innerWidth, 0, 100, e.clientX);
        xTo(mX);
        const mY = gsap.utils.mapRange(0, window.innerHeight, 0, 100, e.clientY);
        yTo(mY);
    });
});