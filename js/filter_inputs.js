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


function validate(input) {
    let value = getValue(input.value);
    const min = +input.dataset.min;
    const max = +input.dataset.max;

    if (value < min) value = min;
    if (value > max) value = max;

    input.value = formated(value);
}

function updateRange() {
    const fromVal = getValue(price_from.value);
    const toVal   = getValue(price_to.value);
    price_to.dataset.min   = fromVal;
    price_from.dataset.max = toVal;
}

function handleRange(input) {
    validate(input);
    updateRange(); 
}


document.querySelectorAll('input[data-min], input[data-max]').forEach(input => {
    input.addEventListener('blur', validate(input));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            validate(input);
            input.blur();
        }
    });
});


price_from.addEventListener('blur', () => handleRange(price_from));
price_from.addEventListener('keydown', e => {if (e.key === 'Enter') handleRange(price_from);})

price_to.addEventListener('blur', () => handleRange(price_to));
price_to.addEventListener('keydown', e => {if (e.key === 'Enter') handleRange(price_to);});
