function initCustomScroll(content, track, thumb){

    function syncTrackHeight() {
        track.style.height = content.clientHeight + "px";
    }

    function updateThumb() {
        const visible = content.clientHeight;
        const total = content.scrollHeight;
        const trackHeight = track.clientHeight;

        const ratio = visible / total;
        const thumbHeight = Math.max(20, trackHeight * ratio);

        thumb.style.height = thumbHeight + "px";

        const maxThumbTop = trackHeight - thumbHeight;
        const maxScrollTop = total - visible;

        thumb.style.top = (content.scrollTop / maxScrollTop) * maxThumbTop + "px";
    }

    function updateAll(){
        syncTrackHeight();
        updateThumb();
    }

    window.addEventListener("load", updateAll);
    window.addEventListener("resize", updateAll);

    content.addEventListener("scroll", updateThumb);
    new ResizeObserver(updateAll).observe(content);

    let dragging = false;
    let dragStartY = 0;
    let thumbStartTop = 0;

    thumb.addEventListener("mousedown", (e)=>{
        dragging = true;
        dragStartY = e.clientY;
        thumbStartTop = parseFloat(thumb.style.top) || 0;
        thumb.style.cursor = "grabbing";
        e.preventDefault();
    });

    document.addEventListener("mousemove",(e)=>{
        if(!dragging) return;

        const trackHeight = track.clientHeight;
        const thumbHeight = thumb.clientHeight;

        const dy = e.clientY - dragStartY;

        let newTop = thumbStartTop + dy;
        newTop = Math.max(0, Math.min(trackHeight - thumbHeight, newTop));

        thumb.style.top = newTop + "px";

        const maxThumbTop = trackHeight - thumbHeight;
        const maxScrollTop = content.scrollHeight - content.clientHeight;

        content.scrollTop = (newTop / maxThumbTop) * maxScrollTop;
    });

    document.addEventListener("mouseup", ()=>{
        dragging = false;
        thumb.style.cursor = "grab";
    });

    content.addEventListener("wheel",(e)=>{
        e.preventDefault();
        content.scrollTop += e.deltaY * 0.17;
        updateThumb();
    },{ passive:false });

}

initCustomScroll(
    document.getElementById("brand_space"),
    document.getElementById("brend_scroll"),
    document.getElementById("brand_scroll_value")
);

initCustomScroll(
    document.getElementById("year_space"),
    document.getElementById("year_scroll"),
    document.getElementById("year_scroll_value")
);