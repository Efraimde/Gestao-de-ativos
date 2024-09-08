let travelStartTime, workStartTime;
let travelInterval, workInterval;
let isTraveling = false, isWorking = false;

function submitRequest() {
    alert("Solicitação submetida com sucesso!");
}

function submitFirstAttendance() {
    alert("Primeiro atendimento encaminhado para aprovação.");
}

function submitStockRoom() {
    alert("Encaminhado para o setor de compras.");
}

function submitPurchase() {
    alert("Encaminhado para execução.");
}

function submitApproval() {
    const status = document.getElementById("approval-status").value;
    alert(`Solicitação ${status === 'approved' ? 'aprovada' : 'não aprovada'}.`);
}

function submitExecution() {
    alert("Execução encaminhada para baixa.");
}

function submitClosure() {
    alert("OS finalizada com sucesso!");
}

function startTravel() {
    if (isTraveling) {
        alert("Deslocamento já iniciado.");
        return;
    }
    travelStartTime = new Date();
    isTraveling = true;
    document.getElementById("start-travel").disabled = true;
    document.getElementById("stop-travel").disabled = false;
    startTimer('travel-timer');
}

function stopTravel() {
    if (!isTraveling) {
        alert("Deslocamento não iniciado.");
        return;
    }
    const travelEndTime = new Date();
    const travelDuration = (travelEndTime - travelStartTime) / 60000; // minutos
    alert(`Deslocamento finalizado. Tempo total: ${travelDuration.toFixed(2)} minutos.`);
    clearInterval(travelInterval);
    travelStartTime = null;
    isTraveling = false;
    document.getElementById("start-travel").disabled = false;
    document.getElementById("stop-travel").disabled = true;
    document.getElementById("start-work").disabled = false;
}

function startWork() {
    if (isTraveling) {
        alert("Deslocamento não finalizado.");
        return;
    }
    if (isWorking) {
        alert("Trabalho já iniciado.");
        return;
    }
    workStartTime = new Date();
    isWorking = true;
    startTimer('work-timer');
    document.getElementById("start-work").disabled = true;
    document.getElementById("pause-work").disabled = false;
    document.getElementById("end-work").disabled = false;
}

function pauseWork() {
    if (!isWorking) {
        alert("Trabalho não iniciado.");
        return;
    }
    const workPauseTime = new Date();
    clearInterval(workInterval);
    alert(`Trabalho pausado.`);
    isWorking = false;
    document.getElementById("start-work").disabled = false;
    document.getElementById("pause-work").disabled = true;
    document.getElementById("end-work").disabled = false;
}

function endWork() {
    if (!isWorking) {
        alert("Trabalho não iniciado.");
        return;
    }
    const workEndTime = new Date();
    const workDuration = (workEndTime - workStartTime) / 60000; // minutos
    alert(`Trabalho finalizado. Tempo total: ${workDuration.toFixed(2)} minutos.`);
    clearInterval(workInterval);
    workStartTime = null;
    isWorking = false;
    document.getElementById("start-work").disabled = false;
    document.getElementById("pause-work").disabled = true;
    document.getElementById("end-work").disabled = true;
}

function startTimer(timerId) {
    const timerElement = document.getElementById(timerId);
    let minutes = 0;
    let seconds = 0;
    clearInterval(travelInterval);
    clearInterval(workInterval);

    if (timerId === 'travel-timer') {
        travelInterval = setInterval(function() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    } else if (timerId === 'work-timer') {
        workInterval = setInterval(function() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }
}
