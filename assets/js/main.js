// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            hamburger.classList.add('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Hide menu
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            // Restore body scroll
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu on window resize (if resizing to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 64; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            // Update active nav link after scroll
            setTimeout(() => {
                updateActiveNavLink();
            }, 500);
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
        navbar.classList.remove('shadow-md');
    } else {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    const scrollPosition = window.pageYOffset + 100; // Offset for navbar height
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // If at the top of the page, highlight home
    if (window.pageYOffset < 200) {
        currentSection = 'home';
    }
    
    // Update nav links
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    
    // Also update when clicking on nav links
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.addEventListener('click', function() {
            // Remove active from all links
            document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(l => {
                l.classList.remove('active');
            });
            // Add active to clicked link
            this.classList.add('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello! I'm interested in booking a camping experience.\n\nName: ${name}\nPhone: ${phone}${email ? `\nEmail: ${email}` : ''}\nMessage: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/917276778395?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            formMessage.classList.remove('hidden', 'bg-red-500', 'bg-opacity-20');
            formMessage.classList.add('bg-green-500', 'bg-opacity-20', 'border', 'border-green-300', 'border-opacity-50');
            formMessage.innerHTML = '<p class="text-white font-semibold">✓ Message sent! We will contact you soon.</p>';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }
});

// Animate elements on scroll using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
    });
}, observerOptions);

// Observe camping cards
document.querySelectorAll('.bg-white.rounded-2xl').forEach(card => {
    card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(card);
});

// Observe contact cards
document.querySelectorAll('#contact .bg-white').forEach(card => {
    card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(card);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('opacity-100');
        this.classList.remove('opacity-0');
    });
    
    img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
});

// Image Modal Functionality with Navigation
let currentImageIndex = 0;
let imageArray = [];
let modalImageElement = null;

function openImageModal(imageSrcOrArray, index = 0) {
    // Handle both single image (string) and array with index
    if (typeof imageSrcOrArray === 'string') {
        imageArray = [imageSrcOrArray];
        currentImageIndex = 0;
    } else if (Array.isArray(imageSrcOrArray)) {
        imageArray = imageSrcOrArray;
        currentImageIndex = index || 0;
    } else {
        return;
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'relative max-w-5xl max-h-full w-full';
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative flex items-center justify-center w-full';
    
    // Create image
    modalImageElement = document.createElement('img');
    modalImageElement.src = imageArray[currentImageIndex];
    modalImageElement.className = 'max-w-full max-h-[90vh] object-contain rounded-lg transition-opacity duration-300';
    modalImageElement.alt = 'Gallery Image';
    modalImageElement.id = 'modalImage';
    
    // Create left arrow button (only if more than 1 image)
    let leftArrow = null;
    if (imageArray.length > 1) {
        leftArrow = document.createElement('button');
        leftArrow.innerHTML = '<';
        leftArrow.className = 'absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-3xl md:text-4xl font-bold transition-all z-10 shadow-lg';
        leftArrow.style.fontFamily = 'Arial, sans-serif';
        leftArrow.onclick = (e) => {
            e.stopPropagation();
            navigateImage(-1);
        };
        leftArrow.id = 'leftArrow';
    }
    
    // Create right arrow button (only if more than 1 image)
    let rightArrow = null;
    if (imageArray.length > 1) {
        rightArrow = document.createElement('button');
        rightArrow.innerHTML = '>';
        rightArrow.className = 'absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-3xl md:text-4xl font-bold transition-all z-10 shadow-lg';
        rightArrow.style.fontFamily = 'Arial, sans-serif';
        rightArrow.onclick = (e) => {
            e.stopPropagation();
            navigateImage(1);
        };
        rightArrow.id = 'rightArrow';
    }
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.className = 'absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold transition-all z-20';
    closeBtn.onclick = closeImageModal;
    
    // Append elements
    imageContainer.appendChild(modalImageElement);
    if (leftArrow) imageContainer.appendChild(leftArrow);
    if (rightArrow) imageContainer.appendChild(rightArrow);
    modalContent.appendChild(imageContainer);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Update arrow visibility
    updateArrowVisibility();
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === imageContainer) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation
    const keyHandler = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', keyHandler);
        } else if (e.key === 'ArrowLeft' && imageArray.length > 1) {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight' && imageArray.length > 1) {
            navigateImage(1);
        }
    };
    document.addEventListener('keydown', keyHandler);
    
    // Store handler for cleanup
    modal.dataset.keyHandler = 'true';
}

function navigateImage(direction) {
    if (imageArray.length <= 1) return;
    
    currentImageIndex += direction;
    
    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = imageArray.length - 1;
    } else if (currentImageIndex >= imageArray.length) {
        currentImageIndex = 0;
    }
    
    // Update image with fade effect
    if (modalImageElement) {
        modalImageElement.style.opacity = '0';
        setTimeout(() => {
            modalImageElement.src = imageArray[currentImageIndex];
            modalImageElement.style.opacity = '1';
            updateArrowVisibility();
        }, 150);
    }
}

function updateArrowVisibility() {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    
    if (imageArray.length <= 1) {
        if (leftArrow) leftArrow.style.display = 'none';
        if (rightArrow) rightArrow.style.display = 'none';
    } else {
        if (leftArrow) leftArrow.style.display = 'flex';
        if (rightArrow) rightArrow.style.display = 'flex';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            modalImageElement = null;
            imageArray = [];
            currentImageIndex = 0;
        }, 300);
    }
}

// Tab Switching Functionality for Alibaug Camping
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active state from all tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('bg-secondary', 'text-white');
        button.classList.add('text-gray-700', 'hover:bg-gray-100');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`content-${tabName}`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Add active state to selected tab button
    const selectedButton = document.getElementById(`tab-${tabName}`);
    if (selectedButton) {
        selectedButton.classList.add('bg-secondary', 'text-white');
        selectedButton.classList.remove('text-gray-700', 'hover:bg-gray-100');
    }
}

// Initialize: Show Nagaon tab by default
document.addEventListener('DOMContentLoaded', function() {
    showTab('nagaon');
});

// Accordion Toggle Functionality
function toggleAccordion(id) {
    const content = document.getElementById(`${id}-content`);
    const button = document.querySelector(`button[onclick="toggleAccordion('${id}')"]`);
    const icon = button ? button.querySelector('.accordion-icon') : null;
    
    if (content && icon) {
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            // Expand accordion
            content.classList.remove('hidden');
            icon.textContent = '−';
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Collapse accordion
            content.classList.add('hidden');
            icon.textContent = '+';
            icon.style.transform = 'rotate(0deg)';
        }
    }
}
