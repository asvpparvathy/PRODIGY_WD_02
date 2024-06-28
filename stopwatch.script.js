// script.js

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
    }
}

function pause() {
    if (!paused && running) {
        clearInterval(tInterval);
        difference = Date.now() - startTime;
        paused = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
}

function lap() {
    if (running || paused) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        laps.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}
