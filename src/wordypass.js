import 'babel-polyfill';

import wordlist from './wordlist';
import password from './password';

let $ = window.jQuery;

function nextPassword() {
    $('#lastPassword').text(password.generateRandomPassword().join(' '));
}

function bindNextPassword() {
    $(document).on('keydown', e => {
        if(e.which === 40 || e.which === 13 || e.which === 32) {
            nextPassword();
        }
    });
}

$(() => {
    wordlist.getWordList().then(words => {
        password.init(words);
        bindNextPassword();
        nextPassword();
    });
});
