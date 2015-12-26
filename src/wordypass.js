import 'babel-polyfill';

import wordlist from './wordlist';
import sentence from './sentence';

let $ = window.jQuery;

$(() => {
    wordlist.getWordList().then(words => {
        sentence.init(words);
        console.log(sentence.getRandomWords());
    });
});
