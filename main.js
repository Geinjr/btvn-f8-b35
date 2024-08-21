var btn = document.querySelector(".action button");
var counterElement = document.querySelector(".counter");
var remainingTime = 8;
var isCounting = false;
var requestId;

var lastTimestamp = null;
function startCountdown(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }

    var elapsedTime = (timestamp - lastTimestamp) / 1000;
    remainingTime -= elapsedTime;
    if (remainingTime <= 0) {
        remainingTime = 0;
    }
    counterElement.innerText = Math.floor(remainingTime);
    lastTimestamp = timestamp;

    if (remainingTime > 0) {
        requestId = requestAnimationFrame(startCountdown);
    }
    getlink(remainingTime);
}

function getlink(time) {
    if (time === 0) {
        btn.disabled = false;

        var encodedUrl = btoa(
            "https://www.youtube.com/watch?v=sI97pJcyeOs&list=RDqvu4nPMyl3U&index=4"
        );
        var decodedUrl = atob(encodedUrl);
        btn.addEventListener("click", function () {
            window.location.href = decodedUrl;
        });
    } else {
        btn.disabled = true;
    }
}

function startCounter() {
    if (!isCounting) {
        isCounting = true;
        lastTimestamp = null;
        requestId = requestAnimationFrame(startCountdown);
    }
}

function stopCounter() {
    isCounting = false;
    cancelAnimationFrame(requestId);
}

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        stopCounter();
    } else {
        startCounter();
    }
});

window.onload = startCounter;
