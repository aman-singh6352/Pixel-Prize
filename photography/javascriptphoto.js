// Sample challenge data
const challengesData = [
    {
        id: 1,
        title: "Nature's Design",
        image: "nature.jpg",
        endDate: "March 21, 2024",
        description: "Capture the intricate patterns and designs found in nature.",
        category: "trending"
    },
    {
        id: 2,
        title: "Open Theme",
        image: "open.jpg",
        endDate: "March 22, 2024",
        description: "Show us your best work, any subject welcome.",
        category: "new"
    },
    {
        id: 3,
        title: "Summer Time",
        image: "summer.jpg",
        endDate: "March 23, 2024",
        description: "Capture the essence of summer.",
        category: "trending"
    },
    {
        id: 4,
        title: "Anything Green",
        image: "green.jpg",
        endDate: "March 24, 2024",
        description: "Show us your best green-themed photographs.",
        category: "new"
    },
    {
        id: 5,
        title: "Close Up",
        image: "closeup.jpg",
        endDate: "March 25, 2024",
        description: "Get up close and personal with your subject.",
        category: "trending"
    },
    {
        id: 6,
        title: "City Life",
        image: "city life.jpg",
        endDate: "March 26, 2024",
        description: "Urban photography at its finest.",
        category: "new"
    }
];

// DOM Elements
const challengesGrid = document.querySelector('.challenges-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const popup = document.querySelector('.challenge-popup');
const closeBtn = document.querySelector('.close-btn');

// Create challenge cards
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
        <img src="${challenge.image}" alt="${challenge.title}" class="challenge-image">
        <button class="download-btn" onclick="downloadImage('${challenge.image}')">
            <i class="fa-regular fa-circle-down" style="color: #ffffff;"></i>
        </button>
        <div class="challenge-info">
            <h3 class="challenge-title">${challenge.title}</h3>
            <div class="challenge-details">
                <span class="challenge-date">Ends: ${challenge.endDate}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showPopup(challenge));
    return card;
}

// Download image function
function downloadImage(imageUrl) {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = imageUrl.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Filter challenges
function filterChallenges(category) {
    const filteredChallenges = category === 'all' 
        ? challengesData 
        : challengesData.filter(challenge => challenge.category === category);
    
    challengesGrid.innerHTML = '';
    filteredChallenges.forEach(challenge => {
        challengesGrid.appendChild(createChallengeCard(challenge));
    });
}

// Show popup with challenge details
function showPopup(challenge) {
    popup.querySelector('.popup-title').textContent = challenge.title;
    popup.querySelector('.popup-end-date').textContent = `Ends: ${challenge.endDate}`;
    popup.querySelector('.popup-description').textContent = challenge.description;
    popup.classList.add('visible');
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterChallenges(button.dataset.filter);
    });
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('visible');
});

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('visible');
    }
});

// Initial load
filterChallenges('all');