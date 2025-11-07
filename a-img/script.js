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
    // Get all the .raul.duplicate elements
    const elements = document.querySelectorAll('.raul.duplicate');

    elements.forEach(el => {
        const xTo = gsap.quickTo(el, '--xpercent', {
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        const yTo = gsap.quickTo(el, '--ypercent', {
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        // Listen for mousemove on the whole document
        document.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();

            // Check if mouse is over the element
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                // Map position relative to this element
                const relX = ((e.clientX - rect.left) / rect.width) * 100;
                const relY = ((e.clientY - rect.top) / rect.height) * 100;

                xTo(relX);
                yTo(relY);
            }
        });
    });
});
