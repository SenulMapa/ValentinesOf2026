// --- CONFIGURATION ---
const CONFIG = {
    startHour: 1,
    startMinute: 10,
    endHour: 1,
    endMinute: 20,
    bypassCode: "wildflower"
};

// --- DOM ELEMENTS ---
const screens = {
    locked: document.getElementById('screen-locked'),
    intro: document.getElementById('screen-intro'),
    proposal: document.getElementById('screen-proposal'),
    coke: document.getElementById('screen-coke'),
    music: document.getElementById('screen-music'),
    success: document.getElementById('screen-success')
};

const timerEl = document.getElementById('timer');
const noBtn = document.getElementById('btn-no');
let countdownInterval;
let cokeTaps = 0;

// --- INITIALIZATION ---
window.onload = () => {
    createBackgroundElements();
    checkTimeAccess();
    countdownInterval = setInterval(checkTimeAccess, 1000);
    setupEventListeners();
};

// --- TIME LOGIC ---
function checkTimeAccess() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Check window (1:10 - 1:19:59)
    const isOpenWindow = (currentHour === CONFIG.startHour) && 
                         (currentMinute >= CONFIG.startMinute && currentMinute < CONFIG.endMinute);

    if (isOpenWindow) {
        unlockApp();
        return;
    }

    updateCountdown(now);
}

function updateCountdown(now) {
    let target = new Date(now);
    target.setHours(CONFIG.startHour, CONFIG.startMinute, 0, 0);

    // If past time today, target tomorrow
    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    const diff = target - now;
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function unlockApp() {
    clearInterval(countdownInterval);
    if (screens.locked.classList.contains('active-screen')) {
        switchScreen('locked', 'intro');
    }
}

function triggerBypass() {
    const code = prompt("Enter passcode:");
    if (code && code.toLowerCase() === CONFIG.bypassCode) {
        unlockApp();
    }
}

// --- NAVIGATION ---
function switchScreen(fromId, toId) {
    const fromScreen = screens[fromId];
    const toScreen = screens[toId];

    fromScreen.classList.remove('active-screen');
    fromScreen.classList.add('hidden');

    toScreen.classList.remove('hidden');
    toScreen.classList.add('active-screen');

    // Special setup for certain screens
    if (toId === 'music') {
        setTimeout(() => {
            if (window.musicPlayer) {
                window.musicPlayer.initialize();
            }
        }, 100);
    }
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
    // "NO" button evasion with radius clamp
    setupNoButton();
    
    // Coke game
    setupCokeGame();
}

// --- "NO" BUTTON EVASION WITH RADIUS CLAMP ---
const noTexts = [
    "Are you sure?",
    "Try again 😏",
    "Wrong button",
    "Click Yes!",
    "Nope 😝",
    "Really?",
    "Think again",
    "Yes is better",
    "Not an option",
    "Try the other one",
    "Be nice!",
    "Come on!",
    "Just click Yes!",
    "Pretty please?",
    "You know you want to"
];

function setupNoButton() {
    const noBtn = document.getElementById('btn-no');
    
    function moveNoButton() {
        // Get button dimensions
        const btnRect = noBtn.getBoundingClientRect();
        const btnWidth = btnRect.width || 120;
        const btnHeight = btnRect.height || 48;
        
        // Calculate safe boundaries with radius clamp
        // The button can only move within a circular radius from its original position
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3; // 30% of screen size
        
        // Calculate random angle and distance within radius
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxRadius;
        
        // Calculate new position
        let randomX = centerX + Math.cos(angle) * distance;
        let randomY = centerY + Math.sin(angle) * distance;
        
        // Ensure button stays within viewport with padding
        const padding = 20;
        const maxX = window.innerWidth - btnWidth - padding;
        const minX = padding;
        const maxY = window.innerHeight - btnHeight - padding;
        const minY = padding;
        
        // Clamp to screen bounds
        randomX = Math.max(minX, Math.min(maxX, randomX));
        randomY = Math.max(minY, Math.min(maxY, randomY));
        
        // Apply Fixed Position
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Random Text
        noBtn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
        noBtn.style.transform = `rotate(${Math.random() * 8 - 4}deg)`;
        
        // Add slight scale animation
        noBtn.style.transform += ` scale(${0.95 + Math.random() * 0.1})`;
    }

    // Add listeners
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
        
        // Add haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });
}

// --- COKE GAME ---
function setupCokeGame() {
    const cokeCan = document.getElementById('cokeCan');
    const cokeCount = document.getElementById('cokeCount');
    const cokeProgress = document.getElementById('cokeProgress');
    const cokeMessage = document.getElementById('cokeMessage');

    cokeCan.addEventListener('click', () => {
        cokeTaps++;
        
        // Animation
        cokeCan.style.transform = 'scale(0.85)';
        setTimeout(() => {
            cokeCan.style.transform = 'scale(1)';
        }, 150);
        
        // Update display
        cokeCount.textContent = `${cokeTaps} / 7`;
        const progressPercent = (cokeTaps / 7) * 100;
        cokeProgress.style.width = `${progressPercent}%`;
        
        // Messages
        const messages = [
            "Keep going!",
            "Almost there!",
            "You're thirsty!",
            "Just a few more!",
            "Tap tap tap!",
            "Thirsty for music?",
            "Getting closer!",
            "One more time!"
        ];
        cokeMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        // Haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Check if complete
        if (cokeTaps >= 7) {
            cokeMessage.textContent = "Perfect! Here's your playlist 🎧";
            cokeCan.style.animation = 'none';
            
            setTimeout(() => {
                switchScreen('coke', 'music');
                fireConfetti();
            }, 1000);
        }
    });
}

// --- SUCCESS ---
function handleYes() {
    switchScreen('proposal', 'coke');
    fireConfetti();
}

// --- VISUAL EFFECTS ---
function createBackgroundElements() {
    const container = document.getElementById('bg-elements');
    const symbols = ['🎀', '💖', '✨', '🌸', '🧸', '💕', '🎵', '🎶', '🥰', '😘'];
    
    for (let i = 0; i < 25; i++) {
        const el = document.createElement('div');
        el.classList.add('floating-item');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Randomize properties
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 20 + 15) + 's';
        el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        el.style.animationDelay = Math.random() * 15 + 's';
        el.style.opacity = Math.random() * 0.3 + 0.1;
        
        container.appendChild(el);
    }
}

function fireConfetti() {
    const emojis = ['💕', '🎉', '🥰', '🌸', '✨', '💖', '🎀', '🧸'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        confetti.style.opacity = Math.random() * 0.6 + 0.4;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// --- GO BACK FROM MUSIC ---
function goBackFromMusic() {
    switchScreen('music', 'coke');
}

// Make functions globally available
window.switchScreen = switchScreen;
window.handleYes = handleYes;
window.triggerBypass = triggerBypass;
window.goBackFromMusic = goBackFromMusic;