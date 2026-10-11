/*
  Configuración editable. Las imágenes, frases, carta y música proceden del
  enlace de referencia que compartió el usuario.
*/
const gift = {
  messages: [
    "Feliz Festival de la Luna",
    "Te quiero mucho",
    "Gracias por todo",
    "Te amo",
    "Te quiero",
    "Minh Châu",
    "Te deseo mucha suerte",
    "Te deseo paz toda la vida",
  ],
  fallingLoveTexts: [
    "Te amo", "Eres mi luna", "Contigo siempre", "Mi corazón es tuyo",
    "Eres mi alegría", "Mi lugar favorito eres tú", "Tú y yo", "Te quiero mucho",
    "Mi persona favorita", "Juntos bajo la luna", "Siempre en mi corazón", "Eres mi sueño bonito",
    "Mi amor por ti no tiene fin", "Cada día te elijo", "A tu lado todo es mejor", "Tu sonrisa es mi hogar",
    "Gracias por existir", "Mi corazón late por ti", "Te llevo en mi alma", "Siempre tú, siempre nosotros",
    "Nuestro amor brilla como la luna", "Mi vida es más bonita contigo", "Me haces muy feliz", "Juntos somos magia",
    "Eres mi sueño hecho realidad", "Un abrazo tuyo y todo está bien", "Siempre serás mi amor", "Mi mundo empieza contigo",
    "VICPERSI", "Con amor, VICPERSI", "VICPERSI te quiere",
  ],
  lanternMessages: ["Con amor, VICPERSI", "VICPERSI te quiere", "Siempre contigo, VICPERSI"],
  photos: [
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75kk96-23024adc.webp",
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75kkny-f377141a.webp",
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75kkdl-b0b66eed.webp",
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75kkmx-d8fd7dac.webp",
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75knsb-e0720924.webp",
    "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75knub-39e04cd8.webp",
  ],
  couplePhoto: "https://cdn.dlove.vn/uploads/trungthuv2/9mz4mTQUFBh9Qv9Yif7qCuUT4Df1/img-mu75kp76-46160cf2.webp",
  music: "https://cdn.dlove.vn/assets/trungthuv2/music/vuonhoaconca.mp3",
  poem: `Si la luna toca el cielo,
tu sonrisa enciende el mar;
y aunque nos separen caminos,
mi corazón te va a encontrar.`,
  letter: `Quiero desearte a mi pequeña un día del Festival de la Luna muy feliz y lleno de alegría. Que siempre seas alegre, enamorada de la vida y llena de vitalidad, y que todo lo bueno y hermoso llegue a nosotros...
Espero que sigas siendo la luz brillante que ilumina mi vida, y también deseo que sigamos esforzándonos para que en los próximos festivales de la luna siempre estemos juntos...
Y también quiero pedirte disculpas porque este Festival de la Luna no pude regalarte nada especial ni estar a tu lado para celebrarlo contigo; realmente siento lo mucho que te he hecho extrañar...
Perdóname, mi pequeña...
Pronto encontraré la manera de que podamos vernos más seguido...

Te quiero mucho, mi amor... ❤️

Con todo mi amor,
Creador: VICPERSI`,
};

const $ = (selector) => document.querySelector(selector);
const intro = $("#intro");
const scene = $("#scene");
const moon = $("#moonButton");
const cards = $("#floatingCards");
const stars = $("#stars");
const shootingStars = $("#shootingStars");
const fireflies = $("#fireflies");
const petals = $("#fallingPetals");
const fallingLoveTexts = $("#fallingLoveTexts");
const risingLanterns = $("#risingLanterns");
const frontLanterns = $("#frontLanterns");
const toolbar = $("#toolbar");
const audio = $("#bgMusic");
const musicButton = $("#musicButton");
const letterModal = $("#letterModal");
const letterPoem = $("#letterPoem");
const letterText = $("#letterText");
const typingCursor = $("#typingCursor");
const coupleView = $("#coupleView");
const coupleImage = $("#coupleImage");

let started = false;
let typeTimer = null;
let hasTypedLetter = false;
const loveMessageTimers = new WeakMap();

audio.src = gift.music;
coupleImage.src = gift.couplePhoto;
letterPoem.textContent = gift.poem;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function makeStars() {
  const count = Math.min(170, Math.max(90, Math.round((innerWidth * innerHeight) / 10000)));
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.style.setProperty("--size", `${random(1, 3.4).toFixed(1)}px`);
    star.style.setProperty("--opacity", random(.26, .96).toFixed(2));
    star.style.setProperty("--time", `${random(1.2, 4.8).toFixed(2)}s`);
    star.style.setProperty("--delay", `${random(-5, 0).toFixed(2)}s`);
    star.style.left = `${random(0, 100).toFixed(2)}%`;
    star.style.top = `${random(0, 78).toFixed(2)}%`;
    fragment.append(star);
  }
  stars.replaceChildren(fragment);
}

