
// Hero background animation for parallax effect
function initHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Learn More Modal Functions
window.openLearnMoreModal = function() {
    document.getElementById('learn-more-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.closeLearnMoreModal = function() {
    document.getElementById('learn-more-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Navigation active state and smooth scrolling
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    // Handle navigation link clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip empty or invalid selectors
            if (!href || href === '#' || href.length <= 1) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to clicked nav link (if it's a nav link)
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }

            try {
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.warn('Invalid selector:', href);
            }
        });
    });

    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`.main-nav .nav-link[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }

    // Throttled scroll event for performance
    const throttledScrollHandler = throttle(updateActiveNavOnScroll, 100);
    window.addEventListener('scroll', throttledScrollHandler);

    // Set initial active state
    updateActiveNavOnScroll();

    // Counter animation for impact stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Programme filtering functionality
    const programmeCards = document.querySelectorAll('.programme-card');
    const filterBtns = document.querySelectorAll('.programme-filters .filter-btn');

    // Initialize programme filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');

            programmeCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // GMP Programme Modal with detailed content
    window.openGMPModal = function() {
        const gmpModalContent = `
            <div class="modal" id="gmp-modal" style="display: block;">
                <div class="modal-content programme-modal">
                    <span class="close" onclick="closeModal('gmp-modal')">&times;</span>
                    <div class="programme-modal-header">
                        <h2>Good Manufacturing Practices (GMP)</h2>
                        <div class="programme-meta-modal">
                            <span class="delivery-type in-person-tag">IN PERSON</span>
                            <span class="location-type">CAPE TOWN</span>
                        </div>
                        <p class="programme-intro">Join our inaugural cohort in Cape Town, South Africa for comprehensive GMP training.</p>
                    </div>
                    
                    <div class="programme-section">
                        <h3>About the programme</h3>
                        <p>Our one-week Good Manufacturing Practices (GMP) Intensive Training Programme provides a thorough introduction to GMP principles, focusing on manufacturing, quality assurance, and regulatory compliance within the food and pharmaceutical industries. This programme combines theoretical insights with practical, hands-on experiences, ensuring participants gain a deep understanding of GMP standards. Over five days, you'll explore critical aspects such as facility management, process control, cleaning and validation, and preparation for regulatory inspections. By the end of the course, you'll be equipped with the knowledge and skills to ensure compliance, improve product quality, and meet regulatory requirements in the manufacturing environment.</p>
                    </div>

                    <div class="programme-section">
                        <h3>Programme details</h3>
                        
                        <h4>Programme Highlights</h4>
                        <ul>
                            <li><strong>Interactive Learning:</strong> Real-world scenarios and hands-on exercises</li>
                            <li><strong>Industry-Specific Insights:</strong> Tailored discussions on both food and pharma GMPs</li>
                            <li><strong>Specialized Focus Areas:</strong> Dedicated sessions on advanced topics, including biological products and aseptic processing</li>
                            <li><strong>Certification of Completion:</strong> A certificate awarded upon successful completion of the course, adding to participants' professional credentials</li>
                        </ul>

                        <h4>Key Learning Benefits</h4>
                        <ul>
                            <li><strong>Expert Guidance:</strong> Learn from seasoned instructors with industry experience</li>
                            <li><strong>Networking Opportunities:</strong> Connect with other professionals in the industry</li>
                            <li><strong>Practical Applications:</strong> Gain knowledge that is directly applicable to the workplace</li>
                        </ul>

                        <h4>Key Objectives</h4>
                        <ul>
                            <li>Understand and implement GMP requirements in food and pharmaceutical settings</li>
                            <li>Design, manage, and maintain compliant facilities</li>
                            <li>Develop effective quality management systems</li>
                            <li>Master documentation and record-keeping practices</li>
                            <li>Prepare for and successfully navigate regulatory inspections</li>
                            <li>Implement risk-based approaches to quality assurance</li>
                        </ul>

                        <div class="programme-details-grid">
                            <div class="detail-item">
                                <h4>Duration</h4>
                                <p>5 Days Intensive Training</p>
                            </div>
                            <div class="detail-item">
                                <h4>Format</h4>
                                <p>In-person, hands-on workshops and theoretical sessions</p>
                            </div>
                            <div class="detail-item">
                                <h4>Location</h4>
                                <p>Cape Town, South Africa</p>
                            </div>
                            <div class="detail-item">
                                <h4>Certification</h4>
                                <p>Certificate of completion provided</p>
                            </div>
                        </div>
                    </div>

                    <div class="programme-section">
                        <h3>Course Curriculum</h3>
                        <div class="curriculum-timeline">
                            <div class="day-item">
                                <h4>Day 1: GMP Fundamentals</h4>
                                <ul>
                                    <li>Introduction to GMP principles and regulations</li>
                                    <li>Regulatory landscape overview (FDA, EMA, WHO)</li>
                                    <li>Quality management systems basics</li>
                                </ul>
                            </div>
                            <div class="day-item">
                                <h4>Day 2: Facility Design & Maintenance</h4>
                                <ul>
                                    <li>Facility layout and design considerations</li>
                                    <li>Equipment qualification and maintenance</li>
                                    <li>Environmental monitoring systems</li>
                                </ul>
                            </div>
                            <div class="day-item">
                                <h4>Day 3: Process Control & Validation</h4>
                                <ul>
                                    <li>Process validation principles</li>
                                    <li>Critical control points identification</li>
                                    <li>Change control management</li>
                                </ul>
                            </div>
                            <div class="day-item">
                                <h4>Day 4: Documentation & Records</h4>
                                <ul>
                                    <li>Documentation systems and best practices</li>
                                    <li>Batch records and traceability</li>
                                    <li>Deviation and CAPA management</li>
                                </ul>
                            </div>
                            <div class="day-item">
                                <h4>Day 5: Audits & Inspections</h4>
                                <ul>
                                    <li>Preparing for regulatory inspections</li>
                                    <li>Internal audit programs</li>
                                    <li>Mock inspection exercise</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="programme-section">
                        <h3>Who Should Attend</h3>
                        <div class="target-audience">
                            <ul>
                                <li>Quality assurance professionals</li>
                                <li>Manufacturing managers and supervisors</li>
                                <li>Regulatory affairs specialists</li>
                                <li>Production technicians and operators</li>
                                <li>New graduates entering pharmaceutical/food industries</li>
                                <li>Consultants working in GMP environments</li>
                            </ul>
                        </div>
                    </div>

                    <div class="programme-actions">
                        <button class="btn btn-primary" onclick="showGMPApplicationForm()">Apply Now</button>
                        <button class="btn btn-outline" onclick="downloadGMPBrochure()">Download Brochure</button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if present
        const existingModal = document.getElementById('gmp-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', gmpModalContent);
        document.body.style.overflow = 'hidden';
    };

    // GMP Application Form
    window.showGMPApplicationForm = function() {
        closeModal('gmp-modal');
        
        const applicationModal = document.createElement('div');
        applicationModal.id = 'gmp-application-modal';
        applicationModal.className = 'modal';
        applicationModal.style.display = 'block';
        
        applicationModal.innerHTML = `
            <div class="modal-content programme-modal">
                <span class="close" onclick="closeApplicationModal('gmp-application-modal')">&times;</span>
                <div class="programme-modal-header">
                    <h2>Apply for GMP Training Programme</h2>
                    <p>Join our intensive 5-day Good Manufacturing Practices training in Cape Town.</p>
                </div>
                
                <form class="application-form" id="gmp-application-form">
                    <div class="form-section">
                        <h3>Personal Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="gmp-firstName">First Name *</label>
                                <input type="text" id="gmp-firstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="gmp-lastName">Last Name *</label>
                                <input type="text" id="gmp-lastName" name="lastName" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="gmp-email">Email Address *</label>
                                <input type="email" id="gmp-email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="gmp-phone">Phone Number *</label>
                                <input type="tel" id="gmp-phone" name="phone" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="gmp-company">Company/Organization *</label>
                            <input type="text" id="gmp-company" name="company" required>
                        </div>
                        <div class="form-group">
                            <label for="gmp-position">Job Title/Position *</label>
                            <input type="text" id="gmp-position" name="position" required>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Professional Background</h3>
                        <div class="form-group">
                            <label for="gmp-industry">Industry Sector *</label>
                            <select id="gmp-industry" name="industry" required>
                                <option value="">Select your industry</option>
                                <option value="pharmaceutical">Pharmaceutical</option>
                                <option value="food-beverage">Food & Beverage</option>
                                <option value="cosmetics">Cosmetics</option>
                                <option value="medical-devices">Medical Devices</option>
                                <option value="biotechnology">Biotechnology</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="gmp-experience">GMP Experience Level *</label>
                            <select id="gmp-experience" name="experience" required>
                                <option value="">Select your experience level</option>
                                <option value="none">No GMP experience</option>
                                <option value="basic">Basic knowledge (0-2 years)</option>
                                <option value="intermediate">Intermediate (2-5 years)</option>
                                <option value="advanced">Advanced (5+ years)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="gmp-motivation">Why do you want to attend this GMP training? *</label>
                            <textarea id="gmp-motivation" name="motivation" rows="4" required placeholder="Please describe your motivation for attending this programme and how it will benefit your career..."></textarea>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Training Preferences</h3>
                        <div class="form-group">
                            <label for="gmp-focus">Areas of Primary Interest (select all that apply):</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="focus" value="facility-design"> Facility Design & Layout</label>
                                <label><input type="checkbox" name="focus" value="process-validation"> Process Validation</label>
                                <label><input type="checkbox" name="focus" value="documentation"> Documentation Systems</label>
                                <label><input type="checkbox" name="focus" value="quality-control"> Quality Control</label>
                                <label><input type="checkbox" name="focus" value="regulatory-compliance"> Regulatory Compliance</label>
                                <label><input type="checkbox" name="focus" value="audit-preparation"> Audit Preparation</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeApplicationModal('gmp-application-modal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Application</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(applicationModal);
        document.body.style.overflow = 'hidden';
        
        // Handle form submission
        const form = document.getElementById('gmp-application-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const applicationData = {};
            
            for (let [key, value] of formData.entries()) {
                if (applicationData[key]) {
                    if (Array.isArray(applicationData[key])) {
                        applicationData[key].push(value);
                    } else {
                        applicationData[key] = [applicationData[key], value];
                    }
                } else {
                    applicationData[key] = value;
                }
            }
            
            alert('Thank you for your application! We have received your application for the GMP Training Programme. Our team will review your application and contact you within 3-5 business days with programme details and next steps.');
            
            console.log('GMP Application submitted:', applicationData);
            closeApplicationModal('gmp-application-modal');
        });
    };

    // Download GMP Brochure function
    window.downloadGMPBrochure = function() {
        // In a real implementation, this would download an actual PDF brochure
        alert('GMP Programme brochure download will be available soon. Please contact us directly for detailed programme information.');
    };

    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.nav-dot');

    window.showTestimonial = function(index) {
        testimonials.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    };

    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Enhanced Modal functionality
    window.openModal = function(modalId) {
        if (modalId === 'gmp-modal') {
            openGMPModal();
            return;
        }
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close application modal function
    window.closeApplicationModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    };

    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Enhanced Blog Functionality
    const blogCards = document.querySelectorAll('.blog-card');
    const blogFilterBtns = document.querySelectorAll('.blog-filters .filter-btn');

    // Make blog tags clickable to show related content
    document.querySelectorAll('.blog-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase();

            if (tagText === 'future of work') {
                openTagModal('future-of-work');
            } else if (tagText === 'technology trends') {
                openTagModal('technology-trends');
            } else if (tagText === 'digital transformation') {
                openTagModal('digital-transformation');
            }
        });

        tag.style.cursor = 'pointer';
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Blog post filtering functionality
    blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            blogFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');
            let visibleCount = 0;

            blogCards.forEach((card, index) => {
                const matchesFilter = filterValue === 'all' || card.getAttribute('data-category') === filterValue;

                if (matchesFilter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';

                    if (filterValue === 'all') {
                        if (visibleCount >= 3) {
                            card.classList.add('load-more-hidden');
                        } else {
                            card.classList.remove('load-more-hidden');
                        }
                    } else {
                        card.classList.remove('load-more-hidden');
                    }
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('load-more-hidden');
                }
            });

            const loadMoreBtn = document.querySelector('.load-more-btn');
            const paginationInfo = document.querySelector('.pagination-info span');
            const completeMessage = document.querySelector('.articles-complete-message');

            if (completeMessage) {
                completeMessage.remove();
            }

            if (filterValue === 'all') {
                const currentlyVisible = document.querySelectorAll('.blog-card:not(.load-more-hidden):not([style*="none"])').length;
                if (paginationInfo) {
                    paginationInfo.textContent = `Showing ${currentlyVisible} of ${visibleCount} articles`;
                }

                if (loadMoreBtn) {
                    if (visibleCount > 3) {
                        loadMoreBtn.style.display = 'inline-flex';
                        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
                        loadMoreBtn.onclick = loadMorePosts;
                    } else {
                        loadMoreBtn.style.display = 'none';
                    }
                }
            } else {
                if (paginationInfo) {
                    paginationInfo.textContent = `Showing ${visibleCount} of ${visibleCount} articles`;
                }
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        });
    });

    // Blog search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let matchingCount = 0;

            blogCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const tags = Array.from(card.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());

                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              tags.some(tag => tag.includes(searchTerm));

                if (matches) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                    card.classList.remove('load-more-hidden');
                    matchingCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('load-more-hidden');
                }
            });

            const loadMoreBtn = document.querySelector('.load-more-btn');
            const paginationInfo = document.querySelector('.pagination-info span');
            const completeMessage = document.querySelector('.articles-complete-message');

            if (completeMessage) {
                completeMessage.remove();
            }

            if (searchTerm.trim() === '') {
                initializeBlogDisplay();
            } else {
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
                    loadMoreBtn.onclick = loadMorePosts;
                }
                if (paginationInfo) {
                    paginationInfo.textContent = `Found ${matchingCount} articles matching "${searchTerm}"`;
                }
            }

            console.log(`Found ${matchingCount} articles matching "${searchTerm}"`);
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Programme application functionality
    window.applyToProgramme = function(programmeType) {
        if (programmeType === 'women-business') {
            closeModal('women-business-modal');
            showApplicationForm('Women in Business Programme');
        } else if (programmeType === 'gmp') {
            showGMPApplicationForm();
        }
    };

    // Application form functionality
    window.showApplicationForm = function(programmeName) {
        const applicationModal = document.createElement('div');
        applicationModal.id = 'application-modal';
        applicationModal.className = 'modal';
        applicationModal.style.display = 'block';
        
        applicationModal.innerHTML = `
            <div class="modal-content programme-modal">
                <span class="close" onclick="closeApplicationModal('application-modal')">&times;</span>
                <div class="programme-modal-header">
                    <h2>Apply for ${programmeName}</h2>
                    <p>Fill out the form below to apply for this programme. Our team will review your application and get back to you within 5-7 business days.</p>
                </div>
                
                <form class="application-form" id="programme-application-form">
                    <div class="form-section">
                        <h3>Personal Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName">First Name *</label>
                                <input type="text" id="firstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name *</label>
                                <input type="text" id="lastName" name="lastName" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="age">Age *</label>
                            <select id="age" name="age" required>
                                <option value="">Select your age range</option>
                                <option value="20-25">20-25</option>
                                <option value="26-30">26-30</option>
                                <option value="31-35">31-35</option>
                                <option value="36-40">36-40</option>
                                <option value="41-45">41-45</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Business Information</h3>
                        <div class="form-group">
                            <label for="businessStatus">Business Status *</label>
                            <select id="businessStatus" name="businessStatus" required>
                                <option value="">Select your business status</option>
                                <option value="existing">I have an existing business</option>
                                <option value="planning">I am planning to start a business</option>
                                <option value="side-business">I want to start a side business</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="businessDescription">Describe your business idea or current business *</label>
                            <textarea id="businessDescription" name="businessDescription" rows="4" required placeholder="Tell us about your business, your goals, and what you hope to achieve through this programme..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="experience">Business Experience *</label>
                            <select id="experience" name="experience" required>
                                <option value="">Select your experience level</option>
                                <option value="none">No business experience</option>
                                <option value="some">Some business experience (1-2 years)</option>
                                <option value="moderate">Moderate business experience (3-5 years)</option>
                                <option value="extensive">Extensive business experience (5+ years)</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Technical Requirements</h3>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="requirements" value="laptop" required>
                                I have access to a laptop or desktop computer
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="requirements" value="internet" required>
                                I have stable internet connectivity
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="requirements" value="english" required>
                                I am fluent in spoken English
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="requirements" value="commitment" required>
                                I can commit to attending a minimum of 10 courses over 5 months
                            </label>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Motivation</h3>
                        <div class="form-group">
                            <label for="motivation">Why do you want to join this programme? *</label>
                            <textarea id="motivation" name="motivation" rows="4" required placeholder="Share your motivation for joining the Women in Business programme and how it aligns with your goals..."></textarea>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeApplicationModal('application-modal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Application</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(applicationModal);
        document.body.style.overflow = 'hidden';
        
        // Handle form submission
        const form = document.getElementById('programme-application-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const applicationData = {};
            
            for (let [key, value] of formData.entries()) {
                if (applicationData[key]) {
                    if (Array.isArray(applicationData[key])) {
                        applicationData[key].push(value);
                    } else {
                        applicationData[key] = [applicationData[key], value];
                    }
                } else {
                    applicationData[key] = value;
                }
            }
            
            const checkboxes = document.querySelectorAll('input[name="requirements"]:checked');
            if (checkboxes.length < 4) {
                alert('Please confirm all technical requirements');
                return;
            }
            
            alert('Thank you for your application! We have received your application for the Women in Business Programme. Our team will review your application and contact you within 5-7 business days. You will receive a confirmation email shortly.');
            
            console.log('Application submitted:', applicationData);
            closeApplicationModal('application-modal');
        });
    };

    // Tag modal functionality for showing tag-specific content
    window.openTagModal = function(tagType) {
        let modalId, title, content;

        switch(tagType) {
            case 'future-of-work':
                modalId = 'future-of-work-modal';
                title = 'Future of Work';
                content = {
                    intro: 'The future of work is being reshaped by technological advancement, changing demographics, and evolving workplace cultures.',
                    sections: [
                        {
                            title: 'Remote and Hybrid Work Models',
                            content: 'Organizations are embracing flexible work arrangements that combine remote and in-office experiences to attract and retain top talent.'
                        },
                        {
                            title: 'Skills-Based Hiring',
                            content: 'Companies are shifting focus from traditional qualifications to specific skills and competencies, opening opportunities for diverse talent pools.'
                        },
                        {
                            title: 'AI-Human Collaboration',
                            content: 'The future workplace will see increased collaboration between humans and AI systems, requiring new skills in AI literacy and human-machine interaction.'
                        },
                        {
                            title: 'Continuous Learning Culture',
                            content: 'Organizations are investing in lifelong learning platforms to help employees adapt to rapidly changing skill requirements.'
                        }
                    ]
                };
                break;

            case 'technology-trends':
                modalId = 'technology-trends-modal';
                title = 'Technology Trends';
                content = {
                    intro: 'Stay ahead of the curve with the latest technology trends shaping industries and creating new opportunities for professionals.',
                    sections: [
                        {
                            title: 'Artificial Intelligence & Machine Learning',
                            content: 'AI continues to transform industries with advancements in natural language processing, computer vision, and predictive analytics.'
                        },
                        {
                            title: 'Cloud-Native Development',
                            content: 'Microservices, containerization, and serverless computing are becoming standard practices for scalable application development.'
                        },
                        {
                            title: 'Cybersecurity Evolution',
                            content: 'Zero-trust security models and AI-powered threat detection are essential as cyber threats become more sophisticated.'
                        },
                        {
                            title: 'Sustainable Technology',
                            content: 'Green computing, energy-efficient algorithms, and sustainable software development practices are gaining prominence.'
                        },
                        {
                            title: 'Low-Code/No-Code Platforms',
                            content: 'These platforms are democratizing software development, enabling non-technical users to create applications.'
                        }
                    ]
                };
                break;

            case 'digital-transformation':
                modalId = 'digital-transformation-modal';
                title = 'Digital Transformation';
                content = {
                    intro: 'Digital transformation is reshaping how organizations operate, serve customers, and create value in the digital economy.',
                    sections: [
                        {
                            title: 'Customer Experience Revolution',
                            content: 'Organizations are leveraging data analytics and AI to create personalized, seamless customer experiences across all touchpoints.'
                        },
                        {
                            title: 'Data-Driven Decision Making',
                            content: 'Companies are building robust data infrastructures to enable real-time insights and evidence-based strategic decisions.'
                        },
                        {
                            title: 'Process Automation',
                            content: 'Robotic Process Automation (RPA) and intelligent automation are streamlining operations and reducing manual tasks.'
                        },
                        {
                            title: 'Digital Workplace Transformation',
                            content: 'Modern collaboration tools and digital workflows are creating more efficient and flexible work environments.'
                        }
                    ]
                };
                break;
        }

        createTagModal(modalId, title, content);
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Create tag modal dynamically
    function createTagModal(modalId, title, content) {
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';

        modal.innerHTML = `
            <div class="modal-content blog-modal">
                <span class="close" onclick="closeModal('${modalId}')">&times;</span>
                <article class="blog-full-article">
                    <div class="blog-header">
                        <h1>${title}</h1>
                        <div class="blog-meta-full">
                            <span class="blog-date"><i class="fas fa-calendar"></i> Updated Daily</span>
                            <span class="read-time"><i class="fas fa-clock"></i> 5 min read</span>
                            <span class="author"><i class="fas fa-user"></i> CAPACITI Team</span>
                        </div>
                    </div>
                    <div class="blog-content-full">
                        <p><strong>${content.intro}</strong></p>
                        ${content.sections.map(section => `
                            <h3>${section.title}</h3>
                            <p>${section.content}</p>
                        `).join('')}

                        <div class="blog-quote">
                            <blockquote>
                                "Staying informed about these trends is crucial for professionals looking to remain competitive in the evolving digital landscape."
                            </blockquote>
                        </div>

                        <h3>Related Resources</h3>
                        <ul>
                            <li><a href="#programmes">Explore our training programmes</a></li>
                            <li><a href="#opportunities">View current opportunities</a></li>
                            <li><a href="#contact">Contact us for more information</a></li>
                        </ul>
                    </div>
                </article>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Initialize blog posts display - show only first 3
    function initializeBlogDisplay() {
        const blogCards = document.querySelectorAll('.blog-card');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const paginationInfo = document.querySelector('.pagination-info span');
        const completeMessage = document.querySelector('.articles-complete-message');

        if (completeMessage) {
            completeMessage.remove();
        }

        blogCards.forEach((card, index) => {
            if (index >= 3) {
                card.classList.add('load-more-hidden');
            } else {
                card.classList.remove('load-more-hidden');
            }
        });

        const visibleCount = Math.min(3, blogCards.length);
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${visibleCount} of ${blogCards.length} articles`;
        }

        if (loadMoreBtn && blogCards.length > 3) {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
            loadMoreBtn.onclick = loadMorePosts;
        } else if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Load more posts functionality with toggle support
    window.loadMorePosts = function() {
        const hiddenCards = document.querySelectorAll('.blog-card.load-more-hidden');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const paginationInfo = document.querySelector('.pagination-info span');
        const allCards = document.querySelectorAll('.blog-card');
        const completeMessage = document.querySelector('.articles-complete-message');

        if (hiddenCards.length > 0) {
            hiddenCards.forEach(card => {
                card.classList.remove('load-more-hidden');
                card.style.animation = 'fadeIn 0.5s ease-in';
            });

            const visibleCards = document.querySelectorAll('.blog-card:not(.load-more-hidden)');
            if (paginationInfo) {
                paginationInfo.textContent = `Showing ${visibleCards.length} of ${allCards.length} articles`;
            }

            if (loadMoreBtn) {
                loadMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Articles';
                loadMoreBtn.onclick = showLessPosts;
            }

            if (completeMessage) {
                completeMessage.remove();
            }
        }
    };

    // Show less posts functionality
    window.showLessPosts = function() {
        const allCards = document.querySelectorAll('.blog-card');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const paginationInfo = document.querySelector('.pagination-info span');

        allCards.forEach((card, index) => {
            if (index >= 3) {
                card.classList.add('load-more-hidden');
            }
        });

        const visibleCards = document.querySelectorAll('.blog-card:not(.load-more-hidden)');
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${visibleCards.length} of ${allCards.length} articles`;
        }

        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
            loadMoreBtn.onclick = loadMorePosts;
        }

        const blogSection = document.getElementById('blog');
        if (blogSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = blogSection.offsetTop - headerHeight - 100;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Breezy integration placeholder
    window.openBreezy = function(type) {
        if (type === 'student') {
            alert('Redirecting to student application portal...');
        } else if (type === 'employer') {
            alert('Redirecting to employer partnership portal...');
        }
    };

    // Initialize blog display on page load
    if (blogCards.length > 0) {
        initializeBlogDisplay();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('impact-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.mission-vision-item, .team-member, .programme-card, .blog-card, .opportunity-card, .impact-stats');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    initHeroBackground();

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} CAPACITI. All rights reserved.`;
    }

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });

    // Social sharing functionality
    window.shareOnSocial = function(platform, url, text) {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    // Site search functionality
    window.searchSite = function(query) {
        const searchResults = [];
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p');

        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                searchResults.push({
                    element: element,
                    text: element.textContent,
                    section: element.closest('section')?.id || 'unknown'
                });
            }
        });

        return searchResults;
    };

    // Performance monitoring
    if ('serviceWorker' in navigator) {
        console.log('Service Worker support detected');
    }

    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            }, 0);
        });
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// CSS animations added via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .loaded * {
        animation-play-state: running;
    }

    .curriculum-timeline .day-item {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        border-left: 4px solid #2563eb;
    }

    .curriculum-timeline .day-item h4 {
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .curriculum-timeline .day-item ul {
        margin: 0;
        padding-left: 1rem;
    }

    .curriculum-timeline .day-item li {
        color: #4b5563;
        margin-bottom: 0.25rem;
    }

    .target-audience ul {
        list-style: none;
        padding: 0;
    }

    .target-audience li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #e5e7eb;
        color: #4b5563;
    }

    .target-audience li:before {
        content: "✓";
        color: #10b981;
        font-weight: bold;
        margin-right: 0.5rem;
    }

    .checkbox-group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #4b5563;
    }

    .checkbox-group input[type="checkbox"] {
        margin: 0;
    }
`;
document.head.appendChild(style);
