window.onload = async function () {
    registerSW();
}

// Register the Service Worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator
                .serviceWorker
                .register('service-worker.js');
            console.log("SW registration successful");
        } catch (e) {
            console.log('SW registration failed: ', e);
        }
    }
}

window.clearWarning = function () {
    document.getElementById('storm').style.display = 'none';
    document.getElementById('sunrise').style.display = 'block';
}

window.showWarning = function () {
    document.getElementById('storm').style.display = 'block';
    document.getElementById('sunrise').style.display = 'none';
}

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.getElementById('stopwatch');
let int = null;

document.getElementById("play-pause").addEventListener("click", () => {
    if (int === null) {
        int = setInterval(displayTimer, 10);
        document.getElementById('play-pause').innerHTML = 'Pause';
        document.getElementById('reset').disabled = true;
        showWarning();
        document.getElementById('clock').style.width = '40px';
    } else {
        clearInterval(int);
        int = null;
        document.getElementById('play-pause').innerHTML = 'Play';
        document.getElementById('reset').disabled = false;
        clearWarning();
        document.getElementById('clock').style.width = '0px';
    }
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 00";
}); 

window.displayTimer = function () {
    milliseconds += 10;
    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = 
        milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`.slice(0, `${h} : ${m} : ${s} : ${ms}`.length - 1);

}