function makeAmbientEffects() {
  const shootingFragment = document.createDocumentFragment();
  for (let index = 0; index < 6; index += 1) {
    const streak = document.createElement("i");
    streak.className = "shooting-star";
    streak.style.setProperty("--left", `${random(28, 105).toFixed(2)}%`);
    streak.style.setProperty("--top", `${random(4, 62).toFixed(2)}%`);
    streak.style.setProperty("--duration", `${random(5, 9).toFixed(2)}s`);
    streak.style.setProperty("--delay", `${random(-18, 0).toFixed(2)}s`);
    shootingFragment.append(streak);
  }
  shootingStars.replaceChildren(shootingFragment);

  const fireflyFragment = document.createDocumentFragment();
  for (let index = 0; index < 18; index += 1) {
    const firefly = document.createElement("i");
    firefly.className = "firefly";
    firefly.style.setProperty("--left", `${random(3, 97).toFixed(2)}%`);
    firefly.style.setProperty("--top", `${random(24, 88).toFixed(2)}%`);
    firefly.style.setProperty("--drift-x", `${random(-42, 42).toFixed(0)}px`);
    firefly.style.setProperty("--drift-y", `${random(-34, 34).toFixed(0)}px`);
    firefly.style.setProperty("--duration", `${random(5, 12).toFixed(2)}s`);
    firefly.style.setProperty("--delay", `${random(-12, 0).toFixed(2)}s`);
    fireflyFragment.append(firefly);
  }
  fireflies.replaceChildren(fireflyFragment);
}

function makeRisingLanterns(container, count, foreground = false) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index += 1) {
    const lantern = document.createElement("button");
    lantern.type = "button";
    lantern.className = foreground ? "rising-lantern front-rising-lantern" : "rising-lantern";
    lantern.setAttribute("aria-label", "Farol chino; tócalo para ver un mensaje de amor");
    lantern.title = "Tócame para ver un mensaje de amor";
    lantern.style.setProperty("--left", `${random(foreground ? 12 : 8, foreground ? 88 : 92).toFixed(2)}%`);
    lantern.style.setProperty("--drift-x", `${random(-90, 90).toFixed(0)}px`);
    lantern.style.setProperty("--rise-duration", `${random(foreground ? 18 : 15, foreground ? 28 : 25).toFixed(2)}s`);
    lantern.style.setProperty("--rise-delay", `${random(-22, 0).toFixed(2)}s`);
    lantern.style.setProperty("--lantern-scale", random(foreground ? 1.15 : .72, foreground ? 1.5 : 1.12).toFixed(2));

    const flame = document.createElement("span");
    flame.className = "rising-lantern-flame";
    flame.setAttribute("aria-hidden", "true");
    const message = document.createElement("span");
    message.className = "rising-lantern-message";
    message.setAttribute("aria-live", "polite");
    lantern.append(flame, message);
    lantern.addEventListener("click", () => {
      const showCreator = Math.random() < .7;
      const messages = showCreator ? gift.lanternMessages : gift.fallingLoveTexts;
      message.textContent = messages[Math.floor(random(0, messages.length))];
      lantern.classList.add("show-message");
      clearTimeout(loveMessageTimers.get(lantern));
      loveMessageTimers.set(lantern, setTimeout(() => lantern.classList.remove("show-message"), 2600));
    });
    fragment.append(lantern);
  }
  container.replaceChildren(fragment);
}

function makeCards() {
  const positions = [
    [17, 24], [36, 21], [61, 22], [82, 31], [20, 59], [45, 54], [68, 58], [87, 66],
  ];
  const fragment = document.createDocumentFragment();
  gift.messages.forEach((message, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "float-card";
    card.setAttribute("aria-label", `${message}. Toca para ver un mensaje de amor`);
    card.title = "Toca para ver un mensaje de amor";
    const [x, y] = positions[index];
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
    card.style.setProperty("--width", `${random(108, 164).toFixed(0)}px`);
    card.style.setProperty("--mobile-width", `${random(88, 120).toFixed(0)}px`);
    card.style.setProperty("--rotate", `${random(-14, 12).toFixed(1)}deg`);
    card.style.setProperty("--duration", `${random(5.5, 10.5).toFixed(2)}s`);
    card.style.setProperty("--delay", `${random(-7, 0).toFixed(2)}s`);
    card.style.setProperty("--drift-x", `${random(-22, 22).toFixed(0)}px`);
    card.style.setProperty("--drift-y", `${random(-20, 16).toFixed(0)}px`);
    card.style.setProperty("--card-opacity", random(.7, .98).toFixed(2));

    const image = document.createElement("img");
    image.src = gift.photos[index % gift.photos.length];
    image.alt = "";
    image.loading = "eager";
    const caption = document.createElement("p");
    caption.textContent = message;
    const loveMessage = document.createElement("span");
    loveMessage.className = "card-love-message";
    loveMessage.setAttribute("aria-hidden", "true");
    card.append(image, caption, loveMessage);
    card.addEventListener("click", () => {
      loveMessage.textContent = gift.fallingLoveTexts[Math.floor(random(0, gift.fallingLoveTexts.length))];
      card.classList.add("show-love");
      clearTimeout(loveMessageTimers.get(card));
      loveMessageTimers.set(card, setTimeout(() => card.classList.remove("show-love"), 2400));
    });
    cycleCardPhoto(card, image, index % gift.photos.length);
    fragment.append(card);
  });
  cards.replaceChildren(fragment);
}

