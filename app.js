const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistake = document.querySelector('.mistake span b')
const wpm = document.querySelector('.wpm span b')
const cpm = document.querySelector('.cpm span b')
const button = document.querySelector('button')


// Set Values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let mistakeCount = 0;
let charIndex = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = [
        "The old bookstore, nestled between a bustling bakery and a dusty antique shop, held a peculiar charm.Its floorboards creaked softly underfoot, a chorus accompanying the rhythmic tap - tap - tap of a grandfather clock tucked away in a shadowed corner.Sunlight streamed through stained - glass panels overhead, casting a kaleidoscope of colors across the towering shelves overflowing with leather - bound classics and well - worn paperbacks.",

        "Lost, are we? a voice startled me.I looked up to see a woman with a shock of white hair peering at me from behind a mountain of dusty tomes.Her eyes, the same shade of green as the worn velvet armchair tucked into a forgotten nook, twinkled with amusement.",

        "Perhaps a little, I admitted, a smile tugging at the corners of my lips. Im looking for something specific, but I'm not sure where to begin.",

        "Ah, the thrill of the hunt! she chuckled, her voice as warm and comforting as a crackling fireplace. Tell me, dear, what kind of treasure are you seeking? A fantastical journey, a heart-wrenching romance, or perhaps a glimpse into the mysteries of the universe?",

        "I hesitated, the sheer volume of choices overwhelming.  Maybe a bit of everything, I finally ventured. Something that will transport me, something that will make me think, something that will stay with me long after I turn the last page.",

        "The woman's smile widened, revealing a row of surprisingly white teeth. Excellent choice! she declared, her voice echoing slightly in the cavernous space. Follow me, then, and let fate be your guide.",

        "With a flourish, she led me through a maze of towering shelves, their spines whispering forgotten tales.She pointed out first editions, dog - eared paperbacks with inscriptions in faded ink, and even a leather - bound volume with a handwritten note tucked between its yellowed pages.Each book held a promise, a whispered possibility of an adventure waiting to be discovered.",

        "Remember, dear, she said, her voice dropping to a conspiratorial whisper as we reached a secluded alcove, the perfect book chooses its reader just as much as the reader chooses the book.",

        "She reached down and pulled out a worn volume with a faded cover.Its title, barely discernible, sent a shiver down my spine.  This one, she said, her eyes twinkling, might just be the one youve been searching for."
    ]
    const randomIndex = Math.floor(Math.random() * paragraph.length)
    typingText.innerHTML = '';
    for (let char of paragraph[randomIndex]) {
        // console.log(char);
        typingText.innerHTML += `<span>${char}</span>`
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => { input.focus() });
    typingText.addEventListener('click', () => { input.focus() })
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct')
            console.log("correct");
        } else {
            mistakeCount++;
            char[charIndex].classList.add('incorrect')
            console.log("incorrect");
        }
        charIndex++
        mistake.innerHTML = mistakeCount;
        cpm.innerText = charIndex - mistakeCount;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText - timeLeft;
        const wpmVal = Math.round(((charIndex - mistakeCount) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer)
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0
    mistakeCount = 0
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerHTML = 0;
    isTyping = false
}

button.addEventListener("click", reset);
input.addEventListener("input", initTyping);
loadParagraph();