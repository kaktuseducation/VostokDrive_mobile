sizes = {
        "type": 197, 
        "brend": 133,
        "year": 89,
        "price": 169,
        "distance": 156,
        "color": 78
    }

function total_roll(){
    items.forEach(item => {
        const filter = document.getElementById(item.id + "_value");
        filter.classList.remove("unrolled");
    });
    active_filter = null;
    closeFocus();
}

const items = document.querySelectorAll(".item"); 
    let active_filter;
    items.forEach(item => {
        item.style.width = sizes[item.id] + 'px';
        let overItem = false;
        let overFilter = false;
        const filter = document.getElementById(item.id + "_value");
        filter.parentElement.style.width = sizes[item.id] + 'px';
        
        const updateState = () => {
            const activeInput = Array.from(document.querySelectorAll('input')).some(input => input === document.activeElement);
            if (!overItem && !overFilter && !activeInput) {
                total_roll()
            }
            else {
                if (!active_filter){
                    filter.classList.add("unrolled");
                    openFocus();
                    active_filter = filter;
                }    
            }
        }   
                
        item.addEventListener("click", () => {
            overItem = true;
            total_roll();  
            updateState();
        });

        item.addEventListener("mouseenter", () => {
            overItem = true;
            updateState();
        });

        item.addEventListener("mouseleave", () => {
            overItem = false;
            updateState();
        });

        filter.addEventListener("mouseenter", () => {
            overFilter = true;
            updateState();
        });

        filter.addEventListener("mouseleave", () => {
            overFilter = false;
            updateState();
        });
    });

    focus.addEventListener("click", () => {
        total_roll();
    });

    frame.addEventListener("click", (e) => {
        if (active_filter) {
            if (active_filter.contains(e.target)) {
                return;
            }
        }
        total_roll();
    });