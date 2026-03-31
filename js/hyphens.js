function addSoftHyphens(text) {
    const vowels = 'аеёиоуыэюя';
    return text.replace(/([а-яё]{6,})/gi, word => {
        let result = '';
        for (let i = 0; i < word.length; i++) {
            result += word[i];
            const prev = word[i];
            const next = word[i + 1];
            const next2 = word[i + 2];
            if (!next || !next2) continue;
            if (vowels.includes(prev)) {
                if (i < 2 || word.length - i < 3) continue;
                if (next === 'ь' || next === 'ъ' || next === 'й') continue;
                if (result.endsWith('\u00AD')) continue;
                result += '\u00AD';
            }
        }
        return result;
    });
}
function get_wrap(element_id){
    const el = document.getElementById(element_id);
    el.innerHTML = addSoftHyphens(el.innerText);

}