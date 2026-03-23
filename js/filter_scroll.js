let currentX = 0;
function updateScroll() {
    const contentWidth = slider.scrollWidth;
    const visibleWidth = slider_box.clientWidth;

    const maxScroll = contentWidth - visibleWidth;
    if (currentX > 0) currentX = 0;
    if (currentX < -maxScroll) currentX = -maxScroll;
    slider.style.transform = `translateX(${currentX}px)`;

    const ratio = visibleWidth / contentWidth;
    const thumbWidth = ratio * visibleWidth;

    scroll_value.style.width = thumbWidth + 'px';

    const maxMove = visibleWidth - thumbWidth;
    const move = (-currentX / maxScroll) * maxMove;
    scroll_value.style.transform = `translateX(${move}px)`;
}
let startX = 0;
let isDown = false;
slider_box.addEventListener('touchstart', (e) => {
    if (!swipeEnabled) return;
    isDown = true;
    startX = e.touches[0].clientX;
});

slider_box.addEventListener('touchmove', (e) => {
    if (!isDown || !swipeEnabled) return;
    const x = e.touches[0].clientX;
    const dx = x - startX;
    startX = x;
    currentX += dx;
    updateScroll();
});

slider_box.addEventListener('touchend', () => {
    isDown = false;
});
updateScroll();
