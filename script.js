let questions = [
    {
        "question": "Wann wurde die erste Lokomotive gebaut?",
        "answer_1": "1802",
        "answer_2": "1833",
        "answer_3": "1794",
        "answer_4": "1895",
        "right_answer": "1",
        "questionPicture": "img/lokomotive.jpg",
    },
    {
        "question": "Wer hat Snapchat erfunden?",
        "answer_1": "Jennifer Lopez, Hanna Montana, Milly Cyrus",
        "answer_2": "ApoRED, Kalit Mohammed, Adel Mohammed",
        "answer_3": "Evan Spiegel, Bobby Murphy und Reggie Brown",
        "answer_4": "Peter Parker, Miles Morales, Strauss Zelnick",
        "right_answer": "3",
        "questionPicture": "img/snapchat.jpg",

    },
    {
        "question": "Wenn man ein Studium an einer Hochschule beginnt, muss man sich vorher ..?",
        "answer_1": "ausschreiben",
        "answer_2": "einschreiben",
        "answer_3": "verschreiben",
        "answer_4": "abschreiben",
        "right_answer": "2",
        "questionPicture": "img/book.jpg",

    },
    {
        "question": "Wozu sagt man scherzhaft auch 'Quadratlatschen'",
        "answer_1": "bunte Stiefeletten",
        "answer_2": "zertanzte Ballettschuhe",
        "answer_3": "einfache Sandalen",
        "answer_4": "auffallend große Schuhe",
        "right_answer": "4",
        "questionPicture": "img/latschen.jpg",

    },
    {
        "question": "Welches ist eines der größten Krokodile?",
        "answer_1": "Leistenkrokodil",
        "answer_2": "Nierenkrokodil",
        "answer_3": "Ohrenkrokodil",
        "answer_4": "Wadenkrokodil",
        "right_answer": "1",
        "questionPicture": "img/krokodil.jpg",

    },
];


let currentQuestion = 0; //definiert die position im array questions 
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('sound/correct.mp3');
let AUDIO_FAIL = new Audio('sound/Wrong.mp3');
let AUDIO_GAMEMUSIC = new Audio('sound/GameMusic.mp3');
let AUDIO_ENDGAME = new Audio('sound/endGame.mp3');
let isPlaying = false;


function init() {
    document.getElementById('max-questions').innerHTML = questions.length; //generiert die zahl die unten angezeigt wird für die existenten Fragen
    document.getElementById('start-cart').style = "display: none;"
    document.getElementById('quizBody').style = ""
    StartMusic()
    showQuestion(); // rendert die Fragen in der cart
}


function showQuestion() {   //rendert die Fragen in der cart
    if (quizEnded()) {
        ShowEndScreen();
    } else {
        updateProgressbar();
        updateToNextQuestion();
    }
}

function quizEnded() {
    return currentQuestion >= questions.length;
}

function updateToNextQuestion() {

    let question = questions[currentQuestion]; // nimmt die aktuelle position vom array
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('question-img').src = question['questionPicture']
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressbar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressbar').innerHTML = `${percent}%`;
    document.getElementById('progressbar').style = `width: ${percent}% `;
}

function ShowEndScreen() {
    document.getElementById('endCart').style = '';
    document.getElementById('quizBody').style = 'display: none;';
    document.getElementById('max-questions-end').innerHTML = questions.length;
    document.getElementById('right-Answers').innerHTML = rightAnswers;
}

function answer(selection) { //sorgt für die antwort Richtig/Falsch
    let question = questions[currentQuestion]; // nimmt die den array von der aktuellen position
    let selectedQuestionNumber = selection.slice(-1); //Nimmt den letzten charakter von einem string
    let idRightAnswer = `answer_${question['right_answer']}`; //fügt right_answer hinter den string 'answer_' um die korrekte antwort zu definieren

    if (rightAnswerSelected(selectedQuestionNumber, question)) { //Richtige Frage beantwortet
        rightAnswer(selection)
    } else {
        wrongAnswer(idRightAnswer, selection)
    }
    document.getElementById('next-btn').disabled = false; //Macht einen disabled btn wieder enabled
}
function rightAnswer(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success'); //class bg-success wird in das übergeordnete element bei der ausgewählten antwort hinzugefügt
    rightAnswers++;
    AUDIO_SUCCESS.volume = 0.5;
    AUDIO_SUCCESS.play();
}

function wrongAnswer(idRightAnswer, selection) {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); // class bg-danger wird in das übergeordnete element bei der ausgewählten antwort hinzugefügt
    document.getElementById(idRightAnswer).parentNode.classList.add('bg-success'); //class bg-success wird in das übergeordnete element bei der richtigen antwort hinzugefügt
    AUDIO_FAIL.volume = 0.5;
    AUDIO_FAIL.play();
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;  // wert wird erhöht  
    document.getElementById('next-btn').disabled = true; //Macht einen disabled btn wieder disabled
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1; //erhöht den wert der aktuellen frage
    resetAnswerBtns() // ruft funktion auf
    showQuestion();     // Nächste frage wird generiert 
    AUDIO_ENDGAME.volume = 0.5;
    AUDIO_ENDGAME.play();
}

function resetAnswerBtns() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success'); //class bg-success wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger'); //class bg-danger wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_2').parentNode.classList.remove('bg-success'); //class bg-success wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger'); //class bg-danger wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_3').parentNode.classList.remove('bg-success'); //class bg-success wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger'); //class bg-danger wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_4').parentNode.classList.remove('bg-success'); //class bg-success wird in das übergeordnete element bei der ausgewählten antwort entfernt
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger'); //class bg-danger wird in das übergeordnete element bei der ausgewählten antwort entfernt

}
function restartGame() { //soll Spiel neustarten
    rightAnswers = 0; //setzt variable zurück auf 0
    currentQuestion = 0; //setzt variable zurück auf 0
    document.getElementById('endCart').style = 'display: none;'; //ändert die style auf none
    document.getElementById('quizBody').style = ''; // ändert die style damit man den quizbody wieder sieht
    document.getElementById('currentQuestion').innerHTML = 1; // setzt die anzahl der fragen zurück

    init();
}
function StartMusic() {
    AUDIO_GAMEMUSIC.play();
    AUDIO_GAMEMUSIC.volume = 0.1;
}
function toggleMusic() {
    NavMusicToggle()
    isPlaying ? AUDIO_GAMEMUSIC.pause() : AUDIO_GAMEMUSIC.play();
}

AUDIO_GAMEMUSIC.onplaying = function () {
    isPlaying = true;
};
AUDIO_GAMEMUSIC.onpause = function () {
    isPlaying = false;
};

function NavMusicToggle() {
    if (isPlaying) {
        document.getElementById('navMusicToggle').classList.remove('active');
    } else {
        document.getElementById('navMusicToggle').classList.add('active');

    }
}

function home() {
    restartGame()
    document.getElementById('start-cart').style = ""
    document.getElementById('quizBody').style = "display: none;"
}