document.querySelectorAll('input').forEach(input => {
   input.addEventListener('input', () => {
        const pos = input.selectionStart;
        const old = input.value;
        const formatted = old
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        input.value = formatted;
        const diff = formatted.length - old.length;
        input.setSelectionRange(pos + diff, pos + diff);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace') return;
        const pos = input.selectionStart;
        if (pos === 0) return;
        if (input.value[pos - 1] === ' ') {
            e.preventDefault();
            input.setSelectionRange(pos - 1, pos - 1);
            document.execCommand('delete');
        }
    });
});


const distance_to = document.getElementById('distance_to');
function applyDistance() {
    const distances = FILTERED.map(car => car.distance);
    const min = Math.min(...distances); const max = Math.max(...distances);
    const label = document.getElementById('distance');
    let value = Number(distance_to.value.replace(/\s/g, ''));
    if (value < min || value > max){
        value = max;
    }
    label.firstChild.textContent = '< ' + formated(value) + ' км';
    DISTANCE_FILTER  = value;
    distance_to.value = formated(value);
    filterCars();  
}

distance_to.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        applyDistance();
        closeFilter("distance_value"); 
        update_filter('distance');  
        closeFocus();  
    }
});
distance_to.addEventListener('blur', applyDistance);


const price_to = document.getElementById('price_to');
function applyPriceTo() {
    const prices = FILTERED.map(car => car.price);
    const min = Math.min(...prices);    const max = Math.max(...prices);
    const label = document.getElementById('price');
    let value = Number(price_to.value.replace(/\s/g, ''));
    if (value < min || value > max){
        value = max;
    }
    label.firstChild.textContent = '< ' + short_rep(value) + ' ₽';
    PRICE_FILTER  = value;
    price_to.value = formated(value);
    filterCars();  
}

price_to.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        applyPriceTo();
        closeFilter("price_value");
        update_filter('price');  
        closeFocus();
    }
});
price_to.addEventListener('blur', applyPriceTo);

