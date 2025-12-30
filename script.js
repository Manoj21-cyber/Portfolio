
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            once: false,
            offset: 100
        });
        
        // Loading Screen
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 800);
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainMenu = document.getElementById('mainMenu');
        
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Active menu link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.menu a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Contact Form Submission
        const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    successMessage.style.display = "block";
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 5000);
                } else {
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
        });
        
        // Add typing effect for hero section
        const heroTitle = document.querySelector('.hero h3 span');
        const titles = ["Odoo Developer", "Python Developer", "ERP Specialist", "Full Stack Developer"];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentTitle.length) {
                typingSpeed = 1500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex++;
                if (titleIndex === titles.length) titleIndex = 0;
                typingSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start typing effect after page loads
        setTimeout(() => {
            typeEffect();
        }, 1500);
