document.addEventListener('DOMContentLoaded', function() {
    // Handle Read More/Less functionality for all articles
    document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const hiddenContent = document.getElementById(`hiddenContent${index + 1}`);
            hiddenContent.style.display = 'block';
            this.style.display = 'none';
        });
    });

    document.querySelectorAll('.read-less-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const hiddenContent = document.getElementById(`hiddenContent${index + 1}`);
            hiddenContent.style.display = 'none';
            const readMoreBtn = this.parentElement.previousElementSibling;
            readMoreBtn.style.display = 'inline-block';
        });
    });

    // Handle image hover effects
    document.querySelectorAll('.interactive-image').forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.filter = 'brightness(1.2)';
        });
        
        img.addEventListener('mouseout', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});