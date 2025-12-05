// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Hero Animations
const tl = gsap.timeline();

tl.from('.logo', {
    y: -20,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
})
    .from('.nav-links li', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.greeting', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.glitch', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
heroVisual.appendChild(canvas);

let width, height;
let particles = [];

function resize() {
    width = canvas.width = heroVisual.offsetWidth;
    height = canvas.height = heroVisual.offsetHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#7000ff'; // Cyan or Purple
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

// Connect particles with lines
function connect() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connect();
    requestAnimationFrame(animate);
}

animate();
