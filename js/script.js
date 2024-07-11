// Animated Logo
const logo = document.getElementById('logo');
logo.addEventListener('mouseover', () => {
    logo.textContent = 'Mario Lotira';
});
logo.addEventListener('mouseout', () => {
    logo.textContent = 'ML';
});

// Typewriter effect
const typewriter = document.getElementById('typewriter');
const roles = ['Full-Stack Developer', 'Android Developer', 'UI/UX Designer'];
let roleIndex = 0;
let charIndex = 0;

function typeWrite() {
    if (charIndex < roles[roleIndex].length) {
        typewriter.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWrite, 100);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typewriter.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeWrite, 500);
    }
}

typeWrite();

// Mobile menu toggle
const header = document.querySelector('header');
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';
header.insertBefore(navToggle, header.firstChild);

const nav = document.querySelector('nav');
navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when a link is clicked
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        navToggle.innerHTML = '☰';
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills
const skillsContainer = document.getElementById('skills-container');
const skills = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Kotlin', 'Firebase', 'Django', 'UI/UX'];

skills.forEach(skill => {
    const skillElement = document.createElement('span');
    skillElement.className = 'skill';
    skillElement.textContent = skill;
    skillsContainer.appendChild(skillElement);
});

// Project Carousel
const projectCarousel = document.getElementById('project-carousel');
const projects = [
    { title: 'An NGO Website', description: 'A website for an NGO called TuLDO in Turkana', image: 'images/Screenshot 2024-07-11 201207.png', project: 'https://tuldo.org/' },
    { title: 'Portfolio Website', description: 'A responsive portfolio website', image: 'images/Screenshot 2024-07-11 201758.png' },
    { title: 'YouTube Video Downloader', description: 'A Youtube Video Downloader using Python', image: 'images/Screenshot 2024-07-11 203019.png', project: 'Projects/YouTube Downloader/main.py' }
];

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-image" style="background-image: url('${project.image}')"></div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a type="button" class="view-project" href="${project.project}" target="_blank">View Project</a>
        </div>
    `;
    projectCarousel.appendChild(projectCard);
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent! Thank you for contacting me.');
    contactForm.reset();
});

function sendMail() {
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_knwjaf8", "template_sg8da1m", parms)
}

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const heroImage = document.getElementById('hero-image');
    const scrollPosition = window.pageYOffset;
    heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Animate skill tags
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        skill.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });
};

// Call animateSkills when the about section is in view
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateSkills();
        aboutObserver.unobserve(aboutSection);
    }
}, observerOptions);

aboutObserver.observe(aboutSection);

// Lazy loading for project images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add a scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Add a floating action button for quick contact
const fab = document.createElement('button');
fab.className = 'fab';
fab.textContent = '📧';
fab.title = 'Contact Me';
document.body.appendChild(fab);

fab.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Add subtle animations to service icons
const serviceIcons = document.querySelectorAll('.service-icon');
serviceIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Profile image scroll effect
window.addEventListener('scroll', () => {
    const profileImage = document.getElementById('profile-image');
    const scrollPosition = window.pageYOffset;
    const aboutSection = document.getElementById('about');
    const aboutSectionTop = aboutSection.offsetTop;

    if (scrollPosition >= aboutSectionTop - window.innerHeight / 2) {
        profileImage.style.right = 'auto';
        profileImage.style.left = '5%';
    } else {
        profileImage.style.right = '5%';
        profileImage.style.left = 'auto';
    }
});

// Hire Me button functionality
const hireMeButton = document.querySelector('.hire-me');
hireMeButton.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
});

// Download CV button functionality
const downloadCvButton = document.querySelector('.download-cv');
downloadCvButton.addEventListener('click', (e) => {
    // You can add any additional logic here if needed
    console.log('CV download initiated');
});

