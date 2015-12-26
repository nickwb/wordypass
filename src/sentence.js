import Promise from 'promise';
import _ from 'underscore';

import random from './random';

function pluraliseVerb(word) {
    if(word.match(/[^aeiou]y$/)) {
        return word.substr(0, word.length - 1) + 'ies';
    }

    return word + (word.match(/[sh]$/) ? 'es' : 's');
}

class Sentence {

    static randomWord(group) {
        return random.randomElement(Sentence.wordMap[group]);
    }

    static transform(word, group) {
        if(Sentence.transformers[group]) {
            return Sentence.transformers[group](word);
        }

        return word;
    }

    static getRandomWordsFromPattern(pattern) {
        return _.map(pattern.split(''), group => Sentence.transform(Sentence.randomWord(group), group));
    }

    static getRandomWords() {
        return Sentence.getRandomWordsFromPattern(random.randomElement(Sentence.patterns));
    }

    static init(words) {
        Sentence.wordMap = {
            N: words.nouns,
            V: words.verbs,
            J: words.adjectives,
            A: words.adverbs
        };
    }
};

Sentence.patterns = ['JNVN', 'NVJN', 'NAVN'];

Sentence.transformers = {
    V: pluraliseVerb
};

export default Sentence;