function cycleCardPhoto(card, image, currentIndex) {
  const nextIndex = (currentIndex + 1) % gift.photos.length;
  setTimeout(() => {
    card.classList.add("changing");
    setTimeout(() => {
      image.src = gift.photos[nextIndex];
      card.classList.remove("changing");
      cycleCardPhoto(card, image, nextIndex);
    }, 500);
  }, random(5000, 9000));
}

function makePetals() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 20; index += 1) {
    const petal = document.createElement("i");
    petal.className = "petal";
    petal.style.setProperty("--left", `${random(0, 100).toFixed(2)}%`);
    petal.style.setProperty("--p-size", `${random(5, 12).toFixed(1)}px`);
    petal.style.setProperty("--p-drift", `${random(-80, 90).toFixed(0)}px`);
    petal.style.setProperty("--fall-time", `${random(8, 18).toFixed(2)}s`);
    petal.style.setProperty("--fall-delay", `${random(-18, 0).toFixed(2)}s`);
    fragment.append(petal);
  }
  petals.replaceChildren(fragment);
}

function makeFallingLoveTexts() {
  const fragment = document.createDocumentFragment();
  const firstPhrase = Math.floor(random(0, gift.fallingLoveTexts.length));
  for (let index = 0; index < gift.fallingLoveTexts.length; index += 1) {
    const phrase = document.createElement("span");
    phrase.className = "falling-love-text";
    phrase.textContent = gift.fallingLoveTexts[(index + firstPhrase) % gift.fallingLoveTexts.length];
    phrase.style.setProperty("--left", `${random(2, 96).toFixed(2)}%`);
    phrase.style.setProperty("--drift-x", `${random(-55, 55).toFixed(0)}px`);
    phrase.style.setProperty("--duration", `${random(12, 22).toFixed(2)}s`);
    phrase.style.setProperty("--delay", `${random(-22, 0).toFixed(2)}s`);
    phrase.style.setProperty("--font-size", `${random(12, 17).toFixed(0)}px`);
    fragment.append(phrase);
  }
  fallingLoveTexts.replaceChildren(fragment);
}

function playMusic() {
  audio.play().then(() => {
    musicButton.classList.remove("muted");
  }).catch(() => {
    musicButton.classList.add("muted");
  });
}

function startExperience() {
  if (started) return;
  started = true;
  scene.classList.add("active");
  scene.setAttribute("aria-hidden", "false");
  intro.classList.add("leaving");
  playMusic();
  setTimeout(() => toolbar.classList.add("visible"), 4600);
}

function openLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  if (!hasTypedLetter) typeLetter();
}

function closeLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
}

function typeLetter() {
  clearInterval(typeTimer);
  hasTypedLetter = true;
  let index = 0;
  letterText.textContent = "";
  typingCursor.classList.remove("done");
  const pace = Math.max(17, Math.min(33, Math.round(19000 / gift.letter.length)));
  typeTimer = setInterval(() => {
    letterText.textContent += gift.letter[index] || "";
    index += 1;
    if (index >= gift.letter.length) {
      clearInterval(typeTimer);
      typingCursor.classList.add("done");
    }
  }, pace);
}

function openCouple() {
  closeLetter();
  coupleView.classList.add("open");
  coupleView.setAttribute("aria-hidden", "false");
}

function closeCouple() {
  coupleView.classList.remove("open");
  coupleView.setAttribute("aria-hidden", "true");
}

moon.addEventListener("click", startExperience);

$("#letterButton").addEventListener("click", openLetter);
$("#closeLetter").addEventListener("click", closeLetter);
$("#heartButton").addEventListener("click", openCouple);
$("#letterHeart").addEventListener("click", openCouple);
$("#closeCouple").addEventListener("click", closeCouple);
coupleView.addEventListener("click", (event) => {
  if (event.target === coupleView || event.target.classList.contains("couple-veil")) closeCouple();
});
letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) closeLetter();
});

musicButton.addEventListener("click", () => {
  if (audio.paused) playMusic();
  else {
    audio.pause();
    musicButton.classList.add("muted");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLetter();
    closeCouple();
  }
});

makeStars();
makeAmbientEffects();
makeRisingLanterns(risingLanterns, 8);
makeRisingLanterns(frontLanterns, 4, true);
makeCards();
makePetals();
makeFallingLoveTexts();

// Facilita la previsualización durante el desarrollo sin alterar la entrada normal.
if (new URLSearchParams(window.location.search).get("autostart") === "1") {
  startExperience();
}
