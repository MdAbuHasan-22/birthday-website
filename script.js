// ========== COMPLETE WORKING CODE ==========

// Global variables
let currentNumber = 10;
let countdownInterval;
let wishTimer;

// ===== STEP 1: COUNTDOWN FUNCTION =====
function startCountdown() {
    console.log("Countdown started");
    const countdownOverlay = document.getElementById('countdown-overlay');
    const birthdayWish = document.getElementById('birthday-wish');
    const countdownNumber = document.getElementById('countdown-number');
    
    if (!countdownOverlay || !countdownNumber) {
        console.error("Countdown elements not found");
        return;
    }
    
    countdownInterval = setInterval(() => {
        currentNumber--;
        console.log("Countdown:", currentNumber);
        
        if (currentNumber >= 0) {
            countdownNumber.textContent = currentNumber;
            countdownNumber.style.animation = 'numberPulse 1s';
            setTimeout(() => {
                countdownNumber.style.animation = '';
            }, 1000);
        }
        
        if (currentNumber === -1) {
            clearInterval(countdownInterval);
            console.log("Countdown finished");
            
            // Hide countdown, show birthday wish
            countdownOverlay.style.display = 'none';
            birthdayWish.style.display = 'flex';
            
            // Start birthday wish display
            startBirthdayWish();
        }
    }, 1000);
}

// ===== STEP 2: BIRTHDAY WISH FUNCTION =====
function startBirthdayWish() {
    console.log("Birthday wish started");
    const birthdayWish = document.getElementById('birthday-wish');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');
    const continueText = document.getElementById('continue-text');
    
    // Celebration effects
    createCelebrationEffects();
    
    // Auto proceed after 5 seconds
    wishTimer = setTimeout(() => {
        console.log("Auto proceeding to main content");
        birthdayWish.style.animation = 'wishFadeOut 1s ease forwards';
        
        setTimeout(() => {
            birthdayWish.style.display = 'none';
            mainContent.style.display = 'block';
            footer.style.display = 'block';
            
            // Start typing effect
            startTypingEffect();
            
            // Final confetti
            createFinalConfetti();
            
        }, 1000);
    }, 5000);
    
    // Click to continue early
    continueText.addEventListener('click', function continueClick() {
        console.log("Manual proceed clicked");
        clearTimeout(wishTimer);
        
        birthdayWish.style.animation = 'wishFadeOut 0.5s ease forwards';
        
        setTimeout(() => {
            birthdayWish.style.display = 'none';
            mainContent.style.display = 'block';
            footer.style.display = 'block';
            
            startTypingEffect();
            createFinalConfetti();
            
        }, 500);
        
        continueText.removeEventListener('click', continueClick);
    });
}

// ===== TYPING EFFECT FUNCTION =====
function startTypingEffect() {
    console.log("Typing effect started");
    const texts = [
        '💕 You make my world pink 💕',
        '✨ My favorite notification ✨',
        '🌹 My forever Valentine 🌹',
        '💖 The beat of my heart 💖'
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const element = document.getElementById('typing-text');
    
    if (!element) {
        console.error("Typing element not found");
        return;
    }
    
    function type() {
        const current = texts[index];
        
        if (isDeleting) {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }
    
    type();
}

// ===== CELEBRATION EFFECTS =====
function createCelebrationEffects() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart celebration-heart';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.color = `hsl(${Math.random() * 50 + 320}, 100%, 70%)`;
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = `celebrationFloat ${Math.random() * 3 + 2}s linear forwards`;
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// ===== FINAL CONFETTI =====
function createFinalConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffb8e0', '#c77dff', '#9f4dff', '#ffd700', '#ffa500'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'final-confetti';
            
            const size = Math.random() * 15 + 8;
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = Math.random() > 0.5 ? '50%' : '0';
            
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.left = left + '%';
            confetti.style.top = '-20px';
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = shape;
            confetti.style.position = 'fixed';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `finalFall ${Math.random() * 2 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 10);
    }
}

// ===== DAILY QUOTE FUNCTION =====
function showDailyQuote() {
    const quotes = [
        "तेरी आँखों में खो जाऊं 💕",
        "तू मिला तो लगा, जैसे पूरी हुई हर कमी 💖",
        "तेरे बिना अधूरा हूँ 💗",
        "दिल की हर धड़कन तेरा नाम लेती है ❤️",
        "तू ही मेरी जिंदगी है 💝",
        "तेरे संग हर पल खास है ✨"
    ];
    
    const quoteDiv = document.getElementById('daily-quote');
    if (quoteDiv) {
        const random = Math.floor(Math.random() * quotes.length);
        quoteDiv.innerHTML = `💕 "${quotes[random]}" 💕`;
    }
}

// ===== ADD ANIMATION STYLES =====
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wishFadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); visibility: hidden; }
        }
        
        @keyframes celebrationFloat {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-200px) scale(2) rotate(360deg); opacity: 0; }
        }
        
        @keyframes finalFall {
            to { transform: translateY(100vh) rotate(720deg); }
        }
    `;
    document.head.appendChild(style);
}

// ===== START EVERYTHING ON PAGE LOAD =====
window.addEventListener('load', function() {
    console.log("Page loaded, starting countdown...");
    
    // Add animation styles
    addAnimationStyles();
    
    // Start countdown
    startCountdown();
    
    // Set interval for daily quotes (after main content loads)
    setInterval(showDailyQuote, 10000);
});

// ===== SKIP COUNTDOWN ON CLICK =====
document.addEventListener('click', function skipCountdown(e) {
    const countdownOverlay = document.getElementById('countdown-overlay');
    const birthdayWish = document.getElementById('birthday-wish');
    
    // Don't skip if clicking on birthday wish
    if (birthdayWish.style.display === 'flex') return;
    
    if (countdownOverlay && countdownOverlay.style.display !== 'none' && currentNumber > 0) {
        console.log("Countdown skipped by click");
        currentNumber = 0;
        const countdownNumber = document.getElementById('countdown-number');
        if (countdownNumber) {
            countdownNumber.textContent = '0';
        }
    }
});