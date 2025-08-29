// Global variables
let currentUserName = '';

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const welcomeMessage = document.getElementById('welcomeMessage');

// Navigation functionality
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Show selected page
            const targetPage = this.getAttribute('data-page');
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
        }
    });
}

// Welcome message functionality
function updateWelcome() {
    const name = nameInput.value.trim();
    if (name) {
        currentUserName = name;
        welcomeMessage.textContent = `Hi ${name}, Welcome To Website`;
        nameInput.value = '';
    } else {
        alert('Please enter your name first!');
    }
}

// Form validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const fieldGroup = document.getElementById(fieldId).parentNode;
    
    errorElement.textContent = message;
    fieldGroup.classList.add('error');
}

// Clear error message
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const fieldGroup = document.getElementById(fieldId).parentNode;
    
    errorElement.textContent = '';
    fieldGroup.classList.remove('error');
}

// Form validation and submission
function initFormValidation() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('messageText').value;
        
        let isValid = true;
        
        // Clear previous errors
        ['name', 'email', 'phone', 'messageText'].forEach(field => {
            clearError(field === 'messageText' ? 'message' : field);
        });
        
        // Validate name
        if (!validateName(name)) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number (10-15 digits)');
            isValid = false;
        }
        
        // Validate message
        if (!validateMessage(message)) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        // If all fields are valid, show the output
        if (isValid) {
            displayFormOutput(name, email, phone, message);
            contactForm.reset();
        }
    });
}

// Display form output
function displayFormOutput(name, email, phone, message) {
    const currentTime = new Date().toLocaleString('en-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.getElementById('currentTime').textContent = currentTime;
    document.getElementById('outputName').textContent = name;
    document.getElementById('outputEmail').textContent = email;
    document.getElementById('outputPhone').textContent = phone;
    document.getElementById('outputMessage').textContent = message;
    
    document.getElementById('formOutput').style.display = 'block';
    
    // Smooth scroll to output
    document.getElementById('formOutput').scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Real-time validation
function initRealTimeValidation() {
    const fields = [
        { id: 'name', validator: validateName, errorMsg: 'Name must be at least 2 characters long' },
        { id: 'email', validator: validateEmail, errorMsg: 'Please enter a valid email address' },
        { id: 'phone', validator: validatePhone, errorMsg: 'Please enter a valid phone number (10-15 digits)' },
        { id: 'messageText', validator: validateMessage, errorMsg: 'Message must be at least 10 characters long', errorId: 'message' }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        element.addEventListener('blur', function() {
            const value = this.value;
            const errorId = field.errorId || field.id;
            
            if (value && !field.validator(value)) {
                showError(errorId, field.errorMsg);
            } else if (value) {
                clearError(errorId);
            }
        });
        
        element.addEventListener('input', function() {
            const errorId = field.errorId || field.id;
            if (this.value && field.validator(this.value)) {
                clearError(errorId);
            }
        });
    });
}

// Initialize all functionality
function init() {
    initNavigation();
    initFormValidation();
    initRealTimeValidation();
    
    // Add enter key support for name input
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateWelcome();
        }
    });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);