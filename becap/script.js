// Snow Animation
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let width, height, snowflakes;

function initSnow() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    snowflakes = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            wind: Math.random() * 0.5 - 0.25
        });
    }
}

function updateSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    snowflakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.wind;

        if (flake.y > height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * width;
        }
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.globalAlpha = flake.opacity;
        ctx.fill();
    });

    requestAnimationFrame(updateSnow);
}

window.addEventListener('resize', initSnow);
initSnow();
updateSnow();

// Wishes Logic
const bauble = document.getElementById('main-bauble');
const overlay = document.getElementById('overlay');
const wishText = document.getElementById('wish-text');
const closeModal = document.getElementById('close-modal');

let wishes = ["Пусть Новый год принесет радость и удачу!",
    "Желаем сказочного настроения и волшебства!",
    "Пусть все ваши мечты сбудутся в новом году!",
    "Здоровья, счастья и благополучия вашему дому!",
    "Пусть каждый день нового года будет ярким и незабываемым!",
    "Успехов во всех начинаниях и новых свершений!",
    "Пусть в сердце всегда живет вера в чудеса!",
    "Мира, добра и любви вам в новом году!",
    "Пусть 2026 год станет годом больших перемен к лучшему!",
    "Сияйте ярче новогодних огней!",
];

fetch('wishes.json')
    .then(res => res.json())
    .then(data => {
        wishes = data;
    });

bauble.addEventListener('click', () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)] || "Счастья в новом году!";
    wishText.textContent = randomWish;

    // Popup Animation using Anime.js
    overlay.style.display = 'flex';
    anime({
        targets: '#overlay',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.modal',
        scale: [0.8, 1],
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
    });
});

closeModal.addEventListener('click', () => {
    anime({
        targets: '#overlay',
        opacity: 0,
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
            overlay.style.display = 'none';
        }
    });
});

// Close on overlay click
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModal.click();
    }
});
