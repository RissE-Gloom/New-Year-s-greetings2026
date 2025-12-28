// Snow Animation
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let width, height, snowflakes;
const snowflakeImg = new Image();
snowflakeImg.src = 'svg/snow.svg';

function initSnow() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    snowflakes = [];
    const count = 100; // Slightly reduced count for image rendering

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 15 + 10, // Size in pixels
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.4,
            wind: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        });
    }
}

function updateSnow() {
    ctx.clearRect(0, 0, width, height);

    if (snowflakeImg.complete) {
        snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.wind;
            flake.rotation += flake.rotationSpeed;

            if (flake.y > height + flake.size) {
                flake.y = -flake.size;
                flake.x = Math.random() * width;
            }
            if (flake.x > width + flake.size) flake.x = -flake.size;
            if (flake.x < -flake.size) flake.x = width;

            ctx.save();
            ctx.translate(flake.x, flake.y);
            ctx.rotate(flake.rotation);
            ctx.globalAlpha = flake.opacity;
            ctx.drawImage(snowflakeImg, -flake.size / 2, -flake.size / 2, flake.size, flake.size);
            ctx.restore();
        });
    }

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
