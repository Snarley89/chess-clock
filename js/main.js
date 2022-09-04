let timerTotal = document.getElementById('time').value;
let minute = 0;
let second = 60;
let minuteTwo = 0;
let secondTwo = 60;
let running = false;
let init = false;
let intervalOne;
let intervalTwo;

//----------------------------
// Set clock starting values
//----------------------------
function initialiseClock(time){
    pauseClock('');
    minute = time;
    second = 60;
    minuteTwo = time;
    secondTwo = 60;
    document.getElementById('minutes').innerHTML = minute+1;
    document.getElementById('minutesTwo').innerHTML = minute+1;
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('secondsTwo').innerHTML = '00';
    document.getElementById('timerOne').style.backgroundColor = '#ff0000';
    document.getElementById('timerTwo').style.backgroundColor = '#ff0000';
    init = true;
}

//----------------------------
// Start clock based on which side of the clock is clicked
//----------------------------
function startClock(player){
    if(running == false && init == true){
        running = true;
        if(player == 'timerOne'){
            document.getElementById('timerOne').style.backgroundColor = '#00ff00';
            intervalOne = setInterval(function() {
                document.getElementById('minutes').innerHTML = minute;
                document.getElementById('seconds').innerHTML = second;
                second--;
                if (second == 00) {
                minute --;
                second = 60;
                }
            }, 1000);
        }else{
            if(player == 'timerTwo'){
                document.getElementById('timerTwo').style.backgroundColor = '#00ff00';
                intervalTwo = setInterval(function() {
                    document.getElementById('minutesTwo').innerHTML = minuteTwo;
                    document.getElementById('secondsTwo').innerHTML = secondTwo;
                    secondTwo--;
                    if (secondTwo == 00) {
                    minuteTwo--;
                    secondTwo = 60;
                    }
                }, 1000);
            }
        }
    }
}

//----------------------------
// Pause one or both sides of the clock based on whether the pause button is clicked or clock is switched
//----------------------------
function pauseClock(player){
    running = false;
    if(player == 'timerOne' && running == true){
        clearInterval(intervalTwo);
        document.getElementById('timerTwo').style.backgroundColor = '#ff0000';
    }else if(player == 'timerTwo' && running == true){
        clearInterval(intervalOne);
        document.getElementById('timerOne').style.backgroundColor = '#ff0000';
    }else{
        clearInterval(intervalOne);
        clearInterval(intervalTwo);
        document.getElementById('timerOne').style.backgroundColor = '#ff0000';
        document.getElementById('timerTwo').style.backgroundColor = '#ff0000';
    }
}

function switchClock(player){
    if(running == true){
        pauseClock(player);
        startClock(player);
    }
}

function restartClock(){
    pauseClock('');
    initialiseClock(timerTotal);
    running = false;
}

//----------------------------
// Listen for click on start button
//----------------------------
document.getElementById('start').addEventListener('click', (event) => {
    timerTotal = document.getElementById('time').value-1; 
    initialiseClock(timerTotal);
});

//----------------------------
// Listen for click on top clock
//----------------------------
document.getElementById('timerOne').addEventListener('click', (event) => {
    if(running == false){
        startClock('timerOne');
    }else{
        switchClock('timerOne');
    }
});

//----------------------------
// Listen for click on bottom clock
//----------------------------
document.getElementById('timerTwo').addEventListener('click', (event) => {
    if(running == false){
        startClock('timerTwo');
    }else{
        switchClock('timerTwo');
    }
});

//----------------------------
// Listen for click on pause button
//----------------------------
document.getElementById('pause').addEventListener('click', (event) => {
    pauseClock('');
});

//----------------------------
// Listen for click on restart button
//----------------------------
document.getElementById('restart').addEventListener('click', (event) => {
    restartClock();
});