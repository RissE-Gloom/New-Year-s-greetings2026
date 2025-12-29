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
    const count = 100;

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 15 + 10,
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

// Elements
const langOverlay = document.getElementById('language-overlay');
const btnRu = document.getElementById('btn-ru');
const btnEn = document.getElementById('btn-en');
const baubleText = document.querySelector('.bauble-text');
const modalTitle = document.querySelector('.modal h2');
const wishText = document.getElementById('wish-text');
const bauble = document.getElementById('main-bauble');
const overlay = document.getElementById('overlay');
const closeModal = document.getElementById('close-modal');

// Language Config
const translations = {
    ru: {
        bauble: "С Новым годом!",
        modalTitle: "С Новым Годом!",
        defaultWish: "Счастья в новом году!",
        wishes: [
            "Если Новый год пообещает не подкидывать мне трупы под Рождество - я, пожалуй, даже закурю в его честь. А если ещё и Лукас перестанет фыркать на мои планы… ну, тогда точно конец света. С праздником. Старайтесь не умирать - у меня и так дел хватает. (с)Фрейя",
            "Год вряд ли станет добрее… но если уж нам суждено идти сквозь тьму - пусть хоть иногда мелькнёт искра, за которую стоит бороться. С Новым годом. (с)Фрейя",
            "Не обещаю, что год будет добрый. Но желаю тебе одного - чтобы ты всегда знал, зачем идёшь вперёд. А если вдруг споткнёшься - поднимайся. Я бы протянула руку… но у меня, как всегда, заняты обе. С Новым годом. (с)Фрейя",
            "Скорее всего, вы снова проигнорируете здравый смысл - но на всякий случай напомню: берегите себя. Если вдруг окажетесь в моём кабинете в первую неделю года, постараюсь не сказать: «Я же предупреждал». С Новым годом. И, ради всего святого, не лезьте туда, куда вас не просят. (с)Лукас",
            "Чудес не бывает. Но если вы всё же надеетесь на лучшее - пусть это лучшее будет в форме отсутствия ран и целых костей. Пусть никто из вас не окажется на моём столе в этом году. С Новым годом… и будьте осторожны. (с)Лукас",
            "Волшебства нет. Но даже я могу пожелать вам одного: чтобы вы не дожидались кризиса, прежде чем протянуть руку. Берегите себя. Вы сильны - но не обязаны быть одинокими. С Новым годом. (с)Лукас",
            "Пусть в новом году будет меньше погонь, меньше лжи и хотя бы один день, когда мой пистолет останется в кобуре. А если вы вдруг увидите, как я улыбаюсь - знайте: либо я пьян, либо мир наконец сошёл с ума. С праздником. Берегите себя. (с)Бернард",
            "Пусть в новом году будет больше дней, когда закон и совесть идут рука об руку. А ещё, чтобы у каждого, кого мы спасаем, остался шанс начать заново. С праздником! (с)Бернард",
            "Пусть в новом году у тебя будет меньше причин сомневаться в людях… и больше поводов верить в себя. Делай добро - даже если система против. Особенно если система против. С праздником! (с)Бернард",
            "Звёзды говорят, что впереди - перемены. Я не знаю, хорошие ли… но я верю, что мы справимся. Спасибо, что не оставляете нас одних. С Новым годом! (с)Ной",
            "Ты читаешь о нас… а мы - благодаря тебе - не исчезаем. Спасибо. Желаю тебе, чтобы в новом году рядом всегда был тот, кто скажет: “Я с тобой” - даже когда весь мир замолчит. С Новым годом! (с)Ной",
            "Я не знаю, где ты сейчас… но надеюсь, ты в тепле и в безопасности. Желаю тебе, чтобы в новом году тебя замечали, слушали и чтобы рядом был хотя бы один человек, который никогда не скажет: “Ты не важен”. С Новым годом. (с)Ной"
        ]
    },
    en: {
        bauble: "Happy New Year!",
        modalTitle: "Happy New Year!",
        defaultWish: "Happiness in the new year!",
        wishes: [
            "If this New Year promises to stop dumping corpses under my Christmas tree, I might even light up in its honor. And if Lucas also stops scoffing at my plans… well, then it’ll definitely be the apocalypse. Happy holidays. Try not to die—I’ve got enough on my plate already. (c)Freya",
            "This year won’t be any kinder… but if we’re fated to walk through darkness, may a spark at least flicker now and again—something worth fighting for. Happy New Year. (c)Freya",
            "I won’t promise this year will be gentle. But I wish you just one thing—that you always know what you’re marching toward. And should you stumble—get back up. I’d lend a hand… but both are occupied, as always. Happy New Year. (c)Freya",
            "You’ll likely ignore common sense again—but just in case, I’ll say it anyway: take care of yourselves. If you do end up in my office during the first week of the year, I’ll try not to utter, “I did warn you.” Happy New Year. And for heaven’s sake, don’t stick your nose where it doesn’t belong. (c)Lucas",
            "There are no miracles. But if you still cling to hope for the best—may that “best” mean no wounds and unbroken bones. May not a single one of you end up on my table this year. Happy New Year… and try not to die. (c)Lucas",
            "There’s no magic. But even I can wish you this: don’t wait for a crisis to reach out for help. Take care of yourselves. You’re strong—but you don’t have to be alone. Happy New Year. (c)Lucas",
            "May the new year hold fewer chases, fewer lies, and at least one day when my pistol stays in its holster. And if you catch me smiling—know this: either I’m drunk, or the world has finally gone mad. Happy holidays. Take care of yourselves. (c)Bernard",
            "May this new year bring more days when the law and conscience go hand in hand. And may everyone we save still have a chance to begin anew. Happy holidays! (c)Bernard",
            "May this new year give you fewer reasons to doubt people—and more reasons to believe in yourself. Do the right thing, even when the system works against you. Especially then. Happy New Year! (c)Bernard",
            "The stars say changes lie ahead. I don’t know if they’ll be for the better… but I believe we’ll get through them. Thank you for standing by us. Happy New Year! (c)Noah",
            "You read about us… and thanks to you, we don’t fade away. Thank you. May this new year always place by your side someone who says, “I’m with you”—even when the whole world falls silent. Happy New Year! (c)Noah",
            "I don’t know where you are right now… but I hope you’re somewhere warm and safe. May this new year bring you moments where you’re truly seen and heard—and at least one person by your side who will never say, “You don’t matter.” Happy New Year! (c)Noah"
        ]
    }
};

let currentLang = 'ru';
let currentWishes = translations.ru.wishes;

function selectLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    currentWishes = t.wishes;

    // Update UI texts
    baubleText.textContent = t.bauble;
    modalTitle.textContent = t.modalTitle;
    wishText.textContent = "Ваше пожелание..."; // Placeholder

    // Hide language selection with animation
    anime({
        targets: '#language-overlay',
        opacity: 0,
        duration: 500,
        easing: 'easeInQuad',
        complete: () => {
            langOverlay.style.display = 'none';
        }
    });
}

btnRu.addEventListener('click', () => selectLanguage('ru'));
btnEn.addEventListener('click', () => selectLanguage('en'));

// Wishes Logic
bauble.addEventListener('click', () => {
    const t = translations[currentLang];
    const randomWish = currentWishes[Math.floor(Math.random() * currentWishes.length)] || t.defaultWish;
    wishText.textContent = randomWish;

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

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModal.click();
    }
});
