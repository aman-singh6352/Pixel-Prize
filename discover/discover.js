document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const photographerElement = document.getElementById('photographer');
    const locationElement = document.getElementById('location');
    const closeButton = document.querySelector('.close-button');

    // Add click event to all gallery items and hero image
    const galleryItems = document.querySelectorAll('.gallery-item, .hero-image');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const photographer = this.getAttribute('data-photographer');
            const location = this.getAttribute('data-location');
            
            photographerElement.textContent = photographer;
            locationElement.textContent = location;
            modal.style.display = 'block';
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});