
    let timer;
    let isFocus = true;
    let timeLeft = 0;
    const timerDisplay = document.getElementById('timer');
    const breakmessage = document.getElementById('breakmessage');
    const alarmSound = document.getElementById('alarmSound');

    const startbotton  = document.getElementById('startbotton');
    const stopbotton = document.getElementById('stopbotton');
    const resetbotton = document.getElementById('resetbotton');
    const okbotton  = document.getElementById('okbotton');
    const modebotton  = document.getElementById('modebotton');

    function startTimer() {
      clearInterval(timer);
      if (isFocus) {
        let focusMinutes = parseInt(document.getElementById('focusTime').value) || 0;
        timeLeft = focusMinutes * 60;
      } else {
        let breakMinutes = parseInt(document.getElementById('breakTime').value) || 0;
        timeLeft = breakMinutes * 60;
      }
      updateDisplay();

      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timer);
          alarmSound.play();
          if (isFocus) {
            breakmessage.innerText = "Time for a Break! \n Suggestions:\n Stretch a little\n Eat something healthy\n Walk around \n go to refresh yourself  ";
            breakmessage.style.display = "block";
            okbotton.style.display = "inline-block";
          } else {
            breakmessage.innerText = "Break is over! Click OK to start focus again.";
            okbotton.style.display = "inline-block";
          }
        }
      }, 1000);
    }

   
    function updateDisplay() {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

   
   
    startbotton.addEventListener('click', () => {
      isFocus = true;
      breakmessage.style.display = "none";
      okbotton.style.display = "none";
      startTimer();
    });

   
    stopbotton.addEventListener('click', () => {
      clearInterval(timer);
      alarmSound.pause();
      alarmSound.currentTime = 0;
    });

   
   
    resetbotton.addEventListener('click', () => {
      clearInterval(timer);
      alarmSound.pause();
      alarmSound.currentTime = 0;
      timerDisplay.textContent = "00:00";
      breakmessage.style.display = "none";
      okbotton.style.display = "none";
    });

    okbotton.addEventListener('click', () => {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      breakmessage.style.display = "none";
      okbotton.style.display = "none";
      isFocus = !isFocus; 
      startTimer();
    });

  
  