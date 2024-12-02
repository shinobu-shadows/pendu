//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");
const box = document.getElementById("boite");
const fermer = document.getElementById("fermer");
fermer.addEventListener("click", fermerBoite);
document.getElementById("boutonAjouterMot").addEventListener("click", addWord);
const ajouterMot = document.getElementById(mot);
mot.addEventListener("click", cacherBoiteAjouterMot);
const ajouterMots = document.getElementById("ajouterMots");

localStoragePopup();

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "La catégorie choisie est celle des anime",
  "La catégorie choisie est celle des jeux video",
  "La catégorie choisie est celle noms de dieux japonais",
];

const categories = [
  [
    "sword-art-online",
    "attaque-des-titans",
    "carnets-de-l-apothicaire",
    "oshi-no-ko",
    "Jujutsu-Kaisen",
    "darling-in-the-franxx",
    "arcane",
  ],
  [
    "space-marine",
    "dead-by-daylight",
    "wuthering-waves",
    "elden-ring",
    "genshin-impact",
  ],
  [
    "amaterasu",
    "susanoo",
    "tsukuyomi",
    "raiden",
    "omoikane",
    "izanami",
    "fujin",
    "hachiman",
    "uzume",
    "saruta-hiko",
  ],
];

const hints = [
  [
    "une tour a 100 etage",
    "ville qui est protege par des murs",
    "le personnage est enlevée et vendue comme servante",
    "Un médecin et sa patiente récemment décédée renaissent jumeaux",
    "il doit manger 20 doigt",
    "besoin d'un pistile et d'un etamine pour faire fonctionner le mecha",
    "deux soeur un aux cheveux bleu et l'autre rouge",
  ],
  [
    "tu te bat contre des xenos",
    "ce joue un contre quatre",
    "publier par kuro games",
    "ce jeu a gagner les game award 2022",
    "nourriture d'urgence",
  ],
  [
    "la déesse du soleil",
    "le dieu des mers et de la tempête",
    "le dieu de la lune",
    "le dieu du tonnerre",
    "la déesse de la sagesse",
    "la déesse de la création puis de la mort",
    "le dieu du vent",
    "le dieu de la guerre",
    "la déesse de la gaieté",
    "le dieu de la terre",
  ],
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `tu a ${life} Vie!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `VICTOIRE!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `tu a ${life} vie!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `tu a ${life} vie!`;
      } else {
        livesDisplay.innerHTML = `perdu!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `Victoire!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];
// pour le local storage
// permet aussi que la boite ne souvre plus
function localStoragePopup() {
  if (localStorage.getItem("popup") == null) {
    localStorage.setItem("popup", true);
  } else if (localStorage.getItem("popup") == "false") {
    box.close();
  }
}
// permet de fermer la boite
function fermerBoite() {
  localStorage.setItem("popup", false);
  box.close();
}
// permet dajouter des mots pour le pendu
function addWord() {
  const categoryChoisi = document.getElementById("nouvelleCategory");
  const motMit = document.getElementById("nouveauMot");
  const indiceMit = document.getElementById("nouvelleIndice");

  // récupération des données saisies
  const choisiCategory = parseInt(categoryChoisi.value);
  const nouveauMot = motMit.value.toLowerCase().trim();
  const nouvelleIndice = indiceMit.value.trim();

  // validation des champs
  if (!nouveauMot || !nouvelleIndice) {
    alert("Veuillez remplir tous les champs.");
    return;
  }
  if (!/^[a-zA-Z-]+$/.test(nouveauMot)) {
    alert("Le mot doit contenir uniquement des lettres ou des tirets.");
    return;
  }

  // ajout du mot et de l'indice dans les tableaux
  categories[choisiCategory].push(nouveauMot);
  hints[choisiCategory].push(nouvelleIndice);

  // confirmation et remise à zéro du formulaire
  alert(
    `Le mot "${nouveauMot}" a été ajouté à la catégorie "${categoryChoisi.options[choisiCategory].text}".`
  );
  motMit.value = "";
  indiceMit.value = "";
}
function cacherBoiteAjouterMot() {
  if (ajouterMots.hasAttribute("hidden")) {
    ajouterMots.removeAttribute("hidden");
  } else {
    ajouterMots.setAttribute("hidden", false);
  }
}
