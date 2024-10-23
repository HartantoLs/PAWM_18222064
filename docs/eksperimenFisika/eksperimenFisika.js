const object = document.getElementById('carToy');
const finishLine = document.getElementById('finishLine');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const distanceDisplay = document.getElementById('distance');
const simulation = document.getElementById('simulation');
const simulationWidth = simulation.clientWidth;

let position = 0;
let speed = 0;
let time = 0;
let distance = 0;
let start = false;
let finishPosition = 0;
let objectStartPosition = 0;
let carPosition = 0;
let gameSound = new Audio("../audio/soundTrack.mp3");;
let audioPlay = false;

const popupButton = document.getElementById('guideButton');
const popup = document.getElementById('popup');
const closeButton = document.querySelector('.close-button');

popupButton.addEventListener('click', () => {
    popup.style.display = 'block';
});


closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});


function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    customAlert.classList.remove('hidden');
    customAlert.classList.add('show');
}

document.getElementById('custom-alert').addEventListener('click', function() {
    const customAlert = document.getElementById('custom-alert');
    customAlert.classList.remove('show');
    setTimeout(() => {
        customAlert.classList.add('hidden');
    }, 400); // Wait for the fade-out transition to complete
});


function showFalseAlert(message) {
    const falseAlert = document.getElementById('false-alert');
    const alertMessage = document.getElementById('false-alert-message');
    alertMessage.textContent = message;
    falseAlert.classList.remove('hidden');
    falseAlert.classList.add('show');
}

document.getElementById('false-alert').addEventListener('click', function() {
    const falseAlert = document.getElementById('false-alert');
    falseAlert.classList.remove('show');
    setTimeout(() => {
        falseAlert.classList.add('hidden');
    }, 400); // Wait for the fade-out transition to complete
});

function showWinnerAlert(message) {
    const winnerAlert = document.getElementById('winner-alert');
    const alertMessage = document.getElementById('winner-alert-message');
    alertMessage.textContent = message;
    winnerAlert.classList.remove('hidden');
    winnerAlert.classList.add('show');
}

document.getElementById('winner-alert').addEventListener('click', function() {
    const winnerAlert = document.getElementById('winner-alert');
    winnerAlert.classList.remove('show');
    setTimeout(() => {
        winnerAlert.classList.add('hidden');
    }, 400); // Wait for the fade-out transition to complete
});
var buttons = document.querySelectorAll("button");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
            this.classList.toggle("clicked"); 
            setTimeout(() => {
                this.classList.remove("clicked");
            }, 100);
        
        });
});
// speed = parseFloat(document.getElementById('speed').value);
// time = parseFloat(document.getElementById('time').value);

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
    startGame();
});

const checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', function() {
    check();
    
});

const resetButon = document.getElementById('resetButton');
resetButon.addEventListener('click', function() {
    resetGame();
    gameSound.pause();
    audioPlay = false;
}); 

function startGame(){
    start = true;

    showCustomAlert("GAME START");
    
    
    if (!audioPlay) {
        gameSound.play();
        audioPlay = true;
    }
    
    gameSound.addEventListener('ended', function() {
        gameSound.play();
    });

    finishPosition = Math.floor(Math.random() * (0.25 * simulationWidth)) + (0.5 * simulationWidth);
    finishLine.style.left = finishPosition + 'px';
    finishLine.classList.add('visible')

    objectStartPosition = Math.floor(Math.random() * (0.05 * simulationWidth));
    object.style.left = objectStartPosition + 'px';
    object.classList.add('visible')

    const distance = finishPosition - objectStartPosition;
    document.getElementById('goalDistance').textContent = "You are " + distance + " px away from the goal.";

    
    // object.style.left = position + 'px';
    // speed = parseFloat(document.getElementById('speed').value);
    // time = parseFloat(document.getElementById('time').value);
    // if (speed < 1 || speed > 40) {
    //     alert('Input harus dalam rentang 1 - 40');
    //     return;
    // }
    // speedDisplay.textContent = 'Speed: ' + speed + ' px/s';
    // timeDisplay.textContent = 'Time: ' + time + ' s';
    // alert("speed : " + speed + " time : " + time);
    // distance = speed * time;
    // distanceDisplay.textContent = 'Distance: ' + distance + ' m';
}

function resetGame(){
    object.classList.remove('visible');
    finishLine.classList.remove('visible');
    start = false;
    position = 0;
    speed = 0;
    time = 0;
    distance = 0;
    finishPosition = 0;
    objectStartPosition = 0;
    document.getElementById('goalDistance').textContent = "Distant to Goal";
    stopMusic();
}


function check()
{
    if(!start){
        showCustomAlert("Game belum dimulai")
    }
    else{
        speed = parseFloat(document.getElementById('speed').value);
        time = parseFloat(document.getElementById('time').value);
        if (speed < 1 || speed > 40) {
            showFalseAlert('Masukan kecepatan dari 1px/s sampai 40px/s');
            return; 
        }
        if (time < 1 || time > 20) {
            showFalseAlert('Masukan waktu dari 1s sampai 20s');
            return;
        }
        let distanceInput = speed*time;
        let currentLeft = parseInt(object.style.left, 10) || 0;
        let carPosition = currentLeft + distanceInput;
        object.style.left = carPosition + "px";
        let newDistance = finishPosition - carPosition;
        distance = newDistance;
        document.getElementById('goalDistance').textContent = "You are " + distance + " px away from the goal.";
        if(distance == 0){
            showWinnerAlert("CONGRATS , YOU'VE WON THE GAME");
            let winSound = new Audio("../audio/win.mp3");
            winSound.play()
            gameSound.pause();
            audioPlay = false;
        }
    
        else if(distance < 0)
        {
            showFalseAlert("YOU'VE PASS THE LINE , GAME OVER");
            let wrongSound = new Audio("../audio/wrong.mp3")
            wrongSound.play();
        }

        else if(distance < -10)
        {
            alert("You,ve fall to other planet");
            resetGame();
        }
    }
}

function stopMusic(){
    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
        gameSound.pause();
        gameSound.currentTime = 0; // Reset audio to the beginning
        audioPlay = false;
    });
}

function move(distance, time) {
    const car = document.getElementById('carToy');
    let startTime = null;
    let initialPosition = parseInt(car.style.left, 10) || 0; // Ambil posisi awal mobil

    // Fungsi animasi
    function animate(currentTime) {
        // Set waktu mulai jika belum diatur
        if (!startTime) {
            startTime = currentTime;
        }

        // Menghitung waktu yang telah berlalu
        const elapsedTime = currentTime - startTime;

        // Menghitung progress (antara 0 dan 1)
        const progress = Math.min(elapsedTime / (time * 1000), 1);

        // Menghitung posisi baru berdasarkan progress
        const currentPosition = initialPosition + progress * distance;
        car.style.left = currentPosition + 'px';

        // Jika animasi belum selesai, lanjutkan animasi dengan requestAnimationFrame
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    // Memulai animasi
    requestAnimationFrame(animate);
}


