/* ===========================
   MAIN JAVASCRIPT
   Handles navigation, form validation, and interactions
   =========================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================
    // Mobile Navigation Toggle
    // =============================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // =============================
    // Contact Form Validation & Submission
    // =============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subject', 'Please select a subject');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // Create mailto link
                const mailtoLink = createMailtoLink(name, email, phone, subject, message);
                
                // Open mail client
                window.location.href = mailtoLink;
                
                // Show success message
                showSuccess('Thank you for contacting us! Your message has been prepared. Please send it through your email client.');
                
                // Reset form after a short delay
                setTimeout(() => {
                    contactForm.reset();
                    hideSuccess();
                }, 3000);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                if (this.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });
    }
    
    // =============================
    // Form Validation Helper Functions
    // =============================
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        
        switch(fieldName) {
            case 'name':
                if (value === '') {
                    showError(fieldName, 'Name is required');
                } else if (value.length < 2) {
                    showError(fieldName, 'Name must be at least 2 characters');
                }
                break;
                
            case 'email':
                if (value === '') {
                    showError(fieldName, 'Email is required');
                } else if (!isValidEmail(value)) {
                    showError(fieldName, 'Please enter a valid email address');
                }
                break;
                
            case 'subject':
                if (value === '') {
                    showError(fieldName, 'Please select a subject');
                }
                break;
                
            case 'message':
                if (value === '') {
                    showError(fieldName, 'Message is required');
                } else if (value.length < 10) {
                    showError(fieldName, 'Message must be at least 10 characters');
                }
                break;
        }
    }
    
    function showError(fieldName, errorMessage) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
    
    function clearFieldError(field) {
        const fieldName = field.id;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    function showSuccess(message) {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.textContent = message;
            successElement.classList.add('show');
        }
    }
    
    function hideSuccess() {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.classList.remove('show');
        }
    }
    
    function isValidEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function createMailtoLink(name, email, phone, subject, message) {
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:info@taxproconsultants.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return mailtoLink;
    }
    
    // =============================
    // Smooth Scrolling for Anchor Links
    // =============================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle if it's not just "#"
            if (targetId !== '#' && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // =============================
    // Scroll Animation for Elements
    // =============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.highlight-card, .service-card, .team-member, .mission-card, .value-item, .reason-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // =============================
    // WhatsApp Button Pulse Animation
    // =============================
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Add pulse animation after page load
        setTimeout(() => {
            whatsappButton.style.animation = 'pulse 2s infinite';
        }, 2000);
    }
    
    // Add pulse keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
    
    // =============================
    // Active Page Highlight in Navigation
    // =============================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('.nav-menu a');
    
    navLinks2.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // =============================
    // Console Welcome Message
    // =============================
    console.log('%c TaxPro Consultants ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Website loaded successfully! ', 'color: #22c55e; font-size: 14px;');
    
});
