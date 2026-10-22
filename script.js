// AURA Hair Salon & Studio - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Service Category Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceItems = document.querySelectorAll('.service-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-tab');

            serviceItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Pre-fill Service or Stylist when clicking Select / Book
    const serviceSelect = document.getElementById('service-select');
    const stylistSelect = document.getElementById('stylist-select');
    const bookingSection = document.getElementById('booking');

    document.querySelectorAll('.btn-select-service').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = e.target.getAttribute('data-service');
            if (serviceSelect && serviceName) {
                for (let option of serviceSelect.options) {
                    if (option.value.includes(serviceName) || option.text.includes(serviceName)) {
                        option.selected = true;
                        break;
                    }
                }
            }
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.stylist-book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stylistName = e.target.getAttribute('data-stylist');
            if (stylistSelect && stylistName) {
                for (let option of stylistSelect.options) {
                    if (option.value.includes(stylistName)) {
                        option.selected = true;
                        break;
                    }
                }
            }
        });
    });

    // 5. Set Date Input Min Value to Today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 6. Booking Form Submission & Confirmation Display
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const btnResetBooking = document.getElementById('btn-reset-booking');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('client-name').value;
            const service = document.getElementById('service-select').value;
            const stylist = document.getElementById('stylist-select').value;
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;

            // Format date for display
            let formattedDate = date;
            if (date) {
                const dateObj = new Date(date + 'T00:00:00');
                formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }

            // Populate success card
            document.getElementById('res-name').textContent = name;
            document.getElementById('res-service').textContent = service;
            document.getElementById('res-stylist').textContent = stylist;
            document.getElementById('res-datetime').textContent = `${formattedDate} at ${time}`;

            // Show success, hide form
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
        });
    }

    if (btnResetBooking) {
        btnResetBooking.addEventListener('click', () => {
            bookingForm.reset();
            bookingSuccess.classList.add('hidden');
            bookingForm.classList.remove('hidden');
        });
    }
});
