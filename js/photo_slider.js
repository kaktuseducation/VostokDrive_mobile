const rubberPath = document.getElementById('rubber_path');
let currentIndex = 0;
let startX = 0; let startY = 0;
let isDragging = false;
const MAX_STR_WIDTH = window.innerWidth * 0.1;
const MAX_PULL_DISTANCE = window.innerWidth * 0.5;
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    slider.style.transition = 'none';
    rubberPath.setAttribute('d', '');
});
slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = currentX - startX;
    const width = window.innerWidth;
    const height = slider.offsetHeight;
    const maxIndex = slider.children.length - 1;
    const isAtStart = currentIndex === 0 && dx > 0;
    const isAtEnd = currentIndex === maxIndex && dx < 0;
    if (isAtStart || isAtEnd) {
        slider.style.transform = `translateX(${-currentIndex * width}px)`;
        const absDx = Math.abs(dx);
        const pullFactor = Math.pow(Math.min(absDx / MAX_PULL_DISTANCE, 1), 0.7);
        const currentStretchWidth = pullFactor * MAX_STR_WIDTH;
        const relY = currentY - slider.getBoundingClientRect().top;
        let pathD = '';
        if (isAtStart) {
            pathD = `
                M 0 0
                Q ${currentStretchWidth * 2} ${relY} 0 ${height}
                Z
            `;
        } else {
            pathD = `
                M ${width} 0
                Q ${width - currentStretchWidth * 2} ${relY} ${width} ${height}
                Z
            `;
        }
        rubberPath.setAttribute('d', pathD);
    } else {
        slider.style.transform = `translateX(${-currentIndex * width + dx}px)`;
        rubberPath.setAttribute('d', '');
    }
});
slider.addEventListener('touchend', (e) => {
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const width = window.innerWidth;
    const height = slider.offsetHeight;
    const threshold = 50;
    const maxIndex = slider.children.length - 1;
    const isAtStart = currentIndex === 0 && dx > 0;
    const isAtEnd = currentIndex === maxIndex && dx < 0;
    if (isAtStart || isAtEnd) {
        rubberPath.style.transition = 'd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        let straightPath = '';
        if (isAtStart) {
            straightPath = `M 0 0 Q 0 ${height / 2} 0 ${height} Z`;
        } else {
            straightPath = `M ${width} 0 Q ${width} ${height / 2} ${width} ${height} Z`;
        }
        rubberPath.setAttribute('d', straightPath);
        setTimeout(() => {
            if (!isDragging) {
                rubberPath.style.transition = 'none';
            }
        }, 500);
    }
    if (dx < -threshold && currentIndex < maxIndex) currentIndex++;
    if (dx > threshold && currentIndex > 0) currentIndex--;
    slider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    slider.style.transform = `translateX(${-currentIndex * 100}vw)`;
});