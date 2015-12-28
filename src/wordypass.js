import 'babel-polyfill';

import wordlist from './wordlist';
import password from './password';

let $ = window.jQuery;

let suggestionElm, historyElm;

function nextPassword() {
    let next = password.generateRandomPassword().join(' '),
        last = suggestionElm.text();

    suggestionElm.text(next);

    if($.trim(last)) {
        historyElm.prepend($('<li>').text(last));
    }
}

function bindNextPassword() {
    $(document).on('keydown', e => {
        if(e.which === 40 || e.which === 13 || e.which === 32) {
            nextPassword();
        }
    });
}

$(() => {
    suggestionElm = $('#password-suggestion');
    historyElm = $('#password-history ul');

    wordlist.getWordList().then(words => {
        password.init(words);
        bindNextPassword();
        nextPassword();
    });
});
