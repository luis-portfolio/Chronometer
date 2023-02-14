window.Cronometer = (labels, buttons) => {
    const MINUTES = 0;
    const SECONDS = 1;
    const MILLISECONDS = 2;

    const START = 0;
    const PAUSE = 1;
    const RESUME = 2;
    const RESET = 3;

    let minutes = 0, seconds = 0, milliseconds = 0, isPaused = true, handleUpdate
    const format = (value, size) => "".padStart(size - `${value}`.length, "0") + value
    const show = (label, value) => label.textContent = value
    const start = () => {
        if (buttons[START].style.display === "none") return;

        handleUpdate = setInterval(() => {
            if (!isPaused) {
                milliseconds += 10
                if (milliseconds === 1000) {
                    seconds++;
                    milliseconds = 0;
                }

                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }
                show(labels[MINUTES], format(minutes, 2))
                show(labels[SECONDS], format(seconds, 2))
                show(labels[MILLISECONDS], format(milliseconds, 3))
            }
        }, 10)
        isPaused = false
        buttons[START].style.display = "none"
        buttons[PAUSE].style.display = "block"
    }

    const pause = () => {
        if (buttons[PAUSE].style.display === "none") return;
        isPaused = true
        buttons[PAUSE].style.display = "none"
        buttons[RESUME].style.display = "block"
    }

    const resume = () => {
        if (buttons[RESUME].style.display === "none") return;
        isPaused = false
        buttons[PAUSE].style.display = "block"
        buttons[RESUME].style.display = "none"
    }

    const reset = () => {
        if (buttons[RESET].style.display === "none") return;
        clearInterval(handleUpdate)
        milliseconds = seconds = minutes = 0;
        labels[MINUTES].textContent = '00'
        labels[SECONDS].textContent = '00'
        labels[MILLISECONDS].textContent = '000'
        buttons[START].style.display = "block"
        buttons[PAUSE].style.display = "none"
        buttons[RESUME].style.display = "none"
    }
    buttons[START].addEventListener("click", start)
    buttons[PAUSE].addEventListener("click", pause)
    buttons[RESUME].addEventListener("click", resume)
    buttons[RESET].addEventListener("click", reset)

    window.document.addEventListener("keyup", (e) => {
        e = e || window.event;
        if (e.code === 'Enter') { start(); return; }
        if (e.code === 'Space') { if (buttons[RESUME].style.display === "none") pause(); else resume(); return; }
        if (e.code === 'Escape') { reset(); return; }
    });
}