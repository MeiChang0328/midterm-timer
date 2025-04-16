let timer;
let targetTime;
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const remainingTimeInput = document.getElementById('remaining-time');
//開始計時器
function startTimer() {
    if (remainingTimeInput.value === '') {
        alert('請設定目標日期');
        return;
    }
    const now = new Date();
    targetTime = new Date(remainingTimeInput.value);
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
        alert('目標時間已過，請重新設定');
        return;
    }

    timer = setInterval(() => {
        const now = new Date();
        const timeDiff = targetTime - now;

        if (timeDiff <= 0) {
            clearInterval(timer);
            timeDisplay.textContent = '00:00:00';
            resetTimer();
            alert('目標時間已到，計時結束！');
            return;
        }

        // 計算剩餘的總小時數、分鐘數和秒數
        const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');

        // 顯示格式為 "總小時數:分鐘:秒"
        timeDisplay.textContent = `${totalHours}:${minutes}:${seconds}`;
    }, 1000);
}

//重置計時器
function resetTimer() {
    clearInterval(timer);
    timeDisplay.textContent = '00:00:00';
    remainingTimeInput.value = '';
    // 按鈕重置回開始狀態
    startButton.style.display = 'inline-block';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('continue-button').style.display = 'none';
    timer = null;

}

//綁定按鈕事件
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
//綁定輸入框事件
remainingTimeInput.addEventListener('change', () => {
    const now = new Date();
    const selectedTime = new Date(remainingTimeInput.value);
    if (selectedTime <= now) {
        alert('目標時間已過，請重新設定');
        remainingTimeInput.value = '';
    }
});
//綁定暫停按鈕事件
const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
        pauseButton.textContent = '繼續';
    } else {
        startTimer();
        pauseButton.textContent = '暫停';
    }
});
//開始倒計時時，暫停按鈕與開始按鈕間交換
startButton.addEventListener('click', () => {
    if (timer) {
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    } else {
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
});
//暫停倒計時時，繼續按鈕與暫停按鈕間交換
pauseButton.addEventListener('click', () => {
    if (timer) {
        pauseButton.style.display = 'none';
        continueButton.style.display = 'inline-block';
    } else {
        pauseButton.style.display = 'inline-block';
        continueButton.style.display = 'none';
    }
});
//綁定繼續按鈕事件
const continueButton = document.getElementById('continue-button');
continueButton.addEventListener('click', () => {
    startTimer();
    continueButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
});