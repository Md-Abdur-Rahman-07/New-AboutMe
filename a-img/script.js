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
    const elements = document.querySelectorAll('.raul.duplicate');

    elements.forEach(el => {
        const xTo = gsap.quickTo(el, '--xpercent', { duration: 0.4, ease: "back.out(1.7)" });
        const yTo = gsap.quickTo(el, '--ypercent', { duration: 0.4, ease: "back.out(1.7)" });

        let isHovering = false;
        let fadeTimeout;

        document.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const isOver = (
                e.clientX >= rect.left - 50 && // small hover zone padding
                e.clientX <= rect.right + 50 &&
                e.clientY >= rect.top - 50 &&
                e.clientY <= rect.bottom + 50
            );

            if (isOver) {
                if (!isHovering) {
                    isHovering = true;
                    clearTimeout(fadeTimeout);
                    el.style.opacity = 1;
                }
                const relX = ((e.clientX - rect.left) / rect.width) * 100;
                const relY = ((e.clientY - rect.top) / rect.height) * 100;
                xTo(relX);
                yTo(relY);
            } else if (isHovering) {
                isHovering = false;
                fadeTimeout = setTimeout(() => {
                    el.style.opacity = 0;
                }, 150); // delay fade-out a bit for smoother feel
            }
        });
    });
});
