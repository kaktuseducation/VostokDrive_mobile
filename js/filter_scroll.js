const slider = document.getElementById('slider');
const scrollValue = document.getElementById('scroll_value');
const box = document.getElementById('slider_box');
let currentX = 0;
function updateScroll() {
    const contentWidth = slider.scrollWidth;
    const visibleWidth = box.clientWidth;

    const maxScroll = contentWidth - visibleWidth;
    if (currentX > 0) currentX = 0;
    if (currentX < -maxScroll) currentX = -maxScroll;
    slider.style.transform = `translateX(${currentX}px)`;

    const ratio = visibleWidth / contentWidth;
    const thumbWidth = ratio * visibleWidth;

    scrollValue.style.width = thumbWidth + 'px';

    const maxMove = visibleWidth - thumbWidth;
    const move = (-currentX / maxScroll) * maxMove;
    scrollValue.style.transform = `translateX(${move}px)`;
}
let startX = 0;
let isDown = false;
box.addEventListener('touchstart', (e) => {
    if (!swipeEnabled) return;
    isDown = true;
    startX = e.touches[0].clientX;
});

box.addEventListener('touchmove', (e) => {
    if (!isDown || !swipeEnabled) return;
    const x = e.touches[0].clientX;
    const dx = x - startX;
    startX = x;
    currentX += dx;
    updateScroll();
});

box.addEventListener('touchend', () => {
    isDown = false;
});
updateScroll();
