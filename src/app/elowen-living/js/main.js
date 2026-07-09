
// ============================================
// ELOWEN LIVING - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    const INQUIRY_EMAIL = 'inquiries@elowenliving.com'; // TODO: replace with your real inbox

    // --- Sticky Navigation Shadow ---
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

    // --- Hero Tabs Switching (toggles style, then lets the link navigate normally) ---
    const heroTabs = document.querySelectorAll('.hero-tabs a');
    heroTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            heroTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // No preventDefault here: each tab has a real href (properties.html,
            // sell-with-us.html, agents.html) so the browser navigates as normal.
        });
    });

    // --- Search Filter Buttons (Buy/Rent toggle; the rest are placeholder filter menus) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.tab) {
                filterBtns.forEach(b => { if (b.dataset.tab) b.classList.remove('active'); });
                this.classList.add('active');
            }
        });
    });

    // --- Sub Nav Active State (only intercepts in-page anchors, lets real links through) ---
    const subNavLinks = document.querySelectorAll('.sub-nav a');
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!this.classList.contains('cta-btn') && href && href.startsWith('#') && href.length > 1) {
                subNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // --- Agent Card Hover (grayscale toggle via JS for smoothness) ---
    const agentCards = document.querySelectorAll('.agent-card');
    agentCards.forEach(card => {
        const photo = card.querySelector('.agent-photo');
        if (photo) {
            card.addEventListener('mouseenter', function() {
                photo.style.filter = 'grayscale(0%)';
            });
            card.addEventListener('mouseleave', function() {
                photo.style.filter = 'grayscale(100%)';
            });
        }
    });

    // --- Search Input Focus Effects ---
    const searchInputs = document.querySelectorAll('.hero-search input, .search-input-wrapper input, .hero-agents-search input');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderBottomColor = '#c9a96e';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.borderBottomColor = '';
        });
    });

    // --- Smooth Scroll for In-Page Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- Mobile Menu Toggle (simple) ---
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '&#9776;';
    mobileMenuBtn.style.cssText = 'display:none; background:none; border:none; color:#fff; font-size:24px; cursor:pointer;';

    if (nav && window.innerWidth <= 768) {
        const logo = nav.querySelector('.logo');
        if (logo) {
            logo.parentNode.insertBefore(mobileMenuBtn, logo.nextSibling);
            mobileMenuBtn.style.display = 'block';
        }
    }

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.feature-card, .stat-item, .agent-card, .property-card, .story-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // --- Nav Link Active State on Current Page ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // CONTACT / LIST YOUR HOME MODAL
    // ============================================
    const modal = document.getElementById('contact-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalForm = document.getElementById('contact-form');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const toast = document.getElementById('toast');
    let modalContext = { type: 'general', name: '' };

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    function openModal(context) {
        if (!modal) return;
        modalContext = context || { type: 'general', name: '' };
        if (modalContext.type === 'agent') {
            modalTitle.textContent = `Contact ${modalContext.name}`;
            modalSubtitle.textContent = `Send a message directly to ${modalContext.name} and they'll follow up with you shortly.`;
        } else if (modalContext.type === 'listing') {
            modalTitle.textContent = 'List Your Home';
            modalSubtitle.textContent = "Tell us about your property and a local expert will reach out to build your marketing plan.";
        } else {
            modalTitle.textContent = 'Contact Us';
            modalSubtitle.textContent = "Tell us a bit about what you're looking for and we'll be in touch shortly.";
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        const nameField = document.getElementById('modal-name');
        if (nameField) setTimeout(() => nameField.focus(), 100);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('modal-name').value.trim();
            const email = document.getElementById('modal-email').value.trim();
            const phone = document.getElementById('modal-phone').value.trim();
            const message = document.getElementById('modal-message').value.trim();

            let subject = 'Elowen Living Inquiry';
            if (modalContext.type === 'agent') subject = `Inquiry for ${modalContext.name}`;
            if (modalContext.type === 'listing') subject = 'Home Listing Request';

            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                phone ? `Phone: ${phone}` : null,
                '',
                message || '(no message provided)'
            ].filter(Boolean);

            const mailtoUrl = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
            window.location.href = mailtoUrl;

            closeModal();
            modalForm.reset();
            showToast("Your email app should now be open with your message ready to send.");
        });
    }

    // Agent "Contact Agent" buttons
    document.querySelectorAll('.agent-contact-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.agent-card');
            const name = card ? card.dataset.name : '';
            openModal({ type: 'agent', name: name });
        });
    });

    // "List Your Home" CTA
    const listHomeBtn = document.getElementById('list-home-btn');
    if (listHomeBtn) {
        listHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal({ type: 'listing' });
        });
    }

    // "Contact Your Local Office"
    const contactOfficeBtn = document.getElementById('contact-office-btn');
    if (contactOfficeBtn) {
        contactOfficeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal({ type: 'general' });
        });
    }

    // ============================================
    // PROPERTIES PAGE: search + read ?location= param
    // ============================================
    const propertiesSearchForm = document.getElementById('properties-search-form');
    const propertiesSearchInput = document.getElementById('properties-search-input');
    const propertyCards = document.querySelectorAll('.property-card');
    const propertiesEmptyState = document.getElementById('properties-empty-state');
    const countHeading = document.getElementById('properties-count-heading');
    const countSub = document.getElementById('properties-count-sub');

    function filterProperties(query) {
        const q = query.trim().toLowerCase();
        let visibleCount = 0;
        propertyCards.forEach(card => {
            const address = (card.dataset.address || card.textContent).toLowerCase();
            const match = q === '' || address.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });
        if (propertiesEmptyState) {
            propertiesEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        if (countHeading) {
            countHeading.textContent = q === ''
                ? 'Viewing 24 of 952,254 Homes for Sale in All locations'
                : `Viewing ${visibleCount} Home${visibleCount === 1 ? '' : 's'} for Sale matching "${query.trim()}"`;
        }
        if (countSub) {
            countSub.textContent = q === ''
                ? 'Showing listings marketed by all brokers in the searched area.'
                : 'Showing listings that match your search.';
        }
        if (window.__elowenMap) {
            window.__elowenMap.filterMarkers(q);
        }
    }

    if (propertiesSearchForm && propertiesSearchInput) {
        propertiesSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterProperties(propertiesSearchInput.value);
        });
        propertiesSearchInput.addEventListener('input', function() {
            filterProperties(this.value);
        });

        // Prefill from ?location= query param coming from the homepage search
        const params = new URLSearchParams(window.location.search);
        const locationParam = params.get('location');
        if (locationParam) {
            propertiesSearchInput.value = locationParam;
            filterProperties(locationParam);
        }
    }

    // "See Details" on property cards -> pan/zoom map + open its popup
    document.querySelectorAll('.see-details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.property-card');
            if (!card) return;
            document.querySelectorAll('.property-card').forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
            if (window.__elowenMap) {
                window.__elowenMap.focusProperty(card.id);
            } else {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Clicking a property card also focuses it on the map
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.property-card').forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
            if (window.__elowenMap) {
                window.__elowenMap.focusProperty(card.id);
            }
        });
    });

    // ============================================
    // AGENTS PAGE: search + sort
    // ============================================
    const agentsSearchForm = document.getElementById('agents-search-form');
    const agentsSearchInput = document.getElementById('agents-search-input');
    const agentsGrid = document.getElementById('agents-grid');
    const agentsEmptyState = document.getElementById('agents-empty-state');
    const sortAzBtn = document.getElementById('sort-az-btn');
    let sortDescending = false;

    function filterAgents(query) {
        const q = query.trim().toLowerCase();
        let visibleCount = 0;
        agentCards.forEach(card => {
            const haystack = `${card.dataset.name || ''} ${card.dataset.location || ''}`.toLowerCase();
            const match = q === '' || haystack.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });
        if (agentsEmptyState) {
            agentsEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (agentsSearchForm && agentsSearchInput) {
        agentsSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterAgents(agentsSearchInput.value);
        });
        agentsSearchInput.addEventListener('input', function() {
            filterAgents(this.value);
        });
    }

    if (sortAzBtn && agentsGrid) {
        sortAzBtn.addEventListener('click', function() {
            const cards = Array.from(agentsGrid.querySelectorAll('.agent-card'));
            cards.sort((a, b) => {
                const nameA = (a.dataset.name || '').toLowerCase();
                const nameB = (b.dataset.name || '').toLowerCase();
                return sortDescending ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
            });
            cards.forEach(card => agentsGrid.appendChild(card));
            sortDescending = !sortDescending;
            sortAzBtn.innerHTML = sortDescending ? 'Sort Z-A &#9662;' : 'Sort A-Z &#9662;';
        });
    }

    // ============================================
    // LIVE MAP (Leaflet + OpenStreetMap — free, no API key required)
    // ============================================
    const mapEl = document.getElementById('live-map');
    if (mapEl && window.L) {
        const map = L.map('live-map', {
            zoomControl: false,
            scrollWheelZoom: true
        }).setView([37.5, -96], 4);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        const markers = {};

        propertyCards.forEach(card => {
            const lat = parseFloat(card.dataset.lat);
            const lng = parseFloat(card.dataset.lng);
            if (isNaN(lat) || isNaN(lng)) return;

            const icon = L.divIcon({
                className: '',
                html: `<div class="leaflet-price-marker">${card.dataset.price || ''}</div>`,
                iconSize: [0, 0],
                iconAnchor: [0, 0]
            });

            const marker = L.marker([lat, lng], { icon }).addTo(map);
            marker.bindPopup(
                `<div class="map-popup-price">${card.dataset.price || ''}</div><div class="map-popup-address">${card.dataset.address || ''}</div>`
            );
            marker.on('click', function() {
                document.querySelectorAll('.property-card').forEach(c => c.classList.remove('highlighted'));
                card.classList.add('highlighted');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            markers[card.id] = { marker, lat, lng, card };
        });

        // Fit map to show all markers on load
        const latLngs = Object.values(markers).map(m => [m.lat, m.lng]);
        if (latLngs.length) {
            map.fitBounds(latLngs, { padding: [60, 60] });
        }

        // Custom zoom buttons wired to the real map
        const zoomInBtn = document.getElementById('map-zoom-in');
        const zoomOutBtn = document.getElementById('map-zoom-out');
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => map.zoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => map.zoomOut());

        // Simple boundary toggle demo
        let boundaryLayer = null;
        const boundaryBtn = document.getElementById('boundary-btn');
        const removeOutlineBtn = document.getElementById('remove-outline-btn');
        if (boundaryBtn) {
            boundaryBtn.addEventListener('click', function() {
                if (boundaryLayer) { map.removeLayer(boundaryLayer); boundaryLayer = null; return; }
                const bounds = map.getBounds();
                boundaryLayer = L.rectangle(bounds.pad(-0.05), {
                    color: '#c9a96e', weight: 2, fillOpacity: 0.05
                }).addTo(map);
            });
        }
        if (removeOutlineBtn) {
            removeOutlineBtn.addEventListener('click', function() {
                if (boundaryLayer) { map.removeLayer(boundaryLayer); boundaryLayer = null; }
            });
        }

        // Expose helper API used by search + "See Details"
        window.__elowenMap = {
            focusProperty(cardId) {
                const entry = markers[cardId];
                if (!entry) return;
                map.setView([entry.lat, entry.lng], 12, { animate: true });
                entry.marker.openPopup();
            },
            filterMarkers(query) {
                const q = (query || '').toLowerCase();
                const visibleLatLngs = [];
                Object.values(markers).forEach(({ marker, lat, lng, card }) => {
                    const address = (card.dataset.address || '').toLowerCase();
                    const match = q === '' || address.includes(q);
                    const el = marker.getElement();
                    if (el) el.style.display = match ? '' : 'none';
                    if (match) visibleLatLngs.push([lat, lng]);
                });
                if (visibleLatLngs.length) {
                    map.fitBounds(visibleLatLngs, { padding: [60, 60] });
                }
            }
        };
    }

    console.log('Elowen Living - Site initialized');
});
