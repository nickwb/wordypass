import _ from 'underscore';

import random from './random';

let _wordMap = null,
    _transformers = { V: pluraliseVerb },
    _patterns = ['JNVN', 'NVJN', 'NAVN'];;

function pluraliseVerb(word) {
    if(word.match(/[^aeiou]y$/)) {
        return word.substr(0, word.length - 1) + 'ies';
    }

    return word + (word.match(/[^g][shz]$/) ? 'es' : 's');
}

function randomWord(group) {
    return random.randomElement(_wordMap[group]);
}

function transform(word, group) {
    if(_transformers[group]) {
        return _transformers[group](word);
    }

    return word;
}

function getRandomSentenceFromPattern(pattern) {
    return _.map(pattern.split(''), group => transform(randomWord(group), group));
}

let Sentence = {};

Sentence.getRandomSentence = function () {
    return getRandomSentenceFromPattern(random.randomElement(_patterns));
}

Sentence.countCombinations = function () {

    let getPattern = p => _.chain(p)
        .map(c => _wordMap[c].length)
        .reduce((product, n) => product * n, 1)
        .value();

    let sentence = _.chain(_patterns)
        .map(getPattern)
        .reduce((sum, n) => sum + n, 0)
        .value();

    return sentence;
}

Sentence.init = function init(words) {
    if(_wordMap) { return; }

    _wordMap = {
        N: words.nouns,
        V: words.verbs,
        J: words.adjectives,
        A: words.adverbs
    };
}

export default Sentence;
