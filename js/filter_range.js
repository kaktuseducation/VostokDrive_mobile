const axis          = document.getElementById("axis");
const left          = document.getElementById("value_left");
const right         = document.getElementById("value_right");
const circleLeft    = document.getElementById("circle_left");
const circleRight   = document.getElementById("circle_right");
const yearFrom      = document.getElementById("year_from");
const yearTo        = document.getElementById("year_to");


let active = null;
function getX(e) {return e.touches ? e.touches[0].clientX : e.clientX;}
function startDrag(target) {active = target;}
function stopDrag() {active = null;}

function onMove(e) {
    if (!active) return;
    const rect = axis.getBoundingClientRect();
    let x = getX(e) - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const leftCenter = getCenter(left, circleLeft);
    const rightCenter = getCenter(right, circleRight);
    const minGap = circleLeft.offsetWidth;
    if (active === left) {
        x = Math.min(x, rightCenter - minGap);
        setCenter(left, circleLeft, x);
        yearFrom.textContent = xToValue(x, rect.width);
    }
    if (active === right) {
        x = Math.max(x, leftCenter + minGap);
        setCenter(right, circleRight, x);
        yearTo.textContent = xToValue(x, rect.width);
    }
}

left.addEventListener("mousedown", () => startDrag(left));
right.addEventListener("mousedown", () => startDrag(right));
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", stopDrag);
left.addEventListener("touchstart", () => startDrag(left));
right.addEventListener("touchstart", () => startDrag(right));
document.addEventListener("touchmove", onMove);
document.addEventListener("touchend", stopDrag);