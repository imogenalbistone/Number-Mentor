document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.querySelector('.sidebar');
    
    // Create mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(menuToggle);
    
    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(this.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Trigger fade-in animations
                const fadeElements = targetSection.querySelectorAll('.fade-in');
                fadeElements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.2}s`;
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = 'fadeInUp 0.8s ease-out forwards';
                });
            }
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Matrix code animation enhancement
    function createMatrixRain() {
        const matrixBg = document.querySelector('.matrix-bg');
        const characters = '01';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < 5; i++) {
            const drop = document.createElement('div');
            drop.style.position = 'absolute';
            drop.style.top = Math.random() * -100 + 'px';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.color = 'rgba(0, 255, 65, 0.1)';
            drop.style.fontSize = '14px';
            drop.style.fontFamily = 'Orbitron, monospace';
            drop.style.animation = `matrixDrop ${Math.random() * 3 + 2}s linear infinite`;
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.textContent = characters[Math.floor(Math.random() * characters.length)];
            
            matrixBg.appendChild(drop);
            
            // Remove element after animation
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.parentNode.removeChild(drop);
                }
            }, 5000);
        }
    }
    
    // Add matrix drop animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixDrop {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create matrix rain effect periodically
    setInterval(createMatrixRain, 200);
    
    // Smooth scrolling for better UX
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Add glow effect to active elements
    function addGlowEffect() {
        const activeElements = document.querySelectorAll('.nav-link.active, .highlight-link:hover');
        activeElements.forEach(el => {
            el.style.textShadow = '0 0 10px rgba(0, 255, 65, 0.8)';
        });
    }
    
    // Initialize glow effects
    setInterval(addGlowEffect, 100);
    
    // Responsive handling
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize fade-in animations for the home section
    const initialFadeElements = document.querySelectorAll('#home .fade-in');
    initialFadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect on page load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);
    
    // Add particle effect on hover for cards
    function addParticleEffect(element) {
        element.addEventListener('mouseenter', function() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--matrix-green)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'particleFloat 1s ease-out forwards';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = Math.random() * rect.height + 'px';
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        });
    }
    
    // Add particle effects to cards
    const cards = document.querySelectorAll('.about-card, .contact-card');
    cards.forEach(addParticleEffect);
    
    // Add particle animation keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-20px) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);
});