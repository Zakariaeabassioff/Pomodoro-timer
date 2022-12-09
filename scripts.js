/*Récupération des champs/buttons qu'on veut manipuler */
const settingsBtn = document.querySelector('.settings');
const startBtn = document.querySelector('.start');
const minutes = document.querySelector('.mins > input[type=text]');
const seconds = document.querySelector('.secs > input[type=text]');
const ring = document.querySelector('.ring');

/*Variables générales pour les fcts */
let startTime = 0;
let timer = null;
let running = false;
let originalMins = 0;
let originalSecs = 0;


/*Ajout de l'événement onclick au bouton start */
startBtn.addEventListener('click', () => {
    //Si le timer n'est pas lancé, on lance le timer
    if(!running) {
        startTimer();
    } 
    //Sinon, on met le timer en pause
    else if (running) {
        pauseTimer();
    }
});

/*Ajout de l'événement onclick au bouton settings qui permet d'entrer les mins et les seconds sur les champs associés */
settingsBtn.addEventListener('click', () => {
    //Si le timer est lancé, on le met en pause
    if(running) {
        pauseTimer();
    }
    //Sinon on active les champs pour pouvoir les modifier
    seconds.disabled = false;
    minutes.disabled = false;
}); 

//Ne permet de rentrer que des chiffres dans les champs minutes et seconds
const validateTimeInput = (e) => { 
    const validatedInput = e.target.value.replace(/[^0-9]/g, '').substring(0, 2);
    e.target.value = validatedInput;
};

//On ajoute l'événement keyup sur les champs minutes et seconds avec la fct validateTimeInput
minutes.addEventListener('keyup', validateTimeInput);
seconds.addEventListener('keyup', validateTimeInput);

//La fonction startTimer permet de lancer le timer
const startTimer = () => {
    running = true;
    //Le boutton start devient pause
    startBtn.innerText = 'PAUSE';
    //Récupération de la date actuel en ms
    startTime = Date.now();
    //Récupération des valeurs des champs minutes et seconds
    const secondsValue = parseInt(seconds.value);
    const minutesValue = parseInt(minutes.value);
    //Transformation des minutes en secondes et ajout des secondes
    totalSeconds = secondsValue + minutesValue * 60;
    //timer contient la fct setInterval qui permet de lancer le fonctionnement du Timer
    timer = setInterval(() => {
        //Récupération de la date actuel en ms à chaque seconde
        const currentTime = Date.now();
        //Calcul de la différence entre la date actuel et la date de départ
        const diff = currentTime - startTime;
        //Calcul du nombre de secondes restantes
        const secondsLeft = totalSeconds - Math.floor(diff/1000);
        //Calcul du nombre de minutes restantes
        const minutesLeft = Math.floor(secondsLeft/60);
        //Affichage des minutes et secondes restantes
        seconds.value = padNumber(secondsLeft);
        minutes.value = padNumber(minutesLeft);

        //Si les minutes et secondes sont à 0, on lance la fct finishTimer
        if (secondsLeft === 0 && minutesLeft === 0){
            finishTimer();
        }
    }, 1000);
}

//La fonction pauseTimer permet de mettre le timer en pause
const pauseTimer = () => {
    running = false;
    startBtn.innerText = 'start';
    clearInterval(timer);
}

//La fonction finishTimer permet de lancer la fin du timer
const finishTimer = () => {
    //On arrête le timer
    clearInterval(timer);
    //Changement de la couleur du cercle
    ring.classList.add('ending');
    //On lance la fct resetTimer après 1 seconde
    setTimeout(() => {
        alert("Time's Up!");
        resetTimer();
    }, 0)
} 

//La fonction resetTimer permet de remettre le timer à 0 (état initial)
const resetTimer = () => {
    clearInterval(timer);
    seconds.value = padNumber(originalSecs);
    minutes.value = padNumber(originalMins);
    startBtn.innerText = 'START';
    ring.classList.remove('ending');
    running = false;
}

//La fonction padNumber permet d'ajouter un 0 devant les minutes et secondes si elles sont inférieures à 10
const padNumber = (number) => {
    if (number < 10) {
        return "0" + number;
    }

    return number;
}   

